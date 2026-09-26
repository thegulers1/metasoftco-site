import type { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";
import { getPresentationDeck } from "@/lib/presentation";
import SunumClient from "./SunumClient";

export const revalidate = 300;

const title = "Sunum 2026 | MetasoftCo Hizmet Sunumu (PDF)";
const description =
    "MetasoftCo'nun güncel hizmet sunumu: yapay zekâ, fotoğraf, interaktif oyun, video ve yazılım hizmetleri. İstediğiniz hizmetleri seçip sunumu PDF olarak indirin.";
const ogImage = ogImageUrl(title, description);

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/sunum` },
    openGraph: {
        title,
        description,
        url: `${siteConfig.url}/sunum`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
};

export default async function SunumPage() {
    const deck = await getPresentationDeck();
    return <SunumClient deck={deck} />;
}
