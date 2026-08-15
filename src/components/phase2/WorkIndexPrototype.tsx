import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";

/** A work card already resolved to the active locale by the page. */
export interface P2WorkCard {
    id: string;
    slug: string;
    title: string;
    image: string;
}

export default function WorkIndexPrototype({ projects, locale }: { projects: P2WorkCard[]; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.work;

    return (
        <div className="phase2 p2-screen p2-work-index">
            <section className="p2-screen-hero p2-container">
                <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                <p>{copy.heroCopy}</p>
            </section>
            <section className="p2-container p2-work-catalog" aria-label={copy.catalogAria}>
                <div className="p2-work-grid">
                    {projects.map((card, index) => (
                        <Link key={card.id} href={`${dictionary.routes.work}/${card.slug}`} className="p2-work-card">
                            <div className="p2-work-card__media"><Image src={card.image} alt={card.title} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                            <div className="p2-work-card__body">
                                <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                                <div><h2>{card.title}</h2><span className="p2-card-link">{copy.cardLink} <ArrowRight aria-hidden="true" /></span></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} label={copy.ctaLabel} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaButton} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </div>
    );
}
