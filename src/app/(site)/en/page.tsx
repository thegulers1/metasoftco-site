import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { isEnglishProjectPublishable } from "@/lib/publication";
import HomePrototype from "@/components/phase2/HomePrototype";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "AI Event Activations & Experiential Technology | MetasoftCo",
    description: "AI-powered photo, video, games and interactive installations for brands and agencies—from creative concept and software to on-site production.",
    openGraph: {
        title: "AI Event Activations & Experiential Technology | MetasoftCo",
        description: "AI-powered photo, video, games and interactive installations for brands and agencies—from creative concept and software to on-site production.",
        url: `${siteConfig.url}/en`,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/en`,
        languages: { "x-default": siteConfig.url, tr: siteConfig.url, en: `${siteConfig.url}/en` },
    },
};

const featuredSlugs = [
    "tavuk-dunyasi-x-ai-photo",
    "pegasus-airlines-digital-gift-wheel-activation",
    "ray-ban-x-strip-photo",
];

const getPrototypeProjects = unstable_cache(
    () => prisma.project.findMany({
        where: { published: true, slug_en: { in: featuredSlugs } },
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

export default async function EnglishHomePage() {
    const records = (await getPrototypeProjects()).filter(isEnglishProjectPublishable);
    const projects = featuredSlugs
        .map((slug) => records.find((record) => record.slug_en === slug))
        .filter((record): record is NonNullable<typeof record> => Boolean(record))
        .map((record) => ({
            key: record.slug_en!,
            slug: record.slug_en!,
            title: record.title_en,
            description: record.description_en,
            image: record.image,
        }));

    return <HomePrototype projects={projects} locale="en" />;
}
