import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import ProjectDetailClient from "@/app/(site)/projeler/[slug]/ProjectDetailClient";
import { isEnglishProjectPublishable } from "@/lib/publication";
import CaseStudyPrototype from "@/components/phase2/CaseStudyPrototype";
import WorkDetailPrototype from "@/components/phase2/WorkDetailPrototype";

const PHASE_2_CASE_SLUG = "tavuk-dunyasi-x-ai-photo";
const PHASE_2_RAYBAN_SLUG = "ray-ban-x-strip-photo";

export const revalidate = 3600;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug_en: slug, published: true },
        select: { title_en: true, title: true, description_en: true, description: true, content_en: true, metaTitle_en: true, metaDescription_en: true, image: true, slug: true, slug_en: true },
    });
    if (!project || !isEnglishProjectPublishable(project)) return { robots: { index: false, follow: false } };

    const isPrototype = slug === PHASE_2_CASE_SLUG;
    const title = isPrototype ? "Tavuk Dünyası AI Photo Activation | MetasoftCo" : `${project.title_en} | MetasoftCo`;
    const description = isPrototype
        ? "A live Tavuk Dünyası AI portrait activation combining a branded kiosk, custom visual scenarios and a personal digital image for each guest."
        : project.description_en!;
    const image = project.image || `${siteConfig.url}/og?title=${encodeURIComponent(project.title_en!)}`;
    const url = `${siteConfig.url}/en/projects/${slug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630 }],
            locale: "en_US",
            type: "website",
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/projeler/${project.slug}`,
                "tr": `${siteConfig.url}/projeler/${project.slug}`,
                "en": url,
            },
        },
    };
}

async function getProject(slug_en: string) {
    return prisma.project.findUnique({
        where: { slug_en, published: true },
        select: {
            id: true,
            slug: true,
            slug_en: true,
            title: true,
            title_en: true,
            description: true,
            description_en: true,
            content: true,
            content_en: true,
            metaTitle_en: true,
            metaDescription_en: true,
            image: true,
            gallery: true,
            category: true,
            client: true,
            projectUrl: true,
            technologies: true,
            video: true,
            projectDate: true,
            createdAt: true,
            order: true,
        },
    });
}

const NEXT_PROJECT_SELECT = {
    slug: true,
    slug_en: true,
    title: true,
    title_en: true,
    image: true,
    category: true,
} as const;

async function getNextProject(currentId: string, order: number) {
    const next = await prisma.project.findFirst({
        where: { published: true, order: { gt: order }, NOT: { id: currentId } },
        orderBy: { order: "asc" },
        select: NEXT_PROJECT_SELECT,
    });
    if (next) return next;
    return prisma.project.findFirst({
        where: { published: true, NOT: { id: currentId } },
        orderBy: { order: "asc" },
        select: NEXT_PROJECT_SELECT,
    });
}

export default async function EnglishProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project || !isEnglishProjectPublishable(project)) notFound();

    const nextProject = await getNextProject(project.id, project.order);

    const gallery: { url: string; alt: string }[] = project.gallery
        ? (JSON.parse(project.gallery) as (string | { url: string; alt?: string })[]).map((item) =>
            typeof item === "string"
                ? { url: item, alt: project.title_en || project.title }
                : { url: item.url, alt: item.alt || project.title_en || project.title }
        )
        : [];

    const youtubeIdMatch = project.video?.match(
        /youtube\.com\/(?:watch\?v=|shorts\/|embed\/)([^?&/]+)|youtu\.be\/([^?&/]+)/
    );
    const youtubeId = youtubeIdMatch ? (youtubeIdMatch[1] || youtubeIdMatch[2]) : null;
    const videoSchema = youtubeId ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": project.title_en || project.title,
        "description": project.description_en || project.description || project.title,
        "thumbnailUrl": `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        "embedUrl": `https://www.youtube.com/embed/${youtubeId}`,
        "contentUrl": `https://www.youtube.com/watch?v=${youtubeId}`,
        "uploadDate": (project.projectDate || project.createdAt).toISOString().split("T")[0],
    } : null;

    const breadcrumbSchema = slug === PHASE_2_CASE_SLUG ? generateBreadcrumbSchema([
        { name: "Home", url: `${siteConfig.url}/en` },
        { name: "Work", url: `${siteConfig.url}/en/projects` },
        { name: "Tavuk Dünyası × AI Photo", url: `${siteConfig.url}/en/projects/${slug}` },
    ]) : null;

    return (
        <>
            {breadcrumbSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            )}
            {videoSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
            )}
            <AdminEditUrlSetter url={`/editpanel/projects/${project.id}/edit`} />
            {slug === PHASE_2_RAYBAN_SLUG && project.image ? (
                <WorkDetailPrototype image={project.image} gallery={gallery} year="2025" locale="en" />
            ) : slug === PHASE_2_CASE_SLUG ? (
                <CaseStudyPrototype
                    image={project.image}
                    video={project.video}
                    gallery={gallery}
                    year={(project.projectDate || project.createdAt).getFullYear().toString()}
                    locale="en"
                />
            ) : (
                <ProjectDetailClient project={project} nextProject={nextProject} />
            )}
        </>
    );
}
