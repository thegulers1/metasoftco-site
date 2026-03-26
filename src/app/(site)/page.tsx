import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import { FeaturedServicesSection } from "@/components/site/FeaturedServicesSection";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { AboutSection } from "@/components/site/AboutSection";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getFeaturedServices() {
    const services = await prisma.service.findMany({
        where: { featured: true },
        orderBy: { featuredOrder: "asc" },
        include: {
            category: true
        }
    });
    return services;
}

async function getProjects() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: [
            { featured: "desc" },
            { order: "asc" },
            { createdAt: "desc" },
        ],
        take: 8, // 7 proje + 1 yedek
    });
    return projects;
}

export default async function HomePage() {
    const services = await getFeaturedServices();
    const projects = await getProjects();
    return (
        <>
            <HeroSection />
            <FeaturedServicesSection services={services} />
            <ProjectShowcase projects={projects} />
            <ReferencesSection />
        </>
    );
}
