import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import Container from "@/components/site/Container";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Blog | MetasoftCo",
    description: "Insights on event technology, artificial intelligence, and digital experiences by MetasoftCo.",
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

async function getBlogPosts() {
    return prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: {
            id: true,
            title: true,
            title_en: true,
            excerpt: true,
            excerpt_en: true,
            image: true,
            slug: true,
            slug_en: true,
            category: true,
            author: true,
            publishedAt: true,
        },
    });
}

export default async function EnglishBlogPage() {
    const posts = await getBlogPosts();

    return (
        <section className="py-32 bg-white min-h-screen">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6">
                        BLOG
                    </h1>
                    <p className="text-lg text-black/60 max-w-2xl">
                        Our thoughts on technology, design, and innovation — news and guides.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black/5 rounded-3xl">
                        <p className="text-black/40 font-medium italic">
                            Special content coming soon. Stay tuned!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => {
                            const title = post.title_en || post.title;
                            const excerpt = post.excerpt_en || post.excerpt;
                            const href = post.slug_en ? `/en/blog/${post.slug_en}` : `/blog/${post.slug}`;

                            return (
                                <Link key={post.id} href={href} className="group block">
                                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/5">
                                        {post.image ? (
                                            <Image
                                                fill
                                                src={post.image}
                                                alt={title}
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 transition-transform duration-500 group-hover:scale-105" />
                                        )}
                                        {post.category && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="inline-block rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-black">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-5">
                                        {post.publishedAt && (
                                            <p className="text-xs text-black/40 mb-2">
                                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        )}
                                        <h2 className="text-lg font-semibold text-black group-hover:underline underline-offset-2 line-clamp-2">
                                            {title}
                                        </h2>
                                        {excerpt && (
                                            <p className="mt-2 text-sm text-black/60 line-clamp-3">{excerpt}</p>
                                        )}
                                        {post.author && (
                                            <p className="mt-3 text-xs text-black/40">{post.author}</p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Container>
        </section>
    );
}
