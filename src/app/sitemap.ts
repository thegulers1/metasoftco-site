import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { sectors } from "./(site)/sektorel-yazilim-cozumleri/data";

// Build sırasında DB bağlantısı yok — request zamanında render et
export const dynamic = "force-dynamic";

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

    // Sektörel çözüm sayfaları (programatik SEO)
    const sectorPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/sektorel-yazilim-cozumleri`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...sectors.map((s) => ({
            url: `${baseUrl}/sektorel-yazilim-cozumleri/${s.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];

    // DB-driven sektörel çözüm sayfaları
    const dbSectorPages = await prisma.sectorPage.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const dbSektorelPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/sektorel-cozumler`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...dbSectorPages.map((p) => ({
            url: `${baseUrl}/sektorel-cozumler/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];

    // Diğer statik sayfalar
    const extraPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/isler`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/ai-asistan`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/kullanim-kosullari`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/gizlilik`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    return [...staticPages, ...sectorPages, ...dbSektorelPages, ...extraPages, ...servicePages, ...projectPages, ...blogPages];
}
