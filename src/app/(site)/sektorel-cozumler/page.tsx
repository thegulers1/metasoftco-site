import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import SektorelCozumlerClient from "./SektorelCozumlerClient";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Sektörel Yazılım Çözümleri | MetasoftCo",
    description: "MetasoftCo'nun farklı sektörlere özel geliştirdiği interaktif dijital aktivasyon ve yazılım çözümleri.",
    openGraph: {
        title: "Sektörel Yazılım Çözümleri | MetasoftCo",
        description: "Farklı sektörlere özel dijital çözümler.",
        url: `${siteConfig.url}/sektorel-cozumler`,
    },
    alternates: {
        canonical: `${siteConfig.url}/sektorel-cozumler`,
    },
};

const getSectorPages = unstable_cache(
    async () => prisma.sectorPage.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: { id: true, title: true, slug: true, h1: true, excerpt: true, ogImage: true },
    }),
    ["sector-pages"],
    { revalidate: 60 }
);

export default async function SektorelCozumlerPage() {
    const pages = await getSectorPages();
    return <SektorelCozumlerClient pages={pages} />;
}
