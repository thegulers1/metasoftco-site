import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, ogImageUrl } from "@/lib/site";
import { getOccasion } from "@/lib/occasions";
import { serviceListingImage, shortServiceTitle } from "@/lib/service-listing";
import OccasionLanding from "@/components/phase2/OccasionLanding";

// Occasion landing pages (/hizmetler/<slug>): content in src/lib/occasions.ts,
// services and projects resolved from the database by slug at request time.
// Each occasion has its own thin page.tsx so the route stays static.

export function occasionMetadata(slug: string): Metadata {
    const occasion = getOccasion(slug);
    if (!occasion) return {};
    const url = `${siteConfig.url}/hizmetler/${slug}`;
    const image = ogImageUrl(occasion.h1, occasion.lede);
    return {
        title: occasion.metaTitle,
        description: occasion.metaDescription,
        keywords: occasion.keywords,
        openGraph: { title: occasion.metaTitle, description: occasion.metaDescription, url, siteName: siteConfig.name, images: [{ url: image, width: 1200, height: 630 }], locale: "tr_TR", type: "website" },
        twitter: { card: "summary_large_image", title: occasion.metaTitle, description: occasion.metaDescription, images: [image] },
        alternates: { canonical: url },
    };
}

export async function OccasionPage({ slug }: { slug: string }) {
    const occasion = getOccasion(slug);
    if (!occasion) notFound();

    const slugs = occasion.services.map((service) => service.slug);
    const [serviceRows, projectRows] = await Promise.all([
        prisma.service.findMany({
            where: { slug: { in: slugs }, published: true, type: "RENTAL" },
            include: { category: true },
        }),
        occasion.projectSlugs.length
            ? prisma.project.findMany({ where: { slug: { in: occasion.projectSlugs }, published: true } })
            : Promise.resolve([]),
    ]);

    // Keep the curated order from the config; a missing slug is skipped.
    const services = occasion.services.flatMap((item) => {
        const row = serviceRows.find((service) => service.slug === item.slug);
        if (!row) return [];
        return [{
            key: row.id,
            href: `/hizmetler/${row.category.slug}/${row.slug}`,
            name: shortServiceTitle(row.title, row.homeTitle),
            why: item.why,
            image: serviceListingImage(row),
        }];
    });
    const projects = occasion.projectSlugs.flatMap((projectSlug) => {
        const row = projectRows.find((project) => project.slug === projectSlug);
        if (!row) return [];
        return [{ key: row.id, href: `/projeler/${row.slug}`, name: row.title, client: row.client, image: row.image }];
    });

    const url = `${siteConfig.url}/hizmetler/${slug}`;
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Kiralama", item: `${siteConfig.url}/hizmetler` },
            { "@type": "ListItem", position: 3, name: occasion.name, item: url },
        ],
    };
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: occasion.faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {occasion.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
            <OccasionLanding occasion={occasion} services={services} projects={projects} />
        </>
    );
}
