import Image from "next/image";
import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SignalHeading } from "./SignalHeading";
import { P2InsightMeta, formatInsightDate } from "./InsightsShared";

/** A blog post already resolved to the active locale by the page. */
export interface P2InsightCard {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    image: string | null;
    category: string | null;
    publishedAt: Date | string | null;
}

export default function InsightsIndexPrototype({ posts, locale }: { posts: P2InsightCard[]; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.insights;

    // The newest post is promoted to a wide row, but only once there are enough
    // articles behind it to still fill a grid — a feature plus one card reads
    // as a layout accident rather than an editorial choice.
    const featured = posts.length > 3 ? posts[0] : null;
    const rest = featured ? posts.slice(1) : posts;
    const href = (post: P2InsightCard) => `${dictionary.routes.insights}/${post.slug}`;

    return (
        <div className="phase2 p2-screen p2-insights-index">
            <section className="p2-screen-hero p2-container">
                <SignalHeading solid={copy.heroSolid} outline={copy.heroOutline} label={copy.heroLabel} />
                <p>{copy.heroCopy}</p>
            </section>

            {featured && (
                <section className="p2-container p2-insight-featured-wrap">
                    <Link href={href(featured)} className="p2-insight-featured">
                        <div className="p2-insight-featured__media">
                            {featured.image
                                ? <Image src={featured.image} alt="" fill priority sizes="(max-width: 1050px) 100vw, 55vw" />
                                : <span className="p2-insight-media--empty" aria-hidden="true" />}
                        </div>
                        <div className="p2-insight-featured__body">
                            <P2InsightMeta
                                lead={copy.featuredLabel}
                                date={formatInsightDate(featured.publishedAt, locale)}
                                topic={featured.category}
                            />
                            <h2>{featured.title}</h2>
                            {featured.excerpt && <p>{featured.excerpt}</p>}
                            <span className="p2-card-link">{copy.cardLink} <ArrowRight aria-hidden="true" /></span>
                        </div>
                    </Link>
                </section>
            )}

            <section className="p2-container p2-insight-catalog" aria-label={copy.catalogAria}>
                {rest.length === 0 && !featured ? (
                    <div className="p2-insight-empty">
                        <h2>{copy.emptyTitle}</h2>
                        <p>{copy.emptyCopy}</p>
                        <Link href={dictionary.routes.contact} className="p2-screen-button">
                            {copy.ctaButton} <ArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                ) : (
                    <div className="p2-insight-grid">
                        {rest.map((post) => (
                            <Link key={post.id} href={href(post)} className="p2-insight-card">
                                <div className="p2-insight-card__media">
                                    {post.image
                                        ? <Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw" />
                                        : <span className="p2-insight-media--empty" aria-hidden="true" />}
                                </div>
                                <div className="p2-insight-card__body">
                                    <P2InsightMeta date={formatInsightDate(post.publishedAt, locale)} topic={post.category} />
                                    <h2>{post.title}</h2>
                                    {post.excerpt && <p>{post.excerpt}</p>}
                                    <span className="p2-card-link">{copy.cardLink} <ArrowRight aria-hidden="true" /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
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
