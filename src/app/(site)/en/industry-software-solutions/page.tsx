import { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";
import SektorelYazilimClient from "@/app/(site)/sektorel-yazilim-cozumleri/SektorelYazilimClient";
import { getSectors, hasEnglish } from "@/lib/industry-pages";

export const revalidate = 3600;

const ogTitle = "Industry-Specific Software & Digital Transformation | MetasoftCo";
const ogDescription = "Interactive event and software solutions tailored for your industry.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Industry-Specific Software & Digital Transformation | MetasoftCo",
    description:
        "Interactive event technologies and software solutions tailored for textile, healthcare, food, automotive, retail, finance, and technology sectors.",
    keywords: [
        "industry software solutions",
        "digital transformation",
        "sector-specific event technology",
        "interactive event solutions",
        "brand activation solutions turkey",
    ],
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/en/industry-software-solutions`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/en/industry-software-solutions`,
        languages: {
            "x-default": `${siteConfig.url}/sektorel-yazilim-cozumleri`,
            tr: `${siteConfig.url}/sektorel-yazilim-cozumleri`,
            en: `${siteConfig.url}/en/industry-software-solutions`,
        },
    },
};

export default async function EnPage() {
    const sectors = (await getSectors()).filter(hasEnglish);
    return (
        <SektorelYazilimClient
            lang="en"
            sectors={sectors.map(({ slug, slug_en, name, name_en }) => ({ slug, slug_en, name, name_en }))}
        />
    );
}
