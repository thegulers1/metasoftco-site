import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import { FeaturedServicesSection } from "@/components/site/FeaturedServicesSection";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Metasoftco: Interactive Event Tech & Software Solutions",
    description: "We develop interactive games, photobooth solutions, AI photo/face swap and custom software for events. Grow your brand with unforgettable experiences.",
    alternates: {
        canonical: `${siteConfig.url}/en`,
        languages: {
            "x-default": siteConfig.url,
            "tr": siteConfig.url,
            "en": `${siteConfig.url}/en`,
        },
    },
};

async function getFeaturedServices() {
    return prisma.service.findMany({
        where: { featured: true },
        orderBy: { featuredOrder: "asc" },
        include: { category: true },
    });
}

async function getProjects() {
    return prisma.project.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
        take: 8,
    });
}

export default async function EnglishHomePage() {
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
