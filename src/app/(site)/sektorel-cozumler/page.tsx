import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, ogImageUrl } from "@/lib/site";
import SektorelCozumlerClient from "./SektorelCozumlerClient";

export const revalidate = 3600;

const ogTitle = "Sektörel Çözümler | Moda, Finans, Otomotiv & Daha Fazlası — MetasoftCo";
const ogDescription = "Sektörünüze özel interaktif aktivasyon ve yapay zeka etkinlik çözümleri. Moda'dan otomotive, finanstan perakendeye.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Sektörel Çözümler | Moda, Finans, Otomotiv & Daha Fazlası — MetasoftCo",
    description: "Tekstil, sağlık, finans, otomotiv ve perakende sektörlerine özel interaktif aktivasyon ve yapay zeka etkinlik çözümleri. MetasoftCo, sektörünüzü anlayan ajans.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/sektorel-cozumler`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
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
