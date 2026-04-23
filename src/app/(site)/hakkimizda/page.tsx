import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "Hakkımızda | MetasoftCo — İstanbul Dijital Deneyim & Aktivasyon Ajansı",
    description: "5 yılda 1.000+ etkinlik, 100+ marka. MetasoftCo; Stable Diffusion, AR ve interaktif teknolojilerle İstanbul merkezli uçtan uca dijital deneyim ajansıdır.",
    openGraph: {
        title: "Hakkımızda | MetasoftCo — İstanbul Dijital Deneyim & Aktivasyon Ajansı",
        description: "5 yılda 1.000+ etkinlik, 100+ marka. Teknolojiyi sahneye çıkaran İstanbul merkezli ajans.",
        url: `${siteConfig.url}/hakkimizda`,
    },
    alternates: {
        canonical: `${siteConfig.url}/hakkimizda`,
        languages: { "x-default": `${siteConfig.url}/hakkimizda`, tr: `${siteConfig.url}/hakkimizda`, en: `${siteConfig.url}/en/hakkimizda` },
    },
};

export default function HakkimizdaPage() {
    return <AboutClient />;
}
