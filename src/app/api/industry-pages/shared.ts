import { revalidatePath } from "next/cache";

const TEXT_FIELDS = [
    "slug_en", "name_en", "title_en", "heroSubtitle", "intro", "intro_en", "content", "content_en",
    "services", "services_en", "faq", "faq_en", "cta", "cta_en",
    "metaTitle", "metaTitle_en", "metaDescription", "metaDescription_en", "metaKeywords", "metaKeywords_en",
] as const;

type Body = Record<string, unknown>;

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value : null);

/** Maps an editpanel form payload onto IndustryPage columns; empty strings become null. */
export function industryPageData(body: Body) {
    const optional = Object.fromEntries(TEXT_FIELDS.map((field) => [field, text(body[field])])) as Record<(typeof TEXT_FIELDS)[number], string | null>;
    return {
        slug: String(body.slug ?? "").trim(),
        name: String(body.name ?? "").trim(),
        title: String(body.title ?? "").trim(),
        published: Boolean(body.published),
        order: Number(body.order) || 0,
        ...optional,
    };
}

export function revalidateIndustryPage(page: { slug: string; slug_en: string | null }, previous?: { slug: string; slug_en: string | null }) {
    for (const p of [page, previous]) {
        if (!p) continue;
        revalidatePath(`/sektorel-yazilim-cozumleri/${p.slug}`);
        if (p.slug_en) revalidatePath(`/en/industry-software-solutions/${p.slug_en}`);
    }
    revalidatePath("/sektorel-yazilim-cozumleri");
    revalidatePath("/en/industry-software-solutions");
}
