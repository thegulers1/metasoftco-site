import { MsWords } from "@/components/site-ms/parts";
import { MsCatalog, MsClock } from "@/components/site-ms/interactive";

interface SectorPageItem {
    id: string;
    title: string;
    slug: string;
    h1: string | null;
    excerpt: string | null;
    ogImage: string | null;
    /** Set when the page is served outside the sector-solutions route. */
    href?: string;
}

interface SektorelCozumlerClientProps {
    pages: SectorPageItem[];
    lang?: "tr" | "en";
}

const copy = {
    tr: {
        kicker: (n: number) => `(SEKTÖREL ÇÖZÜMLER) — ${n} SAYFA`,
        city: "İSTANBUL",
        title: "Sektörünüzü anlayan\nçözümler.",
        lede: "Moda markası için Virtual Try-On, banka için gamification, otomotiv için AR test sürüşü — her sektörün kitlesi farklı tepki verir, farklı motivasyonla paylaşır. MetasoftCo, sektörünüzün dinamiklerini bilerek brief'i çözer.",
        count: "SAYFA",
        view: { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" },
    },
    en: {
        kicker: (n: number) => `(SECTOR SOLUTIONS) — ${n} PAGES`,
        city: "ISTANBUL",
        title: "Sector-specific\nsolutions.",
        lede: "Virtual Try-On for fashion brands, gamification for banks, AR test drives for automotive — every sector's audience reacts differently and shares with different motivations. MetasoftCo solves the brief knowing your sector's dynamics.",
        count: "PAGES",
        view: { grid: "GRID", list: "LIST", view: "View", open: "VIEW" },
    },
};

/** /sektorel-cozumler and /en/sector-solutions, in the October 2026 listing design. */
export default function SektorelCozumlerClient({ pages, lang = "tr" }: SektorelCozumlerClientProps) {
    const t = copy[lang];
    const base = lang === "en" ? "/en/sector-solutions" : "/sektorel-cozumler";

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{t.kicker(pages.length)}</span>
                    <MsClock label={t.city} />
                </div>
                <h1 className="ms-h1" aria-label={t.title.replace("\n", " ")}>
                    <MsWords text={t.title} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 720 }}>{t.lede}</p>
                </div>
            </section>
            <MsCatalog
                items={pages.map((page) => ({
                    key: page.id,
                    href: page.href ?? `${base}/${page.slug}`,
                    name: page.h1 || page.title,
                    image: page.ogImage,
                }))}
                allLabel=""
                countLabel={t.count}
                labels={t.view}
                showChips={false}
            />
        </div>
    );
}
