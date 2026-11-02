import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { homeCopy, type HomeServiceKey } from "@/lib/home-content";
import { brands } from "@/lib/brands";
import { MsImg } from "@/components/site-ms/interactive";
import type { HomeProject, HomeService } from "./HomeExperience";
import "./home-calm.css";

/**
 * Homepage, calm version (November 2026). One idea per section, every section
 * built the same way (title, one sentence, at most four items, a "see all"
 * link), one quiet ambient light in the hero and nothing else that moves.
 * Navigation, closing block and floating actions come from the shared site
 * chrome (src/components/site-ms/MsChrome.tsx), so the homepage and inner
 * pages are one site.
 */

const FEATURED: HomeServiceKey[] = ["ai-photo", "photobooth", "strip-photo", "gift-wheel"];
const LOGO_COUNT = 12;

const calm = {
    tr: {
        primary: "Etkinlik için teklif al",
        secondary: "Kalıcı kurulum için satın al",
        stats: [
            { value: "1.000+", label: "etkinlik" },
            { value: "10", label: "ilde kurulum" },
            { value: "100+", label: "marka" },
            { value: "Aynı gün", label: "teklif" },
        ],
        audienceLede: "İhtiyacınıza göre en kısa yoldan ilerleyin.",
        servicesTitle: "En çok kiralanan deneyimler",
        servicesLede: "Kurulum, markanıza özel tasarım ve sahadaki ekip her kiralamada dahil.",
        servicesAll: "Tüm deneyimler",
        projectsTitle: "Seçili projeler",
        projectsLede: "Markalarla birlikte sahaya çıkardığımız işlerden birkaçı.",
        projectsAll: "Tüm projeler",
        brandsTitle: "100+ markanın tercihi",
        whyTitle: "Neden Metasoft?",
        why: [
            { title: "3 gün yeter", copy: "Etkinlikten 3 gün önce haber vermeniz yeterli; cihaz, kurulum ve ekip bizden." },
            { title: "Teklif aynı gün", copy: "Tarih, şehir ve kişi sayısını paylaşın; fiyatı ve uygunluğu aynı gün iletelim." },
            { title: "Yazılımı biz yazıyoruz", copy: "Sahadaki her deneyimin yazılımı kendi ekibimizden; markanıza göre uyarlanır." },
            { title: "Sahada kendi ekibimiz", copy: "Etkinlik boyunca en az 2 teknik personel; kurulumdan sökümüne aynı ekip." },
        ],
        softwareLink: "Yazılım hizmetleri",
        deckCta: "Sunumu aç",
    },
    en: {
        primary: "Get an event quote",
        secondary: "Buy for a permanent spot",
        stats: [
            { value: "1,000+", label: "events" },
            { value: "10", label: "provinces" },
            { value: "100+", label: "brands" },
            { value: "Same-day", label: "quotes" },
        ],
        audienceLede: "Take the shortest route for what you need.",
        servicesTitle: "Most rented experiences",
        servicesLede: "Setup, brand-specific design and the on-site team come with every rental.",
        servicesAll: "All experiences",
        projectsTitle: "Selected work",
        projectsLede: "A few of the experiences we have taken to the floor with brands.",
        projectsAll: "All projects",
        brandsTitle: "Chosen by 100+ brands",
        whyTitle: "Why Metasoft?",
        why: [
            { title: "Three days is enough", copy: "Three days' notice is enough; devices, setup and crew are on us." },
            { title: "Same-day quotes", copy: "Share the date, city and guest count; we send price and availability the same day." },
            { title: "We write the software", copy: "Every experience on site runs on our own software, adapted to your brand." },
            { title: "Our own crew on site", copy: "At least 2 technicians throughout the event; the same team from setup to teardown." },
        ],
        softwareLink: "Software services",
        deckCta: "Open the deck (TR)",
    },
};

function SectionHead({ id, title, lede, href, linkLabel }: { id: string; title: string; lede?: string; href?: string; linkLabel?: string }) {
    return (
        <div className="hc-head" data-reveal>
            <div>
                <h2 id={id} className="hc-h2">{title}</h2>
                {lede && <p className="hc-lede">{lede}</p>}
            </div>
            {href && linkLabel && <Link href={href} className="hc-link">{linkLabel} →</Link>}
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
    const featured = FEATURED.flatMap((key) => services.filter((service) => service.key === key));

    return (
        <article className="ms-page hc">
            <section className="hc-hero" aria-labelledby="hc-title">
                <div className="hc-hero__light" aria-hidden="true" />
                <div className="hc-hero__copy">
                    <h1 id="hc-title" className="hc-h1">{copy.heroTitle}</h1>
                    <p className="hc-hero__lede">{copy.heroLede}</p>
                    <div className="hc-actions">
                        <Link href={copy.routes.contact} className="hc-btn hc-btn--acc">{t.primary}</Link>
                        <Link href={copy.routes.products} className="hc-btn hc-btn--line">{t.secondary}</Link>
                    </div>
                </div>
            </section>

            <ul className="hc-stats" aria-label={locale === "en" ? "Metasoft in numbers" : "Rakamlarla Metasoft"}>
                {t.stats.map((stat) => (
                    <li key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </li>
                ))}
            </ul>

            <section className="hc-section" aria-labelledby="hc-aud">
                <SectionHead id="hc-aud" title={copy.audience.title} lede={t.audienceLede} />
                <ul className="hc-grid hc-grid--4">
                    {copy.audience.items.map((item) => (
                        <li key={item.name} className="hc-card hc-card--text" data-reveal>
                            <h3 className="hc-h3">{item.name}</h3>
                            <p>{item.desc}</p>
                            <Link href={item.href} className="hc-link">{item.cta}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            {featured.length > 0 && (
                <section className="hc-section" aria-labelledby="hc-svc">
                    <SectionHead id="hc-svc" title={t.servicesTitle} lede={t.servicesLede} href={copy.routes.capabilities} linkLabel={t.servicesAll} />
                    <ul className="hc-grid hc-grid--4">
                        {featured.map((service) => (
                            <li key={service.key} data-reveal>
                                <Link href={service.href} className="hc-card hc-card--media">
                                    <span className="hc-card__media">
                                        {service.image && <MsImg src={service.image} alt={service.name} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />}
                                    </span>
                                    <h3 className="hc-h3">{service.name}</h3>
                                    <p>{service.desc}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {projects.length > 0 && (
                <section className="hc-section" aria-labelledby="hc-work">
                    <SectionHead id="hc-work" title={t.projectsTitle} lede={t.projectsLede} href={copy.routes.work} linkLabel={t.projectsAll} />
                    <ul className="hc-grid hc-grid--3">
                        {projects.slice(0, 3).map((project) => (
                            <li key={project.key} data-reveal>
                                <Link href={project.href} className="hc-card hc-card--media">
                                    <span className="hc-card__media hc-card__media--wide">
                                        <MsImg src={project.image} alt={project.title} sizes="(max-width: 700px) 100vw, 33vw" />
                                    </span>
                                    <span className="hc-card__meta">{project.client}</span>
                                    <h3 className="hc-h3">{project.title}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="hc-section" aria-labelledby="hc-brands">
                <SectionHead id="hc-brands" title={t.brandsTitle} />
                <ul className="hc-logos" data-reveal>
                    {brands.slice(0, LOGO_COUNT).map((brand) => (
                        <li key={brand.name}>
                            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/PNG logos */}
                            <img src={brand.src} alt={brand.name} loading="lazy" className={brand.variant ? `hc-logo hc-logo--${brand.variant}` : "hc-logo"} />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="hc-section" aria-labelledby="hc-why">
                <SectionHead id="hc-why" title={t.whyTitle} />
                <ul className="hc-grid hc-grid--4">
                    {t.why.map((item, index) => (
                        <li key={item.title} className="hc-card hc-card--text" data-reveal>
                            <h3 className="hc-h3">{item.title}</h3>
                            <p>{item.copy}</p>
                            {index === 2 && copy.software && <Link href={copy.software.href} className="hc-link">{t.softwareLink} →</Link>}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="hc-section" aria-labelledby="hc-deck">
                <div className="hc-deck" data-reveal>
                    <div>
                        <h2 id="hc-deck" className="hc-h2">{copy.deck.title}</h2>
                        <p className="hc-lede">{copy.deck.lede}</p>
                    </div>
                    <Link href={copy.deck.href} className="hc-btn hc-btn--line">{t.deckCta} ↗</Link>
                </div>
            </section>
        </article>
    );
}
