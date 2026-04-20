import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { cloudinaryOgImage } from "@/lib/cloudinary";
import { notFound } from "next/navigation";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 3600;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug },
        select: { title: true, description: true, image: true, slug_en: true },
    });
    if (!project) return {};

    const title = `${project.title} | MetasoftCo`;
    const description = project.description || siteConfig.description;
    const image = cloudinaryOgImage(project.image) || `${siteConfig.url}/og?title=${encodeURIComponent(project.title)}`;
    const url = `${siteConfig.url}/projeler/${slug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [{ url: image, width: 1200, height: 630 }],
            locale: siteConfig.locale,
            type: "website",
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
        alternates: {
            canonical: url,
            ...(project.slug_en && {
                languages: {
                    "x-default": url,
                    "tr": url,
                    "en": `${siteConfig.url}/en/projects/${project.slug_en}`,
                },
            }),
        },
    };
}

async function getProject(slug: string) {
    return prisma.project.findUnique({
        where: { slug },
        select: {
            id: true,
            slug: true,
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
        },
    });
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    const youtubeIdMatch = project.video?.match(
        /youtube\.com\/(?:watch\?v=|shorts\/|embed\/)([^?&/]+)|youtu\.be\/([^?&/]+)/
    );
    const youtubeId = youtubeIdMatch ? (youtubeIdMatch[1] || youtubeIdMatch[2]) : null;
    const videoSchema = youtubeId ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": project.title,
        "description": project.description || project.title,
        "thumbnailUrl": `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        "embedUrl": `https://www.youtube.com/embed/${youtubeId}`,
        "uploadDate": new Date().toISOString().split("T")[0],
    } : null;

    return (
        <>
            {videoSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
            )}
            <AdminEditUrlSetter url={`/editpanel/projects/${project.id}/edit`} />
            <ProjectDetailClient project={project} />
        </>
    );
}
