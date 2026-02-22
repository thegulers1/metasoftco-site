import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://metasoftco.com";

    // Statik sayfalar
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // Dinamik hizmet sayfaları
    const categories = await prisma.serviceCategory.findMany({
        include: {
            services: true,
        },
    });

    const servicePages: MetadataRoute.Sitemap = [];

    for (const category of categories) {
        // Kategori sayfası
        servicePages.push({
            url: `${baseUrl}/hizmetler/${category.slug}`,
            lastModified: category.updatedAt,
            changeFrequency: "weekly",
            priority: 0.8,
        });

        // Her hizmet sayfası
        for (const service of category.services) {
            servicePages.push({
                url: `${baseUrl}/hizmetler/${category.slug}/${service.slug}`,
                lastModified: service.updatedAt,
                changeFrequency: "weekly",
                priority: 0.7,
            });
        }
    }

    // Projeler
    const projects = await prisma.project.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const projectPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/projeler`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...projects.map((p) => ({
            url: `${baseUrl}/projeler/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];

    // Blog yazıları
    const blogPosts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
