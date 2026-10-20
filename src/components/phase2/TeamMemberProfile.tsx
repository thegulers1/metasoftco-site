import Link from "next/link";
import type { TeamMember } from "@/lib/team";
import { MsCrumbs, MsFacts, MsSectionHead } from "@/components/site-ms/parts";
import { formatInsightDate } from "./InsightsShared";

export interface TeamMemberPost {
    id: string;
    href: string;
    title: string;
    category: string | null;
    publishedAt: Date | null;
}

const t = {
    tr: {
        home: "Anasayfa",
        about: "Hakkımızda",
        aboutHref: "/hakkimizda",
        role: "Rol",
        company: "Şirket",
        since: "Kuruluş",
        expertise: "Uzmanlık",
        postsTitle: "Yazıları",
        postsMeta: "BLOG",
        profile: "LINKEDIN PROFİLİ ↗",
        open: "OKU",
    },
    en: {
        home: "Home",
        about: "About",
        aboutHref: "/en/about",
        role: "Role",
        company: "Company",
        since: "Founded",
        expertise: "Expertise",
        postsTitle: "Articles",
        postsMeta: "BLOG",
        profile: "LINKEDIN PROFILE ↗",
        open: "READ",
    },
};

/** /ekip/[slug] and /en/team/[slug]: who writes our articles. */
export default function TeamMemberProfile({
    member,
    posts,
    locale,
}: {
    member: TeamMember;
    posts: TeamMemberPost[];
    locale: "tr" | "en";
}) {
    const l = t[locale];
    const linkedin = member.sameAs.find((url) => url.includes("linkedin.com"));

    return (
        <article className="ms-page">
            <section className="ms-hero" style={{ minHeight: 0 }}>
                <MsCrumbs items={[
                    { href: locale === "en" ? "/en" : "/", label: l.home },
                    { href: l.aboutHref, label: l.about },
                    { label: member.name },
                ]} />
                <h1 className="ms-article-title">{member.name}<span className="ms-acc">.</span></h1>
                <p className="ms-lede" data-reveal>{member.role[locale]}, MetasoftCo</p>
                <MsFacts facts={[
                    { term: l.role, value: member.role[locale] },
                    { term: l.company, value: "MetasoftCo" },
                    { term: l.since, value: "2020" },
                    { term: l.expertise, value: member.knowsAbout.slice(0, 3).join(", ") },
                ]} />
            </section>

            <section className="ms-article-body">
                <div className="ms-prose">
                    {member.bio[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {linkedin && (
                        <p><a href={linkedin} rel="me noopener" target="_blank">{l.profile}</a></p>
                    )}
                </div>
            </section>

            {posts.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-author-posts">
                    <MsSectionHead id="ms-author-posts" title={l.postsTitle} meta={l.postsMeta} />
                    <div className="ms-rows">
                        {posts.map((post) => (
                            <Link key={post.id} href={post.href} className="ms-row ms-row--blog" data-cursor={l.open}>
                                <span className="ms-row__num">{formatInsightDate(post.publishedAt, locale)}</span>
                                <span className="ms-row__title">{post.title}</span>
                                <span className="ms-row__cat">{post.category ? post.category.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR") : ""}</span>
                                <span className="ms-row__arrow" aria-hidden="true">↗</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
