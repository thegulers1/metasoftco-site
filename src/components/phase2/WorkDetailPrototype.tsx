import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight, IconCamera as Camera, IconPrinter as Printer, IconShare3 as Share3, IconSparkles as Sparkles } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";
import { P2Display } from "./P2Display";

type GalleryItem = { url: string; alt: string };

const systemIcons = [Camera, Sparkles, Printer, Share3] as const;

const fallbackGallery = [
    "https://res.cloudinary.com/dqkehdebg/image/upload/v1770930843/metasoftco/services/gallery/me8zobpxbbvqdjm8tfaq.jpg",
    "https://res.cloudinary.com/dqkehdebg/image/upload/v1770930844/metasoftco/services/gallery/k7qxhbxibdgwdywijaih.jpg",
    "https://res.cloudinary.com/dqkehdebg/image/upload/v1770930846/metasoftco/services/gallery/yztue3qfcglhac1af2z4.jpg",
];

export default function WorkDetailPrototype({ image, gallery, year, locale }: { image: string; gallery: GalleryItem[]; year: string; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.workDetail;

    const supporting = gallery.length > 1
        ? gallery
        : fallbackGallery.map((url, index) => ({ url, alt: copy.fallbackGalleryAlts[index] }));

    return (
        <article className="phase2 p2-screen p2-work-detail">
            <header className="p2-container p2-detail-top">
                <div className="p2-detail-top__crumb">{copy.crumb}</div>
                <div className="p2-detail-top__heading"><SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} /><p>{copy.heroCopy}</p></div>
                <dl>{copy.facts.map((fact) => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.value ?? year}</dd></div>)}</dl>
                <figure className="p2-detail-main-image"><Image src={image} alt={copy.imageAlt} fill priority sizes="100vw" /></figure>
            </header>
            <section className="p2-container p2-story-grid">
                <div className="p2-story-copy"><span className="p2-gradient-number">01</span><div><h2>{copy.briefTitle}</h2><p>{copy.briefCopy}</p></div></div>
                <figure><Image src={supporting[0].url} alt={supporting[0].alt} fill sizes="50vw" /></figure>
                <figure><Image src={supporting[1].url} alt={supporting[1].alt} fill sizes="50vw" /></figure>
                <div className="p2-story-copy"><span className="p2-gradient-number">02</span><div><h2>{copy.experienceTitle}</h2><p>{copy.experienceCopy}</p></div></div>
                <div className="p2-system-panel">
                    <div className="p2-system-panel__title"><span className="p2-gradient-number">03</span><h2>{copy.systemTitle}</h2></div>
                    <ol>{copy.system.map((step, index) => { const Icon = systemIcons[index]; return <li key={step.title}><Icon aria-hidden="true" /><h3>{step.title}</h3><p>{step.copy}</p></li>; })}</ol>
                </div>
                <div className="p2-story-gallery">{supporting.slice(0, 3).map((item, index) => <figure key={`${item.url}-${index}`}><Image src={item.url} alt={item.alt} fill sizes="33vw" /></figure>)}</div>
                <div className="p2-impact-row">{copy.impact.map((item) => <div key={item.label}><strong className="p2-gradient-number">{item.value}</strong><span>{item.label}</span></div>)}</div>
                <blockquote>{copy.quote}<cite>{copy.quoteCite}</cite></blockquote>
                <Link href={copy.nextHref} className="p2-next-project">
                    <div><span>{copy.nextLabel}</span><h2><P2Display text={copy.nextTitle} /></h2></div>
                    <Image src="https://res.cloudinary.com/dqkehdebg/image/upload/v1771005998/metasoftco/projects/bhyvljjgigsttqxbpomu.png" alt={copy.nextAlt} fill sizes="55vw" />
                    <ArrowRight aria-hidden="true" />
                </Link>
            </section>
            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaButton} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </article>
    );
}
