import { AI_PHOTOBOOTH_CASES } from "@/lib/ai-photobooth";
import { cache } from "react";
import { prisma } from "@/lib/db";
import { isEnglishProjectPublishable } from "@/lib/publication";

export interface ServiceReference {
  href: string;
  title: string;
  description: string;
  image: string;
}
const publishedProjects = cache(() =>
  prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      slug_en: true,
      title: true,
      title_en: true,
      description: true,
      description_en: true,
      image: true,
      serviceIds: true,
      content_en: true,
      metaTitle_en: true,
      metaDescription_en: true,
    },
  }),
);
/** Only explicit editor links count as references. No inference from a brand or category. */
export async function serviceReferences(
  serviceId: string,
  locale: "tr" | "en",
  serviceSlug: string,
): Promise<ServiceReference[]> {
  const projects = await publishedProjects();
  return projects
    .flatMap((project) => {
      if (
        serviceSlug.startsWith("ai-photobooth") &&
        !AI_PHOTOBOOTH_CASES.some((item) => item.slug === project.slug)
      )
        return [];
      try {
        const ids: unknown = JSON.parse(project.serviceIds || "[]");
        if (!Array.isArray(ids) || !ids.includes(serviceId) || !project.image)
          return [];
      } catch {
        return [];
      }
      if (locale === "en" && !isEnglishProjectPublishable(project)) return [];
      return [
        {
          href:
            locale === "en"
              ? `/en/projects/${project.slug_en}`
              : `/projeler/${project.slug}`,
          title: (locale === "en" && project.title_en) || project.title,
          description:
            (locale === "en" && project.description_en) ||
            project.description ||
            "",
          image: project.image,
        },
      ];
    })
    .slice(0, 4);
}
