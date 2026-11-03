import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { homeCopy, type HomeServiceKey } from "@/lib/home-content";
import { brands } from "@/lib/brands";
import { projectActivity } from "@/lib/title-case";
import { MsImg } from "@/components/site-ms/interactive";
import type { HomeProject, HomeService } from "./HomeExperience";
import "./home-calm.css";

/**
 * Homepage (November 2026). Calm, but with weight: a full-screen centred hero
 * with one accent phrase and a living light, client logos sliding past, two
 * doors (rent / buy), photography-led cards and one framed closing call.
 * Few elements, each one big. Navigation, footer and floating actions come
 * from the shared site chrome (src/components/site-ms/MsChrome.tsx).
 */

const FEATURED: HomeServiceKey[] = ["ai-photo", "photobooth", "strip-photo", "gift-wheel"];
/** Projects whose cover is an on-site photograph; poster-like covers with baked-in text are skipped. */
const PROJECTS_PREFERRED = ["rollic-summer-party-x-seri-t-foto", "origins-x-kabin-fotograf-aktivitesi", "ray-ban-x-strip-photo"];
const POSTER_COVERS = new Set(["tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi"]);

const calm = {
    tr: {
        accent: "akılda kalan",
        trust: "100+ marka, 1.000+ etkinlik. Kendi yazılımımız, kendi cihazımız, kendi ekibimiz.",
        rent: {
            kicker: "Kiralama",
            title: "Etkinliğiniz için kiralayın",
            copy: "AI photobooth, fotoğraf ve interaktif oyunlar. Kurulum, markanıza özel tasarım ve sahadaki ekip dahil.",
            points: ["3 gün önceden haber yeterli", "Fiyat aynı gün", "Türkiye geneli kurulum"],
            cta: "Deneyimleri görün",
            extra: [{ label: "Yılbaşı partisi", href: "/hizmetler/yilbasi-partisi-aktiviteleri" }, { label: "Kurumsal sunum", href: "/sunum" }],
        },
        buy: {
            kicker: "Satın alma",
            title: "Mekânınız için satın alın",
            copy: "Mağaza, showroom, ofis ya da müze için kalıcı kurulum. Sistem mekânınıza göre üretilir, yazılımıyla birlikte teslim edilir.",
            points: ["Mekâna özel üretim", "Kurulum ve eğitim", "Uzaktan destek"],
            cta: "Satın alma seçenekleri",
        },
        primary: "Etkinlik için teklif al",
        secondary: "Kalıcı kurulum için satın al",
        pathsTitle: "Kiralamak mı, satın almak mı?",
        pathsLede: "Tek seferlik bir etkinlik için kiralayın, kalıcı bir mekân için satın alın.",
        servicesTitle: "En çok kiralanan deneyimler",
        servicesLede: "Kurulum, markanıza özel tasarım ve sahadaki ekip her kiralamada dahil.",
        servicesAll: "Tüm deneyimler",
        projectsTitle: "Markalarla sahaya çıkardıklarımız",
        projectsLede: "Fikirden kuruluma, gece boyunca sahadaki ekibe kadar bizim imzamızı taşıyan işler.",
        projectsAll: "Tüm projeler",
        whyTitle: "3 gün yeter.",
        whyLede: "Yazılımı kendimiz yazıyor, cihazı kendimiz kuruyor, sahada kendimiz duruyoruz; bu yüzden hızlıyız.",
        why: [
            { value: "1 priz", label: "Tek bir 220V priz yeterli; interneti kendi 5G altyapımızla getiririz." },
            { value: "Aynı gün", label: "Fiyat ve tarih uygunluğu aynı gün elinizde." },
            { value: "1.000+", label: "İstanbul'dan Türkiye'nin 10 iline kurulum." },
            { value: "2+", label: "Etkinlik boyunca sahada en az 2 teknik personel." },
        ],
        softwareLink: "Markanıza özel yazılım da geliştiriyoruz",
        ctaTitle: "Tarihinizi söyleyin,",
        ctaAccent: "teklifi bugün alın",
        ctaLede: "Tarih, şehir ve kişi sayısını paylaşın; size uygun deneyimi ve fiyatı aynı gün iletelim.",
        ctaSecondary: "Sunumu inceleyin",
    },
    en: {
        accent: "Unforgettable",
        trust: "100+ brands, 1,000+ events. Our own software, our own booths, our own crew.",
        rent: {
            kicker: "Rental",
            title: "Rent for your event",
            copy: "AI photobooths, photo experiences and interactive games. Setup, brand-specific design and the on-site crew included.",
            points: ["Three days' notice is enough", "Price the same day", "Setup across Türkiye"],
            cta: "See the experiences",
            extra: [{ label: "Company deck (TR)", href: "/sunum" }],
        },
        buy: {
            kicker: "Purchase",
            title: "Buy for your space",
            copy: "A permanent setup for a store, showroom, office or museum. Built for your space and delivered with its software.",
            points: ["Built for your space", "Setup and training", "Remote support"],
            cta: "Purchase options",
        },
        primary: "Get an event quote",
        secondary: "Buy for a permanent spot",
        pathsTitle: "Rent or buy?",
        pathsLede: "Rent for a one-off event, buy for a permanent space.",
        servicesTitle: "Most rented experiences",
        servicesLede: "Setup, brand-specific design and the on-site team come with every rental.",
        servicesAll: "All experiences",
        projectsTitle: "Taken to the floor with brands",
        projectsLede: "From the idea to the setup and the crew on the night, work that carries our signature.",
        projectsAll: "All projects",
        whyTitle: "Three days is enough.",
        whyLede: "We write the software, build the booth and stand on site ourselves.",
        why: [
            { value: "1 socket", label: "One 220V socket is enough; we bring our own 5G internet." },
            { value: "Same day", label: "Price and date availability in your inbox the same day." },
            { value: "1,000+", label: "Events set up from Istanbul across 10 provinces." },
            { value: "2+", label: "At least 2 technicians on site throughout the event." },
        ],
        softwareLink: "We also build custom software for brands",
        ctaTitle: "Tell us the date,",
        ctaAccent: "get the quote today",
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
    const preferred = PROJECTS_PREFERRED.flatMap((key) => projects.filter((project) => project.key === key));
    const shownProjects = [...preferred, ...projects.filter((project) => !preferred.includes(project) && !POSTER_COVERS.has(project.key))].slice(0, 3);

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
                {/* Every client logo, sliding slowly; the list is drawn twice so the loop is seamless. */}
                <div className="hc-logos">
                    <ul className="hc-logos__track">
                        {[...brands, ...brands].map((brand, index) => (
                            <li key={`${brand.name}-${index}`} aria-hidden={index >= brands.length ? true : undefined}>
                                {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/PNG logos */}
                                <img
                                    src={brand.src}
                                    alt={index < brands.length ? brand.name : ""}
                                    width={brand.width}
                                    className={brand.variant ? `hc-logo hc-logo--${brand.variant}` : "hc-logo"}
                                    style={{ width: Math.round(Math.min(brand.width, 120) * 0.85) }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>


            <section className="hc-section" aria-labelledby="hc-paths">
                <SectionHead id="hc-paths" title={t.pathsTitle} lede={t.pathsLede} />
                <div className="hc-doors">
                    {([
                        { key: "rent", data: t.rent, href: copy.routes.capabilities, primary: true },
                        { key: "buy", data: t.buy, href: copy.routes.products, primary: false },
                    ] as const).map(({ key, data, href, primary }, index) => (
                        <article key={key} className={`hc-door${primary ? " hc-door--primary" : ""}`} data-reveal style={{ ["--d" as string]: `${index * 0.08}s` }}>
                            <span className="hc-door__kicker">{data.kicker}</span>
                            <h3 className="hc-door__title">{data.title}</h3>
                            <p className="hc-door__copy">{data.copy}</p>
                            <ul className="hc-door__points">
                                {data.points.map((point) => <li key={point}>{point}</li>)}
                            </ul>
                            <div className="hc-door__foot">
                                <Link href={href} className={`hc-btn ${primary ? "hc-btn--acc" : "hc-btn--dark"}`}>{data.cta} →</Link>
                                {"extra" in data && data.extra.map((link) => (
                                    <Link key={link.href} href={link.href} className="hc-link">{link.label} →</Link>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {featured.length > 0 && (
                <section className="hc-section" aria-labelledby="hc-svc">
                    <SectionHead id="hc-svc" title={t.servicesTitle} lede={t.servicesLede} href={copy.routes.capabilities} linkLabel={t.servicesAll} />
                    <ul className="hc-cards hc-cards--4">
                        {featured.map((service, index) => (
                            <li key={service.key} data-reveal style={{ ["--d" as string]: `${index * 0.08}s` }}>
                                <Link href={service.href} className="hc-item">
                                    <span className="hc-item__media hc-item__media--tall">
                                        <MsImg src={service.image!} alt={service.name} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                                    </span>
                                    <h3 className="hc-item__title">{service.name}</h3>
                                    <p className="hc-item__copy">{service.desc}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {shownProjects.length > 0 && (
                <section className="hc-section" aria-labelledby="hc-work">
                    <SectionHead id="hc-work" title={t.projectsTitle} lede={t.projectsLede} href={copy.routes.work} linkLabel={t.projectsAll} />
                    <ul className="hc-cards hc-cards--3">
                        {shownProjects.map((project, index) => (
                            <li key={project.key} data-reveal style={{ ["--d" as string]: `${index * 0.08}s` }}>
                                <Link href={project.href} className="hc-item">
                                    <span className="hc-item__media">
                                        <MsImg src={project.image} alt={project.title} sizes="(max-width: 700px) 100vw, 33vw" />
                                    </span>
                                    <span className="hc-item__tag">{project.client}</span>
                                    <h3 className="hc-item__title">{projectActivity(project.title, project.client)}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="hc-section" aria-labelledby="hc-why">
                <SectionHead id="hc-why" title={t.whyTitle} lede={t.whyLede} />
                <ul className="hc-facts">
                    {t.why.map((item, index) => (
                        <li key={item.value} data-reveal style={{ ["--d" as string]: `${index * 0.08}s` }}>
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
