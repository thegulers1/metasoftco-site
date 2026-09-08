import { redirect } from "next/navigation";

/**
 * A dead/renamed URL under /sektorel-yazilim-cozumleri (old slug, broken
 * link, typo) lands here instead of the bare global 404 — send visitors
 * to the sector solutions index so they can still find what they were
 * looking for.
 */
export default function SectorSolutionsNotFound() {
    redirect("/sektorel-yazilim-cozumleri");
}
