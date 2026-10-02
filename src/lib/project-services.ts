import { prisma } from "@/lib/db";
import { isEnglishServicePublishable } from "@/lib/publication";

export interface RelatedService {
    title: string;
    href: string;
}

/** Service titles often carry a tagline ("X Kiralama | Etkinlik Aktivasyonları"); the link shows the name only. */
function linkTitle(title: string) {
    return title.split(/\s[|:]\s|:\s/)[0].trim();
}

/**
 * Links from a case study to the service page(s) picked for it in the editpanel
 * (Project.serviceIds, a JSON array of service ids). Unpublished services are dropped.
 */
export async function getRelatedServices(serviceIds: string | null, locale: "tr" | "en"): Promise<RelatedService[]> {
    const ids: string[] = serviceIds ? JSON.parse(serviceIds) : [];
    if (!ids.length) return [];

    const services = await prisma.service.findMany({
        where: { id: { in: ids }, published: true },
        include: { category: true },
    });

    return ids.flatMap((id) => {
        const service = services.find((item) => item.id === id);
        if (!service) return [];
        if (locale === "en") {
            if (!isEnglishServicePublishable(service, service.category)) return [];
            return [{
                title: linkTitle(service.title_en || service.title),
                href: `/en/services/${service.category.slug_en}/${service.slug_en}`,
            }];
        }
        return [{ title: linkTitle(service.title), href: `/hizmetler/${service.category.slug}/${service.slug}` }];
    });
}
