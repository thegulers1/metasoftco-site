import HeroSection from "@/components/site/HeroSection";
import ProjectShowcase from "@/components/site/ProjectShowcase";
import BlogPosts from "@/components/site/BlogPosts";
import InstagramFeed from "@/components/site/InstagramFeed";
import ServicesSection from "@/components/site/ServicesSection";
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
    const instagramPosts = await getInstagramFeed();

    return (
        <>
            <HeroSection />
            <ServicesSection categories={categories} />
            <ProjectShowcase />
            <BlogPosts />
            <InstagramFeed posts={instagramPosts} />
        </>
    );
}
