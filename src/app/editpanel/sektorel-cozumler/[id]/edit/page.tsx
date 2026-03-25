import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SectorPageForm from "../../SectorPageForm";

export const dynamic = "force-dynamic";

export default async function EditSectorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const page = await prisma.sectorPage.findUnique({ where: { id } });
    if (!page) notFound();

    const images = page.images ? JSON.parse(page.images) : [];
    const serviceIds = page.serviceIds ? JSON.parse(page.serviceIds) : [];

    return (
        <SectorPageForm
            mode="edit"
            initialData={{
                id: page.id,
                title: page.title,
                slug: page.slug,
                h1: page.h1 ?? "",
                excerpt: page.excerpt ?? "",
                content: page.content ?? "",
                slug_en: page.slug_en ?? "",
                h1_en: page.h1_en ?? "",
                excerpt_en: page.excerpt_en ?? "",
                content_en: page.content_en ?? "",
                images,
                published: page.published,
                order: page.order,
                metaTitle: page.metaTitle ?? "",
                metaDescription: page.metaDescription ?? "",
                metaKeywords: page.metaKeywords ?? "",
                ogImage: page.ogImage ?? "",
                metaTitle_en: page.metaTitle_en ?? "",
                metaDescription_en: page.metaDescription_en ?? "",
                metaKeywords_en: page.metaKeywords_en ?? "",
                customSchema: page.customSchema ?? "",
                serviceIds,
            }}
        />
    );
}
