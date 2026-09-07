import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/site";
import { cloudinaryOgImage } from "@/lib/cloudinary";
import { cache } from "react";
import ServiceDetailClient from "../../hizmetler/[category]/[service]/ServiceDetailClient";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ service: string }>;
}

const getSaleServiceBySlug = cache(async (slug: string) => {
    return await prisma.service.findFirst({
        where: { slug, type: "SALE" },
        include: { category: true },
    });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service: serviceSlug } = await params;
    const service = await getSaleServiceBySlug(serviceSlug);
    if (!service) return {};

    const title = service.metaTitle || `${service.title} | Sistem Satışı — MetasoftCo`;
    const description = service.metaDescription || service.description || siteConfig.description;
    const keywords = service.metaKeywords || "";
    const image = cloudinaryOgImage(service.ogImage || service.image) || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/urunler/${serviceSlug}`;

    return {
        title,
        description,
        keywords: keywords.split(",").map((k) => k.trim()),
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630, alt: service.title }],
            locale: siteConfig.locale,
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
        },
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { service: serviceSlug } = await params;

    const service = await getSaleServiceBySlug(serviceSlug);
    if (!service) {
        notFound();
    }

    const categoryData = service.category;

    const gallery: { url: string; alt: string }[] = service.gallery
        ? (JSON.parse(service.gallery) as (string | { url: string; alt?: string })[]).map(
              (item) =>
                  typeof item === "string"
                      ? { url: item, alt: service.title }
                      : { url: item.url, alt: item.alt || service.title }
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
        name: service.title,
        description: service.description || "",
        url: `${siteConfig.url}/urunler/${serviceSlug}`,
        image: service.image || undefined,
        category: categoryData.name,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Ürünler", url: `${siteConfig.url}/urunler` },
        { name: service.title, url: `${siteConfig.url}/urunler/${serviceSlug}` },
    ]);

    const faqSchema = service.faq ? (() => {
        const items: { q: string; a: string }[] = JSON.parse(service.faq);
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
        "name": service.title,
        "description": service.metaDescription || service.description || service.title,
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
