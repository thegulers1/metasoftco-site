import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import { addHeadingAnchors } from "@/lib/utils";
import Container from "@/components/site/Container";

export const revalidate = 3600;

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    return prisma.blogPost.findUnique({
        where: { slug, published: true },
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || siteConfig.description;
    const image = post.ogImage || post.image || `${siteConfig.url}/og`;

    return {
        title,
        description,
        keywords: post.metaKeywords || undefined,
        openGraph: {
            title,
            description,
            url: `${siteConfig.url}/blog/${post.slug}`,
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
            authors: post.author ? [post.author] : undefined,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: `${siteConfig.url}/blog/${post.slug}`,
            ...(post.slug_en && {
                languages: {
                    "x-default": `${siteConfig.url}/blog/${post.slug}`,
                    "tr": `${siteConfig.url}/blog/${post.slug}`,
                    "en": `${siteConfig.url}/en/blog/${post.slug_en}`,
                },
            }),
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    // BlogPosting JSON-LD schema
    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || post.metaDescription,
        image: post.image || post.ogImage || `${siteConfig.url}/og`,
        datePublished: post.publishedAt?.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            "@type": "Organization",
            name: post.author || siteConfig.name,
            url: siteConfig.url,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blog/${post.slug}`,
        },
        keywords: post.metaKeywords || undefined,
        inLanguage: "tr-TR",
    };

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/blog` },
        { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <article className="py-24 bg-white min-h-screen overflow-x-hidden">
                <Container>
                    {/* Geri Butonu */}
                    <div className="mb-10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Blog&apos;a Dön
                        </Link>
                    </div>

                    {/* Başlık Alanı */}
                    <header className="max-w-3xl mb-12">
                        {post.category && (
                            <span className="inline-block rounded-md bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-black/60 mb-4">
                                {post.category}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-black leading-tight mb-6">
                            {post.title}
                        </h1>
                        {post.excerpt && (
                            <p className="text-lg text-black/60 leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-black/5 text-sm text-black/40">
                            {post.author && <span>{post.author}</span>}
                            {post.publishedAt && (
                                <span>
                                    {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Kapak Görseli */}
                    {post.image && (
                        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl mb-14 bg-black/5">
                            <Image
                                fill
                                src={post.image}
                                alt={post.title}
                                className="object-cover"
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                priority
                            />
                        </div>
                    )}

                    {/* İçerik */}
                    {post.content && (
                        <div
                            className="prose prose-lg max-w-3xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-black prose-a:underline overflow-x-hidden break-words"
                            dangerouslySetInnerHTML={{ __html: addHeadingAnchors(post.content) }}
                        />
                    )}

                    {/* Footer */}
                    <div className="max-w-3xl mt-16 pt-10 border-t border-black/10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline underline-offset-4"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Tüm Yazılar
                        </Link>
                    </div>
                </Container>
            </article>
        </>
    );
}
