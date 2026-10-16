import Image from "next/image";
import Link from "next/link";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { addHeadingAnchors } from "@/lib/utils";
import type { FaqEntry } from "@/lib/site";
import { MsCaps, MsCrumbs, MsFacts, MsFaq, MsProse, MsSectionHead } from "@/components/site-ms/parts";
import { formatInsightDate, insightReadMinutes } from "./InsightsShared";
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

export interface P2RelatedService {
    id: string;
    title: string;
    title_en: string | null;
    slug: string;
    slug_en: string | null;
    image: string | null;
    type: string;
    category: { slug: string; slug_en: string | null } | null;
}

/**
 * Editor-authored posts sometimes open with their own <h1>. The screen already
 * renders one in the header, so a second would break the document outline.
 * Demoting to <h2> restores a single h1 and lets addHeadingAnchors give the
 * heading an anchor id like every other subhead.
 */
function demoteContentHeadings(html: string) {
    return html.replace(/<(\/?)h1(\s|>)/gi, "<$1h2$2");
}

const t = {
    tr: { faqAside: "Konuyla ilgili sorunuz mu var? Bize yazın; aynı gün dönüş yapalım.", servicesMeta: "BU YAZIDAKİ DENEYİMLER", postsMeta: "DİĞER YAZILAR", all: "TÜM YAZILAR →", open: "OKU", view: "İNCELE" },
    en: { faqAside: "Have a question on the topic? Write to us and we will reply the same day.", servicesMeta: "EXPERIENCES IN THIS POST", postsMeta: "MORE POSTS", all: "ALL POSTS →", open: "READ", view: "VIEW" },
};

/** /blog/[slug] and /en/blog/[slug], an article layout in the October 2026 design. */
export default function InsightsDetailPrototype({
    post,
    faq = [],
    related,
    relatedServices = [],
    locale,
}: {
    post: P2InsightArticle;
    faq?: FaqEntry[];
    related: P2InsightCard[];
    relatedServices?: P2RelatedService[];
    locale: Phase2Locale;
}) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.insightDetail;
    const l = t[locale];
    const up = (text: string) => text.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

    const publishedAt = formatInsightDate(post.publishedAt, locale);
    const readMinutes = insightReadMinutes(post.content);

    const facts = [
        post.author && { term: copy.authorTerm, value: post.author },
        publishedAt && { term: copy.dateTerm, value: publishedAt },
        post.category && { term: copy.categoryTerm, value: post.category },
        readMinutes && { term: copy.readTerm, value: copy.readValue(readMinutes) },
    ].filter((fact): fact is { term: string; value: string } => Boolean(fact));

    return (
        <article className="ms-page">
            <section className="ms-hero" style={{ minHeight: 0 }}>
                <MsCrumbs items={[
                    { href: dictionary.routes.home, label: up(copy.crumbHome) },
                    { href: dictionary.routes.insights, label: up(copy.crumbInsights) },
                    ...(post.category ? [{ label: up(post.category) }] : []),
                ]} />
                <h1 className="ms-article-title">{post.title}<span className="ms-acc">.</span></h1>
                {post.excerpt && <p className="ms-lede" data-reveal>{post.excerpt}</p>}
                <MsFacts facts={facts} />
            </section>

            {post.image && (
                <figure className="ms-wide-media" data-reveal style={{ marginBottom: 0 }}>
                    <Image src={post.image} alt={post.title} fill priority sizes="100vw" />
                </figure>
            )}

            {/* readMinutes is null when the body has no words at all — some
                records hold a placeholder like "<p></p>". */}
            {post.content && readMinutes && (
                <section className="ms-article-body">
                    <MsProse html={addHeadingAnchors(demoteContentHeadings(post.content.replace(/&nbsp;/g, " ")))} />
                </section>
            )}

            {faq.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-post-faq">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-post-faq" className="ms-h2">{copy.faqTitle}<span className="ms-acc">.</span></h2>
                        <p>{l.faqAside}</p>
                    </div>
                    <MsFaq items={faq} />
                </section>
            )}

            {relatedServices.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-post-services">
                    <MsSectionHead id="ms-post-services" title={copy.relatedServicesTitle} meta={l.servicesMeta} />
                    <div className="ms-rows">
                        {relatedServices.slice(0, 4).map((service, index) => {
                            const title = locale === "en" ? (service.title_en || service.title) : service.title;
                            const href = service.type === "SALE"
                                ? `/urunler/${service.slug}`
                                : locale === "en" && service.category?.slug_en && service.slug_en
                                    ? `/en/services/${service.category.slug_en}/${service.slug_en}`
                                    : `/hizmetler/${service.category?.slug}/${service.slug}`;
                            return (
                                <Link key={service.id} href={href} className="ms-row" data-cursor={l.view}>
                                    <span className="ms-row__num">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="ms-row__name ms-row__name--sm"><MsCaps text={title} /></span>
                                    <span />
                                    <span className="ms-row__arrow" aria-hidden="true">↗</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {related.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-post-related">
                    <MsSectionHead id="ms-post-related" title={copy.relatedTitle} meta={l.postsMeta} />
                    <div className="ms-rows">
                        {related.map((item) => (
                            <Link key={item.id} href={`${dictionary.routes.insights}/${item.slug}`} className="ms-row ms-row--blog" data-cursor={l.open}>
                                <span className="ms-row__num">{formatInsightDate(item.publishedAt, locale)}</span>
                                <span className="ms-row__title">{item.title}</span>
                                <span className="ms-row__cat">{item.category ? up(item.category) : ""}</span>
                                <span className="ms-row__arrow" aria-hidden="true">↗</span>
                            </Link>
                        ))}
                    </div>
                    <div className="ms-actions">
                        <Link href={dictionary.routes.insights} className="ms-pill ms-pill--line">{l.all}</Link>
                    </div>
                </section>
            )}
        </article>
    );
}
