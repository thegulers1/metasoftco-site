import Link from "next/link";
import { addHeadingAnchors } from "@/lib/utils";
import { MsCrumbs, MsFaq, MsProse, MsSectionHead, MsWords } from "./parts";

export interface IndustrySectorView {
    name: string;
    title: string;
    intro: string;
    contentHtml: string;
    services: { href: string; name: string; desc: string }[];
    faqs: { question: string; answer: string }[];
    cta: string;
}

const copy = {
    tr: {
        home: "ANA SAYFA", list: "SEKTÖREL ÇÖZÜMLER", listHref: "/sektorel-yazilim-cozumleri", kicker: "SEKTÖREL ÇÖZÜM",
        approach: (n: string) => `${n} sektöründe yaklaşımımız`, approachMeta: "YAKLAŞIM",
        services: (n: string) => `${n} için sunduğumuz hizmetler`, servicesMeta: "HİZMETLER",
        faq: (n: string) => `${n} hakkında sıkça sorulan sorular`,
        quote: "TEKLİF ALIN ↗", contact: "/iletisim", all: "HİZMETLERİ GÖR →", allHref: "/hizmetler", open: "İNCELE",
    },
    en: {
        home: "HOME", list: "SECTORAL SOLUTIONS", listHref: "/en/industry-software-solutions", kicker: "SECTORAL SOLUTION",
        approach: (n: string) => `Our approach in ${n}`, approachMeta: "APPROACH",
        services: (n: string) => `What we offer for ${n}`, servicesMeta: "SERVICES",
        faq: (n: string) => `${n}: frequently asked questions`,
        quote: "GET A QUOTE ↗", contact: "/en/contact", all: "VIEW SERVICES →", allHref: "/en/services", open: "VIEW",
    },
};

/** /sektorel-yazilim-cozumleri/[sektor] and its English twin, in the October 2026 design. */
export function IndustrySector({ sector, lang }: { sector: IndustrySectorView; lang: "tr" | "en" }) {
    const t = copy[lang];
    const up = (text: string) => text.toLocaleUpperCase(lang === "en" ? "en-US" : "tr-TR");
    return (
        <article className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <MsCrumbs items={[{ href: lang === "en" ? "/en" : "/", label: t.home }, { href: t.listHref, label: t.list }, { label: up(sector.name) }]} />
                    <span>{t.kicker}</span>
                </div>
                <h1 className={`ms-h1${sector.title.length > 28 ? " ms-h1--long" : ""}`} aria-label={sector.title}>
                    <MsWords text={sector.title} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 760 }}>{sector.intro}</p>
                    <div className="ms-actions">
                        <Link href={t.contact} className="ms-pill ms-pill--acc">{t.quote}</Link>
                        <Link href={t.allHref} className="ms-pill ms-pill--line">{t.all}</Link>
                    </div>
                </div>
            </section>

            <section className="ms-section" aria-labelledby="ind-approach">
                <MsSectionHead id="ind-approach" title={t.approach(sector.name)} meta={t.approachMeta} />
                <div data-reveal><MsProse html={addHeadingAnchors(sector.contentHtml.replace(/&nbsp;/g, " "))} /></div>
            </section>

            {sector.services.length > 0 && (
                <section className="ms-section" aria-labelledby="ind-services">
                    <MsSectionHead id="ind-services" title={t.services(sector.name)} meta={t.servicesMeta} />
                    <div className="ms-cards">
                        {sector.services.map((service, index) => (
                            <Link key={`${index}-${service.href}`} href={service.href} className="ms-card" data-reveal data-cursor={t.open}>
                                <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                                <h3 className="ms-card__title">{service.name} <span className="ms-acc">↗</span></h3>
                                <p className="ms-card__body" style={{ margin: 0 }}>{service.desc}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {sector.faqs.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ind-faq">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ind-faq" className="ms-h2 ms-h2--sm">{t.faq(sector.name)}<span className="ms-acc">.</span></h2>
                        <p>{sector.cta}</p>
                        <Link href={t.contact} className="ms-pill ms-pill--line">{t.quote}</Link>
                    </div>
                    <MsFaq items={sector.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
                </section>
            )}
        </article>
    );
}
