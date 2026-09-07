import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import InsightsDetailPrototype from "@/components/phase2/InsightsDetailPrototype";
import { isEnglishBlogPostPublishable } from "@/lib/publication";

export const revalidate = 3600;

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug_en: string) {
    return prisma.blogPost.findUnique({
        where: { slug_en, published: true },
    });
}

/**
 * Three further reads for the foot of the article. Same-category posts are
 * promoted ahead of the merely recent ones, so a topic page keeps its thread.
 * Only posts whose English record is complete are eligible to be linked.
 */
async function getRelatedPosts(slug_en: string, category: string | null) {
    const candidates = await prisma.blogPost.findMany({
        where: { published: true, slug_en: { not: slug_en } },
        orderBy: { publishedAt: "desc" },
        take: 12,
        select: {
            id: true, slug: true, slug_en: true, title_en: true, excerpt_en: true, content_en: true,
            metaTitle_en: true, metaDescription_en: true, image: true, category: true, publishedAt: true,
        },
    });

    return candidates
        .filter(isEnglishBlogPostPublishable)
        .sort((a, b) => Number(b.category === category) - Number(a.category === category))
        .slice(0, 3)
        .map((item) => ({
            id: item.id,
            slug: item.slug_en!,
            title: item.title_en!,
            excerpt: item.excerpt_en,
            image: item.image,
            category: item.category,
            publishedAt: item.publishedAt,
        }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post || !isEnglishBlogPostPublishable(post)) return { robots: { index: false, follow: false } };

    const title = post.metaTitle_en!;
    const description = post.metaDescription_en!;
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

    if (!post || !isEnglishBlogPostPublishable(post)) notFound();

    const title = post.title_en!;
    const excerpt = post.excerpt_en!;
    const content = post.content_en!;

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
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/blackLogo.png` },
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

    const related = await getRelatedPosts(slug, post.category);

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

            <InsightsDetailPrototype
                post={{
                    title,
                    excerpt,
                    content,
                    image: post.image,
                    category: post.category,
                    author: post.author,
                    publishedAt: post.publishedAt,
                }}
                related={related}
                locale="en"
            />
        </>
    );
}
