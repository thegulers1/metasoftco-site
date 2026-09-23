import { cache } from "react";
import type { IndustryPage } from "@prisma/client";
import { prisma } from "@/lib/db";

// Sector pages (/sektorel-yazilim-cozumleri, /en/industry-software-solutions)
// are editor-managed rows; this module turns a row into the shape the pages render.

export interface IndustryService {
    name: string;
    desc: string;
    href: string;
}

export interface IndustryFaq {
    question: string;
    answer: string;
}

export interface Sector {
    slug: string;
    slug_en: string | null;
    name: string;
    name_en: string;
    title: string;
    title_en: string;
    heroSubtitle: string;
    intro: string;
    intro_en: string;
    contentHtml: string;
    contentHtml_en: string;
    services: IndustryService[];
    services_en: IndustryService[];
    faqs: IndustryFaq[];
    faqs_en: IndustryFaq[];
    cta: string;
    cta_en: string;
    metaTitle: string;
    metaTitle_en: string;
    metaDescription: string;
    metaDescription_en: string;
    keywords: string[];
    keywords_en: string[];
    updatedAt: Date;
}

function parseList<T>(raw: string | null): T[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
        return [];
    }
}

const toKeywords = (raw: string | null) =>
    (raw ?? "").split(",").map((keyword) => keyword.trim()).filter(Boolean);

const toFaqs = (raw: string | null) =>
    parseList<{ q: string; a: string }>(raw)
        .filter((item) => item.q && item.a)
        .map((item) => ({ question: item.q, answer: item.a }));

function toSector(row: IndustryPage): Sector {
    return {
        slug: row.slug,
        slug_en: row.slug_en,
        name: row.name,
        name_en: row.name_en || row.name,
        title: row.title,
        title_en: row.title_en || row.title,
        heroSubtitle: row.heroSubtitle || row.intro || "",
        intro: row.intro || "",
        intro_en: row.intro_en || "",
        contentHtml: row.content || "",
        contentHtml_en: row.content_en || "",
        services: parseList<IndustryService>(row.services),
        services_en: parseList<IndustryService>(row.services_en),
        faqs: toFaqs(row.faq),
        faqs_en: toFaqs(row.faq_en),
        cta: row.cta || "",
        cta_en: row.cta_en || "",
        metaTitle: row.metaTitle || `${row.title} | MetasoftCo`,
        metaTitle_en: row.metaTitle_en || `${row.title_en || row.title} | MetasoftCo`,
        metaDescription: row.metaDescription || row.intro || "",
        metaDescription_en: row.metaDescription_en || row.intro_en || "",
        keywords: toKeywords(row.metaKeywords),
        keywords_en: toKeywords(row.metaKeywords_en),
        updatedAt: row.updatedAt,
    };
}

/** An English page exists only when the editor filled its slug and heading. */
export function hasEnglish(sector: Sector): sector is Sector & { slug_en: string } {
    return Boolean(sector.slug_en && sector.title_en && sector.intro_en);
}

export const getSectors = cache(async (): Promise<Sector[]> => {
    const rows = await prisma.industryPage.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return rows.map(toSector);
});

export const getSectorBySlug = cache(async (slug: string): Promise<Sector | null> => {
    const row = await prisma.industryPage.findFirst({ where: { slug, published: true } });
    return row ? toSector(row) : null;
});

export const getSectorBySlugEn = cache(async (slug: string): Promise<Sector | null> => {
    const row = await prisma.industryPage.findFirst({ where: { slug_en: slug, published: true } });
    const sector = row ? toSector(row) : null;
    return sector && hasEnglish(sector) ? sector : null;
});
