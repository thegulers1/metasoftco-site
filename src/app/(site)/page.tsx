import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import HomePrototype from "@/components/phase2/HomePrototype";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords.join(", "),
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: siteConfig.title }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og`],
        creator: siteConfig.social.twitter,
    },
    alternates: {
        canonical: siteConfig.url,
        languages: { "x-default": siteConfig.url, tr: siteConfig.url, en: `${siteConfig.url}/en` },
    },
};

/**
 * The three homepage hero projects are selected by their English slug because
 * that value is stable across both locales; each locale then links through its
 * own slug.
 */
const featuredSlugs = [
    "tavuk-dunyasi-x-ai-photo",
    "pegasus-airlines-digital-gift-wheel-activation",
    "ray-ban-x-strip-photo",
];

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
        where: { published: true, slug_en: { in: featuredSlugs } },
        select: { slug: true, slug_en: true, title: true, description: true, image: true },
    }),
    ["phase-2-home-projects-tr"],
    { revalidate: 3600 }
);

const getPrototypeServices = unstable_cache(
    () => prisma.service.findMany({
        where: { published: true, slug_en: { in: featuredServiceSlugs } },
        select: {
            slug: true,
            slug_en: true,
            title: true,
            homeTitle: true,
            description: true,
            image: true,
            category: { select: { slug: true } },
        },
    }),
    ["phase-2-home-services-tr"],
    { revalidate: 3600 }
);

export default async function HomePage() {
    const [projectRecords, serviceRecords] = await Promise.all([getPrototypeProjects(), getPrototypeServices()]);
    const projects = featuredSlugs
        .map((slug) => projectRecords.find((record) => record.slug_en === slug))
        .filter((record): record is NonNullable<typeof record> => Boolean(record))
        .map((record) => ({
            key: record.slug_en!,
            slug: record.slug,
            title: record.title,
            description: record.description,
            image: record.image,
        }));
    const services = featuredServiceSlugs
        .map((slug) => serviceRecords.find((record) => record.slug_en === slug))
        .filter((record): record is NonNullable<typeof record> => Boolean(record))
        .map((record) => ({
            key: record.slug_en!,
            categorySlug: record.category.slug,
            slug: record.slug,
            title: record.homeTitle || record.title,
            description: record.description,
            image: record.image,
        }));

    return <HomePrototype projects={projects} services={services} locale="tr" />;
}
