import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/site";
import { cloudinaryOgImage } from "@/lib/cloudinary";
import Link from "next/link";
import Image from "next/image";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import { cache } from "react";
import ServiceDetailClient from "./ServiceDetailClient";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{
        category: string;
        service: string;
    }>;
}

const getCategoryBySlug = cache(async (slug: string) => {
    return await prisma.serviceCategory.findUnique({
        where: { slug },
    });
});

const getServiceBySlug = cache(async (slug: string, categoryId: string) => {
    return await prisma.service.findFirst({
        where: {
            slug,
            categoryId,
        },
    });
});

// Dinamik metadata oluştur
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, service: serviceSlug } = await params;

    const categoryData = await getCategoryBySlug(category);
    if (!categoryData) return {};

    const service = await getServiceBySlug(serviceSlug, categoryData.id);
    if (!service) return {};

    const title = service.metaTitle || `${service.title} | ${categoryData.name}`;
    const description = service.metaDescription || service.description || siteConfig.description;
    const keywords = service.metaKeywords || "";
    const image = cloudinaryOgImage(service.ogImage || service.image) || `${siteConfig.url}/og-image.jpg`;
    const url = `${siteConfig.url}/hizmetler/${category}/${serviceSlug}`;

    return {
        title,
        description,
        keywords: keywords.split(",").map((k) => k.trim()),
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
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
            ...(service.slug_en && categoryData.slug_en && {
                languages: {
                    "x-default": url,
                    "tr": url,
                    "en": `${siteConfig.url}/en/services/${categoryData.slug_en}/${service.slug_en}`,
                },
            }),
        },
    };
}


export default async function ServiceDetailPage({ params }: PageProps) {
    const { category, service: serviceSlug } = await params;

    const categoryData = await getCategoryBySlug(category);
    if (!categoryData) {
        notFound();
    }

    const service = await getServiceBySlug(serviceSlug, categoryData.id);
    if (!service) {
        notFound();
    }

    // Galeri parse et (eski string[] formatını ve yeni {url,alt}[] formatını destekle)
    const gallery: { url: string; alt: string }[] = service.gallery
        ? (JSON.parse(service.gallery) as (string | { url: string; alt?: string })[]).map(
              (item) =>
                  typeof item === "string"
                      ? { url: item, alt: service.title }
                      : { url: item.url, alt: item.alt || service.title }
          )
        : [];

    // Aynı kategorideki diğer hizmetler
    const relatedServices = await prisma.service.findMany({
        where: {
            categoryId: categoryData.id,
            id: { not: service.id },
        },
        take: 4,
    });

    // JSON-LD structured data
    const serviceSchema = generateServiceSchema({
        name: service.title,
        description: service.description || "",
        url: `${siteConfig.url}/hizmetler/${category}/${serviceSlug}`,
        image: service.image || undefined,
        category: categoryData.name,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
        { name: categoryData.name, url: `${siteConfig.url}/hizmetler/${category}` },
        { name: service.title, url: `${siteConfig.url}/hizmetler/${category}/${serviceSlug}` },
    ]);

    // VideoObject schema — YouTube URL varsa ekle
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
        "uploadDate": new Date().toISOString().split("T")[0],
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
            <AdminEditUrlSetter url={`/editpanel/services/${service.id}/edit`} />
            <ServiceDetailClient
                service={service}
                categoryData={categoryData}
                relatedServices={relatedServices}
                gallery={gallery}
                serviceSchema={serviceSchema}
                category={category}
            />
        </>
    );
}
