import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/site";
import { getSectorBySlug, hasEnglish } from "@/lib/industry-pages";
import { IndustrySector } from "@/components/site-ms/IndustrySector";

interface PageProps {
    params: Promise<{ sektor: string }>;
}

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { sektor } = await params;
    const sector = await getSectorBySlug(sektor);
    if (!sector) return {};

    const url = `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}`;
    const image = `${siteConfig.url}/og?title=${encodeURIComponent(sector.name)}&desc=${encodeURIComponent(sector.heroSubtitle)}`;

    return {
        title: sector.metaTitle,
        description: sector.metaDescription,
        keywords: sector.keywords,
        openGraph: {
            title: sector.metaTitle,
            description: sector.metaDescription,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630 }],
            locale: siteConfig.locale,
            type: "website",
        },
        twitter: { card: "summary_large_image", title: sector.metaTitle, description: sector.metaDescription },
        alternates: {
            canonical: url,
            ...(hasEnglish(sector) && {
                languages: {
                    tr: url,
                    en: `${siteConfig.url}/en/industry-software-solutions/${sector.slug_en}`,
                    "x-default": url,
                },
            }),
        },
    };
}

export default async function SektorPage({ params }: PageProps) {
    const { sektor } = await params;
    const sector = await getSectorBySlug(sektor);
    if (!sector) notFound();

    const faqSchema = generateFAQSchema(sector.faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Çözümler", url: `${siteConfig.url}/sektorel-yazilim-cozumleri` },
        { name: sector.name, url: `${siteConfig.url}/sektorel-yazilim-cozumleri/${sector.slug}` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <IndustrySector lang="tr" sector={{ name: sector.name, title: sector.title, intro: sector.intro, contentHtml: sector.contentHtml, services: sector.services, faqs: sector.faqs, cta: sector.cta }} />
        </>
    );
}
