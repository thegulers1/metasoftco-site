import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import ProjectDetailClient from "./ProjectDetailClient";

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
