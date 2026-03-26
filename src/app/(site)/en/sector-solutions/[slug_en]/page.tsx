import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

import SectorPageClient from "../../../sektorel-cozumler/SectorPageClient";

export const revalidate = 60;

interface PageProps { params: Promise<{ slug_en: string }> }

async function getPage(slug_en: string) {
    return prisma.sectorPage.findUnique({ where: { slug_en } });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug_en } = await params;
    const page = await getPage(slug_en);
    if (!page) return {};

    const title = page.metaTitle_en || page.h1_en || page.metaTitle || page.h1 || page.title;
    const description = page.metaDescription_en || page.excerpt_en || page.metaDescription || page.excerpt || siteConfig.description;
    const image = page.ogImage || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/en/sector-solutions/${slug_en}`;
    const trUrl = `${siteConfig.url}/sektorel-cozumler/${page.slug}`;

    return {
        title,
        description,
        keywords: page.metaKeywords_en?.split(",").map((k) => k.trim()),
        openGraph: { title, description, url, siteName: siteConfig.name, images: [{ url: image, width: 1200, height: 630 }], locale: "en_US", type: "website" },
        twitter: { card: "summary_large_image", title, description, images: [image] },
        alternates: {
            canonical: url,
            languages: { "x-default": trUrl, tr: trUrl, en: url },
        },
    };
}

export default async function SectorPageEN({ params }: PageProps) {
    const { slug_en } = await params;
    const page = await getPage(slug_en);
    if (!page || !page.published) notFound();

    const images = page.images ? JSON.parse(page.images) : [];

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
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/en` },
            { "@type": "ListItem", position: 2, name: "Sector Solutions", item: `${siteConfig.url}/en` },
            { "@type": "ListItem", position: 3, name: page.h1_en || page.h1 || page.title, item: `${siteConfig.url}/en/sector-solutions/${slug_en}` },
        ],
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {page.customSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.customSchema }} />
            )}
            <SectorPageClient
                page={page}
                images={images}
                relatedServices={relatedServices}
                lang="en"
                trUrl={`/sektorel-cozumler/${page.slug}`}
                enUrl={`/en/sector-solutions/${slug_en}`}
            />
        </div>
    );
}
