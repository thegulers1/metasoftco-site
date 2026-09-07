"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";
import { P2Display } from "./P2Display";

/** A capability card already resolved to the active locale by the page. */
export interface P2CapabilityCard {
    id: string;
    title: string;
    image: string;
    href: string;
    categorySlug?: string;
}

/** A category filter tab, in display order. */
export interface P2CapabilityCategory {
    slug: string;
    name: string;
}

export default function CapabilitiesIndexPrototype({
    capabilities,
    categories,
    locale,
}: {
    capabilities: P2CapabilityCard[];
    categories?: P2CapabilityCategory[];
    locale: Phase2Locale;
}) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.capabilities;
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filtered = useMemo(
        () => (activeCategory ? capabilities.filter((c) => c.categorySlug === activeCategory) : capabilities),
        [capabilities, activeCategory]
    );

    return (
        <div className="phase2 p2-screen p2-cap-index">
            <section className="p2-screen-hero p2-container">
                <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                <p>{copy.heroCopy}</p>
            </section>
            <section className="p2-container p2-cap-catalog" aria-label={copy.catalogAria}>
                {categories && categories.length > 1 && (
                    <div className="p2-cap-filter" role="tablist" aria-label={copy.catalogAria}>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === null}
                            className={activeCategory === null ? "is-active" : undefined}
                            onClick={() => setActiveCategory(null)}
                        >
                            <span>{copy.filterAll}</span>
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.slug}
                                type="button"
                                role="tab"
                                aria-selected={activeCategory === category.slug}
                                className={activeCategory === category.slug ? "is-active" : undefined}
                                onClick={() => setActiveCategory(category.slug)}
                            >
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                )}
                <div className="p2-cap-grid">
                    {filtered.map((capability, index) => (
                        <Link href={capability.href} key={capability.id} className="p2-cap-card">
                            <div className="p2-cap-card__media"><Image src={capability.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                            <div className="p2-cap-card__body"><span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span><h2>{capability.title}</h2><span className="p2-card-link">{copy.cardLink} <ArrowRight aria-hidden="true" /></span></div>
                        </Link>
                    ))}
                </div>
                <div className="p2-end-to-end">
                    <h2><P2Display text={copy.endToEndTitle} /></h2>
                    <ol>{copy.process.map((step) => <li key={step.number}><span className="p2-gradient-number">{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
                </div>
            </section>
            <section className="p2-screen-cta p2-screen-cta--audience">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaButton} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </div>
    );
}
