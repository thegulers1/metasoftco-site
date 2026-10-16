import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { isEnglishProjectPublishable } from "@/lib/publication";
import { homeClientName, homeCopy, homeProjectImageSlugs, homeProjectTag, homeServiceImageSlugs } from "@/lib/home-content";
import type { Phase2Locale } from "@/lib/phase2";
import type { HomeProject, HomeService } from "@/components/home/HomeExperience";

/** How many projects ride the horizontal strip before the "all projects" card. */
const STRIP_SIZE = 8;

/**
 * Software projects have their own hub and no photography, so the event
 * homepage leaves them out of both the strip and the project count.
 */
const notSoftware = { OR: [{ category: null }, { category: { not: "Yazılım" } }] };

const getHomeProjectRecords = unstable_cache(
    () => prisma.project.findMany({
        where: { published: true, image: { not: null }, ...notSoftware },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
        select: {
            slug: true,
            slug_en: true,
            title: true,
            title_en: true,
            description_en: true,
            content_en: true,
            metaTitle_en: true,
            metaDescription_en: true,
            client: true,
            category: true,
            image: true,
        },
    }),
    ["home-projects"],
    { revalidate: 3600 }
);

const getHomeServiceImages = unstable_cache(
    () => prisma.service.findMany({
        where: { slug: { in: [...homeServiceImageSlugs] } },
        select: { slug: true, image: true },
    }),
    ["home-service-images"],
    { revalidate: 3600 }
);

export async function getHomeData(locale: Phase2Locale) {
    const copy = homeCopy(locale);
    const [records, serviceImages] = await Promise.all([getHomeProjectRecords(), getHomeServiceImages()]);
    const projectImage = (key: keyof typeof homeProjectImageSlugs) =>
        records.find((record) => record.slug === homeProjectImageSlugs[key])?.image ?? null;

    const localized = locale === "en" ? records.filter(isEnglishProjectPublishable) : records;
    const projects: HomeProject[] = localized.slice(0, STRIP_SIZE).map((record) => {
        const slug = locale === "en" ? record.slug_en! : record.slug;
        const title = (locale === "en" ? record.title_en : record.title) || record.title;
        return {
            key: record.slug,
            href: `${copy.routes.work}/${slug}`,
            client: homeClientName(record.client, title),
            title,
            tag: homeProjectTag(record.category, locale),
            image: record.image!,
        };
    });

    const services: HomeService[] = copy.services.map((service) => ({
        key: service.key,
        name: service.name,
        desc: service.desc,
        href: service.href,
        image: !service.image
            ? null
            : "project" in service.image
                ? projectImage(service.image.project)
                : serviceImages.find((record) => record.slug === (service.image as { service: string }).service)?.image ?? null,
    }));

    return {
        projects,
        projectCount: localized.length,
        services,
        souvenirImages: { rayban: projectImage("rayban"), tcmb: projectImage("tcmb") },
    };
}
