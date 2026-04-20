import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/site";
import { cloudinaryOgImage } from "@/lib/cloudinary";
import { cache } from "react";
import ServiceDetailClient from "@/app/(site)/hizmetler/[category]/[service]/ServiceDetailClient";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{
        category: string;
        service: string;
    }>;
}

const getCategoryBySlugEn = cache(async (slug_en: string) => {
    return await prisma.serviceCategory.findFirst({
        where: { slug_en },
    });
});

const getServiceBySlugEn = cache(async (slug_en: string, categoryId: string) => {
    return await prisma.service.findFirst({
        where: { slug_en, categoryId },
    });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, service: serviceSlug } = await params;

    const categoryData = await getCategoryBySlugEn(category);
    if (!categoryData) return {};

    const service = await getServiceBySlugEn(serviceSlug, categoryData.id);
    if (!service) return {};

    const title = service.metaTitle_en || service.metaTitle || `${service.title_en || service.title} | ${categoryData.name_en || categoryData.name}`;
    const description = service.metaDescription_en || service.metaDescription || service.description_en || service.description || siteConfig.description;
    const keywords = service.metaKeywords_en || service.metaKeywords || "";
    const image = cloudinaryOgImage(service.ogImage || service.image) || `${siteConfig.url}/og-image.jpg`;
    const url = `${siteConfig.url}/en/services/${category}/${serviceSlug}`;

    return {
        title,
        description,
        keywords: keywords.split(",").map((k) => k.trim()),
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630, alt: service.title_en || service.title }],
            locale: "en_US",
            type: "website",
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/hizmetler/${categoryData.slug}/${service.slug}`,
                "tr": `${siteConfig.url}/hizmetler/${categoryData.slug}/${service.slug}`,
                "en": url,
            },
        },
    };
}

export default async function EnglishServiceDetailPage({ params }: PageProps) {
    const { category, service: serviceSlug } = await params;

    const categoryData = await getCategoryBySlugEn(category);
    if (!categoryData) notFound();

    const service = await getServiceBySlugEn(serviceSlug, categoryData!.id);
    if (!service) notFound();

    // Galeri parse et (eski string[] formatını ve yeni {url,alt}[] formatını destekle)
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
            categoryId: categoryData!.id,
            id: { not: service.id },
        },
        take: 4,
    });

    const serviceSchema = generateServiceSchema({
        name: service.title_en || service.title,
        description: service.description_en || service.description || "",
        url: `${siteConfig.url}/en/services/${category}/${serviceSlug}`,
        image: service.image || undefined,
        category: categoryData!.name_en || categoryData!.name,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Services", url: `${siteConfig.url}/en/services` },
        { name: categoryData!.name_en || categoryData!.name, url: `${siteConfig.url}/en/services/${category}` },
        { name: service.title_en || service.title, url: `${siteConfig.url}/en/services/${category}/${serviceSlug}` },
    ]);

    const youtubeIdMatch = service.video?.match(
        /youtube\.com\/(?:watch\?v=|shorts\/|embed\/)([^?&/]+)|youtu\.be\/([^?&/]+)/
    );
    const youtubeId = youtubeIdMatch ? (youtubeIdMatch[1] || youtubeIdMatch[2]) : null;
    const videoSchema = youtubeId ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": service.title_en || service.title,
        "description": service.metaDescription_en || service.metaDescription || service.description_en || service.description || service.title,
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
                categoryData={categoryData!}
                relatedServices={relatedServices}
                gallery={gallery}
                serviceSchema={serviceSchema}
                category={category}
            />
        </>
    );
}
