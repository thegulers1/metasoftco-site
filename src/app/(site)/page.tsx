import { Metadata } from "next";
import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import { FeaturedServicesSection } from "@/components/site/FeaturedServicesSection";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { AboutSection } from "@/components/site/AboutSection";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords.join(", "),
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: siteConfig.title }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og`],
        creator: siteConfig.social.twitter,
    },
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
