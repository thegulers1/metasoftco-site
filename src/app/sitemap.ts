import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import {
    excludedSectorPageSlugs,
    isEnglishBlogPostPublishable,
    isEnglishCategoryPublishable,
    isEnglishProjectPublishable,
    isEnglishSectorPagePublishable,
    isEnglishServicePublishable,
} from "@/lib/publication";
import { getSectors, hasEnglish } from "@/lib/industry-pages";

export const dynamic = "force-dynamic";

const staticLastModified = new Date("2026-08-14T00:00:00.000Z");
type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(path: string, lastModified = staticLastModified, priority = 0.6): SitemapEntry {
    return {
        url: `${siteConfig.url}${path}`,
        lastModified,
        changeFrequency: "monthly",
        priority,
    };
}

/** Indexable means canonical, public, and complete in its own locale. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [categories, saleServices, projects, posts, sectorPages] = await Promise.all([
        prisma.serviceCategory.findMany({
            orderBy: { order: "asc" },
            include: { services: { where: { published: true, type: "RENTAL" }, orderBy: { order: "asc" } } },
        }),
        prisma.service.findMany({
            where: { published: true, type: "SALE" },
            include: { category: true },
            orderBy: { order: "asc" },
        }),
        prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
        prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } }),
        prisma.sectorPage.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    ]);

    const staticPages = [
        entry("/", staticLastModified, 1), entry("/hizmetler", staticLastModified, 0.9),
        entry("/projeler", staticLastModified, 0.8), entry("/blog", staticLastModified, 0.7),
        entry("/hakkimizda", staticLastModified, 0.7), entry("/iletisim", staticLastModified, 0.7),
        entry("/urunler", staticLastModified, 0.7),
        entry("/gizlilik", staticLastModified, 0.3), entry("/kullanim-kosullari", staticLastModified, 0.3),
        entry("/en", staticLastModified, 0.9), entry("/en/services", staticLastModified, 0.8),
        entry("/en/projects", staticLastModified, 0.8), entry("/en/blog", staticLastModified, 0.7),
        entry("/en/hakkimizda", staticLastModified, 0.7), entry("/en/contact", staticLastModified, 0.7),
        entry("/en/products", staticLastModified, 0.7),
        entry("/sektorel-yazilim-cozumleri", staticLastModified, 0.5),
        entry("/en/industry-software-solutions", staticLastModified, 0.5),
        entry("/sektorel-cozumler", staticLastModified, 0.4), entry("/en/sector-solutions", staticLastModified, 0.4),
        entry("/hizmetler/kurumsal-etkinlik-teknolojisi", staticLastModified, 0.7),
        entry("/hizmetler/fuar-aktivasyonlari", staticLastModified, 0.6),
        entry("/hizmetler/data-capture-crm", new Date("2026-09-23T00:00:00.000Z"), 0.7),
    ];

    const industryPages = (await getSectors()).flatMap((sector) => [
        entry(`/sektorel-yazilim-cozumleri/${sector.slug}`, sector.updatedAt, 0.5),
        ...(hasEnglish(sector) ? [entry(`/en/industry-software-solutions/${sector.slug_en}`, sector.updatedAt, 0.5)] : []),
    ]);
    const categoryPages = categories.filter((category) => category.services.length > 0).flatMap((category) => {
        const pages: SitemapEntry[] = [entry(`/hizmetler/${category.slug}`, category.updatedAt, 0.7)];
        if (isEnglishCategoryPublishable(category)) pages.push(entry(`/en/services/${category.slug_en}`, category.updatedAt, 0.7));
        return pages;
    });
    const servicePages = categories.flatMap((category) => category.services.flatMap((service) => {
        const pages: SitemapEntry[] = [entry(`/hizmetler/${category.slug}/${service.slug}`, service.updatedAt, 0.6)];
        if (isEnglishServicePublishable(service, category)) pages.push(entry(`/en/services/${category.slug_en}/${service.slug_en}`, service.updatedAt, 0.6));
        return pages;
    }));
    const productPages = saleServices.flatMap((service) => {
        const pages: SitemapEntry[] = [entry(`/urunler/${service.slug}`, service.updatedAt, 0.6)];
        if (isEnglishServicePublishable(service, service.category)) pages.push(entry(`/en/products/${service.slug_en}`, service.updatedAt, 0.6));
        return pages;
    });
    const projectPages = projects.flatMap((project) => {
        const pages: SitemapEntry[] = [entry(`/projeler/${project.slug}`, project.updatedAt, 0.6)];
        if (isEnglishProjectPublishable(project)) pages.push(entry(`/en/projects/${project.slug_en}`, project.updatedAt, 0.6));
        return pages;
    });
    const blogPages = posts.flatMap((post) => {
        const pages: SitemapEntry[] = [entry(`/blog/${post.slug}`, post.updatedAt, 0.5)];
        if (isEnglishBlogPostPublishable(post)) pages.push(entry(`/en/blog/${post.slug_en}`, post.updatedAt, 0.5));
        return pages;
    });
    const databaseSectorPages = sectorPages.flatMap((page) => {
        if (excludedSectorPageSlugs.has(page.slug)) return [];
        const pages: SitemapEntry[] = [entry(`/sektorel-cozumler/${page.slug}`, page.updatedAt, 0.4)];
        if (isEnglishSectorPagePublishable(page)) pages.push(entry(`/en/sector-solutions/${page.slug_en}`, page.updatedAt, 0.4));
        return pages;
    });

    return [...staticPages, ...industryPages, ...categoryPages, ...servicePages, ...productPages, ...projectPages, ...blogPages, ...databaseSectorPages];
}
