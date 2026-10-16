import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsSectionHead, MsSteps, MsWords } from "@/components/site-ms/parts";
import { MsCatalog, MsClock } from "@/components/site-ms/interactive";
import type { P2CapabilityCard } from "./CapabilitiesIndexPrototype";

const t = {
    tr: { kicker: (n: number) => `(SİSTEM SATIŞI) — ${n} SİSTEM`, city: "İSTANBUL", count: "SİSTEM", view: { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" }, processMeta: "SATIN ALMA SÜRECİ", write: "YAZ" },
    en: { kicker: (n: number) => `(PRODUCT SALES) — ${n} SYSTEMS`, city: "ISTANBUL", count: "SYSTEMS", view: { grid: "GRID", list: "LIST", view: "View", open: "VIEW" }, processMeta: "HOW BUYING WORKS", write: "WRITE" },
};

/** /urunler and /en/products, laid out like the "Hizmetler" design. */
export default function ProductsIndexPrototype({ products, locale }: { products: P2CapabilityCard[]; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.products;
    const l = t[locale];
    const up = (text: string) => text.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{l.kicker(products.length)}</span>
                    <MsClock label={l.city} />
                </div>
                <h1 className="ms-h1" aria-label={copy.heroLabel}>
                    <MsWords text={`${copy.heroSolid}\n${copy.heroOutline}`} accent={[copy.heroSolid.split(/\s+/).length]} />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 620 }}>{copy.heroCopy}</p>
                    <Link href={dictionary.routes.contact} className="ms-pill ms-pill--acc" data-cursor={l.write}>{up(copy.ctaButton)} ↗</Link>
                </div>
            </section>

            <section aria-label={copy.catalogAria}>
                <MsCatalog
                    items={products.map((product) => ({ key: product.id, href: product.href, name: product.title, image: product.image }))}
                    allLabel=""
                    countLabel={l.count}
                    labels={l.view}
                    showChips={false}
                />
            </section>

            <section className="ms-section" aria-labelledby="ms-products-process">
                <MsSectionHead id="ms-products-process" title={copy.endToEndTitle.replace(/\n/g, " ")} meta={l.processMeta} />
                <MsSteps steps={copy.process.map((step) => ({ title: step.title, copy: step.copy }))} />
            </section>
        </div>
    );
}
