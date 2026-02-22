import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateServiceSchema } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import { cache } from "react";
import ServiceDetailClient from "./ServiceDetailClient";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";

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
    const image = service.ogImage || service.image || `${siteConfig.url}/og-image.jpg`;
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
        },
    };
}

// Statik sayfa oluşturma için paths
export async function generateStaticParams() {
    const categories = await prisma.serviceCategory.findMany({
        include: {
            services: true,
        },
    });

    const paths: { category: string; service: string }[] = [];

    for (const cat of categories) {
        for (const service of cat.services) {
            paths.push({
                category: cat.slug,
                service: service.slug,
            });
        }
    }

    return paths;
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

    // Galeri parse et
    const gallery: string[] = service.gallery ? JSON.parse(service.gallery) : [];

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

    return (
        <>
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
