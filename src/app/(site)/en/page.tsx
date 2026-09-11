import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, ogImageUrl } from "@/lib/site";
import { isEnglishProjectPublishable } from "@/lib/publication";
import HomePrototype from "@/components/phase2/HomePrototype";

export const revalidate = 3600;

const pageTitle = "AI Event Activations & Experiential Technology | MetasoftCo";
const pageDescription = "AI-powered photo, video, games and interactive installations for brands and agencies—from creative concept and software to on-site production.";
const ogImage = ogImageUrl(pageTitle, pageDescription);

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${siteConfig.url}/en`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: pageTitle }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: [ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/en`,
        languages: { "x-default": siteConfig.url, tr: siteConfig.url, en: `${siteConfig.url}/en` },
    },
};

/**
 * The three homepage services are selected by their English slug because
 * that value is stable across both locales; each locale then links through
 * its own category and service slugs.
 */
const featuredServiceSlugs = [
    "aura-photobooth-rental-real-time-aura-photography-with-biofeedback-sensors",
    "ai-photobooth",
    "photobooth-rental",
];

const getPrototypeProjects = unstable_cache(
    () => prisma.project.findMany({
        where: { published: true, featured: true },
        orderBy: { order: "asc" },
        take: 10, // fetched before the EN-publishable filter below, so 3 EN-ready ones can still be found
        select: {
            slug: true,
            slug_en: true,
            title_en: true,
            description_en: true,
            content_en: true,
            metaTitle_en: true,
            metaDescription_en: true,
            image: true,
            category: true,
        },
    }),
    ["phase-2-home-projects"],
    { revalidate: 3600 }
);

const getPrototypeServices = unstable_cache(
    () => prisma.service.findMany({
        where: { published: true, slug_en: { in: featuredServiceSlugs } },
        select: {
            slug: true,
            slug_en: true,
            title: true,
            title_en: true,
            homeTitle: true,
            homeTitle_en: true,
            description: true,
            description_en: true,
            image: true,
            category: { select: { slug: true, slug_en: true } },
        },
    }),
    ["phase-2-home-services"],
    { revalidate: 3600 }
);

export default async function EnglishHomePage() {
    const [projectRecords, serviceRecords] = await Promise.all([getPrototypeProjects(), getPrototypeServices()]);
    const projects = projectRecords
        .filter(isEnglishProjectPublishable)
        .slice(0, 3)
        .map((record) => ({
            key: record.slug_en!,
            slug: record.slug_en!,
            title: record.title_en,
            description: record.description_en,
            image: record.image,
        }));
    const services = featuredServiceSlugs
        .map((slug) => serviceRecords.find((record) => record.slug_en === slug))
        .filter((record): record is NonNullable<typeof record> => Boolean(record))
        .map((record) => ({
            key: record.slug_en!,
            categorySlug: record.category.slug_en || record.category.slug,
            slug: record.slug_en!,
            title: record.homeTitle_en || record.title_en || record.homeTitle || record.title,
            description: record.description_en || record.description,
            image: record.image,
        }));

    return <HomePrototype projects={projects} services={services} locale="en" />;
}
