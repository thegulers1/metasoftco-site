import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import SektorelCozumlerClient from "./SektorelCozumlerClient";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Sektörel Çözümler | Moda, Finans, Otomotiv & Daha Fazlası — MetasoftCo",
    description: "Tekstil, sağlık, finans, otomotiv ve perakende sektörlerine özel interaktif aktivasyon ve yapay zeka etkinlik çözümleri. MetasoftCo, sektörünüzü anlayan ajans.",
    openGraph: {
        title: "Sektörel Çözümler | Moda, Finans, Otomotiv & Daha Fazlası — MetasoftCo",
        description: "Sektörünüze özel interaktif aktivasyon ve yapay zeka etkinlik çözümleri. Moda'dan otomotive, finanstan perakendeye.",
        url: `${siteConfig.url}/sektorel-cozumler`,
    },
    alternates: {
        canonical: `${siteConfig.url}/sektorel-cozumler`,
        languages: {
            "x-default": `${siteConfig.url}/sektorel-cozumler`,
            "tr": `${siteConfig.url}/sektorel-cozumler`,
            "en": `${siteConfig.url}/en/sector-solutions`,
        },
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
