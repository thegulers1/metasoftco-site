import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import SektorelCozumlerClient from "../../sektorel-cozumler/SektorelCozumlerClient";

export const dynamic = "force-dynamic";

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

const getSectorPages = unstable_cache(
    async () => prisma.sectorPage.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: { id: true, title: true, slug: true, slug_en: true, h1: true, h1_en: true, excerpt: true, excerpt_en: true, ogImage: true },
    }),
    ["sector-pages-en"],
    { revalidate: 60 }
);

export default async function SectorSolutionsEN() {
    const pages = await getSectorPages();
    
    // Map to English versions
    const enPages = pages.map((page: any) => ({
        id: page.id,
        title: page.title,
        slug: page.slug_en || page.slug,
        h1: page.h1_en || page.h1,
        excerpt: page.excerpt_en || page.excerpt,
        ogImage: page.ogImage,
    }));

    return <SektorelCozumlerClient pages={enPages} lang="en" />;
}
