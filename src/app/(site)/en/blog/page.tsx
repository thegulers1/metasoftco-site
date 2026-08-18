import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import InsightsIndexPrototype from "@/components/phase2/InsightsIndexPrototype";
import { isEnglishBlogPostPublishable } from "@/lib/publication";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Blog | MetasoftCo",
    description: "Explore MetasoftCo's blog for insights on event technology, AI activations, photobooth experiences, and digital innovation. Industry news, tips, and success stories.",
    openGraph: {
        title: "Blog | MetasoftCo",
        description: "Insights on event technology, AI, and digital experiences.",
        url: `${siteConfig.url}/en/blog`,
        locale: "en_US",
    },
    alternates: {
        canonical: `${siteConfig.url}/en/blog`,
        languages: {
            "x-default": `${siteConfig.url}/blog`,
            "tr": `${siteConfig.url}/blog`,
            "en": `${siteConfig.url}/en/blog`,
        },
    },
};

const getBlogPosts = unstable_cache(
    async () => prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: {
            id: true, title: true, title_en: true, excerpt: true, excerpt_en: true,
            image: true, slug: true, slug_en: true, category: true, author: true, publishedAt: true,
            content_en: true, metaTitle_en: true, metaDescription_en: true,
        },
    }),
    ["blog-posts-en"],
    { revalidate: 60 }
);

export default async function EnglishBlogPage() {
    const posts = (await getBlogPosts()).filter(isEnglishBlogPostPublishable).map((post) => ({
        id: post.id,
        slug: post.slug_en!,
        title: post.title_en!,
        excerpt: post.excerpt_en,
        image: post.image,
        category: post.category,
        publishedAt: post.publishedAt,
    }));

    return <InsightsIndexPrototype posts={posts} locale="en" />;
}
