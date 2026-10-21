import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsSectionHead, MsSteps, MsWords } from "@/components/site-ms/parts";
import { MsCatalog, MsClock } from "@/components/site-ms/interactive";
import type { P2CapabilityCard } from "./CapabilitiesIndexPrototype";

/**
 * When buying is the right call and what the package holds. Kept short on
 * purpose: renting is the default offer, so this section also points event
 * buyers back to the rental pages.
 */
const buying = {
    tr: {
        title: "Satın almak ne zaman mantıklı?",
        meta: "KİRALAMA MI, SATIŞ MI",
        paragraphs: [
            "Sistem satışı, aynı noktada sürekli çalışacak bir kurulum için mantıklıdır: mağaza, showroom, deneyim merkezi ya da kalıcı bir marka alanı. Örneğin DeFacto için bir mağazaya kalıcı photobooth kurduk; sistem daha sonra başka bir mağazaya taşındı.",
            "Tek bir etkinlik, lansman veya fuar için kiralama daha uygundur. Kiralamada nakliye, kurulum, söküm ve etkinlik boyunca teknik personel fiyata dahildir; cihazın bakımını ve güncellemesini düşünmeniz gerekmez.",
        ],
        packageTitle: "Satış paketinde neler var",
        package: ["Donanım ve markaya özel giydirme", "Yazılım lisansı", "Kurulum ve personel eğitimi", "Yazılım güncellemeleri ve teknik destek", "12 ay donanım garantisi"],
        rentLabel: "ETKİNLİK İÇİN KİRALAMA SEÇENEKLERİ ↗",
        rentHref: "/hizmetler",
        storeLabel: "MAĞAZA İÇİ KALICI PHOTOBOOTH ↗",
        storeHref: "/hizmetler/magaza-ici-kalici-photobooth",
    },
    en: {
        title: "When does buying make sense?",
        meta: "RENT OR BUY",
        paragraphs: [
            "Buying a system makes sense for an installation that runs continuously in one place: a store, showroom, experience centre or permanent brand space. For example, we installed a permanent photo booth in a DeFacto store, which was later moved to another store.",
            "For a single event, launch or trade show, renting is the better fit. Rental includes transport, installation, dismantling and technical staff throughout the event, with no maintenance or updates for you to manage.",
        ],
        packageTitle: "What the purchase package includes",
        package: ["Hardware with branded wrap", "Software licence", "Installation and staff training", "Software updates and technical support", "12-month hardware warranty"],
        rentLabel: "RENTAL OPTIONS FOR EVENTS ↗",
        rentHref: "/en/services",
        storeLabel: null,
        storeHref: null,
    },
};

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
                    <Link href={`${dictionary.routes.contact}?tur=satin-alma`} className="ms-pill ms-pill--acc" data-cursor={l.write}>{up(copy.ctaButton)} ↗</Link>
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

            <section className="ms-section" aria-labelledby="ms-products-buying">
                <MsSectionHead id="ms-products-buying" title={buying[locale].title} meta={buying[locale].meta} />
                <div className="ms-prose ms-prose--wide" data-reveal>
                    {buying[locale].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    <h3>{buying[locale].packageTitle}</h3>
                    <ul>
                        {buying[locale].package.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div className="ms-actions">
                    <Link href={buying[locale].rentHref} className="ms-pill ms-pill--line">{buying[locale].rentLabel}</Link>
                    {buying[locale].storeHref && buying[locale].storeLabel && (
                        <Link href={buying[locale].storeHref} className="ms-pill ms-pill--line">{buying[locale].storeLabel}</Link>
                    )}
                </div>
            </section>
        </div>
    );
}
