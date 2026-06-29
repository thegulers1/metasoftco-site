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

async function getPost(slug_en: string) {
    return prisma.blogPost.findUnique({
        where: { slug_en, published: true },
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    const title = post.metaTitle_en || post.metaTitle || post.title_en || post.title;
    const description = post.metaDescription_en || post.metaDescription || post.excerpt_en || post.excerpt || siteConfig.description;
    const image = post.ogImage || post.image || `${siteConfig.url}/og`;
    const url = `${siteConfig.url}/en/blog/${slug}`;

    return {
        title,
        description,
        keywords: post.metaKeywords_en || post.metaKeywords || undefined,
        openGraph: {
            title,
            description,
            url,
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
            authors: post.author ? [post.author] : undefined,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
            locale: "en_US",
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/blog/${post.slug}`,
                "tr": `${siteConfig.url}/blog/${post.slug}`,
                "en": url,
            },
        },
    };
}

export default async function EnglishBlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    const title = post.title_en || post.title;
    const excerpt = post.excerpt_en || post.excerpt;
    const content = post.content_en || post.content;

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: excerpt || post.metaDescription_en || post.metaDescription,
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
            "@id": `${siteConfig.url}/en/blog/${slug}`,
        },
        keywords: post.metaKeywords_en || post.metaKeywords || undefined,
        inLanguage: "en-US",
    };

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/en/blog` },
        { name: title, url: `${siteConfig.url}/en/blog/${slug}` },
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

            <article className="bg-[#0a0a0f] min-h-screen overflow-x-hidden">
                <div className="pt-32 pb-16">
                    <Container>
                        <div className="mb-10">
                            <Link
                                href="/en/blog"
                                className="inline-flex items-center gap-2 text-[rgba(255,255,255,.5)] hover:text-white transition-colors"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 500 }}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Blog
                            </Link>
                        </div>

                        <header className="max-w-[760px] mb-12">
                            {post.category && (
                                <span
                                    className="inline-block rounded-full px-3 py-1 mb-4"
                                    style={{
                                        background: "rgba(255,255,255,.06)",
                                        border: "1px solid rgba(255,255,255,.1)",
                                        fontFamily: "var(--font-jetbrains-mono)",
                                        fontSize: 11,
                                        fontWeight: 500,
                                        letterSpacing: ".06em",
                                        color: "var(--acc)",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {post.category}
                                </span>
                            )}
                            <h1
                                className="text-white font-bold tracking-[-0.02em] leading-[1.1] mb-6"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 5vw, 52px)" }}
                            >
                                {title}
                            </h1>
                            {excerpt && (
                                <p
                                    className="text-[rgba(255,255,255,.64)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.6 }}
                                >
                                    {excerpt}
                                </p>
                            )}
                            <div
                                className="flex items-center gap-4 mt-6 pt-6 border-t border-white/[0.08] text-[rgba(255,255,255,.4)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12.5 }}
                            >
                                {post.author && <span>{post.author}</span>}
                                {post.publishedAt && (
                                    <span>
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                )}
                            </div>
                        </header>

                        {post.image && (
                            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[20px] mb-14 border border-white/10 bg-[#14141d]">
                                <Image
                                    fill
                                    src={post.image}
                                    alt={title}
                                    className="object-cover"
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                    priority
                                />
                            </div>
                        )}

                        {content && (
                            <div
                                className="prose prose-lg prose-invert max-w-[760px] prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--acc)] prose-a:no-underline hover:prose-a:underline overflow-x-hidden break-words"
                                style={{ fontFamily: "var(--font-manrope)" }}
                                dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content) }}
                            />
                        )}

                        <div className="max-w-[760px] mt-16 pt-10 border-t border-white/[0.08]">
                            <Link
                                href="/en/blog"
                                className="inline-flex items-center gap-2 text-white hover:text-[var(--acc)] transition-colors"
                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600 }}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                All Posts
                            </Link>
                        </div>
                    </Container>
                </div>
            </article>
        </>
    );
}
