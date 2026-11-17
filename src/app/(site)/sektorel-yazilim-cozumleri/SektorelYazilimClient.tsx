import Link from "next/link";
import { MsWords } from "@/components/site-ms/parts";
import { MsClock } from "@/components/site-ms/interactive";

/** A sector card already filtered to the active locale by the page. */
export interface SectorCard {
    slug: string;
    slug_en: string | null;
    name: string;
    name_en: string;
}

interface SektorelYazilimClientProps {
    lang?: "tr" | "en";
    sectors: SectorCard[];
}

const copy = {
    tr: { kicker: (n: number) => `(SEKTÖRE ÖZEL MARKA AKTİVASYONU) — ${n} SEKTÖR`, city: "İSTANBUL", title: "Sektörel etkinlik\nçözümleri.", lede: "Her sektörün hedef kitlesi ve etkinlik amacı farklıdır. Lansman, fuar ve mağaza aktivasyonları için photobooth, interaktif oyun ve markaya özel etkinlik yazılımlarını sektörünüze göre tasarlıyoruz.", open: "İNCELE", all: "ETKİNLİK YAZILIMI GELİŞTİRME →", allHref: "/hizmetler/yazilim-gelistirme" },
    en: { kicker: (n: number) => `(INDUSTRY BRAND ACTIVATIONS) — ${n} SECTORS`, city: "ISTANBUL", title: "Industry event\nsolutions.", lede: "Every industry has its own audience and event goals. We tailor photo booths, interactive games and branded event software for launches, trade shows and in-store activations.", open: "VIEW", all: "EVENT SOFTWARE DEVELOPMENT →", allHref: "/en/services/software-development" },
};

/** /sektorel-yazilim-cozumleri and /en/industry-software-solutions, as full-width rows. */
export default function SektorelYazilimClient({ lang = "tr", sectors }: SektorelYazilimClientProps) {
    const t = copy[lang];
    const isEn = lang === "en";

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{t.kicker(sectors.length)}</span>
                    <MsClock label={t.city} />
                </div>
                <h1 className="ms-h1" aria-label={t.title.replace("\n", " ")}>
                    <MsWords text={t.title} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 720 }}>{t.lede}</p>
                    <Link href={t.allHref} className="ms-pill ms-pill--line">{t.all}</Link>
                </div>
            </section>
            <section className="ms-section">
                <div className="ms-rows">
                    {sectors.map((sector, index) => (
                        <Link
                            key={sector.slug}
                            href={isEn ? `/en/industry-software-solutions/${sector.slug_en}` : `/sektorel-yazilim-cozumleri/${sector.slug}`}
                            className="ms-row"
                            data-cursor={t.open}>
                            <span className="ms-row__num">{String(index + 1).padStart(2, "0")}</span>
                            <span className="ms-row__name">{isEn ? sector.name_en : sector.name}</span>
                            <span />
                            <span className="ms-row__arrow" aria-hidden="true">↗</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
