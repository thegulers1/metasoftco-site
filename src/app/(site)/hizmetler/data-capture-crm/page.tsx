import fs from "node:fs";
import path from "node:path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import { MsCrumbs, MsFacts, MsFaq, MsSectionHead, MsWords } from "@/components/site-ms/parts";
import { MsCatalog } from "@/components/site-ms/interactive";
import { DATA_CAPTURE_HUB_PATH, dataCaptureHub as copy } from "@/lib/data-capture-hub";
import { EVENT_SOFTWARE_HUB_PATH } from "@/lib/event-software-hub";
import { AlternateUrl } from "./AlternateUrl";
import { PanelMockup } from "./PanelMockup";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

const url = `${siteConfig.url}${DATA_CAPTURE_HUB_PATH}`;

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

/** A real dashboard screenshot dropped into public/data-capture/ replaces the mockup. */
function findPanelImage(): string | null {
    for (const ext of ["webp", "png", "jpg"]) {
        const file = `data-capture/panel.${ext}`;
        if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`;
    }
    return null;
}

async function getActivities() {
    return prisma.service.findMany({
        where: { dataCapture: true, published: true, type: "RENTAL", image: { not: null } },
        include: { category: true },
        orderBy: [{ featured: "desc" }, { featuredOrder: "asc" }, { order: "asc" }],
        take: 6,
    });
}

export default async function DataCaptureHubPage() {
    const activities = await getActivities();
    const panelImage = findPanelImage();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
        { name: copy.crumb, url },
    ]);
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Data-Capture & CRM — Etkinlik Lead Toplama",
        description: copy.metaDescription,
        url,
        areaServed: "TR",
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
            <AlternateUrl trUrl={DATA_CAPTURE_HUB_PATH} />

            <section className="ms-hero">
                <MsCrumbs items={[{ href: "/", label: "ANA SAYFA" }, { href: "/hizmetler", label: "HİZMETLER" }, { label: copy.crumb.toLocaleUpperCase("tr-TR") }]} />
                <h1 className="ms-h1 ms-h1--long" aria-label={`${copy.titleSolid} ${copy.titleOutline}`}>
                    <MsWords text={`${copy.titleSolid}\n${copy.titleOutline}`} accent={copy.titleOutline.split(/\s+/).map((_, i) => copy.titleSolid.split(/\s+/).length + i)} />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 760 }}>{copy.lede}</p>
                    <div className="ms-actions">
                        <Link href="/iletisim" className="ms-pill ms-pill--acc">{copy.ctaPrimary.toLocaleUpperCase("tr-TR")} ↗</Link>
                    </div>
                </div>
                <MsFacts facts={copy.facts} />
            </section>

            <section className="ms-section" aria-labelledby="dc-steps">
                <MsSectionHead id="dc-steps" title={copy.stepsTitle} meta="NASIL ÇALIŞIR" />
                <div className="ms-cards">
                    {copy.steps.map((step, index) => (
                        <div key={step.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{step.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{step.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="ms-section" aria-labelledby="dc-panel">
                <MsSectionHead id="dc-panel" title={copy.panelTitle} meta="MÜŞTERİ PANELİ" />
                <div className="ms-story">
                    <div className="ms-story__copy" data-reveal>
                        <p className="ms-lede">{copy.panelIntro}</p>
                        <ul className="ms-dl" style={{ margin: 0 }}>
                            {copy.panelFeatures.map((feature) => (
                                <li key={feature.title} style={{ display: "grid", gridTemplateColumns: "minmax(110px, 0.4fr) minmax(0, 1fr)", gap: 16, padding: "16px 0", borderTop: "1px solid var(--ms-line)" }}>
                                    <h3 className="ms-mono" style={{ margin: 0, fontWeight: 400, color: "var(--ms-acc)", textTransform: "uppercase" }}>{feature.title}</h3>
                                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.45, color: "var(--ms-soft)", maxWidth: "none" }}>{feature.body}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <figure className="ms-story__media" data-reveal style={{ aspectRatio: "auto", margin: 0 }}>
                        {panelImage ? (
                            <Image src={panelImage} alt="MetasoftCo Data-Capture müşteri paneli" width={1600} height={1000} sizes="(max-width: 760px) 100vw, 50vw" style={{ width: "100%", height: "auto" }} />
                        ) : (
                            <PanelMockup />
                        )}
                        <figcaption className="ms-mono ms-mut" style={{ padding: "12px 14px" }}>{copy.panelCaption}</figcaption>
                    </figure>
                </div>
            </section>

            <section className="ms-accent" aria-labelledby="dc-compliance">
                <div className="ms-head">
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <span className="ms-mono">KVKK · GDPR</span>
                        <h2 id="dc-compliance" className="ms-h2">{copy.complianceTitle}</h2>
                    </div>
                    <p style={{ margin: 0, maxWidth: 440, fontSize: 16, lineHeight: 1.5 }}>{copy.complianceIntro}</p>
                </div>
                <ul className="ms-accent__grid">
                    {copy.compliance.map((item) => (
                        <li key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ul>
                <p className="ms-accent__legal">{copy.legal}</p>
            </section>

            <section className="ms-section" aria-labelledby="dc-scenarios">
                <MsSectionHead id="dc-scenarios" title={copy.scenariosTitle} meta="SENARYOLAR" />
                <div className="ms-cards">
                    {copy.scenarios.map((item, index) => (
                        <div key={item.title} className="ms-card" data-reveal>
                            <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="ms-card__title">{item.title}</h3>
                            <p className="ms-card__body" style={{ margin: 0 }}>{item.body}</p>
                        </div>
                    ))}
                </div>
                <div className="ms-actions">
                    <Link href={EVENT_SOFTWARE_HUB_PATH} className="ms-pill ms-pill--line">MİKRO SİTE, QR DAVETİYE VE CHECK-IN İLE UÇTAN UCA KURGU →</Link>
                </div>
            </section>

            {activities.length > 0 && (
                <section aria-labelledby="dc-activities" style={{ paddingTop: "4vw" }}>
                    <div style={{ padding: "0 var(--ms-gut)" }}>
                        <MsSectionHead id="dc-activities" title={copy.activitiesTitle} meta="DATA-CAPTURE İLE ÇALIŞAN" />
                    </div>
                    <MsCatalog
                        items={activities.map((service) => ({ key: service.id, href: `/hizmetler/${service.category.slug}/${service.slug}`, name: service.title, image: service.image }))}
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

            <section className="ms-faq-wrap" aria-labelledby="dc-faq">
                <div className="ms-faq-wrap__aside" data-reveal>
                    <h2 id="dc-faq" className="ms-h2">{copy.faqTitle}<span className="ms-acc">.</span></h2>
                    <p>Aradığınız cevap burada yoksa bize yazın; aynı gün dönüş yapalım.</p>
                    <Link href="/projeler" className="ms-pill ms-pill--line">{copy.ctaSecondary.toLocaleUpperCase("tr-TR")} →</Link>
                </div>
                <MsFaq items={copy.faq} />
            </section>
        </article>
    );
}
