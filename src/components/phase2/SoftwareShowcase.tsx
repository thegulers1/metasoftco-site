import Link from "next/link";
import { softwareHomeCopy, SOFTWARE_CATEGORY_PATH } from "@/lib/software";
import { MsCaps } from "@/components/site-ms/parts";

/** Section id the hero jump link points at. */
export const SOFTWARE_SECTION_ID = "yazilim";

/**
 * The three tracks the software line is summarised under. Titles and bodies
 * come from softwareHomeCopy; the platform tags are the only extra copy here.
 * "iOS", "Android" and "Unity" sit in lang="en" spans so Turkish upper-casing
 * does not turn them into "İOS" / "UNİTY".
 */
const TRACKS = [
    {
        index: 0,
        tags: [<span key="a" lang="en">iOS</span>, <span key="b" lang="en">Android</span>, "Cross-platform"],
    },
    { index: 1, tags: ["Web", "Panel", "CRM"] },
    { index: 3, tags: ["AI", <span key="u" lang="en">Unity</span>, "Oyun"] },
];

/**
 * Premium B2B showcase for the custom software line on /hizmetler. Sits after
 * the rental catalog and never touches its items, filters or counters.
 */
export default function SoftwareShowcase({ productsHref }: { productsHref?: string }) {
    const copy = softwareHomeCopy;

    return (
        <section id={SOFTWARE_SECTION_ID} className="ms-sw" aria-labelledby="ms-sw-title">
            <div className="ms-sw__bar ms-mono">
                <span>(YAZILIM) — MOBİL · WEB · YAPAY ZEKÂ</span>
                <span>{copy.eyebrow}</span>
            </div>

            <h2 id="ms-sw-title" className="ms-sw__title" aria-label="Özel Yazılım ve Teknoloji Çözümleri">
                <span>Özel Yazılım ve</span>
                <span className="ms-sw__title-acc">Teknoloji Çözümleri<span className="ms-sw__dot">.</span></span>
            </h2>

            <p className="ms-sw__lede">{copy.lede}</p>

            <ol className="ms-sw__tracks">
                {TRACKS.map((track, position) => {
                    const card = copy.cards[track.index];
                    return (
                        <li key={card.title} className="ms-sw__track">
                            <span className="ms-sw__num ms-mono" aria-hidden="true">{String(position + 1).padStart(2, "0")}</span>
                            <h3 className="ms-sw__name"><MsCaps text={card.title} /></h3>
                            <p className="ms-sw__body">{card.body}</p>
                            <ul className="ms-sw__tags ms-mono" aria-label="Kapsam">
                                {track.tags.map((tag, i) => <li key={i}>{tag}</li>)}
                            </ul>
                        </li>
                    );
                })}
            </ol>

            <div className="ms-sw__foot">
                <Link href={SOFTWARE_CATEGORY_PATH} className="ms-pill ms-pill--acc ms-sw__cta">
                    {copy.cta.toLocaleUpperCase("tr-TR")} ↗
                </Link>
                {productsHref && (
                    <Link href={productsHref} className="ms-sw__alt ms-mono">
                        Kiosk ve sistemleri satın almak için ürünlere göz atın →
                    </Link>
                )}
            </div>
        </section>
    );
}
