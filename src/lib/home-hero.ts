import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { phase2ProjectSlugs } from "@/lib/phase2";

/**
 * The home hero always shows the Ray-Ban strip photo. It is loaded on its own
 * rather than picked out of the featured projects, so featuring a fourth
 * project in the editpanel cannot push it off the page.
 */
export const getHomeHeroImage = unstable_cache(
    async () => {
        const project = await prisma.project.findUnique({
            where: { slug: phase2ProjectSlugs.workDetail.tr },
            select: { image: true },
        });
        return project?.image ?? null;
    },
    ["phase-2-home-hero-image"],
    { revalidate: 3600 }
);
