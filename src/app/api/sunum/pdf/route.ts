import { NextResponse } from "next/server";
import type { Browser } from "puppeteer-core";
import { launchPdfBrowser } from "@/lib/pdf-browser";
import { getPresentationDeck } from "@/lib/presentation";

/**
 * GET /api/sunum/pdf?s=<id,id,…> — prints /sunum/yazdir in headless Chrome
 * and returns the PDF. Without `s` the whole presentation is exported.
 * Chrome is started by launchPdfBrowser (see src/lib/pdf-browser.ts).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const VIEWPORT = { width: 1600, height: 900, deviceScaleFactor: 1 };
/** Only the site itself and the image CDN are fetched; analytics and chat scripts are blocked. */
const ALLOWED_HOSTS = ["res.cloudinary.com"];
const IMAGE_WAIT_MS = 35_000;

/**
 * Chrome must fetch the print page over plain HTTP from inside the container.
 * request.url carries the proxy's view (behind Coolify/Traefik it can be
 * https://0.0.0.0:3000), and Chrome cannot speak TLS to the Node server, which
 * produced net::ERR_SSL_PROTOCOL_ERROR. Loopback avoids the proxy round trip.
 * Serverless has no loopback server, so there the public origin is used.
 */
function printBaseUrl(requestUrl: URL) {
    if (process.env.PDF_BASE_URL) return process.env.PDF_BASE_URL;
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) return requestUrl.origin;
    return `http://127.0.0.1:${process.env.PORT ?? "3000"}`;
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const internalOrigin = new URL(printBaseUrl(requestUrl)).origin;

    // Keep only ids that exist in the deck so the query can't be used to
    // render arbitrary pages.
    let ids: string[] | null = null;
    const raw = requestUrl.searchParams.get("s");
    if (raw) {
        const deck = await getPresentationDeck();
        const known = new Set(deck.categories.flatMap((c) => c.services.map((s) => s.id)));
        ids = raw.split(",").filter((id) => known.has(id));
        if (ids.length === 0) {
            return NextResponse.json({ error: "Seçilen hizmetler bulunamadı" }, { status: 400 });
        }
    }

    const printUrl = new URL("/sunum/yazdir", internalOrigin);
    if (ids) printUrl.searchParams.set("s", ids.join(","));

    let browser: Browser | null = null;
    try {
        browser = await launchPdfBrowser(VIEWPORT);
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on("request", (req) => {
            const url = req.url();
            if (url.startsWith("data:")) return void req.continue();
            const requestOrigin = new URL(url);
            if (requestOrigin.origin === internalOrigin) return void req.continue();
            if (!ALLOWED_HOSTS.includes(requestOrigin.hostname)) return void req.abort();
            // f_auto would negotiate WebP/AVIF, which Chrome re-encodes losslessly
            // into the PDF (≈100 MB). JPEG is embedded as-is.
            return void req.continue({ headers: { ...req.headers(), accept: "image/jpeg,image/png;q=0.9,*/*;q=0.5" } });
        });

        await page.goto(printUrl.toString(), { waitUntil: "domcontentloaded", timeout: 20_000 });
        // Wait for fonts and images, but never longer than IMAGE_WAIT_MS: one
        // slow image must not cost the visitor the whole PDF.
        await page.evaluate(async (limit) => {
            const images = Array.from(document.images).filter((img) => !img.complete);
            const loaded = Promise.all([
                document.fonts.ready,
                ...images.map(
                    (img) =>
                        new Promise((resolve) => {
                            img.addEventListener("load", resolve, { once: true });
                            img.addEventListener("error", resolve, { once: true });
                        }),
                ),
            ]);
            await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, limit))]);
        }, IMAGE_WAIT_MS);

        const pdf = await page.pdf({
            width: `${VIEWPORT.width}px`,
            height: `${VIEWPORT.height}px`,
            printBackground: true,
            preferCSSPageSize: true,
        });

        const filename = ids ? "MetasoftCo-Sunum-2026-Secim.pdf" : "MetasoftCo-Sunum-2026.pdf";
        return new NextResponse(Buffer.from(pdf), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error("Error generating presentation PDF:", error);
        return NextResponse.json({ error: "PDF oluşturulamadı, lütfen tekrar deneyin" }, { status: 500 });
    } finally {
        await browser?.close();
    }
}
