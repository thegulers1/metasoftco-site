import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import CityLandingClient from "@/components/site/CityLandingClient";

export const revalidate = 3600;

const SLUG = "istanbul-ai-photobooth";

async function getPage() {
    return prisma.sectorPage.findUnique({ where: { slug: SLUG } });
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage();
    if (!page) return {};

    const title = page.metaTitle || page.h1 || page.title;
    const description = page.metaDescription || page.excerpt || siteConfig.description;
    const image = page.ogImage || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/hizmetler/${SLUG}`;
    const enUrl = page.slug_en ? `${siteConfig.url}/en/services/${page.slug_en}` : undefined;

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

export default async function IstanbulAiPhotoboothPage() {
    const page = await getPage();
    if (!page || !page.published) notFound();

    const images = page.images ? JSON.parse(page.images) : [];
    const districts = page.districts ? JSON.parse(page.districts) : [];
    const faq: { q: string; a: string }[] = page.faq ? JSON.parse(page.faq) : [];
    const enUrl = page.slug_en ? `/en/services/${page.slug_en}` : "/en";

    const serviceIds: string[] = page.serviceIds ? JSON.parse(page.serviceIds) : [];
    const relatedServices = serviceIds.length > 0
        ? await prisma.service.findMany({
            where: { id: { in: serviceIds } },
            include: { category: true },
          })
        : [];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${siteConfig.url}/hizmetler` },
            { "@type": "ListItem", position: 3, name: page.h1 || page.title, item: `${siteConfig.url}/hizmetler/${SLUG}` },
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
        <div className="min-h-screen bg-white pt-32 pb-20">
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
                trUrl={`/hizmetler/${SLUG}`}
                enUrl={enUrl}
            />
        </div>
    );
}
