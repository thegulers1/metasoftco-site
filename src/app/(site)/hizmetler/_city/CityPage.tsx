import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import CityLandingClient from "@/components/site/CityLandingClient";
import { isEnglishSectorPagePublishable } from "@/lib/publication";

// City landing pages (/hizmetler/<slug>) are SectorPage rows rendered with the
// city layout. Each city has its own thin page.tsx so the route stays static;
// the slugs are listed in cityLandingSlugs (src/lib/publication.ts).

async function getPage(slug: string) {
    return prisma.sectorPage.findUnique({ where: { slug } });
}

export async function cityMetadata(slug: string): Promise<Metadata> {
    const page = await getPage(slug);
    if (!page) return {};

    const title = page.metaTitle || page.h1 || page.title;
    const description = page.metaDescription || page.excerpt || siteConfig.description;
    const image = page.ogImage || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/hizmetler/${slug}`;
    const enUrl = isEnglishSectorPagePublishable(page) ? `${siteConfig.url}/en/services/${page.slug_en}` : undefined;

    return {
        title,
        description,
        keywords: page.metaKeywords?.split(",").map((k) => k.trim()),
        openGraph: { title, description, url, siteName: siteConfig.name, images: [{ url: image, width: 1200, height: 630 }], locale: "tr_TR", type: "website" },
        twitter: { card: "summary_large_image", title, description, images: [image] },
        alternates: {
            canonical: url,
            ...(enUrl && { languages: { "x-default": url, tr: url, en: enUrl } }),
        },
    };
}

export async function CityPage({ slug }: { slug: string }) {
    const page = await getPage(slug);
    if (!page || !page.published) notFound();

    const images = page.images ? JSON.parse(page.images) : [];
    const districts = page.districts ? JSON.parse(page.districts) : [];
    const faq: { q: string; a: string }[] = page.faq ? JSON.parse(page.faq) : [];
    const enUrl = isEnglishSectorPagePublishable(page) ? `/en/services/${page.slug_en}` : "/en";

    const serviceIds: string[] = page.serviceIds ? JSON.parse(page.serviceIds) : [];
    const relatedServices = serviceIds.length > 0
        ? await prisma.service.findMany({
            where: { id: { in: serviceIds }, published: true },
            include: { category: true },
          })
        : [];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${siteConfig.url}/hizmetler` },
            { "@type": "ListItem", position: 3, name: page.h1 || page.title, item: `${siteConfig.url}/hizmetler/${slug}` },
        ],
    };

    const faqSchema = faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    } : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
            {page.customSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.customSchema }} />
            )}
            <CityLandingClient
                page={page}
                images={images}
                districts={districts}
                faq={faq}
                relatedServices={relatedServices}
                lang="tr"
                trUrl={`/hizmetler/${slug}`}
                enUrl={enUrl}
            />
        </>
    );
}
