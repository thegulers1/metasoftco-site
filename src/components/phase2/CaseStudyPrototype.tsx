import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import VideoPlayer from "@/components/site/VideoPlayer";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { P2Container, P2Eyebrow, P2FinalCta, P2SectionHeading } from "./Phase2Primitives";

interface GalleryItem { url: string; alt: string }

interface CaseStudyPrototypeProps {
    image: string | null;
    video: string | null;
    gallery: GalleryItem[];
    year: string;
    locale: Phase2Locale;
}

export default function CaseStudyPrototype({ image, video, gallery, year, locale }: CaseStudyPrototypeProps) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.caseStudy;

    return (
        <div className="phase2">
            <section className="p2-case-hero" aria-labelledby="case-title">
                <P2Container>
                    <nav className="p2-breadcrumbs" aria-label={copy.breadcrumbAria}>
                        <Link href={dictionary.routes.home}>{copy.crumbHome}</Link><span>/</span>
                        <Link href={dictionary.routes.work}>{copy.crumbWork}</Link><span>/</span>
                        <span>{copy.title}</span>
                    </nav>
                    <div className="p2-case-hero__heading">
                        <div><P2Eyebrow>{copy.eyebrow}</P2Eyebrow><h1 id="case-title">{copy.title}</h1></div>
                        <p>{copy.lede}</p>
                    </div>
                    <dl className="p2-case-facts">
                        {copy.facts.map((fact) => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.value ?? year}</dd></div>)}
                    </dl>
                    {image && <figure className="p2-case-hero__image"><Image src={image} alt={copy.imageAlt} fill priority sizes="100vw" /><figcaption>{copy.imageCaption}</figcaption></figure>}
                </P2Container>
            </section>

            <section className="p2-section" aria-labelledby="opportunity-title">
                <P2Container className="p2-case-intro">
                    <P2SectionHeading eyebrow={copy.opportunityEyebrow} title={copy.opportunityTitle} />
                    <div>
                        <p className="p2-lede">{copy.opportunityLede}</p>
                        <p>{copy.opportunityCopy}</p>
                    </div>
                </P2Container>
            </section>

            <section className="p2-section p2-section--surface" aria-labelledby="concept-title">
                <P2Container>
                    <P2SectionHeading eyebrow={copy.conceptEyebrow} title={copy.conceptTitle} copy={copy.conceptCopy} />
                    <ol className="p2-journey-grid">
                        {copy.journey.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}
                    </ol>
                </P2Container>
            </section>

            {video && (
                <section className="p2-section" aria-labelledby="execution-title">
                    <P2Container className="p2-video-proof__grid">
                        <div>
                            <P2SectionHeading eyebrow={copy.executionEyebrow} title={copy.executionTitle} />
                            <p>{copy.executionCopy}</p>
                            <ul className="p2-check-list">
                                {copy.executionChecklist.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
                            </ul>
                        </div>
                        <VideoPlayer src={video} title={copy.videoTitle} fallbackPoster={image} />
                    </P2Container>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="p2-section p2-section--surface" aria-labelledby="gallery-title">
                    <P2Container>
                        <P2SectionHeading eyebrow={copy.galleryEyebrow} title={copy.galleryTitle} />
                        <div className="p2-case-gallery">
                            {gallery.map((item, index) => <figure key={`${item.url}-${index}`}><Image src={item.url} alt={item.alt || copy.galleryAlt(index + 1)} fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>)}
                        </div>
                    </P2Container>
                </section>
            )}

            <section className="p2-section" aria-labelledby="record-title">
                <P2Container className="p2-case-record">
                    <P2SectionHeading eyebrow={copy.recordEyebrow} title={copy.recordTitle} />
                    <div className="p2-record-list">
                        {copy.record.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
                    </div>
                </P2Container>
            </section>

            <section className="p2-case-capability">
                <P2Container>
                    <span>{copy.capabilityLabel}</span>
                    <Link href={copy.capabilityHref}><strong>{copy.capabilityTitle}</strong><ArrowRight aria-hidden="true" /></Link>
                </P2Container>
            </section>

            <P2FinalCta
                contactHref={dictionary.routes.contact}
                eyebrow={copy.finalEyebrow}
                title={copy.finalTitle}
                copy={copy.finalCopy}
                primaryLabel={copy.finalPrimary}
                secondary={{ label: copy.finalSecondary, href: dictionary.routes.work }}
            />
        </div>
    );
}
