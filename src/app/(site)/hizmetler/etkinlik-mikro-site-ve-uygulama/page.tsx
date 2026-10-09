import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import { SignalHeading } from "@/components/phase2/SignalHeading";
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
        <article className="phase2 p2-screen p2-service-detail p2-dc-hub">
            {[breadcrumbSchema, serviceSchema, faqSchema].map((schema, index) => (
                <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <AlternateUrl trUrl={EVENT_SOFTWARE_HUB_PATH} />

            <header className="p2-container p2-detail-top">
                <nav className="p2-detail-top__crumb" aria-label="Hizmetler">
                    <Link href="/">Ana Sayfa</Link>
                    <span>{"  /  "}</span>
                    <Link href="/hizmetler">Hizmetler</Link>
                    <span>{"  /  "}</span>
                    <span>{copy.crumb}</span>
                </nav>
                <div className="p2-detail-top__heading">
                    <SignalHeading solid={copy.titleSolid} outline={copy.titleOutline} />
                    <div className="p2-heading-copy">
                        <p>{copy.lede}</p>
                    </div>
                </div>
                <dl>
                    {copy.facts.map((fact) => (
                        <div key={fact.term}>
                            <dt>{fact.term}</dt>
                            <dd>{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </header>

            <section className="p2-container p2-detail-section p2-dc-section">
                <h2>{copy.stepsTitle}</h2>
                <ol className="p2-dc-cards p2-dc-cards--4">
                    {copy.steps.map((step, index) => (
                        <li key={step.title}>
                            <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="p2-container p2-detail-section p2-dc-section">
                <h2>{copy.whyTitle}</h2>
                <p className="p2-dc-intro">{copy.whyIntro}</p>
                <ul className="p2-dc-cards p2-dc-cards--2">
                    {copy.why.map((item) => (
                        <li key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="p2-container p2-detail-section p2-dc-section">
                <h2>{copy.buildTitle}</h2>
                <ul className="p2-dc-cards p2-dc-cards--4">
                    {copy.build.map((item) => (
                        <li key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="p2-container p2-detail-section p2-dc-section">
                <h2>{copy.proofTitle}</h2>
                <ul className="p2-dc-cards p2-dc-cards--2">
                    {copy.proof.map((item) => (
                        <li key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ul>
                <p className="p2-dc-more">
                    <Link href={DATA_CAPTURE_HUB_PATH} className="p2-back-link">
                        Data-Capture & CRM modülünü inceleyin <ArrowRight aria-hidden="true" />
                    </Link>
                </p>
            </section>

            {activities.length > 0 && (
                <section className="p2-container p2-detail-section p2-detail-section--related">
                    <h2>{copy.activitiesTitle}</h2>
                    <div className="p2-cap-grid">
                        {activities.map((service, index) => (
                            <Link key={service.id} className="p2-cap-card" href={`/hizmetler/${service.category.slug}/${service.slug}`}>
                                <div className="p2-cap-card__media">
                                    {service.image && <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />}
                                </div>
                                <div className="p2-cap-card__body">
                                    <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                                    <h3>{service.title}</h3>
                                    <span className="p2-card-link">
                                        Hizmeti İncele <ArrowRight aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p className="p2-dc-more">
                        <Link href="/hizmetler" className="p2-back-link">
                            {copy.activitiesLink} <ArrowRight aria-hidden="true" />
                        </Link>
                    </p>
                </section>
            )}

            <section className="p2-container p2-detail-section p2-detail-section--faq">
                <h2>{copy.faqTitle}</h2>
                <div className="p2-screen-faq">
                    {copy.faq.map((item, index) => (
                        <details key={item.q}>
                            <summary>
                                <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                                <h3>{item.q}</h3>
                                <i aria-hidden="true">+</i>
                            </summary>
                            <p>{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <div className="p2-screen-cta__actions">
                        <Link href="/iletisim" className="p2-screen-button">{copy.ctaPrimary} <ArrowRight aria-hidden="true" /></Link>
                        <Link href={SOFTWARE_CATEGORY_PATH} className="p2-screen-button p2-screen-button--secondary">{copy.ctaSecondary} <ArrowRight aria-hidden="true" /></Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
