import { prisma } from "@/lib/db";
import { toRentalOutput } from "@/lib/rental-ops";
import type { ServiceTemplateProfile, TemplateImage, TemplateProject } from "./types";

type RawImage = string | { url: string; alt?: string };

function parseImages(raw: string | null, fallbackAlt: string): TemplateImage[] {
    if (!raw) return [];
    try {
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return (parsed as RawImage[]).flatMap((item) => {
            const url = typeof item === "string" ? item : item?.url;
            if (!url) return [];
            return [{ url, alt: (typeof item === "string" ? "" : item.alt) || fallbackAlt }];
        });
    } catch {
        return [];
    }
}

/**
 * Read-only: the published service, the projects the editor linked to it
 * (Project.serviceIds) and its FAQ. Projects that are not published or not
 * linked are never returned, so a section that needs them simply hides.
 */
export async function loadServiceTemplate(profile: ServiceTemplateProfile) {
    const category = await prisma.serviceCategory.findUnique({ where: { slug: profile.categorySlug } });
    if (!category) return null;
    const service = await prisma.service.findFirst({
        where: { slug: profile.serviceSlug, categoryId: category.id, type: "RENTAL", published: true },
    });
    if (!service) return null;

    const wanted = new Set([
        ...profile.cases.items.map((item) => item.projectSlug),
        ...profile.product.galleryFrames.map((frame) => frame.projectSlug),
    ]);
    const rows = await prisma.project.findMany({ where: { slug: { in: [...wanted] }, published: true } });
    const projects: TemplateProject[] = rows
        .filter((row) => {
            try {
                return (JSON.parse(row.serviceIds || "[]") as string[]).includes(service.id);
            } catch {
                return false;
            }
        })
        .map((row) => ({
            slug: row.slug,
            title: row.title,
            video: row.video,
            cover: row.image ? { url: row.image, alt: `${row.title} — proje görseli` } : null,
            gallery: parseImages(row.gallery, row.title),
        }));

    const output = toRentalOutput(service.outputType);
    const related = await prisma.service.findMany({
        where: { categoryId: category.id, id: { not: service.id }, type: "RENTAL", published: true },
        select: { id: true, slug: true, title: true },
        take: 4,
    });
    return { service, category, projects, output, related };
}
