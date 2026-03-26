import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import SektorelCozumlerClient from "./SektorelCozumlerClient";

export const dynamic = "force-dynamic";

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

async function getSectorPages() {
    return prisma.sectorPage.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
            id: true,
            title: true,
            slug: true,
            h1: true,
            excerpt: true,
            ogImage: true,
        },
    });
}

export default async function SektorelCozumlerPage() {
    const pages = await getSectorPages();
    return <SektorelCozumlerClient pages={pages} />;
}
