import { redirect } from "next/navigation";

// English homepage — redirect to root (same home page, language detected via URL prefix)
export default function EnglishHomePage() {
    redirect("/");
}
