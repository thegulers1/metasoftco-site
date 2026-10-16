import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsBand, MsFaq, MsSectionHead, MsSteps, MsWords, type MsFaqItem } from "@/components/site-ms/parts";
import { MsCatalog, MsClock } from "@/components/site-ms/interactive";

/** A capability card already resolved to the active locale by the page. */
export interface P2CapabilityCard {
    id: string;
    title: string;
    image: string;
    href: string;
    categorySlug?: string;
}

/** A category filter tab, in display order. */
export interface P2CapabilityCategory {
    slug: string;
    name: string;
}

const t = {
    tr: {
        kicker: (n: number, k: number) => `(HİZMETLER) — ${n} DENEYİM · ${k} KATEGORİ`,
        city: "İSTANBUL",
        cta: "ETKİNLİĞİN İÇİN ÖNERİ AL ↗",
        count: "DENEYİM",
        view: { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" },
        processMeta: "UÇTAN UCA",
        faqTitle: "Sıkça sorulan sorular",
        faqAside: "Aradığınız cevap burada yoksa bize yazın; aynı gün dönüş yapalım.",
        faqCta: "SORUNUZU İLETİN ↗",
    },
    en: {
        kicker: (n: number, k: number) => `(SERVICES) — ${n} EXPERIENCES · ${k} CATEGORIES`,
        city: "ISTANBUL",
        cta: "GET IDEAS FOR YOUR EVENT ↗",
        count: "EXPERIENCES",
        view: { grid: "GRID", list: "LIST", view: "View", open: "VIEW" },
        processMeta: "END TO END",
        faqTitle: "Frequently asked questions",
        faqAside: "If your question is not answered here, write to us and we will reply the same day.",
        faqCta: "SEND YOUR QUESTION ↗",
    },
};

/** /hizmetler and /en/services — the "Hizmetler" design of October 2026. */
export default function CapabilitiesIndexPrototype({
    capabilities,
    categories,
    locale,
    faqs = [],
}: {
    capabilities: P2CapabilityCard[];
    categories?: P2CapabilityCategory[];
    locale: Phase2Locale;
    faqs?: MsFaqItem[];
}) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.capabilities;
    const l = t[locale];
    const nameOf = new Map((categories ?? []).map((category) => [category.slug, category.name]));
    const items = capabilities.map((capability) => ({
        key: capability.id,
        href: capability.href,
        name: capability.title,
        cat: capability.categorySlug ? nameOf.get(capability.categorySlug) : undefined,
        image: capability.image,
    }));

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{l.kicker(capabilities.length, categories?.length ?? 0)}</span>
                    <MsClock label={l.city} />
                </div>
                <h1 className="ms-h1" aria-label={copy.heroLabel}>
                    <MsWords text={`${copy.heroSolid}\n${copy.heroOutline}`} accent={[copy.heroSolid.split(/\s+/).length]} />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 620 }}>{copy.heroCopy}</p>
                    <Link href={dictionary.routes.contact} className="ms-pill ms-pill--acc" data-cursor={l.view.open}>{l.cta}</Link>
                </div>
            </section>

            {categories && categories.length > 0 && <MsBand words={categories.map((category) => category.name)} />}

            <section aria-label={copy.catalogAria}>
                <MsCatalog
                    items={items}
                    allLabel={copy.filterAll}
                    countLabel={l.count}
                    labels={l.view}
                />
            </section>

            <section className="ms-section" aria-labelledby="ms-process-title">
                <MsSectionHead id="ms-process-title" title={copy.endToEndTitle.replace(/\n/g, " ")} meta={l.processMeta} />
                <MsSteps steps={copy.process.map((step) => ({ title: step.title, copy: step.copy }))} />
            </section>

            {faqs.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-faq-title">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-faq-title" className="ms-h2">{l.faqTitle}<span className="ms-acc">.</span></h2>
                        <p>{l.faqAside}</p>
                        <Link href={dictionary.routes.contact} className="ms-pill ms-pill--line">{l.faqCta}</Link>
                    </div>
                    <MsFaq items={faqs} />
                </section>
            )}
        </div>
    );
}
