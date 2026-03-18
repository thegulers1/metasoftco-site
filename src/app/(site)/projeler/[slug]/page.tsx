import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import ProjectDetailClient from "./ProjectDetailClient";

export const dynamic = 'force-dynamic';

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
    const image = project.image || `${siteConfig.url}/og?title=${encodeURIComponent(project.title)}`;
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

    return (
        <>
            <AdminEditUrlSetter url={`/editpanel/projects/${project.id}/edit`} />
            <ProjectDetailClient project={project} />
        </>
    );
}
