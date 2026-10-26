"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MsCaps, MsCrumbs, MsFacts, MsFaq, MsProse, MsSectionHead, MsWords, splitHtmlSections } from "@/components/site-ms/parts";
import { MsGallery, MsVideo } from "@/components/site-ms/interactive";
import { dataCaptureCopy } from "@/lib/data-capture";
import { DATA_CAPTURE_HUB_PATH } from "@/lib/data-capture-hub";
import { mergeRentalFaq, rentalOpsCopy, rentalProductName, toRentalOutput } from "@/lib/rental-ops";
import { SOFTWARE_CATEGORY_PATH, isSoftwareCategory, softwareServiceCopy } from "@/lib/software";
import { phase2Copy } from "@/lib/phase2-content";
import { useLanguage } from "@/providers/LanguageProvider";
import { addHeadingAnchors } from "@/lib/utils";
import type { Service, ServiceCategory } from "@prisma/client";

interface ServiceDetailClientProps {
    service: Service;
    categoryData: ServiceCategory;
    relatedServices: Service[];
    gallery: { url: string; alt?: string }[];
    serviceSchema: Record<string, unknown>;
    category: string;
    /** "sale" renders the /urunler flat product screen instead of the /hizmetler rental screen. */
    variant?: "rental" | "sale";
    /** For rental services with a matching /urunler product, links to it as a third CTA. */
    saleHref?: string;
}

/** Parses an editor-managed JSON column, tolerating empty or malformed values. */
function parseJsonList<T>(raw: string | null | undefined): T[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
        return [];
    }
}

const labels = {
    tr: {
        videoMeta: "SAHADAN · VİDEO",
        aboutMeta: "HİZMET HAKKINDA",
        specsMeta: "TEKNİK ÖZELLİKLER",
        galleryMeta: "GALERİ",
        faqAside: "Aradığınız cevap burada yoksa bize yazın; aynı gün dönüş yapalım.",
        faqWhatsapp: "WHATSAPP’TAN SOR ↗",
        whatsappText: (title: string) => `Merhaba, ${title} hakkında bilgi almak istiyorum.`,
        relatedHeading: "Bunlar da ilginizi çekebilir",
        relatedMeta: "İLGİLİ HİZMETLER",
        relatedMetaSale: "DİĞER SİSTEMLER",
        allServices: "TÜM HİZMETLER →",
        allProducts: "TÜM SİSTEMLER →",
        updated: "Son güncelleme",
        gallery: { close: "KAPAT ×", prev: "← ÖNCEKİ", next: "SONRAKİ →" },
        cursor: { write: "YAZ", go: "GİT", view: "İNCELE" },
    },
    en: {
        videoMeta: "ON SITE · VIDEO",
        aboutMeta: "ABOUT THE SERVICE",
        specsMeta: "SPECIFICATIONS",
        galleryMeta: "GALLERY",
        faqAside: "If your question is not answered here, write to us and we will reply the same day.",
        faqWhatsapp: "ASK ON WHATSAPP ↗",
        whatsappText: (title: string) => `Hello, I would like information about ${title}.`,
        relatedHeading: "You may also like",
        relatedMeta: "RELATED SERVICES",
        relatedMetaSale: "OTHER SYSTEMS",
        allServices: "ALL SERVICES →",
        allProducts: "ALL SYSTEMS →",
        updated: "Last updated",
        gallery: { close: "CLOSE ×", prev: "← PREV", next: "NEXT →" },
        cursor: { write: "WRITE", go: "GO", view: "VIEW" },
    },
};

export default function ServiceDetailClient({
    service,
    categoryData,
    relatedServices,
    gallery,
    serviceSchema,
    variant = "rental",
    saleHref,
}: ServiceDetailClientProps) {
    const { language, setAlternateUrl } = useLanguage();
    const dictionary = phase2Copy(language);
    const isSoftware = variant === "rental" && language === "tr" && isSoftwareCategory(categoryData.slug);
    const copy = isSoftware ? { ...dictionary.serviceDetail, ...softwareServiceCopy } : dictionary.serviceDetail;
    const t = labels[language === "en" ? "en" : "tr"];

    useEffect(() => {
        const trUrl = variant === "sale"
            ? `/urunler/${service.slug}`
            : `/hizmetler/${categoryData.slug}/${service.slug}`;
        const enUrl = variant === "sale"
            ? (service.slug_en ? `/en/products/${service.slug_en}` : "/en/products")
            : (service.slug_en && categoryData.slug_en)
                ? `/en/services/${categoryData.slug_en}/${service.slug_en}`
                : "/en/services";
        setAlternateUrl(trUrl, enUrl);
    }, [variant, service.slug, service.slug_en, categoryData.slug, categoryData.slug_en, setAlternateUrl]);

    const isEn = language === "en";
    const title = isEn ? (service.title_en || service.title) : service.title;
    const seoTitle = isEn
        ? (service.metaTitle_en || service.metaTitle || title)
        : (service.metaTitle || title);
    const categoryName = isEn ? (categoryData.name_en || categoryData.name) : categoryData.name;
    const description = isEn ? (service.description_en || service.description) : service.description;
    const content = isEn ? (service.content_en || service.content) : service.content;

    const specs = parseJsonList<{ label: string; value: string }>(
        (isEn && service.specs_en) || service.specs
    );
    const showDataCapture = variant === "rental" && service.dataCapture;
    // Event rentals (not software) get the shared logistics block and FAQ.
    const showRentalOps = variant === "rental" && !isSoftwareCategory(categoryData.slug);
    const rentalOps = rentalOpsCopy(isEn ? "en" : "tr");
    const output = toRentalOutput(service.outputType);
    const dataCapture = dataCaptureCopy(isEn ? "en" : "tr", output === "none");
    // Quote links carry the product so the contact form arrives pre-filled.
    const quoteHref = showRentalOps
        ? `${dictionary.routes.contact}?urun=${encodeURIComponent(rentalProductName(title, isEn ? "en" : "tr"))}`
        : dictionary.routes.contact;
    // Shared questions are appended so the questions in the page's FAQ schema
    // are also visible on the page.
    const ownFaqs = parseJsonList<{ q: string; a: string }>((isEn && service.faq_en) || service.faq);
    const faqs = [
        ...(showRentalOps ? mergeRentalFaq(ownFaqs, title, isEn ? "en" : "tr", output) : ownFaqs),
        ...(showDataCapture ? dataCapture.faq : []),
    ];

    const categoryHref = isEn && categoryData.slug_en
        ? `/en/services/${categoryData.slug_en}`
        : `/hizmetler/${categoryData.slug}`;

    // The first specs double as the header facts when the editor supplied them,
    // so the strip above the fold carries real data instead of boilerplate.
    const facts = [
        { term: copy.categoryTerm, value: categoryName },
        ...(specs.length > 0
            ? specs.slice(0, 3).map((spec) => ({ term: spec.label, value: spec.value }))
            : copy.fallbackFacts.map((fact) => ({ term: fact.term, value: fact.value ?? "" }))),
    ];

    const about = content ? splitHtmlSections(addHeadingAnchors(content.replace(/&nbsp;/g, " "))) : null;
    const relatedHref = (related: Service) =>
        variant === "sale"
            ? `/urunler/${related.slug}`
            : isEn && categoryData.slug_en && related.slug_en
                ? `/en/services/${categoryData.slug_en}/${related.slug_en}`
                : `/hizmetler/${categoryData.slug}/${related.slug}`;

    const crumbs = variant === "sale"
        ? [
            { href: dictionary.routes.home, label: copy.crumbHome.toLocaleUpperCase("tr-TR") },
            { href: dictionary.routes.products, label: copy.crumbProducts.toLocaleUpperCase("tr-TR") },
            { label: title },
        ]
        : [
            { href: dictionary.routes.home, label: copy.crumbHome.toLocaleUpperCase("tr-TR") },
            { href: dictionary.routes.capabilities, label: copy.crumbCapabilities.toLocaleUpperCase("tr-TR") },
            { href: categoryHref, label: categoryName },
        ];

    return (
        <article className="ms-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <section className="ms-hero ms-hero--split">
                <div className="ms-hero__col">
                    <MsCrumbs items={crumbs} />
                    <h1 className={`ms-h1 ms-h1--detail${title.length > 34 ? " ms-h1--long" : ""}`} aria-label={seoTitle}>
                        <MsWords text={title} accent="last" />
                    </h1>
                    {description && <p className="ms-lede" data-reveal>{description}</p>}
                    <MsFacts facts={facts} />
                    <div className="ms-actions">
                        {variant === "sale" ? (
                            <>
                                <Link href={dictionary.routes.contact} className="ms-pill ms-pill--acc" data-cursor={t.cursor.write}>{copy.saleCtaPrimary.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")} ↗</Link>
                                <Link href={dictionary.routes.work} className="ms-pill ms-pill--line" data-cursor={t.cursor.go}>{copy.saleCtaSecondary.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")}</Link>
                            </>
                        ) : (
                            <>
                                <Link href={quoteHref} className="ms-pill ms-pill--acc" data-cursor={t.cursor.write}>{copy.ctaPrimary.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")} ↗</Link>
                                <Link href={isSoftware ? SOFTWARE_CATEGORY_PATH : dictionary.routes.work} className="ms-pill ms-pill--line" data-cursor={t.cursor.go}>{copy.ctaSecondary.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")}</Link>
                                {saleHref && (
                                    <Link href={saleHref} className="ms-pill ms-pill--line" data-cursor={t.cursor.go}>{copy.ctaTertiary.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")}</Link>
                                )}
                            </>
                        )}
                    </div>
                    <p className="ms-updated ms-mono">
                        {t.updated}: {service.updatedAt.toLocaleDateString(isEn ? "en-GB" : "tr-TR", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                </div>
                {service.image && (
                    <div className="ms-hero__media" data-reveal>
                        <Image src={service.image} alt={title} fill priority sizes="(max-width: 899px) 100vw, 46vw" />
                        <span className="ms-hero__tag ms-mono"><MsCaps text={categoryName} /></span>
                    </div>
                )}
            </section>

            {service.video && (
                <section className="ms-section" aria-labelledby="ms-video-title">
                    <MsSectionHead id="ms-video-title" title={copy.videoTitle.replace(/[?.]$/, "")} meta={t.videoMeta} />
                    <div data-reveal>
                        <MsVideo src={service.video} title={title} poster={service.image} />
                    </div>
                </section>
            )}

            {about && (
                <section className="ms-section" aria-labelledby="ms-about-title">
                    <MsSectionHead id="ms-about-title" title={copy.aboutTitle} meta={t.aboutMeta} />
                    {about.sections.length === 0 ? (
                        <div data-reveal><MsProse html={about.intro} /></div>
                    ) : (
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
                    )}
                </section>
            )}

            {showDataCapture && (
                <section id="data-capture" className="ms-accent" aria-labelledby="data-capture-title">
                    <div className="ms-head">
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <span className="ms-mono">{dataCapture.eyebrow}</span>
                            <h2 id="data-capture-title" className="ms-h2">{dataCapture.title}</h2>
                        </div>
                        <p style={{ margin: 0, maxWidth: 440, fontSize: 16, lineHeight: 1.5 }}>{dataCapture.intro}</p>
                    </div>
                    <ol className="ms-accent__grid">
                        {dataCapture.items.map((item, index) => (
                            <li key={item.title}>
                                <span className="ms-mono">{String(index + 1).padStart(2, "0")}</span>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="ms-head">
                        <p className="ms-accent__legal">{dataCapture.legal}</p>
                        <div className="ms-actions">
                            <Link href={dictionary.routes.contact} className="ms-pill ms-pill--dark" data-cursor={t.cursor.write}>{dataCapture.cta.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")} ↗</Link>
                            {!isEn && dataCapture.more && (
                                <Link href={DATA_CAPTURE_HUB_PATH} className="ms-pill ms-pill--dark-line" data-cursor={t.cursor.go}>{dataCapture.more.toLocaleUpperCase("tr-TR")}</Link>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {specs.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-specs-title">
                    <MsSectionHead id="ms-specs-title" title={copy.specsTitle} meta={t.specsMeta} />
                    <dl className="ms-dl" data-reveal>
                        {specs.map((spec) => (
                            <div key={spec.label}>
                                <dt>{spec.label}</dt>
                                <dd>{spec.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            {showRentalOps && (
                <section id="kiralama" className="ms-section" aria-labelledby="rental-ops-title">
                    <MsSectionHead id="rental-ops-title" title={rentalOps.title.replace(/\.$/, "")} meta={rentalOps.eyebrow} />
                    <div className="ms-twocol">
                        <div data-reveal>
                            <h3 className="ms-col-label ms-mono" style={{ margin: 0 }}>{rentalOps.logisticsTitle.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")}</h3>
                            <dl className="ms-dl">
                                {rentalOps.logistics(output).map((item) => (
                                    <div key={item.term}>
                                        <dt>{item.term}</dt>
                                        <dd>{item.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div data-reveal>
                            <h3 className="ms-col-label ms-mono" style={{ margin: 0 }}>{rentalOps.scopeTitle.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")}</h3>
                            <ul className="ms-checks">
                                {rentalOps.scope(output).map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                    <p className="ms-note" data-reveal>{rentalOps.serviceArea}</p>
                    <div className="ms-actions">
                        <Link href={quoteHref} className="ms-pill ms-pill--acc" data-cursor={t.cursor.write}>{rentalOps.cta.toLocaleUpperCase(isEn ? "en-US" : "tr-TR")} ↗</Link>
                    </div>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-gallery-title">
                    <MsSectionHead id="ms-gallery-title" title={copy.galleryTitle} meta={t.galleryMeta} />
                    <MsGallery
                        images={gallery.map((item, index) => ({ url: item.url, alt: item.alt || copy.galleryAlt(index + 1) }))}
                        labels={t.gallery}
                    />
                </section>
            )}

            {faqs.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-faq-title">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-faq-title" className="ms-h2">{copy.faqTitle}<span className="ms-acc">.</span></h2>
                        <p>{t.faqAside}</p>
                        <a
                            href={`https://wa.me/905342334051?text=${encodeURIComponent(t.whatsappText(title))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ms-pill ms-pill--line"
                            data-cursor={t.cursor.write}>
                            {t.faqWhatsapp}
                        </a>
                    </div>
                    <MsFaq items={faqs} />
                </section>
            )}

            {relatedServices.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-related-title">
                    <MsSectionHead id="ms-related-title" title={t.relatedHeading} meta={variant === "sale" ? t.relatedMetaSale : t.relatedMeta} />
                    <div className="ms-rows">
                        {relatedServices.slice(0, 4).map((related, index) => (
                            <Link key={related.id} href={relatedHref(related)} className="ms-row" data-cursor={t.cursor.view}>
                                <span className="ms-row__num">{String(index + 1).padStart(2, "0")}</span>
                                <span className="ms-row__name ms-row__name--sm"><MsCaps text={isEn ? (related.title_en || related.title) : related.title} /></span>
                                <span />
                                <span className="ms-row__arrow" aria-hidden="true">↗</span>
                            </Link>
                        ))}
                    </div>
                    <div className="ms-actions">
                        <Link href={variant === "sale" ? dictionary.routes.products : dictionary.routes.capabilities} className="ms-pill ms-pill--line" data-cursor={t.cursor.go}>
                            {variant === "sale" ? t.allProducts : t.allServices}
                        </Link>
                    </div>
                </section>
            )}
        </article>
    );
}
