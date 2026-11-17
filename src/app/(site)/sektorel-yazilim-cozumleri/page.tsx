import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import SektorelYazilimClient from "./SektorelYazilimClient";
import { getSectors } from "@/lib/industry-pages";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Sektörel Etkinlik ve Marka Aktivasyonu Çözümleri | MetasoftCo",
    description:
        "Tekstil, sağlık, gıda, otomotiv, perakende, finans ve teknoloji sektörlerine özel interaktif etkinlik teknolojileri ve yazılım çözümleri. MetasoftCo sektörünüzü anlıyor.",
    keywords: [
        "sektörel etkinlik çözümleri",
        "sektörel marka aktivasyonu",
        "sektöre özel etkinlik teknolojisi",
        "interaktif etkinlik çözümleri",
        "marka aktivasyonu çözümleri türkiye",
    ],
    openGraph: {
        title: "Sektörel Etkinlik ve Marka Aktivasyonu Çözümleri | MetasoftCo",
        description: "Sektörünüze özel photobooth, interaktif oyun ve marka aktivasyonu çözümleri.",
        url: `${siteConfig.url}/sektorel-yazilim-cozumleri`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Sektörel+Etkinlik+Çözümleri&desc=Marka+aktivasyonu+ve+etkinlik+teknolojileri`, width: 1200, height: 630 }],
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

export default async function CozumlerPage() {
    const sectors = await getSectors();
    return (
        <SektorelYazilimClient
            sectors={sectors.map(({ slug, slug_en, name, name_en }) => ({ slug, slug_en, name, name_en }))}
        />
    );
}
