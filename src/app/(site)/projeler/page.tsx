import { prisma } from "@/lib/db";
import ProjectsHero from "./ProjectsHero";
import ProjectsListClient from "./ProjectsListClient";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
            id: true,
            slug: true,
            image: true,
            title: true,
            title_en: true,
            category: true,
            description: true,
            description_en: true,
        },
    });

    return (
        <div className="bg-white min-h-screen">
            <ProjectsHero />
            <ProjectsListClient projects={projects} />
        </div>
    );
}
