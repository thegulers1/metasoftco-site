import Image from "next/image";
import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsFacts, MsSectionHead, MsWords } from "@/components/site-ms/parts";
import { MsGallery } from "@/components/site-ms/interactive";

type GalleryItem = { url: string; alt: string };

const fallbackGallery = [
    "https://res.cloudinary.com/dqkehdebg/image/upload/v1770930843/metasoftco/services/gallery/me8zobpxbbvqdjm8tfaq.jpg",
    "https://res.cloudinary.com/dqkehdebg/image/upload/v1770930844/metasoftco/services/gallery/k7qxhbxibdgwdywijaih.jpg",
    "https://res.cloudinary.com/dqkehdebg/image/upload/v1770930846/metasoftco/services/gallery/yztue3qfcglhac1af2z4.jpg",
];

const NEXT_IMAGE = "https://res.cloudinary.com/dqkehdebg/image/upload/v1771005998/metasoftco/projects/bhyvljjgigsttqxbpomu.png";

const t = {
    tr: { briefMeta: "01 · İHTİYAÇ", experienceMeta: "02 · DENEYİM", systemMeta: "03 · SİSTEM", impactMeta: "SAHADAN", galleryMeta: "GALERİ", galleryTitle: "Sahadan kareler", gallery: { close: "KAPAT ×", prev: "← ÖNCEKİ", next: "SONRAKİ →" }, quote: "ETKİNLİĞİNİZ İÇİN TEKLİF ALIN ↗" },
    en: { briefMeta: "01 · BRIEF", experienceMeta: "02 · EXPERIENCE", systemMeta: "03 · SYSTEM", impactMeta: "ON SITE", galleryMeta: "GALLERY", galleryTitle: "From the floor", gallery: { close: "CLOSE ×", prev: "← PREV", next: "NEXT →" }, quote: "GET A QUOTE FOR YOUR EVENT ↗" },
};

/** Bespoke Ray-Ban × Strip Photo project page, in the October 2026 design. */
export default function WorkDetailPrototype({ image, gallery, year, locale }: { image: string; gallery: GalleryItem[]; year: string; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.workDetail;
    const l = t[locale];
    const title = `${copy.heroSolid} ${copy.heroOutline}`;

    const supporting = gallery.length > 1
        ? gallery
        : fallbackGallery.map((url, index) => ({ url, alt: copy.fallbackGalleryAlts[index] }));

    return (
        <article className="ms-page">
            <section className="ms-hero ms-hero--split">
                <div className="ms-hero__col">
                    <span className="ms-mono ms-mut">{copy.crumb.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR")}</span>
                    <h1 className="ms-h1 ms-h1--detail" aria-label={title}>
                        <MsWords text={`${copy.heroSolid}\n${copy.heroOutline}`} accent="last" />
                    </h1>
                    <p className="ms-lede" data-reveal>{copy.heroCopy}</p>
                    <MsFacts facts={copy.facts.map((fact) => ({ term: fact.term, value: fact.value ?? year }))} />
                    <div className="ms-actions">
                        <Link href={dictionary.routes.contact} className="ms-pill ms-pill--acc">{l.quote}</Link>
                    </div>
                </div>
                <div className="ms-hero__media" data-reveal>
                    <Image src={image} alt={copy.imageAlt} fill priority sizes="(max-width: 899px) 100vw, 46vw" />
                    <span className="ms-hero__tag ms-mono">RAY-BAN</span>
                </div>
            </section>

            <section className="ms-section">
                <div className="ms-twocol">
                    <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <span className="ms-mono ms-acc">{l.briefMeta}</span>
                        <h2 className="ms-h2 ms-h2--sm">{copy.briefTitle}<span className="ms-acc">.</span></h2>
                        <p className="ms-lede">{copy.briefCopy}</p>
                    </div>
                    <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <span className="ms-mono ms-acc">{l.experienceMeta}</span>
                        <h2 className="ms-h2 ms-h2--sm">{copy.experienceTitle}<span className="ms-acc">.</span></h2>
                        <p className="ms-lede">{copy.experienceCopy}</p>
                    </div>
                </div>
            </section>

            <section className="ms-section" aria-labelledby="ms-system">
                <MsSectionHead id="ms-system" title={copy.systemTitle} meta={l.systemMeta} />
                <div className="ms-cards">
                    {copy.system.map((step, index) => (
                        <div key={step.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{step.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{step.copy}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section" aria-label={l.impactMeta}>
                <div className="ms-figures" data-reveal>
                    {copy.impact.map((item) => (
                        <div key={item.label}>
                            <strong className="ms-acc">{item.value}</strong>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
                <blockquote className="ms-quote" data-reveal>
                    {copy.quote}
                    <cite>{copy.quoteCite}</cite>
                </blockquote>
            </section>

            <section className="ms-section" aria-labelledby="ms-rgallery">
                <MsSectionHead id="ms-rgallery" title={l.galleryTitle} meta={l.galleryMeta} />
                <MsGallery images={supporting} labels={l.gallery} />
            </section>

            <section className="ms-section">
                <Link href={copy.nextHref} className="ms-next">
                    <div className="ms-next__copy">
                        <span className="ms-mono">{copy.nextLabel.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR")} →</span>
                        <h2 className="ms-next__title">{copy.nextTitle.replace(/\n/g, " ")}</h2>
                    </div>
                    <div className="ms-next__media"><Image src={NEXT_IMAGE} alt={copy.nextAlt} fill sizes="(max-width: 899px) 100vw, 50vw" /></div>
                </Link>
            </section>
        </article>
    );
}
