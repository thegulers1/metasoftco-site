import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import type { Browser } from "puppeteer-core";
import { prisma } from "@/lib/db";
import { launchPdfBrowser } from "@/lib/pdf-browser";
import { buildQuoteHtml, quoteFooterTemplate } from "@/lib/quote-pdf";
import { QUOTE_DEFAULTS_KEY } from "@/lib/quotes";

/**
 * GET /api/quotes/<id>/pdf — the quote as an A4 PDF (?inline=1 to view it in
 * the browser instead of downloading). Middleware lets GETs through, so this
 * route checks the admin session itself.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const IMAGE_WAIT_MS = 20_000;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await getToken({ req: request }))) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    const { id } = await params;
    const [quote, defaults] = await Promise.all([
        prisma.quote.findUnique({ where: { id } }),
        prisma.siteSetting.findUnique({ where: { key: QUOTE_DEFAULTS_KEY } }),
    ]);
    if (!quote) return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });

    let browser: Browser | null = null;
    try {
        const html = await buildQuoteHtml(quote, defaults?.value);
        browser = await launchPdfBrowser({ width: 794, height: 1123 });
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on("request", (req) => {
            const url = req.url();
            if (url.startsWith("data:") || url === "about:blank") return void req.continue();
            if (new URL(url).hostname !== "res.cloudinary.com") return void req.abort();
            return void req.continue();
        });
        await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 20_000 });
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
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            displayHeaderFooter: true,
            headerTemplate: "<span></span>",
            footerTemplate: quoteFooterTemplate(),
        });

        const company = quote.company.normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
        const filename = `MetasoftCo-Teklif-${quote.number}${company ? `-${company}` : ""}.pdf`;
        const inline = request.nextUrl.searchParams.get("inline") === "1";
        return new NextResponse(Buffer.from(pdf), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
                "Cache-Control": "private, no-store",
            },
        });
    } catch (error) {
        console.error("Error generating quote PDF:", error);
        return NextResponse.json({ error: "PDF oluşturulamadı, lütfen tekrar deneyin" }, { status: 500 });
    } finally {
        await browser?.close();
    }
}
