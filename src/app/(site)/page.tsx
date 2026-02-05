import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import AppleCardsCarouselDemo from "@/components/site/AppleCardsCarouselDemo";
import InstagramFeed from "@/components/site/InstagramFeed";
import { BentoServicesSection } from "@/components/site/BentoServicesSection";
import { AboutSection } from "@/components/site/AboutSection";
import { prisma } from "@/lib/db";
import { getInstagramFeed } from "@/lib/instagram";

async function getServices() {
    const categories = await prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            services: {
                orderBy: { order: "asc" },
            },
        },
    });
    return categories;
}

export default async function HomePage() {
    const categories = await getServices();
    // const instagramPosts = await getInstagramFeed();

    return (
        <>
            <HeroSection />
            <AboutSection />
            <BentoServicesSection categories={categories} />
            <ProjectShowcase />
            <AppleCardsCarouselDemo />
            {/* <InstagramFeed posts={instagramPosts} /> */}
        </>
    );
}
