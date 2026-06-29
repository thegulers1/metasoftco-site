import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import ProjectDetailClient from "@/app/(site)/projeler/[slug]/ProjectDetailClient";

export const revalidate = 3600;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug_en: slug },
        select: { title_en: true, title: true, description_en: true, description: true, image: true, slug: true, slug_en: true },
    });
    if (!project) return {};

    const title = `${project.title_en || project.title} | MetasoftCo`;
    const description = project.description_en || project.description || siteConfig.description;
    const image = project.image || `${siteConfig.url}/og?title=${encodeURIComponent(project.title_en || project.title || "")}`;
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
        where: { slug_en },
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

    if (!project) notFound();

    const nextProject = await getNextProject(project.id, project.order);

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

    return (
        <>
            {videoSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
            )}
            <AdminEditUrlSetter url={`/editpanel/projects/${project.id}/edit`} />
            <ProjectDetailClient project={project} nextProject={nextProject} />
        </>
    );
}
