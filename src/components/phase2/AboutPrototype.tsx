import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";
import { P2Display } from "./P2Display";

export default function AboutPrototype({ locale }: { locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.about;

    return (
        <article className="phase2 p2-screen p2-about">
            <header className="p2-container p2-screen-hero p2-about__hero">
                <div>
                    <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                    <span className="p2-location-chip">{copy.locationChip}</span>
                </div>
                <p>{copy.heroCopy}</p>
            </header>
            <section className="p2-container p2-about__story">
                <h2><P2Display text={copy.storyTitle} /></h2>
                <div>{copy.storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>
            <section className="p2-container p2-about__stats">
                {copy.stats.map((stat) => <div key={stat.label}><strong className="p2-gradient-number">{stat.value}</strong><span>{stat.label}</span></div>)}
            </section>
            <section className="p2-container p2-about__principles">
                {copy.principles.map((principle) => <div key={principle.title}><h3>{principle.title}</h3><p>{principle.copy}</p></div>)}
            </section>
            <section className="p2-about__final">
                <Image src="/phase2/about-production-stage-v2.png" alt="" fill sizes="100vw" />
                <div>
                    <SignalHeading as="h2" solid={copy.finalSolid} outline={copy.finalOutline} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.finalCta} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </article>
    );
}
