import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import AppleCardsCarouselDemo from "@/components/site/AppleCardsCarouselDemo";
import InstagramFeed from "@/components/site/InstagramFeed";
import { FeaturedServicesSection } from "@/components/site/FeaturedServicesSection";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { AboutSection } from "@/components/site/AboutSection";
import { prisma } from "@/lib/db";
import { getInstagramFeed } from "@/lib/instagram";

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
    // const instagramPosts = await getInstagramFeed();

    return (
        <>
            <HeroSection />
            <FeaturedServicesSection services={services} />
            <ProjectShowcase projects={projects} />
            <ReferencesSection />
            <AppleCardsCarouselDemo />
            {/* <InstagramFeed posts={instagramPosts} /> */}
        </>
    );
}
