import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import CityLandingClient from "@/components/site/CityLandingClient";
import { isEnglishSectorPagePublishable } from "@/lib/publication";

// City landing pages (/hizmetler/<slug>) are SectorPage rows rendered with the
// city layout. Each city has its own thin page.tsx so the route stays static;
// the slugs are listed in cityLandingSlugs (src/lib/publication.ts). The
// English version lives at /en/services/<slug_en> and is only served once the
// row's English fields are complete.

async function getPage(slug: string) {
    return prisma.sectorPage.findUnique({ where: { slug } });
}

type CityLang = "tr" | "en";

export async function cityMetadata(slug: string, lang: CityLang = "tr"): Promise<Metadata> {
    const page = await getPage(slug);
    if (!page) return {};

    if (lang === "en") {
        if (!isEnglishSectorPagePublishable(page)) return { robots: { index: false, follow: false } };
        const title = page.metaTitle_en!;
        const description = page.metaDescription_en!;
        const image = page.ogImage || `${siteConfig.url}/og`;
        const url = `${siteConfig.url}/en/services/${page.slug_en}`;
        const trUrl = `${siteConfig.url}/hizmetler/${slug}`;
        return {
            title,
            description,
            keywords: page.metaKeywords_en?.split(",").map((k) => k.trim()),
            openGraph: { title, description, url, siteName: siteConfig.name, images: [{ url: image, width: 1200, height: 630 }], locale: "en_US", type: "website" },
            twitter: { card: "summary_large_image", title, description, images: [image] },
            alternates: { canonical: url, languages: { "x-default": trUrl, tr: trUrl, en: url } },
        };
    }

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

export async function CityPage({ slug, lang = "tr" }: { slug: string; lang?: CityLang }) {
    const page = await getPage(slug);
    if (!page || !page.published) notFound();
    const en = lang === "en";
    if (en && !isEnglishSectorPagePublishable(page)) notFound();

    const images = page.images ? JSON.parse(page.images) : [];
    const districtsJson = en ? page.districts_en : page.districts;
    const faqJson = en ? page.faq_en : page.faq;
    const districts = districtsJson ? JSON.parse(districtsJson) : [];
    const faq: { q: string; a: string }[] = faqJson ? JSON.parse(faqJson) : [];
    const enUrl = isEnglishSectorPagePublishable(page) ? `/en/services/${page.slug_en}` : "/en";
    const pageUrl = en ? `${siteConfig.url}${enUrl}` : `${siteConfig.url}/hizmetler/${slug}`;

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
            { "@type": "ListItem", position: 1, name: en ? "Home" : "Ana Sayfa", item: en ? `${siteConfig.url}/en` : siteConfig.url },
            { "@type": "ListItem", position: 2, name: en ? "Services" : "Hizmetler", item: en ? `${siteConfig.url}/en/services` : `${siteConfig.url}/hizmetler` },
            { "@type": "ListItem", position: 3, name: (en ? page.h1_en : page.h1) || page.title, item: pageUrl },
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
                lang={lang}
                trUrl={`/hizmetler/${slug}`}
                enUrl={enUrl}
            />
        </>
    );
}
