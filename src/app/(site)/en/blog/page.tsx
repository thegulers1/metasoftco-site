import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, ogImageUrl } from "@/lib/site";
import InsightsIndexPrototype from "@/components/phase2/InsightsIndexPrototype";
import { isEnglishBlogPostPublishable } from "@/lib/publication";

export const revalidate = 3600;

const ogTitle = "Blog | MetasoftCo";
const ogDescription = "Insights on event technology, AI, and digital experiences.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Blog | MetasoftCo",
    description: "Explore MetasoftCo's blog for insights on event technology, AI activations, photobooth experiences, and digital innovation. Industry news, tips, and success stories.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/en/blog`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
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
