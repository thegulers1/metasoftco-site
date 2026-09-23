import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import CapabilityCategoryScreen from "@/components/phase2/CapabilityCategoryScreen";
import { isEnglishCategoryPublishable } from "@/lib/publication";
import { isSoftwareCategory, softwareCategoryCopy } from "@/lib/software";

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

async function getCategoryWithServices(slug: string) {
    return prisma.serviceCategory.findUnique({
        where: { slug },
        include: {
            services: { where: { published: true, type: "RENTAL" }, orderBy: { order: "asc" } },
        },
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = await getCategoryWithServices(categorySlug);
    if (!category) return {};

    const title = category.metaTitle || `${category.name} | MetasoftCo`;
    const description = category.metaDescription || siteConfig.description;
    const url = `${siteConfig.url}/hizmetler/${categorySlug}`;

    return {
        title,
        description,
        keywords: category.metaKeywords || undefined,
        // An empty category (e.g. one still being drafted) is not worth indexing.
        ...(category.services.length === 0 && { robots: { index: false, follow: true } }),
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
            images: [{ url: `${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [`${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`] },
        alternates: {
            canonical: url,
            ...(isEnglishCategoryPublishable(category) && {
                languages: {
                    "x-default": url,
                    tr: url,
                    en: `${siteConfig.url}/en/services/${category.slug_en}`,
                },
            }),
        },
    };
}

export default async function CategoryHubPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    const category = await getCategoryWithServices(categorySlug);

    if (!category) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
        { name: category.name, url: `${siteConfig.url}/hizmetler/${categorySlug}` },
    ]);

    const faqs = parseFaqs(category.faq);
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
            <AdminEditUrlSetter url={`/editpanel/services/categories/${category.id}/edit`} />
            <CapabilityCategoryScreen
                locale="tr"
                name={category.name}
                heroTitle={category.heroTitle}
                heroCopy={category.heroContent}
                contentHtml={category.content}
                services={category.services.map((service) => ({
                    id: service.id,
                    title: service.title,
                    image: service.image,
                    href: `/hizmetler/${categorySlug}/${service.slug}`,
                }))}
                faqs={faqs}
                updatedAt={category.updatedAt.toISOString()}
                overrides={isSoftwareCategory(categorySlug) ? softwareCategoryCopy : undefined}
            />
        </>
    );
}
