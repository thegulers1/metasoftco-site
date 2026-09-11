import { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";
import AboutPrototype from "@/components/phase2/AboutPrototype";

const ogTitle = "Hakkımızda | MetasoftCo — İstanbul Dijital Deneyim & Aktivasyon Ajansı";
const ogDescription = "5 yılda 1.000+ etkinlik, 100+ marka. Teknolojiyi sahneye çıkaran İstanbul merkezli ajans.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Hakkımızda | MetasoftCo — İstanbul Dijital Deneyim & Aktivasyon Ajansı",
    description: "5 yılda 1.000+ etkinlik, 100+ marka. MetasoftCo; Stable Diffusion, AR ve interaktif teknolojilerle İstanbul merkezli uçtan uca dijital deneyim ajansıdır.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/hakkimizda`,
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
        canonical: `${siteConfig.url}/hakkimizda`,
        languages: { "x-default": `${siteConfig.url}/hakkimizda`, tr: `${siteConfig.url}/hakkimizda`, en: `${siteConfig.url}/en/hakkimizda` },
    },
};

export default function HakkimizdaPage() {
    return <AboutPrototype locale="tr" />;
}
