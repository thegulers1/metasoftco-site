import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import IndustryPageForm from "../../IndustryPageForm";

export const dynamic = "force-dynamic";

function parseList<T>(raw: string | null): T[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export default async function EditIndustryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const page = await prisma.industryPage.findUnique({ where: { id } });
    if (!page) notFound();

    return (
        <IndustryPageForm
            mode="edit"
            initialData={{
                id: page.id,
                name: page.name,
                slug: page.slug,
                title: page.title,
                heroSubtitle: page.heroSubtitle ?? "",
                intro: page.intro ?? "",
                content: page.content ?? "",
                cta: page.cta ?? "",
                slug_en: page.slug_en ?? "",
                name_en: page.name_en ?? "",
                title_en: page.title_en ?? "",
                intro_en: page.intro_en ?? "",
                content_en: page.content_en ?? "",
                cta_en: page.cta_en ?? "",
                services: parseList(page.services),
                services_en: parseList(page.services_en),
                faq: parseList(page.faq),
                faq_en: parseList(page.faq_en),
                metaTitle: page.metaTitle ?? "",
                metaDescription: page.metaDescription ?? "",
                metaKeywords: page.metaKeywords ?? "",
                metaTitle_en: page.metaTitle_en ?? "",
                metaDescription_en: page.metaDescription_en ?? "",
                metaKeywords_en: page.metaKeywords_en ?? "",
                published: page.published,
                order: page.order,
            }}
        />
    );
}
