"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { MsCaps, MsCrumbs, MsFaq, MsProse, MsSectionHead, MsWords, splitHtmlSections } from "@/components/site-ms/parts";
import { MsCatalog, MsClock, MsGallery } from "@/components/site-ms/interactive";
import { addHeadingAnchors } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface CityImage { url: string; alt: string; }
interface DistrictItem { title: string; description: string; }
interface FaqItem { q: string; a: string; }

interface RelatedService {
    id: string;
    title: string;
    title_en: string | null;
    slug: string;
    slug_en: string | null;
    image: string | null;
    category: { name: string; name_en: string | null; slug: string; slug_en: string | null } | null;
}

interface CityLandingClientProps {
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
    images: CityImage[] | string[];
    districts: DistrictItem[];
    faq: FaqItem[];
    relatedServices: RelatedService[];
    lang: "tr" | "en";
    trUrl: string;
    enUrl: string;
    /** Second breadcrumb and hero tag; defaults to Services / service area. */
    parent?: { href: string; label: string };
    kicker?: string;
    /** Analytics location for the quote button. */
    location?: string;
}

const copy = {
    tr: { home: "ANA SAYFA", services: "HİZMETLER", kicker: "HİZMET BÖLGESİ", city: "İSTANBUL", details: "Detaylar", detailsMeta: "HİZMET DETAYI", areas: "Hizmet bölgelerimiz", areasMeta: "BÖLGELER", activities: "Önerilen aktiviteler", activitiesMeta: "DENEYİMLER", gallery: "Sahadan kareler", galleryMeta: "GALERİ", faq: "Sıkça sorulan sorular", faqAside: "Bu bölgeye özel etkinlik teknolojisi çözümleri için bize yazın; aynı gün dönüş yapalım.", quote: "TEKLİF AL ↗", all: "TÜM HİZMETLER →", count: "DENEYİM", view: { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" }, lightbox: { close: "KAPAT ×", prev: "← ÖNCEKİ", next: "SONRAKİ →" } },
    en: { home: "HOME", services: "SERVICES", kicker: "SERVICE AREA", city: "ISTANBUL", details: "Details", detailsMeta: "SERVICE DETAIL", areas: "Our service areas", areasMeta: "AREAS", activities: "Recommended activities", activitiesMeta: "EXPERIENCES", gallery: "From the floor", galleryMeta: "GALLERY", faq: "Frequently asked questions", faqAside: "Write to us for event technology tailored to this area; we reply the same day.", quote: "GET A QUOTE ↗", all: "ALL SERVICES →", count: "EXPERIENCES", view: { grid: "GRID", list: "LIST", view: "View", open: "VIEW" }, lightbox: { close: "CLOSE ×", prev: "← PREV", next: "NEXT →" } },
};

function AlternateUrlSetter({ trUrl, enUrl }: { trUrl: string; enUrl: string }) {
    const { setAlternateUrl } = useLanguage();
    useEffect(() => {
        setAlternateUrl(trUrl, enUrl);
    }, [trUrl, enUrl, setAlternateUrl]);
    return null;
}

/** City and audience landing pages (SectorPage records), in the October 2026 design. */
export default function CityLandingClient({ page, images, districts, faq, relatedServices, lang, trUrl, enUrl, parent, kicker, location = "city_landing" }: CityLandingClientProps) {
    const t = copy[lang];
    const h1 = (lang === "en" ? (page.h1_en || page.h1) : page.h1) || page.title;
    const excerpt = lang === "en" ? (page.excerpt_en || page.excerpt) : page.excerpt;
    const content = lang === "en" ? (page.content_en || page.content) : page.content;
    const gallery = (images as (CityImage | string)[]).map((image) => (typeof image === "string" ? { url: image, alt: h1 } : { url: image.url, alt: image.alt || h1 }));
    const servicesHref = lang === "en" ? "/en/services" : "/hizmetler";
    const contactHref = lang === "en" ? "/en/contact" : "/iletisim";
    const about = content ? splitHtmlSections(addHeadingAnchors(content.replace(/&nbsp;/g, " "))) : null;
    const useCards = about && about.sections.length > 0 && about.sections.length <= 12;

    return (
        <article className="ms-page">
            <AlternateUrlSetter trUrl={trUrl} enUrl={enUrl} />

            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <MsCrumbs items={[{ href: lang === "en" ? "/en" : "/", label: t.home }, parent ?? { href: servicesHref, label: t.services }, { label: kicker ?? t.kicker }]} />
                    <MsClock label={t.city} />
                </div>
                <h1 className={`ms-h1${h1.length > 28 ? " ms-h1--long" : ""}`} aria-label={h1}>
                    <MsWords text={h1} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    {excerpt && <p className="ms-lede" data-reveal style={{ maxWidth: 720 }}>{excerpt}</p>}
                    <div className="ms-actions">
                        <Link href={contactHref} className="ms-pill ms-pill--acc" onClick={() => trackEvent("cta_click", { cta: "teklif_al", location })}>{t.quote}</Link>
                        <Link href={servicesHref} className="ms-pill ms-pill--line">{t.all}</Link>
                    </div>
                </div>
            </section>

            {about && (
                <section className="ms-section" aria-labelledby="ms-city-details">
                    <MsSectionHead id="ms-city-details" title={t.details} meta={t.detailsMeta} />
                    {useCards ? (
                        <>
                            {about.intro && <div data-reveal><MsProse html={about.intro} /></div>}
                            <div className="ms-cards">
                                {about.sections.map((section, index) => (
                                    <div key={`${index}-${section.title}`} className={`ms-card${index === 0 ? " ms-card--lead" : ""}`} data-reveal>
                                        <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                                        <h3 className="ms-card__title" id={section.id}><MsCaps text={section.title} /></h3>
                                        <div className="ms-card__body" dangerouslySetInnerHTML={{ __html: section.html }} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div data-reveal><MsProse html={about.sections.length ? addHeadingAnchors((content ?? "").replace(/&nbsp;/g, " ")) : about.intro} /></div>
                    )}
                </section>
            )}

            {districts.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-city-areas">
                    <MsSectionHead id="ms-city-areas" title={t.areas} meta={t.areasMeta} />
                    <div className="ms-cards">
                        {districts.map((district, index) => (
                            <div key={`${index}-${district.title}`} className="ms-card" data-reveal>
                                <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                                <h3 className="ms-card__title">{district.title}</h3>
                                <p className="ms-card__body" style={{ margin: 0 }}>{district.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {relatedServices.length > 0 && (
                <section aria-labelledby="ms-city-activities" style={{ paddingTop: "4vw" }}>
                    <div style={{ padding: "0 var(--ms-gut)" }}>
                        <MsSectionHead id="ms-city-activities" title={t.activities} meta={t.activitiesMeta} />
                    </div>
                    <MsCatalog
                        items={relatedServices.map((service) => ({
                            key: service.id,
                            href: lang === "en"
                                ? `/en/services/${service.category?.slug_en || service.category?.slug}/${service.slug_en || service.slug}`
                                : `/hizmetler/${service.category?.slug}/${service.slug}`,
                            name: lang === "en" ? (service.title_en || service.title) : service.title,
                            cat: (lang === "en" ? (service.category?.name_en || service.category?.name) : service.category?.name) ?? undefined,
                            image: service.image,
                        }))}
                        allLabel=""
                        countLabel={t.count}
                        labels={t.view}
                        showChips={false}
                        showToggle={false}
                    />
                </section>
            )}

            {gallery.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-city-gallery">
                    <MsSectionHead id="ms-city-gallery" title={t.gallery} meta={t.galleryMeta} />
                    <MsGallery images={gallery} labels={t.lightbox} />
                </section>
            )}

            {faq.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-city-faq">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-city-faq" className="ms-h2">{t.faq}<span className="ms-acc">.</span></h2>
                        <p>{t.faqAside}</p>
                        <Link href={contactHref} className="ms-pill ms-pill--line">{t.quote}</Link>
                    </div>
                    <MsFaq items={faq} />
                </section>
            )}
        </article>
    );
}
