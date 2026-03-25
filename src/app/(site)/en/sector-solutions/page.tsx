import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import SektorelCozumlerClient from "../../sektorel-cozumler/SektorelCozumlerClient";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Sector Software Solutions | MetasoftCo",
    description: "Interactive digital activation and software solutions specifically developed by MetasoftCo for different sectors.",
    openGraph: {
        title: "Sector Software Solutions | MetasoftCo",
        description: "Digital solutions tailored for different sectors.",
        url: `${siteConfig.url}/en/sector-solutions`,
        locale: "en_US",
    },
    alternates: {
        canonical: `${siteConfig.url}/en/sector-solutions`,
        languages: {
            "x-default": `${siteConfig.url}/sektorel-cozumler`,
            tr: `${siteConfig.url}/sektorel-cozumler`,
            en: `${siteConfig.url}/en/sector-solutions`,
        },
    },
};

async function getSectorPages() {
    return prisma.sectorPage.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
            id: true,
            title: true,
            title_en: true,
            slug: true,
            slug_en: true,
            h1: true,
            h1_en: true,
            excerpt: true,
            excerpt_en: true,
            ogImage: true,
        },
    });
}

export default async function SectorSolutionsEN() {
    const pages = await getSectorPages();
    
    // Map to English versions
    const enPages = pages.map((page: any) => ({
        id: page.id,
        title: page.title_en || page.title,
        slug: page.slug_en || page.slug,
        h1: page.h1_en || page.h1,
        excerpt: page.excerpt_en || page.excerpt,
        ogImage: page.ogImage,
    }));

    return <SektorelCozumlerClient pages={enPages} lang="en" />;
}
