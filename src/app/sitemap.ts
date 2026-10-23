import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import {
    cityLandingSlugs,
    excludedSectorPageSlugs,
    isEnglishBlogPostPublishable,
    isEnglishCategoryPublishable,
    isEnglishProjectPublishable,
    isEnglishSectorPagePublishable,
    isEnglishServicePublishable,
} from "@/lib/publication";
import { getSectors, hasEnglish } from "@/lib/industry-pages";
import { team, teamMemberPath } from "@/lib/team";

export const dynamic = "force-dynamic";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Last real change of pages whose content lives in code (git log of the page
 * and its copy file). Update the date when you change one of these pages;
 * listing pages take their date from the newest item they list instead.
 */
const codePageUpdated = {
    home: "2026-10-23",
    /** Templates of /hizmetler, /projeler, /blog, /urunler; their date is at least this. */
    listings: "2026-10-21",
    about: "2026-10-21",
    contact: "2026-10-21",
    legal: "2026-10-16",
    corporate: "2026-10-09",
    fairs: "2026-10-09",
    dataCapture: "2026-09-23",
    microSite: "2026-09-29",
    presentation: "2026-09-26",
    team: "2026-10-20",
} as const;

const day = (value: string) => new Date(`${value}T00:00:00.000Z`);
const fallbackLastModified = day(codePageUpdated.home);

/** Newest of the given dates, so a listing changes when anything on it does. */
function newest(dates: Date[], floor?: string) {
    const all = floor ? [...dates, day(floor)] : dates;
    return all.length ? new Date(Math.max(...all.map((d) => d.getTime()))) : fallbackLastModified;
}

function entry(path: string, lastModified = fallbackLastModified, priority = 0.6): SitemapEntry {
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

    const rentalServices = categories.flatMap((category) => category.services);
    const home = day(codePageUpdated.home);
    const about = day(codePageUpdated.about);
    const contact = day(codePageUpdated.contact);
    const legal = day(codePageUpdated.legal);
    const services = newest([...rentalServices.map((s) => s.updatedAt), ...categories.map((c) => c.updatedAt)], codePageUpdated.listings);
    const projectsList = newest(projects.map((p) => p.updatedAt), codePageUpdated.listings);
    const blogList = newest(posts.map((p) => p.updatedAt), codePageUpdated.listings);
    const products = newest(saleServices.map((s) => s.updatedAt), codePageUpdated.listings);
    const sectors = await getSectors();
    const industryList = newest(sectors.map((s) => s.updatedAt), codePageUpdated.legal);
    const sectorList = newest(sectorPages.map((p) => p.updatedAt), codePageUpdated.legal);

    const staticPages = [
        entry("/", home, 1), entry("/hizmetler", services, 0.9),
        entry("/projeler", projectsList, 0.8), entry("/blog", blogList, 0.7),
        entry("/hakkimizda", about, 0.7), entry("/iletisim", contact, 0.7),
        entry("/urunler", products, 0.7),
        entry("/gizlilik", legal, 0.3), entry("/kullanim-kosullari", legal, 0.3),
        entry("/en", home, 0.9), entry("/en/services", services, 0.8),
        entry("/en/projects", projectsList, 0.8), entry("/en/blog", blogList, 0.7),
        entry("/en/about", about, 0.7), entry("/en/contact", contact, 0.7),
        entry("/en/products", products, 0.7),
        entry("/sektorel-yazilim-cozumleri", industryList, 0.5),
        entry("/en/industry-software-solutions", industryList, 0.5),
        entry("/sektorel-cozumler", sectorList, 0.4), entry("/en/sector-solutions", sectorList, 0.4),
        entry("/hizmetler/kurumsal-etkinlik-teknolojisi", day(codePageUpdated.corporate), 0.7),
        entry("/hizmetler/fuar-aktivasyonlari", day(codePageUpdated.fairs), 0.6),
        ...sectorPages.filter((page) => page.slug === "magaza-ici-kalici-photobooth").map((page) => entry(`/hizmetler/${page.slug}`, page.updatedAt, 0.6)),
        ...sectorPages.filter((page) => cityLandingSlugs.includes(page.slug)).flatMap((page) => [
            entry(`/hizmetler/${page.slug}`, page.updatedAt, 0.6),
            ...(isEnglishSectorPagePublishable(page) ? [entry(`/en/services/${page.slug_en}`, page.updatedAt, 0.6)] : []),
        ]),
        entry("/hizmetler/data-capture-crm", day(codePageUpdated.dataCapture), 0.7),
        entry("/hizmetler/etkinlik-mikro-site-ve-uygulama", day(codePageUpdated.microSite), 0.7),
        entry("/sunum", day(codePageUpdated.presentation), 0.6),
        ...team.flatMap((member) => [
            entry(teamMemberPath(member, "tr"), day(codePageUpdated.team), 0.4),
            entry(teamMemberPath(member, "en"), day(codePageUpdated.team), 0.4),
        ]),
    ];

    const industryPages = sectors.flatMap((sector) => [
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
