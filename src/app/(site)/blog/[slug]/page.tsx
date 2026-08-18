import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import { cloudinaryOgImage } from "@/lib/cloudinary";
import InsightsDetailPrototype from "@/components/phase2/InsightsDetailPrototype";
import { isEnglishBlogPostPublishable } from "@/lib/publication";

export const revalidate = 3600;

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    return prisma.blogPost.findUnique({
        where: { slug, published: true },
    });
}

/**
 * Three further reads for the foot of the article. Same-category posts are
 * promoted ahead of the merely recent ones, so a topic page keeps its thread.
 */
async function getRelatedPosts(slug: string, category: string | null) {
    const candidates = await prisma.blogPost.findMany({
        where: { published: true, slug: { not: slug } },
        orderBy: { publishedAt: "desc" },
        take: 9,
        select: { id: true, slug: true, title: true, excerpt: true, image: true, category: true, publishedAt: true },
    });

    return candidates
        .sort((a, b) => Number(b.category === category) - Number(a.category === category))
        .slice(0, 3);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || siteConfig.description;
    const image = cloudinaryOgImage(post.ogImage || post.image) || `${siteConfig.url}/og`;

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
            ...(isEnglishBlogPostPublishable(post) && {
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

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || post.metaDescription,
        image: cloudinaryOgImage(post.image || post.ogImage) || `${siteConfig.url}/og`,
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
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/blackLogo.png` },
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

    const related = await getRelatedPosts(post.slug, post.category);

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

            <InsightsDetailPrototype post={post} related={related} locale="tr" />
        </>
    );
}
