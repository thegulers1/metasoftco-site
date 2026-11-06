import Link from "next/link";
import type { Occasion } from "@/lib/occasions";
import { MsCrumbs, MsFaq, MsSectionHead, MsSteps, MsWords } from "@/components/site-ms/parts";
import { MsCatalog, MsGallery } from "@/components/site-ms/interactive";

export interface OccasionServiceCard {
    key: string;
    href: string;
    name: string;
    why: string;
    image: string | null;
}

export interface OccasionProjectCard {
    key: string;
    href: string;
    name: string;
    client: string | null;
    image: string | null;
}

const labels = { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" };
const lightbox = { close: "KAPAT ×", prev: "← ÖNCEKİ", next: "SONRAKİ →" };

/** Contact link that arrives tagged with the occasion and, optionally, a product set. */
export function occasionQuoteHref(slug: string, products?: string[]) {
    const params = new URLSearchParams({ durum: slug });
    if (products?.length) params.set("urun", products.join(","));
    return `/iletisim?${params.toString()}`;
}

/**
 * Occasion landing page ("etkinlik türü"): hero, headcount tiers, the night's
 * flow, curated experiences, theme gallery, past projects, FAQ and a closing
 * quote. Content comes from src/lib/occasions.ts; services and projects are
 * resolved from the database by the route.
 */
export default function OccasionLanding({
    occasion,
    services,
    projects,
}: {
    occasion: Occasion;
    services: OccasionServiceCard[];
    projects: OccasionProjectCard[];
}) {
    const quote = occasionQuoteHref(occasion.slug);
    const themes = occasion.themes ?? [];

    return (
        <article className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <MsCrumbs items={[{ href: "/", label: "ANA SAYFA" }, { href: "/hizmetler", label: "KİRALAMA" }, { label: occasion.name.toLocaleUpperCase("tr-TR") }]} />
                </div>
                <h1 className="ms-h1 ms-h1--long" aria-label={occasion.h1}>
                    <MsWords text={occasion.h1} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }} data-reveal>
                        <p className="ms-lede">{occasion.lede}</p>
                        {occasion.notice && <p className="ms-occ__notice">{occasion.notice}</p>}
                    </div>
                    <div className="ms-actions">
                        <Link href={quote} className="ms-pill ms-pill--acc">TEKLİF AL ↗</Link>
                        <a href="#ms-occ-tiers" className="ms-pill ms-pill--line">KİŞİ SAYINIZA GÖRE ÖNERİ ↓</a>
                    </div>
                </div>
            </section>

            {occasion.offer && (
                <section className="ms-accent" aria-labelledby="ms-occ-offer">
                    <div className="ms-head">
                        <h2 id="ms-occ-offer" className="ms-h2">{occasion.offer.title}</h2>
                        <p style={{ margin: 0, maxWidth: 480, fontSize: 16, lineHeight: 1.5 }}>{occasion.offer.copy}</p>
                    </div>
                </section>
            )}

            <section className="ms-section" aria-labelledby="ms-occ-tiers" id="ms-occ-tiers">
                <MsSectionHead id="ms-occ-tiers-title" title={occasion.tiersTitle} />
                <ul className="ms-cards ms-occ__tiers">
                    {occasion.tiers.map((tier) => (
                        <li key={tier.range} className="ms-card" data-reveal>
                            <span className="ms-card__num">{tier.range}</span>
                            <h3 className="ms-card__title">{tier.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{tier.copy}</p>
                            <ul className="ms-occ__products">
                                {tier.products.map((product) => <li key={product}>{product}</li>)}
                            </ul>
                            <Link href={occasionQuoteHref(occasion.slug, tier.products)} className="ms-occ__tier-cta ms-mono">
                                BU KOMBİNASYONLA TEKLİF AL →
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="ms-section" aria-labelledby="ms-occ-flow">
                <MsSectionHead id="ms-occ-flow" title={occasion.flowTitle} />
                <MsSteps steps={occasion.flow} />
            </section>

            {services.length > 0 && (
                <section aria-labelledby="ms-occ-services" style={{ paddingTop: "4vw" }}>
                    <div style={{ padding: "0 var(--ms-gut)" }}>
                        <MsSectionHead id="ms-occ-services" title={occasion.servicesTitle} />
                    </div>
                    <MsCatalog
                        itemHeading="h3"
                        items={services.map((service) => ({ key: service.key, href: service.href, name: service.name, sub: service.why, image: service.image }))}
                        allLabel=""
                        countLabel="DENEYİM"
                        labels={labels}
                        showChips={false}
                        showToggle={false}
                    />
                </section>
            )}

            {themes.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-occ-themes">
                    <MsSectionHead id="ms-occ-themes" title={occasion.themesTitle ?? "Temalar"} />
                    <MsGallery images={themes} labels={lightbox} />
                </section>
            )}

            {projects.length > 0 && (
                <section aria-labelledby="ms-occ-projects" style={{ paddingTop: "4vw" }}>
                    <div style={{ padding: "0 var(--ms-gut)" }}>
                        <MsSectionHead id="ms-occ-projects" title={occasion.projectsTitle} />
                    </div>
                    <MsCatalog
                        itemHeading="h3"
                        items={projects.map((project) => ({ key: project.key, href: project.href, name: project.name, cat: project.client ?? undefined, image: project.image }))}
                        allLabel=""
                        countLabel="PROJE"
                        labels={labels}
                        showChips={false}
                        showToggle={false}
                    />
                </section>
            )}

            {occasion.faqs.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-occ-faq">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-occ-faq" className="ms-h2">Sıkça sorulan sorular<span className="ms-acc">.</span></h2>
                        <p>{occasion.faqAside ?? "Aradığınız cevap burada yoksa bize yazın; aynı gün dönüş yapalım."}</p>
                        <Link href={quote} className="ms-pill ms-pill--line">TEKLİF AL ↗</Link>
                    </div>
                    <MsFaq items={occasion.faqs} />
                </section>
            )}

            <section className="ms-section ms-occ__closing" aria-labelledby="ms-occ-closing">
                <h2 id="ms-occ-closing" className="ms-h2">{occasion.closing.title}<span className="ms-acc">.</span></h2>
                <p className="ms-lede" style={{ maxWidth: 640 }}>{occasion.closing.copy}</p>
                <div className="ms-actions">
                    <Link href={quote} className="ms-pill ms-pill--acc">TEKLİF AL ↗</Link>
                    <Link href="/hizmetler" className="ms-pill ms-pill--line">TÜM DENEYİMLER →</Link>
                </div>
            </section>
        </article>
    );
}
