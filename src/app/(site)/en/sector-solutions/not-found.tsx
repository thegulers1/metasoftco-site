import { redirect } from "next/navigation";

/**
 * A dead/renamed URL under /en/sector-solutions (old slug, broken link,
 * typo) lands here instead of the bare global 404 — send visitors to
 * the index so they can still find what they were looking for.
 */
export default function SectorSolutionsNotFoundEn() {
    redirect("/en/sector-solutions");
}
