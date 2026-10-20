import type { Metadata } from "next";
import { prisma } from "./db";
import { siteConfig, generateBreadcrumbSchema } from "./site";
import { isEnglishBlogPostPublishable } from "./publication";
import { team, teamMemberPath, teamMemberSchema, type TeamMember } from "./team";
import type { TeamMemberPost } from "@/components/phase2/TeamMemberProfile";

/** Shared data for the TR and EN author profile routes. */

export function findMemberBySlug(slug: string) {
    return team.find((member) => member.slug === slug);
}

export function teamMemberMetadata(member: TeamMember, locale: "tr" | "en"): Metadata {
    const title = locale === "en"
        ? `${member.name}, ${member.role.en} | MetasoftCo`
        : `${member.name}, ${member.role.tr} | MetasoftCo`;
    const description = member.bio[locale][0].slice(0, 158).replace(/\s+\S*$/, "") + "…";
    const url = `${siteConfig.url}${teamMemberPath(member, locale)}`;
    return {
        title,
        description,
        openGraph: { title, description, url, siteName: siteConfig.name, type: "profile" },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}${teamMemberPath(member, "tr")}`,
                tr: `${siteConfig.url}${teamMemberPath(member, "tr")}`,
                en: `${siteConfig.url}${teamMemberPath(member, "en")}`,
            },
        },
    };
}

export async function teamMemberPosts(member: TeamMember, locale: "tr" | "en"): Promise<TeamMemberPost[]> {
    const posts = await prisma.blogPost.findMany({
        where: { published: true, author: member.name },
        orderBy: { publishedAt: "desc" },
    });
    if (locale === "tr") {
        return posts.map((post) => ({
            id: post.id,
            href: `/blog/${post.slug}`,
            title: post.title,
            category: post.category,
            publishedAt: post.publishedAt,
        }));
    }
    return posts.filter(isEnglishBlogPostPublishable).map((post) => ({
        id: post.id,
        href: `/en/blog/${post.slug_en}`,
        title: post.title_en!,
        category: post.category,
        publishedAt: post.publishedAt,
    }));
}

export function teamMemberSchemas(member: TeamMember, locale: "tr" | "en") {
    const url = `${siteConfig.url}${teamMemberPath(member, locale)}`;
    return [
        {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url,
            inLanguage: locale === "en" ? "en-US" : "tr-TR",
            mainEntity: teamMemberSchema(member, locale),
        },
        generateBreadcrumbSchema(locale === "en"
            ? [
                { name: "Home", url: `${siteConfig.url}/en` },
                { name: "About", url: `${siteConfig.url}/en/about` },
                { name: member.name, url },
            ]
            : [
                { name: "Anasayfa", url: siteConfig.url },
                { name: "Hakkımızda", url: `${siteConfig.url}/hakkimizda` },
                { name: member.name, url },
            ]),
    ];
}
