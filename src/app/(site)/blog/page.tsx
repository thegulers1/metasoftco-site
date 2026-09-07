import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import InsightsIndexPrototype from "@/components/phase2/InsightsIndexPrototype";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Blog",
    description: "Etkinlik teknolojileri, yapay zeka, photobooth ve dijital deneyimler üzerine MetasoftCo'nun güncel blog yazıları. Sektörden haberler, ipuçları ve başarı hikayeleri.",
    openGraph: {
        title: "Blog | MetasoftCo",
        description: "Etkinlik teknolojileri, yapay zeka ve dijital deneyimler üzerine yazılar.",
        url: `${siteConfig.url}/blog`,
    },
    alternates: {
        canonical: `${siteConfig.url}/blog`,
        languages: { "x-default": `${siteConfig.url}/blog`, tr: `${siteConfig.url}/blog`, en: `${siteConfig.url}/en/blog` },
    },
};

const getBlogPosts = unstable_cache(
    async () => prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: {
            id: true, title: true, excerpt: true, image: true, slug: true,
            category: true, publishedAt: true,
        },
    }),
    ["blog-posts-tr"],
    { revalidate: 60 }
);

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return <InsightsIndexPrototype posts={posts} locale="tr" />;
}
