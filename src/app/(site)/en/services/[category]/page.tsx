import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import CapabilityCategoryScreen from "@/components/phase2/CapabilityCategoryScreen";
import { isEnglishServicePublishable } from "@/lib/publication";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ category: string }>;
}

/** Category FAQ is editor-authored in the DB (editpanel "İçerik & SSS" tab). */
function parseFaqs(raw: string | null) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as { q: string; a: string }[];
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item) => ({ question: item.q, answer: item.a }));
    } catch {
        return [];
    }
}

async function getCategoryBySlugEn(slugEn: string) {
    return prisma.serviceCategory.findFirst({
        where: { slug_en: slugEn },
        include: { services: { where: { published: true }, orderBy: { order: "asc" } } },
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlugEn } = await params;
    const category = await getCategoryBySlugEn(categorySlugEn);
    if (!category) return {};

    const title = category.metaTitle_en || category.metaTitle || `${category.name_en || category.name} | MetasoftCo`;
    const description = category.metaDescription_en || category.metaDescription || siteConfig.description;
    const url = `${siteConfig.url}/en/services/${categorySlugEn}`;

    return {
        title,
        description,
        keywords: category.metaKeywords_en || undefined,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: "en_US",
            type: "website",
            images: [{ url: `${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [`${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`] },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/hizmetler/${category.slug}`,
                tr: `${siteConfig.url}/hizmetler/${category.slug}`,
                en: url,
            },
        },
    };
}

export default async function EnCategoryHubPage({ params }: PageProps) {
    const { category: categorySlugEn } = await params;
    const category = await getCategoryBySlugEn(categorySlugEn);

    if (!category) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: `${siteConfig.url}/en` },
        { name: "Services", url: `${siteConfig.url}/en/services` },
        { name: category.name_en || category.name, url: `${siteConfig.url}/en/services/${categorySlugEn}` },
    ]);

    const faqs = parseFaqs(category.faq_en);
    const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <CapabilityCategoryScreen
                locale="en"
                name={category.name_en || category.name}
                heroCopy={category.metaDescription_en || category.heroContent}
                contentHtml={category.content_en}
                services={category.services.map((service) => ({
                    id: service.id,
                    title: service.title_en || service.title,
                    image: service.image,
                    href: isEnglishServicePublishable(service, category)
                        ? `/en/services/${categorySlugEn}/${service.slug_en}`
                        : `/hizmetler/${category.slug}/${service.slug}`,
                }))}
                faqs={faqs}
            />
        </>
    );
}
