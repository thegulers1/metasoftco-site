import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsWords } from "@/components/site-ms/parts";
import { MsClock, MsPostRows } from "@/components/site-ms/interactive";
import { formatInsightDate } from "./InsightsShared";

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

const t = {
    tr: { kicker: "(BLOG) — SAHA NOTLARI · TEKNİK İNCELEMELER", city: "İSTANBUL", latest: "SON YAZI", read: "YAZIYI OKU", all: "Tümü", count: "YAZI", open: "OKU", title: "Blog." },
    en: { kicker: "(INSIGHTS) — FIELD NOTES · TECHNICAL REVIEWS", city: "ISTANBUL", latest: "LATEST", read: "READ THE POST", all: "All", count: "POSTS", open: "READ", title: "Insights." },
};

function shortDate(value: Date | string | null, locale: Phase2Locale) {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString(locale === "en" ? "en-GB" : "tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** /blog and /en/blog — the "Blog" design of October 2026. */
export default function InsightsIndexPrototype({ posts, locale }: { posts: P2InsightCard[]; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.insights;
    const l = t[locale];
    const href = (post: P2InsightCard) => `${dictionary.routes.insights}/${post.slug}`;
    const featured = posts[0] ?? null;
    const rest = posts.slice(1);
    const up = (text: string) => text.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{l.kicker}</span>
                    <MsClock label={l.city} />
                </div>
                <h1 className="ms-h1" aria-label={copy.heroLabel}>
                    <MsWords text={l.title} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 620 }}>{copy.heroCopy}</p>
                </div>
            </section>

            {featured ? (
                <>
                    <Link href={href(featured)} className="ms-feature" data-cursor={l.open} data-reveal>
                        <div className="ms-feature__main">
                            <span className="ms-mono">
                                {[l.latest, formatInsightDate(featured.publishedAt, locale), featured.category].filter(Boolean).map((part) => up(String(part))).join(" · ")}
                            </span>
                            <h2 className="ms-feature__title">{featured.title}</h2>
                            <span className="ms-feature__go ms-mono">{l.read}</span>
                        </div>
                        {featured.excerpt && <p className="ms-feature__excerpt">{featured.excerpt}</p>}
                    </Link>
                    {rest.length > 0 && (
                        <section aria-label={copy.catalogAria}>
                            <MsPostRows
                                posts={rest.map((post) => ({ key: post.id, href: href(post), title: post.title, date: shortDate(post.publishedAt, locale), cat: post.category }))}
                                allLabel={l.all}
                                countLabel={l.count}
                                openLabel={l.open}
                            />
                        </section>
                    )}
                </>
            ) : (
                <section className="ms-section">
                    <h2 className="ms-h2">{copy.emptyTitle}</h2>
                    <p className="ms-lede">{copy.emptyCopy}</p>
                </section>
            )}
        </div>
    );
}
