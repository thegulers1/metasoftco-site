import type { Metadata } from "next";
import { buildSlidePages } from "@/components/presentation/Slides";
import { getPresentationDeck } from "@/lib/presentation";
import { selectFromDeck } from "@/lib/presentation-deck";

/**
 * Print-only rendering of the presentation. /api/sunum/pdf opens this page in
 * headless Chrome and prints it: one 1600×900 slide per PDF page. `?s=` takes
 * comma-separated service ids; without it the whole deck is printed.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Sunum 2026 — MetasoftCo",
    robots: { index: false, follow: false },
};

const PRINT_CSS = `
@page { size: 1600px 900px; margin: 0; }
html, body { margin: 0 !important; padding: 0 !important; background: #07090b !important; }
body > :not(.pz-print) { display: none !important; }
.pz-print__page { width: 1600px; height: 900px; overflow: hidden; break-after: page; }
.pz-print__page:last-child { break-after: auto; }
`;

export default async function PresentationPrintPage({
    searchParams,
}: {
    searchParams: Promise<{ s?: string | string[] }>;
}) {
    const { s } = await searchParams;
    const ids = typeof s === "string" && s.trim() ? s.split(",").map((id) => id.trim()) : null;
    const full = await getPresentationDeck();
    const pages = buildSlidePages(selectFromDeck(full, ids), full);

    return (
        <div className="pz-print">
            <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
            {pages.map((page) => (
                <div key={page.key} className="pz-print__page">
                    {page.node}
                </div>
            ))}
        </div>
    );
}
