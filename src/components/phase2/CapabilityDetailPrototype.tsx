import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight, IconBolt as Bolt, IconDatabase as Database, IconShieldCheck as ShieldCheck, IconUsersGroup as UsersGroup } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";

const guaranteeIcons = [Bolt, ShieldCheck, UsersGroup, Database] as const;

export default function CapabilityDetailPrototype({ locale }: { locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.capabilityDetail;

    return (
        <article className="phase2 p2-screen p2-cap-detail">
            <header className="p2-container p2-detail-top p2-cap-detail__top">
                <div className="p2-detail-top__crumb">{copy.crumb}</div>
                <div className="p2-cap-detail__heading">
                    <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                    <p>{copy.heroCopyBefore}<em>{copy.heroCopyEmphasis}</em></p>
                </div>
                <dl>{copy.facts.map((fact) => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.value}</dd></div>)}</dl>
                <figure className="p2-ai-feature"><Image src="/phase2/ai-capture-output-v2.png" alt={copy.imageAlt} fill priority sizes="100vw" /></figure>
            </header>
            <section className="p2-container p2-format-section">
                <h2>{copy.formatsTitle}</h2>
                <div className="p2-format-grid">
                    {copy.formats.map((format, index) => (
                        <article key={format.title}>
                            <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                            <h3>{format.title}</h3><p>{format.copy}</p>
                            <Link href={dictionary.routes.contact}>{copy.formatLink} <ArrowRight aria-hidden="true" /></Link>
                        </article>
                    ))}
                </div>
            </section>
            <section className="p2-container p2-flow-section">
                <h2>{copy.flowTitle}</h2>
                <ol>{copy.flow.map((step) => <li key={step.number}><span className="p2-gradient-number">{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
            </section>
            <section className="p2-container p2-live-panel">
                <SignalHeading as="h2" solid={copy.liveSolid} outline={copy.liveOutline} label={copy.liveLabel} />
                <h2>{copy.liveTail}</h2>
                <ul>{copy.guarantees.map((guarantee, index) => { const Icon = guaranteeIcons[index]; return <li key={guarantee.title}><Icon aria-hidden="true" /><strong>{guarantee.title}</strong><p>{guarantee.copy}</p></li>; })}</ul>
            </section>
            <section className="p2-container p2-selected-work">
                <h2>{copy.selectedTitle}</h2>
                <div>
                    {copy.selected.map((item) => (
                        <Link key={item.slug} href={`${dictionary.routes.work}/${item.slug}`}>
                            <Image src={item.image} alt={item.alt} fill sizes="33vw" />
                            <h3>{item.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <div className="p2-screen-cta__actions">
                        <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaPrimary} <ArrowRight aria-hidden="true" /></Link>
                        <Link href={dictionary.routes.work} className="p2-screen-button p2-screen-button--secondary">{copy.ctaSecondary} <ArrowRight aria-hidden="true" /></Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
