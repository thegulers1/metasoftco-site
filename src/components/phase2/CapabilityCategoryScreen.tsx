import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { addHeadingAnchors } from "@/lib/utils";
import { MsCrumbs, MsFacts, MsFaq, MsProse, MsSectionHead, MsWords } from "@/components/site-ms/parts";
import { MsCatalog, MsClock } from "@/components/site-ms/interactive";

/** A service card already resolved to the active locale by the page. */
export interface P2CategoryService {
    id: string;
    title: string;
    image: string | null;
    href: string;
}

export interface CapabilityCategoryScreenProps {
    locale: Phase2Locale;
    /** Category name, used for the breadcrumb tail and as the heading fallback. */
    name: string;
    /** Editor-supplied display heading; falls back to the category name. */
    heroTitle?: string | null;
    heroCopy?: string | null;
    /** Editor-authored long-form HTML (H2/H3 + lists), rendered below the service list. */
    contentHtml?: string | null;
    services: P2CategoryService[];
    faqs: { question: string; answer: string }[];
    /** ISO date string; rendered as a freshness signal next to the hero copy. */
    updatedAt?: string | null;
    /** Replaces the event-toned facts strip and closing CTA (e.g. the software category). */
    overrides?: Partial<Pick<ReturnType<typeof phase2Copy>["capabilityCategory"], "facts" | "ctaSolid" | "ctaOutline" | "ctaButton">>;
}

const t = {
    tr: { kicker: (n: number) => `(KATEGORİ) — ${n} DENEYİM`, city: "İSTANBUL", count: "DENEYİM", view: { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" }, aboutMeta: "KATEGORİ HAKKINDA", faqAside: "Aradığınız cevap burada yoksa bize yazın; aynı gün dönüş yapalım.", updated: "Son güncelleme", write: "YAZ" },
    en: { kicker: (n: number) => `(CATEGORY) — ${n} EXPERIENCES`, city: "ISTANBUL", count: "EXPERIENCES", view: { grid: "GRID", list: "LIST", view: "View", open: "VIEW" }, aboutMeta: "ABOUT THE CATEGORY", faqAside: "If your question is not answered here, write to us and we will reply the same day.", updated: "Last updated", write: "WRITE" },
};

/** /hizmetler/[category] and /en/services/[category], in the "Hizmetler" design. */
export default function CapabilityCategoryScreen({
    locale,
    name,
    heroTitle,
    heroCopy,
    contentHtml,
    services,
    faqs,
    updatedAt,
    overrides,
}: CapabilityCategoryScreenProps) {
    const formattedUpdatedAt = updatedAt
        ? new Date(updatedAt).toLocaleDateString(locale === "en" ? "en-GB" : "tr-TR", { year: "numeric", month: "long", day: "numeric" })
        : null;
    const dictionary = phase2Copy(locale);
    const copy = { ...dictionary.capabilityCategory, ...overrides };
    const l = t[locale];
    const title = heroTitle?.trim() || name;
    const up = (text: string) => text.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <MsCrumbs items={[
                        { href: dictionary.routes.home, label: up(copy.crumbHome) },
                        { href: dictionary.routes.capabilities, label: up(copy.crumbCapabilities) },
                        { label: name },
                    ]} />
                    <MsClock label={l.city} />
                </div>
                <h1 className={`ms-h1${title.length > 28 ? " ms-h1--long" : ""}`} aria-label={title}>
                    <MsWords text={title} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
                        {heroCopy && <p className="ms-lede" data-reveal>{heroCopy}</p>}
                        {formattedUpdatedAt && <p className="ms-updated ms-mono">{l.updated}: {formattedUpdatedAt}</p>}
                    </div>
                    <Link href={dictionary.routes.contact} className="ms-pill ms-pill--acc" data-cursor={l.write}>{up(copy.ctaButton)} ↗</Link>
                </div>
                <MsFacts facts={copy.facts.map((fact) => ({ term: fact.term, value: fact.value ?? String(services.length) }))} />
            </section>

            {services.length > 0 && (
                <section aria-label={copy.catalogAria}>
                    <h2 className="ms-sr">{copy.catalogTitle}</h2>
                    <MsCatalog
                        itemHeading="h3"
                        items={services.map((service) => ({ key: service.id, href: service.href, name: service.title, image: service.image }))}
                        allLabel=""
                        countLabel={l.count}
                        labels={l.view}
                        showChips={false}
                    />
                </section>
            )}

            {contentHtml && (
                <section className="ms-section" aria-labelledby="ms-cat-about">
                    <MsSectionHead id="ms-cat-about" title={copy.aboutTitle} meta={l.aboutMeta} />
                    <div data-reveal><MsProse html={addHeadingAnchors(contentHtml.replace(/&nbsp;/g, " "))} /></div>
                </section>
            )}

            {faqs.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-cat-faq">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-cat-faq" className="ms-h2">{copy.faqTitle}<span className="ms-acc">.</span></h2>
                        <p>{l.faqAside}</p>
                    </div>
                    <MsFaq items={faqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
                </section>
            )}
        </div>
    );
}
