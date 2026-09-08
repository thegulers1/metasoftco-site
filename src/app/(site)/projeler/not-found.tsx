import { redirect } from "next/navigation";

/**
 * A dead/renamed URL under /projeler (old slug, broken link, typo) lands
 * here instead of the bare global 404 — send visitors to the projects
 * index so they can still find what they were looking for.
 */
export default function ProjectsNotFound() {
    redirect("/projeler");
}
