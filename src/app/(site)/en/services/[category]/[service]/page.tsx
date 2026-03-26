import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/site";
import { cache } from "react";
import ServiceDetailClient from "@/app/(site)/hizmetler/[category]/[service]/ServiceDetailClient";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";

export const dynamic = "force-dynamic";

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
    const image = service.ogImage || service.image || `${siteConfig.url}/og`;
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

    const gallery: string[] = service.gallery ? JSON.parse(service.gallery) : [];

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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
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
