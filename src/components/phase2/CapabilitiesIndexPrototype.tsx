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
}

export default function CapabilitiesIndexPrototype({ capabilities, locale }: { capabilities: P2CapabilityCard[]; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.capabilities;

    return (
        <div className="phase2 p2-screen p2-cap-index">
            <section className="p2-screen-hero p2-container">
                <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                <p>{copy.heroCopy}</p>
            </section>
            <section className="p2-container p2-cap-catalog" aria-label={copy.catalogAria}>
                <div className="p2-cap-grid">
                    {capabilities.map((capability, index) => (
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
