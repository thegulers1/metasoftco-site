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
        <div className="bg-[#0a0a0f] min-h-screen">
            <section className="relative overflow-hidden">
                <div
                    className="aurora-blob aurora-drift"
                    style={{ width: 560, height: 560, top: "-18%", left: "6%", background: "radial-gradient(circle, rgba(124,58,237,0.32), transparent 70%)" }}
                />
                <div
                    className="aurora-blob aurora-drift2"
                    style={{ width: 480, height: 480, top: "-10%", right: "0%", background: "radial-gradient(circle, rgba(34,211,238,0.28), transparent 70%)" }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))" }}
                />
                <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-12">
                    <span
                        className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                    >
                        BLOG
                    </span>
                    <h1
                        className="text-white font-bold tracking-[-0.02em] mt-4"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(36px, 6vw, 60px)" }}
                    >
                        Düşüncelerimiz, haberler ve rehberler.
                    </h1>
                    <p
                        className="mt-5 max-w-[600px] text-[rgba(255,255,255,.64)]"
                        style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.55 }}
                    >
                        Teknoloji, tasarım ve inovasyon üzerine düşüncelerimiz, güncel haberler ve rehberler.
                    </p>
                </div>
            </section>

            <Container>
                <div className="pb-24">
                    {posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-[20px]">
                            <p
                                className="text-[rgba(255,255,255,.4)]"
                                style={{ fontFamily: "var(--font-manrope)", fontStyle: "italic" }}
                            >
                                Yakında burada çok özel içerikler paylaşacağız. Takipte kalın!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 transition-all duration-[.4s] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:border-white/30"
                                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                                >
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#14141d]">
                                        {post.image ? (
                                            <Image
                                                fill
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0"
                                                style={{ backgroundImage: "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)" }}
                                            />
                                        )}
                                        {post.category && (
                                            <div
                                                className="absolute top-3.5 left-3.5 rounded-full px-3 py-1.5 backdrop-blur-sm"
                                                style={{
                                                    background: "rgba(10,10,15,.62)",
                                                    fontFamily: "var(--font-jetbrains-mono)",
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    letterSpacing: ".04em",
                                                    color: "rgba(255,255,255,.88)",
                                                }}
                                            >
                                                {post.category.toLocaleUpperCase("tr")}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col flex-1 px-[22px] pt-[22px] pb-6">
                                        {post.publishedAt && (
                                            <p
                                                className="mb-2 text-[rgba(255,255,255,.4)]"
                                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5 }}
                                            >
                                                {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        )}
                                        <h2
                                            className="text-white line-clamp-2"
                                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, lineHeight: 1.25, fontWeight: 600 }}
                                        >
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p
                                                className="mt-2.5 line-clamp-3 text-[rgba(255,255,255,.55)]"
                                                style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                            >
                                                {post.excerpt}
                                            </p>
                                        )}
                                        {post.author && (
                                            <p
                                                className="mt-auto pt-4 text-[rgba(255,255,255,.4)]"
                                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5 }}
                                            >
                                                {post.author}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
