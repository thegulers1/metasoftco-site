import Image from "next/image";
import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsCrumbs, MsFacts, MsSectionHead, MsSteps, MsWords } from "@/components/site-ms/parts";
import { MsGallery, MsVideo } from "@/components/site-ms/interactive";

interface GalleryItem { url: string; alt: string }

interface CaseStudyPrototypeProps {
    image: string | null;
    video: string | null;
    gallery: GalleryItem[];
    year: string;
    locale: Phase2Locale;
}

const g = {
    tr: { close: "KAPAT ×", prev: "← ÖNCEKİ", next: "SONRAKİ →" },
    en: { close: "CLOSE ×", prev: "← PREV", next: "NEXT →" },
};

/** Bespoke Tavuk Dünyası × AI Photo case study, in the October 2026 design. */
export default function CaseStudyPrototype({ image, video, gallery, year, locale }: CaseStudyPrototypeProps) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.caseStudy;
    const up = (text: string) => text.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

    return (
        <article className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <MsCrumbs items={[
                        { href: dictionary.routes.home, label: up(copy.crumbHome) },
                        { href: dictionary.routes.work, label: up(copy.crumbWork) },
                        { label: up(copy.title) },
                    ]} />
                    <span>{copy.eyebrow}</span>
                </div>
                <h1 className="ms-h1 ms-h1--long" id="case-title" aria-label={copy.title}>
                    <MsWords text={copy.title} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 760 }}>{copy.lede}</p>
                </div>
                <MsFacts facts={copy.facts.map((fact) => ({ term: fact.term, value: fact.value ?? year }))} />
            </section>

            {image && (
                <figure className="ms-wide-media" data-reveal style={{ marginBottom: 0 }}>
                    <Image src={image} alt={copy.imageAlt} fill priority sizes="100vw" />
                    <figcaption className="ms-hero__tag ms-mono">{copy.imageCaption}</figcaption>
                </figure>
            )}

            <section className="ms-section" aria-labelledby="opportunity-title">
                <MsSectionHead id="opportunity-title" title={copy.opportunityTitle.replace(/\.$/, "")} meta={copy.opportunityEyebrow} />
                <p className="ms-lede" data-reveal>{copy.opportunityLede}</p>
                <p className="ms-note" data-reveal style={{ fontSize: 16 }}>{copy.opportunityCopy}</p>
            </section>

            <section className="ms-section" aria-labelledby="concept-title">
                <MsSectionHead id="concept-title" title={copy.conceptTitle.replace(/\.$/, "")} meta={copy.conceptEyebrow} />
                <p className="ms-lede" data-reveal>{copy.conceptCopy}</p>
                <MsSteps steps={copy.journey.map((step) => ({ title: step.title, copy: step.copy }))} />
            </section>

            {video && (
                <section className="ms-section" aria-labelledby="execution-title">
                    <MsSectionHead id="execution-title" title={copy.executionTitle.replace(/\.$/, "")} meta={copy.executionEyebrow} />
                    <div className="ms-twocol">
                        <div data-reveal>
                            <p className="ms-lede" style={{ marginBottom: 20 }}>{copy.executionCopy}</p>
                            <ul className="ms-checks">
                                {copy.executionChecklist.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div data-reveal><MsVideo src={video} title={copy.videoTitle} poster={image} /></div>
                    </div>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="ms-section" aria-labelledby="gallery-title">
                    <MsSectionHead id="gallery-title" title={copy.galleryTitle.replace(/\.$/, "")} meta={copy.galleryEyebrow} />
                    <MsGallery images={gallery.map((item, index) => ({ url: item.url, alt: item.alt || copy.galleryAlt(index + 1) }))} labels={g[locale]} />
                </section>
            )}

            <section className="ms-section" aria-labelledby="record-title">
                <MsSectionHead id="record-title" title={copy.recordTitle.replace(/\.$/, "")} meta={copy.recordEyebrow} />
                <div className="ms-rows" data-reveal>
                    {copy.record.map((item, index) => (
                        <div key={item} className="ms-row" style={{ gridTemplateColumns: "4.5vw minmax(0, 1fr)" }}>
                            <span className="ms-row__num">{String(index + 1).padStart(2, "0")}</span>
                            <span style={{ fontSize: 18, lineHeight: 1.45 }}>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Link href={copy.capabilityHref} className="ms-capability">
                <span>{copy.capabilityLabel}</span>
                <strong>{copy.capabilityTitle} ↗</strong>
            </Link>
        </article>
    );
}
