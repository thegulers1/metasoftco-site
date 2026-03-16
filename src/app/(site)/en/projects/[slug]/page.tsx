import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import ProjectDetailClient from "@/app/(site)/projeler/[slug]/ProjectDetailClient";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug_en: slug },
        select: { title_en: true, title: true, description_en: true, description: true, image: true, slug_en: true },
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
                "tr": `${siteConfig.url}/projeler/${project.slug_en}`,
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
        },
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

    return (
        <>
            <AdminEditUrlSetter url={`/editpanel/projects/${project.id}/edit`} />
            <ProjectDetailClient project={project} />
        </>
    );
}
