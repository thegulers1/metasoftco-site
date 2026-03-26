import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import SectorPageClient from "../SectorPageClient";

export const dynamic = "force-dynamic";

interface PageProps { params: Promise<{ slug: string }> }

async function getPage(slug: string) {
    return prisma.sectorPage.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPage(slug);
    if (!page) return {};

    const title = page.metaTitle || page.h1 || page.title;
    const description = page.metaDescription || page.excerpt || siteConfig.description;
    const image = page.ogImage || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/sektorel-cozumler/${slug}`;
    const enUrl = page.slug_en ? `${siteConfig.url}/en/sector-solutions/${page.slug_en}` : undefined;

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

export default async function SectorPageTR({ params }: PageProps) {
    const { slug } = await params;
    const page = await getPage(slug);
    if (!page || !page.published) notFound();

    const images = page.images ? JSON.parse(page.images) : [];
    const enUrl = page.slug_en ? `/en/sector-solutions/${page.slug_en}` : "/en";

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
            { "@type": "ListItem", position: 2, name: "Sektörel Çözümler", item: `${siteConfig.url}/sektorel-cozumler` },
            { "@type": "ListItem", position: 3, name: page.h1 || page.title, item: `${siteConfig.url}/sektorel-cozumler/${slug}` },
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
                lang="tr"
                trUrl={`/sektorel-cozumler/${slug}`}
                enUrl={enUrl}
            />
        </div>
    );
}
