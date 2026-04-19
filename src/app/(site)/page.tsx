import { Metadata } from "next";
import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import { FeaturedServicesSection } from "@/components/site/FeaturedServicesSection";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { AboutSection } from "@/components/site/AboutSection";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    alternates: {
        canonical: siteConfig.url,
        languages: { "x-default": siteConfig.url, tr: siteConfig.url, en: `${siteConfig.url}/en` },
    },
};

const getFeaturedServices = unstable_cache(
    async () => prisma.service.findMany({
        where: { featured: true },
        orderBy: { featuredOrder: "asc" },
        include: { category: true },
    }),
    ["featured-services"],
    { revalidate: 60 }
);

const getProjects = unstable_cache(
    async () => prisma.project.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
        take: 8,
    }),
    ["home-projects"],
    { revalidate: 60 }
);

export default async function HomePage() {
    const services = await getFeaturedServices();
    const projects = await getProjects();
    return (
        <>
            <HeroSection />
            <FeaturedServicesSection services={services} />
            <ProjectShowcase projects={projects} />
            <AboutSection />
            <ReferencesSection />
        </>
    );
}
