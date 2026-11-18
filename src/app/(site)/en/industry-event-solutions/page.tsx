import { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";
import SektorelYazilimClient from "@/app/(site)/sektorel-etkinlik-cozumleri/SektorelYazilimClient";
import { getSectors, hasEnglish } from "@/lib/industry-pages";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

const ogTitle = "Industry Event & Brand Activation Solutions | MetasoftCo";
const ogDescription = "Photo booths, interactive games and brand activations tailored for your industry.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Industry Event & Brand Activation Solutions | MetasoftCo",
    description:
        "Interactive event technologies and software solutions tailored for textile, healthcare, food, automotive, retail, finance, and technology sectors.",
    keywords: [
        "industry event solutions",
        "industry brand activations",
        "sector-specific event technology",
        "interactive event solutions",
        "brand activation solutions turkey",
    ],
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/en/industry-event-solutions`,
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
        canonical: `${siteConfig.url}/en/industry-event-solutions`,
        languages: {
            "x-default": `${siteConfig.url}/sektorel-etkinlik-cozumleri`,
            tr: `${siteConfig.url}/sektorel-etkinlik-cozumleri`,
            en: `${siteConfig.url}/en/industry-event-solutions`,
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
