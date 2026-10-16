"use client";

import CityLandingClient from "@/components/site/CityLandingClient";

interface SectorImage { url: string; alt: string; }

interface RelatedService {
    id: string;
    title: string;
    title_en: string | null;
    slug: string;
    slug_en: string | null;
    image: string | null;
    category: { name: string; name_en: string | null; slug: string; slug_en: string | null } | null;
}

interface SectorPageClientProps {
    page: {
        title: string;
        slug: string;
        slug_en: string | null;
        h1: string | null;
        h1_en: string | null;
        excerpt: string | null;
        excerpt_en: string | null;
        content: string | null;
        content_en: string | null;
        customSchema: string | null;
    };
    images: SectorImage[];
    relatedServices: RelatedService[];
    lang: "tr" | "en";
    trUrl: string;
    enUrl: string;
}

/** Sector solution pages share the landing layout with the city pages. */
export default function SectorPageClient({ page, images, relatedServices, lang, trUrl, enUrl }: SectorPageClientProps) {
    return (
        <CityLandingClient
            page={page}
            images={images}
            districts={[]}
            faq={[]}
            relatedServices={relatedServices}
            lang={lang}
            trUrl={trUrl}
            enUrl={enUrl}
            parent={lang === "en" ? { href: "/en/sector-solutions", label: "SECTOR SOLUTIONS" } : { href: "/sektorel-cozumler", label: "SEKTÖREL ÇÖZÜMLER" }}
            kicker={lang === "en" ? "SECTOR SOLUTION" : "SEKTÖREL ÇÖZÜM"}
            location="sector_page"
        />
    );
}
