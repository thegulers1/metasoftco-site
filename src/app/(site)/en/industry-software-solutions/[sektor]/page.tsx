import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/site";
import { getSectorBySlugEn } from "@/lib/industry-pages";
import { IndustrySector } from "@/components/site-ms/IndustrySector";

interface PageProps {
    params: Promise<{ sektor: string }>;
}

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { sektor } = await params;
    const sector = await getSectorBySlugEn(sektor);
    if (!sector) return {};

    const url = `${siteConfig.url}/en/industry-software-solutions/${sector.slug_en}`;
    const image = `${siteConfig.url}/og?title=${encodeURIComponent(sector.name_en)}&desc=${encodeURIComponent(sector.title_en)}`;

    return {
        title: sector.metaTitle_en,
        description: sector.metaDescription_en,
        keywords: sector.keywords_en,
        openGraph: {
            title: sector.metaTitle_en,
            description: sector.metaDescription_en,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630 }],
            locale: "en_US",
            type: "website",
        },
        twitter: { card: "summary_large_image", title: sector.metaTitle_en, description: sector.metaDescription_en },
        alternates: {
            canonical: url,
            languages: {
                tr: `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}`,
                en: url,
                "x-default": `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}`,
            },
        },
    };
}

export default async function SektorEnPage({ params }: PageProps) {
    const { sektor } = await params;
    const sector = await getSectorBySlugEn(sektor);
    if (!sector) notFound();

    const faqSchema = generateFAQSchema(sector.faqs_en);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Sectoral Solutions", url: `${siteConfig.url}/en/industry-software-solutions` },
        { name: sector.name_en, url: `${siteConfig.url}/en/industry-software-solutions/${sector.slug_en}` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <IndustrySector lang="en" sector={{ name: sector.name_en, title: sector.title_en, intro: sector.intro_en, contentHtml: sector.contentHtml_en, services: sector.services_en, faqs: sector.faqs_en, cta: sector.cta_en }} />
        </>
    );
}
