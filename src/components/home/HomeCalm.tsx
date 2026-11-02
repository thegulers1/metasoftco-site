import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { homeCopy, type HomeServiceKey } from "@/lib/home-content";
import { brands } from "@/lib/brands";
import { MsImg } from "@/components/site-ms/interactive";
import type { HomeProject, HomeService } from "./HomeExperience";
import "./home-calm.css";

/**
 * Homepage (November 2026). Calm, but with weight: a full-screen centred hero
 * with one accent phrase and a living light, oversized numbers drifting past,
 * large numbered rows, photography-led cards and one framed closing call.
 * Few elements, each one big. Navigation, footer and floating actions come
 * from the shared site chrome (src/components/site-ms/MsChrome.tsx).
 */

const FEATURED: HomeServiceKey[] = ["ai-photo", "photobooth", "strip-photo", "gift-wheel"];
const LOGO_COUNT = 10;
/** A crowd photo reads best full width; poster-like covers do not. */
const SHOWCASE_PREFERRED = ["rollic-summer-party-x-seri-t-foto", "ray-ban-x-strip-photo"];

const calm = {
    tr: {
        accent: "AI photobooth",
        trust: "2020'den bu yana 100+ markanın etkinlik teknolojisi ortağı.",
        primary: "Etkinlik için teklif al",
        secondary: "Kalıcı kurulum için satın al",
        marquee: ["1.000+ Etkinlik", "10 İl", "100+ Marka", "Aynı gün teklif"],
        pathsTitle: "Size uygun yoldan başlayın",
        pathsLede: "İhtiyacınızı seçin; sizi doğru deneyime, doğru bilgiye götürelim.",
        servicesTitle: "En çok kiralanan deneyimler",
        servicesLede: "Kurulum, markanıza özel tasarım ve sahadaki ekip her kiralamada dahil.",
        servicesAll: "Tüm deneyimler",
        showcaseLabel: "Sahadan",
        projectsTitle: "Markalarla sahaya çıkardıklarımız",
        projectsLede: "Fikirden kuruluma, gece boyunca sahadaki ekibe kadar bizim imzamızı taşıyan işler.",
        projectsAll: "Tüm projeler",
        whyTitle: "Neden Metasoft?",
        whyLede: "Yazılımı kendimiz yazıyor, cihazı kendimiz kuruyor, sahada kendimiz duruyoruz.",
        why: [
            { value: "3 gün", label: "Etkinlikten 3 gün önce haber vermeniz yeterli." },
            { value: "Aynı gün", label: "Fiyat ve tarih uygunluğu aynı gün elinizde." },
            { value: "1.000+", label: "İstanbul'dan Türkiye'nin 10 iline kurulum." },
            { value: "2+", label: "Etkinlik boyunca sahada en az 2 teknik personel." },
        ],
        softwareLink: "Markanıza özel yazılım da geliştiriyoruz",
        ctaTitle: "Sıradaki etkinliğinizi",
        ctaAccent: "birlikte kuralım",
        ctaLede: "Tarih, şehir ve kişi sayısını paylaşın; size uygun deneyimi ve fiyatı aynı gün iletelim.",
        ctaSecondary: "Sunumu inceleyin",
    },
    en: {
        accent: "AI photo booths",
        trust: "Event technology partner of 100+ brands since 2020.",
        primary: "Get an event quote",
        secondary: "Buy for a permanent spot",
        marquee: ["1,000+ Events", "10 Provinces", "100+ Brands", "Same-day quotes"],
        pathsTitle: "Start from where you are",
        pathsLede: "Pick what you need; we will take you to the right experience and the right facts.",
        servicesTitle: "Most rented experiences",
        servicesLede: "Setup, brand-specific design and the on-site team come with every rental.",
        servicesAll: "All experiences",
        showcaseLabel: "On site",
        projectsTitle: "Taken to the floor with brands",
        projectsLede: "From the idea to the setup and the crew on the night, work that carries our signature.",
        projectsAll: "All projects",
        whyTitle: "Why Metasoft?",
        whyLede: "We write the software, build the booth and stand on site ourselves.",
        why: [
            { value: "3 days", label: "Three days' notice before the event is enough." },
            { value: "Same day", label: "Price and date availability in your inbox the same day." },
            { value: "1,000+", label: "Events set up from Istanbul across 10 provinces." },
            { value: "2+", label: "At least 2 technicians on site throughout the event." },
        ],
        softwareLink: "We also build custom software for brands",
        ctaTitle: "Let's build your next event",
        ctaAccent: "together",
        ctaLede: "Share the date, city and guest count; we send the right experience and price the same day.",
        ctaSecondary: "See the deck (TR)",
    },
};

/** Draws one phrase of the headline in the accent colour. */
function withAccent(text: string, accent: string) {
    const at = text.indexOf(accent);
    if (at < 0) return text;
    return (
        <>
            {text.slice(0, at)}
            <span className="hc-accent">{accent}</span>
            {text.slice(at + accent.length)}
        </>
    );
}

function SectionHead({ id, title, lede, href, linkLabel }: { id: string; title: string; lede?: string; href?: string; linkLabel?: string }) {
    return (
        <div className="hc-head" data-reveal>
            <div className="hc-head__copy">
                <h2 id={id} className="hc-h2">{title}</h2>
                {lede && <p className="hc-lede">{lede}</p>}
            </div>
            {href && linkLabel && <Link href={href} className="hc-btn hc-btn--ghost">{linkLabel} →</Link>}
        </div>
    );
}

export default function HomeCalm({
    locale,
    projects,
    services,
}: {
    locale: Phase2Locale;
    projects: HomeProject[];
    services: HomeService[];
}) {
    const copy = homeCopy(locale);
    const t = calm[locale];
    const featured = FEATURED.flatMap((key) => services.filter((service) => service.key === key && service.image));
    const showcase = SHOWCASE_PREFERRED.map((key) => projects.find((project) => project.key === key)).find(Boolean) ?? projects[0];
    const shownProjects = projects.filter((project) => project !== showcase).slice(0, 3);
    const marquee = [...t.marquee, ...t.marquee];

    return (
        <article className="ms-page hc">
            <section className="hc-hero" aria-labelledby="hc-title">
                <div className="hc-hero__light" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <div className="hc-hero__copy">
                    <h1 id="hc-title" className="hc-h1">{withAccent(copy.heroTitle, t.accent)}</h1>
                    <p className="hc-hero__lede">{copy.heroLede}</p>
                    <div className="hc-actions">
                        <Link href={copy.routes.contact} className="hc-btn hc-btn--acc">{t.primary}</Link>
                        <Link href={copy.routes.products} className="hc-btn hc-btn--dark">{t.secondary}</Link>
                    </div>
                    <p className="hc-hero__trust">{t.trust}</p>
                </div>
                <span className="hc-hero__down" aria-hidden="true">↓</span>
            </section>

            <section className="hc-proof" aria-label={t.trust}>
                <ul className="hc-logos">
                    {brands.slice(0, LOGO_COUNT).map((brand) => (
                        <li key={brand.name}>
                            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/PNG logos */}
                            <img src={brand.src} alt={brand.name} loading="lazy" className={brand.variant ? `hc-logo hc-logo--${brand.variant}` : "hc-logo"} />
                        </li>
                    ))}
                </ul>
                <div className="hc-marquee" aria-hidden="true">
                    <div className="hc-marquee__track">
                        {marquee.map((item, index) => (
                            <span key={index}>{item}<i>•</i></span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="hc-section" aria-labelledby="hc-paths">
                <SectionHead id="hc-paths" title={t.pathsTitle} lede={t.pathsLede} />
                <ol className="hc-rows">
                    {copy.audience.items.map((item, index) => (
                        <li key={item.name} data-reveal>
                            <Link href={item.href} className="hc-row">
                                <span className="hc-row__num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                                <h3 className="hc-row__title">{item.name}</h3>
                                <p className="hc-row__copy">{item.desc}</p>
                                <span className="hc-row__go" aria-hidden="true">→</span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </section>

            {featured.length > 0 && (
                <section className="hc-section" aria-labelledby="hc-svc">
                    <SectionHead id="hc-svc" title={t.servicesTitle} lede={t.servicesLede} href={copy.routes.capabilities} linkLabel={t.servicesAll} />
                    <ul className="hc-cards hc-cards--4">
                        {featured.map((service) => (
                            <li key={service.key} data-reveal>
                                <Link href={service.href} className="hc-photo hc-photo--tall">
                                    <MsImg src={service.image!} alt={service.name} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                                    <span className="hc-photo__body">
                                        <h3 className="hc-photo__title">{service.name}</h3>
                                        <span className="hc-photo__copy">{service.desc}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {showcase && (
                <section className="hc-section" aria-label={`${t.showcaseLabel}: ${showcase.title}`}>
                    <Link href={showcase.href} className="hc-showcase" data-reveal>
                        <MsImg src={showcase.image} alt={showcase.title} sizes="100vw" />
                        <span className="hc-showcase__body">
                            <span className="hc-photo__tag">{t.showcaseLabel} · {showcase.client}</span>
                            <span className="hc-showcase__title">{showcase.title}</span>
                        </span>
                        <span className="hc-showcase__go" aria-hidden="true">↗</span>
                    </Link>
                </section>
            )}

            {shownProjects.length > 0 && (
                <section className="hc-section" aria-labelledby="hc-work">
                    <SectionHead id="hc-work" title={t.projectsTitle} lede={t.projectsLede} href={copy.routes.work} linkLabel={t.projectsAll} />
                    <ul className="hc-cards hc-cards--3">
                        {shownProjects.map((project) => (
                            <li key={project.key} data-reveal>
                                <Link href={project.href} className="hc-photo">
                                    <MsImg src={project.image} alt={project.title} sizes="(max-width: 700px) 100vw, 33vw" />
                                    <span className="hc-photo__body">
                                        <span className="hc-photo__tag">{project.client}</span>
                                        <h3 className="hc-photo__title">{project.title}</h3>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="hc-section" aria-labelledby="hc-why">
                <SectionHead id="hc-why" title={t.whyTitle} lede={t.whyLede} />
                <ul className="hc-facts">
                    {t.why.map((item) => (
                        <li key={item.value} data-reveal>
                            <strong>{item.value}</strong>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
                {copy.software && <Link href={copy.software.href} className="hc-link" data-reveal>{t.softwareLink} →</Link>}
            </section>

            <section className="hc-section hc-section--last" aria-labelledby="hc-cta">
                <div className="hc-cta" data-reveal>
                    <h2 id="hc-cta" className="hc-h2 hc-cta__title">
                        {t.ctaTitle} <span className="hc-accent">{t.ctaAccent}</span>
                    </h2>
                    <p className="hc-lede">{t.ctaLede}</p>
                    <div className="hc-actions">
                        <Link href={copy.routes.contact} className="hc-btn hc-btn--acc">{t.primary}</Link>
                        <Link href={copy.deck.href} className="hc-btn hc-btn--dark">{t.ctaSecondary}</Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
