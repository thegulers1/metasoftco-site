import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import Container from "@/components/site/Container";

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
            id: true, title: true, title_en: true, excerpt: true, excerpt_en: true,
            image: true, slug: true, category: true, author: true, publishedAt: true,
        },
    }),
    ["blog-posts-tr"],
    { revalidate: 60 }
);

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <section className="py-32 bg-white min-h-screen">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6">
                        BLOG
                    </h1>
                    <p className="text-lg text-black/60 max-w-2xl">
                        Teknoloji, tasarım ve inovasyon üzerine düşüncelerimiz, güncel haberler ve rehberler.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black/5 rounded-3xl">
                        <p className="text-black/40 font-medium italic">
                            Yakında burada çok özel içerikler paylaşacağız. Takipte kalın!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block"
                            >
                                {/* Kapak Görseli */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/5">
                                    {post.image ? (
                                        <Image
                                            fill
                                            src={post.image}
                                            alt={post.title}
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

                                {/* İçerik */}
                                <div className="mt-5">
                                    {post.publishedAt && (
                                        <p className="text-xs text-black/40 mb-2">
                                            {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    )}
                                    <h2 className="text-lg font-semibold text-black group-hover:underline underline-offset-2 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="mt-2 text-sm text-black/60 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    {post.author && (
                                        <p className="mt-3 text-xs text-black/40">{post.author}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
