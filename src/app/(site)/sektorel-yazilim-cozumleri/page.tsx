import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import SektorelYazilimClient from "./SektorelYazilimClient";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Sektörel Yazılım Çözümleri ve Dijital Dönüşüm | MetasoftCo",
    description:
        "Tekstil, sağlık, gıda, otomotiv, perakende, finans ve teknoloji sektörlerine özel interaktif etkinlik teknolojileri ve yazılım çözümleri. MetasoftCo sektörünüzü anlıyor.",
    keywords: [
        "sektörel yazılım çözümleri",
        "dijital dönüşüm",
        "sektöre özel etkinlik teknolojisi",
        "interaktif etkinlik çözümleri",
        "marka aktivasyonu çözümleri türkiye",
    ],
    openGraph: {
        title: "Sektörel Yazılım Çözümleri ve Dijital Dönüşüm | MetasoftCo",
        description: "Sektörünüze özel interaktif etkinlik ve yazılım çözümleri.",
        url: `${siteConfig.url}/sektorel-yazilim-cozumleri`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Sektörel+Yazılım+Çözümleri&desc=Dijital+dönüşüm+ve+etkinlik+teknolojileri`, width: 1200, height: 630 }],
        locale: siteConfig.locale,
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/sektorel-yazilim-cozumleri`,
        languages: {
            "x-default": `${siteConfig.url}/sektorel-yazilim-cozumleri`,
            "tr": `${siteConfig.url}/sektorel-yazilim-cozumleri`,
            "en": `${siteConfig.url}/en/industry-software-solutions`,
        },
    },
};

export default function CozumlerPage() {
    return <SektorelYazilimClient />;
}
