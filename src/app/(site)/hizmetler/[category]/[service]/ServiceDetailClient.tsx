"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft as ArrowLeft, IconArrowRight as ArrowRight } from "@tabler/icons-react";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import { SignalHeading } from "@/components/phase2/SignalHeading";
import { splitSignalTitle } from "@/lib/phase2";
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

export default function ServiceDetailClient({
    service,
    categoryData,
    relatedServices,
    gallery,
    serviceSchema,
}: ServiceDetailClientProps) {
    const { language, setAlternateUrl } = useLanguage();
    const dictionary = phase2Copy(language);
    const copy = dictionary.serviceDetail;

    useEffect(() => {
        const trUrl = `/hizmetler/${categoryData.slug}/${service.slug}`;
        const enUrl = (service.slug_en && categoryData.slug_en)
            ? `/en/services/${categoryData.slug_en}/${service.slug_en}`
            : "/en/services";
        setAlternateUrl(trUrl, enUrl);
    }, [service.slug, service.slug_en, categoryData.slug, categoryData.slug_en, setAlternateUrl]);

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
    const faqs = parseJsonList<{ q: string; a: string }>(
        (isEn && service.faq_en) || service.faq
    );

    const { solid, outline } = splitSignalTitle(title);
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

    return (
        <article className="phase2 p2-screen p2-service-detail">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <header className="p2-container p2-detail-top">
                <nav className="p2-detail-top__crumb" aria-label={copy.crumbCapabilities}>
                    <Link href={dictionary.routes.home}>{copy.crumbHome}</Link>
                    <span>{"  /  "}</span>
                    <Link href={dictionary.routes.capabilities}>{copy.crumbCapabilities}</Link>
                    <span>{"  /  "}</span>
                    <Link href={categoryHref}>{categoryName}</Link>
                </nav>

                <div className="p2-detail-top__heading">
                    <SignalHeading solid={solid} outline={outline} label={seoTitle} />
                    {description && <p>{description}</p>}
                </div>

                <dl>
                    {facts.map((fact) => (
                        <div key={fact.term}>
                            <dt>{fact.term}</dt>
                            <dd>{fact.value}</dd>
                        </div>
                    ))}
                </dl>

                {service.image && (
                    <figure className="p2-detail-main-image">
                        <Image src={service.image} alt={title} fill priority sizes="100vw" />
                    </figure>
                )}
            </header>

            {service.video && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.videoTitle}</h2>
                    <div className="p2-detail-video">
                        <VideoPlayer
                            src={service.video}
                            thumbnailTime={service.videoThumbnailTime}
                            fallbackPoster={service.image}
                            title={title}
                        />
                    </div>
                </section>
            )}

            {content && (
                <section className="p2-container p2-detail-section p2-detail-section--about">
                    <h2>{copy.aboutTitle}</h2>
                    <div
                        className="p2-prose"
                        dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content.replace(/&nbsp;/g, " ")) }}
                    />
                </section>
            )}

            {specs.length > 0 && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.specsTitle}</h2>
                    <dl className="p2-spec-grid">
                        {specs.map((spec) => (
                            <div key={spec.label}>
                                <dt>{spec.label}</dt>
                                <dd>{spec.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            {faqs.length > 0 && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.faqTitle}</h2>
                    <div className="p2-screen-faq">
                        {faqs.map((item, index) => (
                            <details key={item.q}>
                                <summary>
                                    <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                                    <h3>{item.q}</h3>
                                    <i aria-hidden="true">+</i>
                                </summary>
                                <p>{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.galleryTitle}</h2>
                    <GalleryLightbox
                        variant="grid"
                        images={gallery.map((item, index) => ({ url: item.url, alt: item.alt || copy.galleryAlt(index + 1) }))}
                        title={title}
                    />
                </section>
            )}

            {relatedServices.length > 0 && (
                <section className="p2-container p2-detail-section p2-selected-work">
                    <h2>{copy.relatedTitle}</h2>
                    <div>
                        {relatedServices.slice(0, 3).map((related) => (
                            <Link
                                key={related.id}
                                href={
                                    isEn && categoryData.slug_en && related.slug_en
                                        ? `/en/services/${categoryData.slug_en}/${related.slug_en}`
                                        : `/hizmetler/${categoryData.slug}/${related.slug}`
                                }
                            >
                                {related.image && <Image src={related.image} alt="" fill sizes="33vw" />}
                                <h3>{isEn ? (related.title_en || related.title) : related.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <div className="p2-container p2-detail-foot">
                <Link href={dictionary.routes.capabilities} className="p2-back-link">
                    <ArrowLeft aria-hidden="true" /> {copy.backLabel}
                </Link>
            </div>

            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <div className="p2-screen-cta__actions">
                        <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaPrimary} <ArrowRight aria-hidden="true" /></Link>
                        <Link href={dictionary.routes.work} className="p2-screen-button p2-screen-button--secondary">{copy.ctaSecondary} <ArrowRight aria-hidden="true" /></Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
