import Image from "next/image";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsBand, MsCaps, MsSectionHead, MsWords } from "@/components/site-ms/parts";
import { MsClock } from "@/components/site-ms/interactive";

const t = {
    tr: { kicker: "(HAKKIMIZDA) — İSTANBUL / 2020’DEN BERİ", city: "İSTANBUL", band: ["Fikir", "Yazılım", "Fiziksel üretim", "Saha operasyonu"], imageTag: "İSTANBUL TEKNOKENT · AVCILAR", imageAlt: "MetasoftCo üretim ve sahne", brandsMeta: (n: number) => `${n} MARKA`, principlesTitle: "Üç ilke", principlesMeta: "NASIL ÇALIŞIRIZ" },
    en: { kicker: "(ABOUT) — ISTANBUL / SINCE 2020", city: "ISTANBUL", band: ["Idea", "Software", "Physical build", "Field operations"], imageTag: "İSTANBUL TEKNOKENT · AVCILAR", imageAlt: "MetasoftCo production and stage", brandsMeta: (n: number) => `${n} BRANDS`, principlesTitle: "Three principles", principlesMeta: "HOW WE WORK" },
};

/** /hakkimizda and /en/about — the "Hakkımızda" design of October 2026. */
export default function AboutPrototype({ locale }: { locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.about;
    const l = t[locale];
    const [storyLead, storyAccent] = copy.storyTitle.split("\n");

    return (
        <article className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{l.kicker}</span>
                    <MsClock label={l.city} />
                </div>
                <h1 className="ms-h1" aria-label={copy.heroLabel}>
                    <MsWords text={`${copy.heroSolid}\n${copy.heroOutline}`} />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 760 }}>{copy.heroCopy}</p>
                </div>
            </section>

            <MsBand words={l.band} />

            <section className="ms-section" aria-label={copy.stats.map((s) => `${s.value} ${s.label}`).join(", ")}>
                <div className="ms-bignums" data-reveal>
                    {copy.stats.map((stat) => (
                        <div key={stat.label}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section">
                <div className="ms-story">
                    <div className="ms-story__copy" data-reveal>
                        <h2 className="ms-h2" style={{ maxWidth: "none" }}>
                            {storyLead}{storyAccent && <> <span className="ms-acc">{storyAccent}</span></>}
                        </h2>
                        {copy.storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    <div className="ms-story__media" data-reveal>
                        <Image src="/phase2/about-production-stage-v2.png" alt={l.imageAlt} fill sizes="(max-width: 899px) 100vw, 50vw" />
                        <span className="ms-hero__tag ms-mono">{l.imageTag}</span>
                    </div>
                </div>
            </section>

            <section className="ms-section" aria-labelledby="ms-about-brands">
                <MsSectionHead id="ms-about-brands" title={copy.clientsTitle} meta={l.brandsMeta(copy.clients.length)} />
                <ul className="ms-wordlist" data-reveal>
                    {copy.clients.map((client) => <li key={client}><MsCaps text={client} /></li>)}
                </ul>
            </section>

            <section className="ms-section" aria-labelledby="ms-about-principles">
                <MsSectionHead id="ms-about-principles" title={l.principlesTitle} meta={l.principlesMeta} />
                <ol className="ms-principles">
                    {copy.principles.map((principle, index) => (
                        <li key={principle.title} data-reveal>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <h3>{principle.title}</h3>
                            <p>{principle.copy}</p>
                        </li>
                    ))}
                </ol>
            </section>
        </article>
    );
}
