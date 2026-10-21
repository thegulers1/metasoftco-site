import { shortServiceTitle } from "@/lib/service-listing";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import { MsCrumbs, MsFacts, MsFaq, MsSectionHead, MsWords } from "@/components/site-ms/parts";
import { MsCatalog } from "@/components/site-ms/interactive";
import { EVENT_SOFTWARE_HUB_PATH, eventSoftwareHub as copy } from "@/lib/event-software-hub";
import { DATA_CAPTURE_HUB_PATH } from "@/lib/data-capture-hub";
import { SOFTWARE_CATEGORY_PATH } from "@/lib/software";
import { rentalAreaServed } from "@/lib/rental-ops";
import { AlternateUrl } from "../data-capture-crm/AlternateUrl";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

const url = `${siteConfig.url}${EVENT_SOFTWARE_HUB_PATH}`;

export const metadata: Metadata = {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.keywords,
    openGraph: {
        title: copy.metaTitle,
        description: copy.metaDescription,
        url,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630 }],
        locale: "tr_TR",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.metaDescription },
    alternates: { canonical: url },
};

/** Featured event activations, i.e. the physical side the micro-site plugs into. */
async function getActivities() {
    return prisma.service.findMany({
        where: { featured: true, published: true, type: "RENTAL", image: { not: null } },
        include: { category: true },
        orderBy: [{ featuredOrder: "asc" }, { order: "asc" }],
        take: 6,
    });
}

export default async function EventSoftwareHubPage() {
    const activities = await getActivities();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
        { name: copy.crumb, url },
    ]);
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Etkinlik Mikro Sitesi, Uygulaması ve Fiziksel Kurulum",
        serviceType: "Etkinlik teknolojisi ve etkinlik yazılımı",
        description: copy.metaDescription,
        url,
        areaServed: rentalAreaServed(),
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    };
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: copy.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    return (
        <article className="ms-page">
            {[breadcrumbSchema, serviceSchema, faqSchema].map((schema, index) => (
                <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <AlternateUrl trUrl={EVENT_SOFTWARE_HUB_PATH} />

            <section className="ms-hero">
                <MsCrumbs items={[{ href: "/", label: "ANA SAYFA" }, { href: "/hizmetler", label: "HİZMETLER" }, { label: copy.crumb.toLocaleUpperCase("tr-TR") }]} />
                <h1 className="ms-h1 ms-h1--long" aria-label={`${copy.titleSolid} ${copy.titleOutline}`}>
                    <MsWords text={`${copy.titleSolid}\n${copy.titleOutline}`} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 760 }}>{copy.lede}</p>
                    <div className="ms-actions">
                        <Link href="/iletisim" className="ms-pill ms-pill--acc">{copy.ctaPrimary.toLocaleUpperCase("tr-TR")} ↗</Link>
                        <Link href={SOFTWARE_CATEGORY_PATH} className="ms-pill ms-pill--line">{copy.ctaSecondary.toLocaleUpperCase("tr-TR")}</Link>
                    </div>
                </div>
                <MsFacts facts={copy.facts} />
            </section>

            <section className="ms-section" aria-labelledby="es-steps">
                <MsSectionHead id="es-steps" title={copy.stepsTitle} meta="NASIL ÇALIŞIR" />
                <div className="ms-cards">
                    {copy.steps.map((item, index) => (
                        <div key={item.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{item.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section" aria-labelledby="es-why">
                <MsSectionHead id="es-why" title={copy.whyTitle} meta="NEDEN" />
                <p className="ms-lede" data-reveal>{copy.whyIntro}</p>
                <div className="ms-cards">
                    {copy.why.map((item, index) => (
                        <div key={item.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{item.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section" aria-labelledby="es-build">
                <MsSectionHead id="es-build" title={copy.buildTitle} meta="NELER GELİŞTİRİYORUZ" />
                <div className="ms-cards">
                    {copy.build.map((item, index) => (
                        <div key={item.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{item.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section" aria-labelledby="es-proof">
                <MsSectionHead id="es-proof" title={copy.proofTitle} meta="SAHADAN" />
                <div className="ms-cards">
                    {copy.proof.map((item, index) => (
                        <div key={item.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{item.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
                <div className="ms-actions">
                    <Link href={DATA_CAPTURE_HUB_PATH} className="ms-pill ms-pill--line">DATA-CAPTURE &amp; CRM MODÜLÜNÜ İNCELEYİN →</Link>
                </div>
            </section>

            {activities.length > 0 && (
                <section aria-labelledby="es-activities" style={{ paddingTop: "4vw" }}>
                    <div style={{ padding: "0 var(--ms-gut)" }}>
                        <MsSectionHead id="es-activities" title={copy.activitiesTitle} meta="DENEYİMLER" />
                    </div>
                    <MsCatalog
                        itemHeading="h3"
                        items={activities.map((service) => ({ key: service.id, href: `/hizmetler/${service.category.slug}/${service.slug}`, name: shortServiceTitle(service.title, service.homeTitle), image: service.image }))}
                        allLabel=""
                        countLabel="DENEYİM"
                        labels={{ grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" }}
                        showChips={false}
                    />
                    <div className="ms-actions" style={{ padding: "0 var(--ms-gut)" }}>
                        <Link href="/hizmetler" className="ms-pill ms-pill--line">{copy.activitiesLink.toLocaleUpperCase("tr-TR")} →</Link>
                    </div>
                </section>
            )}

            <section className="ms-faq-wrap" aria-labelledby="es-faq">
                <div className="ms-faq-wrap__aside" data-reveal>
                    <h2 id="es-faq" className="ms-h2">{copy.faqTitle}<span className="ms-acc">.</span></h2>
                    <p>Aradığınız cevap burada yoksa bize yazın; aynı gün dönüş yapalım.</p>
                </div>
                <MsFaq items={copy.faq} />
            </section>
        </article>
    );
}
