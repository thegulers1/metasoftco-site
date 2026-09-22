import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import { splitSignalTitle, type Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { addHeadingAnchors } from "@/lib/utils";
import { SignalHeading } from "./SignalHeading";

/** A service card already resolved to the active locale by the page. */
export interface P2CategoryService {
    id: string;
    title: string;
    image: string | null;
    href: string;
}

export interface CapabilityCategoryScreenProps {
    locale: Phase2Locale;
    /** Category name, used for the breadcrumb tail and as the heading fallback. */
    name: string;
    /** Editor-supplied display heading; falls back to the category name. */
    heroTitle?: string | null;
    heroCopy?: string | null;
    /** Editor-authored long-form HTML (H2/H3 + lists) rendered above the service grid. */
    contentHtml?: string | null;
    services: P2CategoryService[];
    faqs: { question: string; answer: string }[];
    /** ISO date string; rendered as a freshness signal next to the hero copy. */
    updatedAt?: string | null;
}

export default function CapabilityCategoryScreen({
    locale,
    name,
    heroTitle,
    heroCopy,
    contentHtml,
    services,
    faqs,
    updatedAt,
}: CapabilityCategoryScreenProps) {
    const formattedUpdatedAt = updatedAt
        ? new Date(updatedAt).toLocaleDateString(locale === "en" ? "en-GB" : "tr-TR", { year: "numeric", month: "long", day: "numeric" })
        : null;
    const dictionary = phase2Copy(locale);
    const copy = dictionary.capabilityCategory;
    const title = heroTitle?.trim() || name;
    const { solid, outline } = splitSignalTitle(title);

    return (
        <div className="phase2 p2-screen p2-cap-category">
            <header className="p2-container p2-detail-top">
                <nav className="p2-detail-top__crumb" aria-label={copy.crumbCapabilities}>
                    <Link href={dictionary.routes.home}>{copy.crumbHome}</Link>
                    <span>{"  /  "}</span>
                    <Link href={dictionary.routes.capabilities}>{copy.crumbCapabilities}</Link>
                    <span>{"  /  "}</span>
                    {name}
                </nav>
                <div className="p2-detail-top__heading">
                    <SignalHeading solid={solid} outline={outline} label={title} />
                    <div className="p2-heading-copy">
                        {heroCopy && <p>{heroCopy}</p>}
                        {formattedUpdatedAt && (
                            <p className="p2-updated-at">
                                {locale === "en" ? "Last updated" : "Son güncelleme"}: {formattedUpdatedAt}
                            </p>
                        )}
                    </div>
                </div>
                <dl>
                    {copy.facts.map((fact) => (
                        <div key={fact.term}>
                            <dt>{fact.term}</dt>
                            <dd>{fact.value ?? String(services.length)}</dd>
                        </div>
                    ))}
                </dl>
            </header>

            {contentHtml && (
                <section className="p2-container p2-detail-section p2-detail-section--about">
                    <h2>{copy.aboutTitle}</h2>
                    <div
                        className="p2-prose"
                        dangerouslySetInnerHTML={{ __html: addHeadingAnchors(contentHtml.replace(/&nbsp;/g, " ")) }}
                    />
                </section>
            )}

            {services.length > 0 && (
                <section className="p2-container p2-detail-section" aria-label={copy.catalogAria}>
                    <h2>{copy.catalogTitle}</h2>
                    <div className="p2-cap-grid">
                        {services.map((service, index) => (
                            <Link href={service.href} key={service.id} className="p2-cap-card">
                                <div className={`p2-cap-card__media${service.image ? "" : " p2-cap-card__media--empty"}`}>
                                    {service.image && <Image src={service.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />}
                                </div>
                                <div className="p2-cap-card__body">
                                    <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                                    <h2>{service.title}</h2>
                                    <span className="p2-card-link">{copy.cardLink} <ArrowRight aria-hidden="true" /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {faqs.length > 0 && (
                <section className="p2-container p2-detail-section p2-detail-section--tail">
                    <h2>{copy.faqTitle}</h2>
                    <div className="p2-screen-faq">
                        {faqs.map((faq, index) => (
                            <details key={faq.question}>
                                <summary>
                                    <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                                    <h3>{faq.question}</h3>
                                    <i aria-hidden="true">+</i>
                                </summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            <section className="p2-screen-cta p2-screen-cta--audience">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaButton} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </div>
    );
}
