import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/site";
import { cloudinaryOgImage } from "@/lib/cloudinary";
import { cache } from "react";
import ServiceDetailClient from "../../../hizmetler/[category]/[service]/ServiceDetailClient";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import { isEnglishServicePublishable } from "@/lib/publication";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ service: string }>;
}

const getSaleServiceBySlugEn = cache(async (slugEn: string) => {
    return await prisma.service.findFirst({
        where: { slug_en: slugEn, type: "SALE" },
        include: { category: true },
    });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service: serviceSlugEn } = await params;
    const service = await getSaleServiceBySlugEn(serviceSlugEn);
    if (!service || !isEnglishServicePublishable(service, service.category)) return { robots: { index: false, follow: false } };

    const title = service.metaTitle_en!;
    const description = service.metaDescription_en!;
    const keywords = service.metaKeywords_en || "";
    const image = cloudinaryOgImage(service.ogImage || service.image) || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/en/products/${serviceSlugEn}`;

    return {
        title,
        description,
        keywords: keywords.split(",").map((k) => k.trim()),
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630, alt: service.title_en! }],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/urunler/${service.slug}`,
                "tr": `${siteConfig.url}/urunler/${service.slug}`,
                "en": url,
            },
        },
    };
}

export default async function EnglishProductDetailPage({ params }: PageProps) {
    const { service: serviceSlugEn } = await params;

    const service = await getSaleServiceBySlugEn(serviceSlugEn);
    if (!service || !isEnglishServicePublishable(service, service.category)) {
        notFound();
    }

    const categoryData = service.category;

    const gallery: { url: string; alt: string }[] = service.gallery
        ? (JSON.parse(service.gallery) as (string | { url: string; alt?: string })[]).map(
              (item) =>
                  typeof item === "string"
                      ? { url: item, alt: service.title_en || service.title }
                      : { url: item.url, alt: item.alt || service.title_en || service.title }
          )
        : [];

    const relatedServices = await prisma.service.findMany({
        where: {
            id: { not: service.id },
            type: "SALE",
            published: true,
        },
        take: 4,
    });

    const serviceSchema = generateServiceSchema({
        name: service.title_en!,
        description: service.description_en || "",
        url: `${siteConfig.url}/en/products/${serviceSlugEn}`,
        image: service.image || undefined,
        category: categoryData.name_en || categoryData.name,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: `${siteConfig.url}/en` },
        { name: "Product Sales", url: `${siteConfig.url}/en/products` },
        { name: service.title_en!, url: `${siteConfig.url}/en/products/${serviceSlugEn}` },
    ]);

    const faqSchema = service.faq_en ? (() => {
        const items: { q: string; a: string }[] = JSON.parse(service.faq_en!);
        if (!items.length) return null;
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": items.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
        };
    })() : null;

    const youtubeIdMatch = service.video?.match(
        /youtube\.com\/(?:watch\?v=|shorts\/|embed\/)([^?&/]+)|youtu\.be\/([^?&/]+)/
    );
    const youtubeId = youtubeIdMatch ? (youtubeIdMatch[1] || youtubeIdMatch[2]) : null;
    const videoSchema = youtubeId ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": service.title_en!,
        "description": service.metaDescription_en || service.description_en || service.title_en!,
        "thumbnailUrl": `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        "embedUrl": `https://www.youtube.com/embed/${youtubeId}`,
        "contentUrl": `https://www.youtube.com/watch?v=${youtubeId}`,
        "uploadDate": service.createdAt.toISOString().split("T")[0],
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {videoSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
                />
            )}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <AdminEditUrlSetter url={`/editpanel/services/${service.id}/edit`} />
            <ServiceDetailClient
                service={service}
                categoryData={categoryData}
                relatedServices={relatedServices}
                gallery={gallery}
                serviceSchema={serviceSchema}
                category={categoryData.slug}
                variant="sale"
            />
        </>
    );
}
