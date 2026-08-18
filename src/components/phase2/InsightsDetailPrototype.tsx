import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft as ArrowLeft, IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { addHeadingAnchors } from "@/lib/utils";
import { SignalHeading } from "./SignalHeading";
import { P2InsightMeta, formatInsightDate, insightReadMinutes } from "./InsightsShared";
import type { P2InsightCard } from "./InsightsIndexPrototype";

export interface P2InsightArticle {
    title: string;
    excerpt: string | null;
    content: string | null;
    image: string | null;
    category: string | null;
    author: string | null;
    publishedAt: Date | string | null;
}

/**
 * Editor-authored posts sometimes open with their own <h1>. The screen already
 * renders one in the header, so a second lands on the 104px display ramp and
 * breaks the document outline. Demoting to <h2> restores a single h1 and lets
 * addHeadingAnchors give the heading an anchor id like every other subhead.
 */
function demoteContentHeadings(html: string) {
    return html.replace(/<(\/?)h1(\s|>)/gi, "<$1h2$2");
}

export default function InsightsDetailPrototype({
    post,
    related,
    locale,
}: {
    post: P2InsightArticle;
    related: P2InsightCard[];
    locale: Phase2Locale;
}) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.insightDetail;
    const indexCopy = dictionary.insights;

    const publishedAt = formatInsightDate(post.publishedAt, locale);
    const readMinutes = insightReadMinutes(post.content);

    const facts = [
        post.author && { term: copy.authorTerm, value: post.author },
        publishedAt && { term: copy.dateTerm, value: publishedAt },
        post.category && { term: copy.categoryTerm, value: post.category },
        readMinutes && { term: copy.readTerm, value: copy.readValue(readMinutes) },
    ].filter((fact): fact is { term: string; value: string } => Boolean(fact));

    return (
        <article className="phase2 p2-screen p2-insight-detail">
            <header className="p2-container p2-detail-top">
                <nav className="p2-detail-top__crumb" aria-label={copy.crumbInsights}>
                    <Link href={dictionary.routes.home}>{copy.crumbHome}</Link>
                    <span>{"  /  "}</span>
                    <Link href={dictionary.routes.insights}>{copy.crumbInsights}</Link>
                    {post.category && (
                        <>
                            <span>{"  /  "}</span>
                            {post.category}
                        </>
                    )}
                </nav>

                {/* Editorial headlines are full sentences, so they get their own
                    type ramp rather than the uppercase display treatment the
                    work and capability screens use for short project names. */}
                <div className="p2-detail-top__heading">
                    <h1 className="p2-insight-title">
                        <span className="p2-insight-title__rule" aria-hidden="true" />
                        {post.title}
                    </h1>
                    {post.excerpt && <p>{post.excerpt}</p>}
                </div>

                {facts.length > 0 && (
                    <dl>
                        {facts.map((fact) => (
                            <div key={fact.term}>
                                <dt>{fact.term}</dt>
                                <dd>{fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}

                {post.image && (
                    <figure className="p2-detail-main-image">
                        <Image src={post.image} alt={post.title} fill priority sizes="100vw" />
                    </figure>
                )}
            </header>

            {/* readMinutes is null when the body has no words at all — some
                records hold a placeholder like "<p></p>", which would otherwise
                render as a bare hairline rule with nothing under it. */}
            {post.content && readMinutes && (
                <section className="p2-container p2-detail-section p2-detail-section--about p2-insight-body">
                    <div
                        className="p2-prose"
                        dangerouslySetInnerHTML={{ __html: addHeadingAnchors(demoteContentHeadings(post.content.replace(/&nbsp;/g, " "))) }}
                    />
                </section>
            )}

            {related.length > 0 && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.relatedTitle}</h2>
                    <div className="p2-insight-grid">
                        {related.map((item) => (
                            <Link key={item.id} href={`${dictionary.routes.insights}/${item.slug}`} className="p2-insight-card">
                                <div className="p2-insight-card__media">
                                    {item.image
                                        ? <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                                        : <span className="p2-insight-media--empty" aria-hidden="true" />}
                                </div>
                                <div className="p2-insight-card__body">
                                    <P2InsightMeta date={formatInsightDate(item.publishedAt, locale)} topic={item.category} />
                                    <h2>{item.title}</h2>
                                    <span className="p2-card-link">{indexCopy.cardLink} <ArrowRight aria-hidden="true" /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <div className="p2-container p2-detail-foot">
                <Link href={dictionary.routes.insights} className="p2-back-link">
                    <ArrowLeft aria-hidden="true" /> {copy.backLabel}
                </Link>
            </div>

            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} label={copy.ctaLabel} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaButton} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </article>
    );
}
