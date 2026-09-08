import { redirect } from "next/navigation";

/**
 * A dead/renamed URL under /urunler (old slug, broken link, typo) lands
 * here instead of the bare global 404 — send visitors to the products
 * index so they can still find what they were looking for.
 */
export default function ProductsNotFound() {
    redirect("/urunler");
}
