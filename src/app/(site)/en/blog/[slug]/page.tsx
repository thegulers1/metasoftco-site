import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import Container from "@/components/site/Container";

export const dynamic = 'force-dynamic';

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

            <article className="py-24 bg-white min-h-screen">
                <Container>
                    <div className="mb-10">
                        <Link
                            href="/en/blog"
                            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>

                    <header className="max-w-3xl mb-12">
                        {post.category && (
                            <span className="inline-block rounded-md bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-black/60 mb-4">
                                {post.category}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-black leading-tight mb-6">
                            {title}
                        </h1>
                        {excerpt && (
                            <p className="text-lg text-black/60 leading-relaxed">{excerpt}</p>
                        )}
                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-black/5 text-sm text-black/40">
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
                        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl mb-14 bg-black/5">
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
                            className="prose prose-lg max-w-3xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-black prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}

                    <div className="max-w-3xl mt-16 pt-10 border-t border-black/10">
                        <Link
                            href="/en/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline underline-offset-4"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            All Posts
                        </Link>
                    </div>
                </Container>
            </article>
        </>
    );
}
