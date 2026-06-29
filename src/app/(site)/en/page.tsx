import HeroSection from "@/components/site/HeroSection";
import BrandStrip from "@/components/site/BrandStrip";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import { FeaturedServicesSection } from "@/components/site/FeaturedServicesSection";
import CtaSection from "@/components/site/CtaSection";
import InstagramFeed from "@/components/site/InstagramFeed";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const revalidate = 3600;

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

const getFeaturedServices = unstable_cache(
    async () => prisma.service.findMany({
        where: { featured: true, published: true },
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

export default async function EnglishHomePage() {
    const services = await getFeaturedServices();
    const projects = await getProjects();
    return (
        <>
            <HeroSection />
            <BrandStrip />
            <ProjectShowcase projects={projects} />
            <FeaturedServicesSection services={services} />
            <CtaSection />
            <section className="py-20 sm:py-24 bg-[#0a0a0f]">
                <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
                    <InstagramFeed />
                </div>
            </section>
        </>
    );
}
