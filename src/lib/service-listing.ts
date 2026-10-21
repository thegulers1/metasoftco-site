import { isVideoUrl } from "@/lib/cloudinary";
import { capabilityListingImageOverrides } from "@/lib/phase2-content";

/**
 * The image a service shows on listing pages. Services without a cover image
 * used to be dropped from /hizmetler and /urunler, so those pages counted fewer
 * experiences than the presentation (42 vs 49). Every published service is
 * listed now: cover image first, then the first photo in its gallery, and an
 * empty tile only when neither exists.
 */
export function serviceListingImage(service: { id: string; image: string | null; gallery?: unknown }): string | null {
    const override = capabilityListingImageOverrides[service.id];
    if (override) return override;
    if (service.image && !isVideoUrl(service.image)) return service.image;
    return galleryStill(service.gallery);
}

function galleryStill(gallery: unknown): string | null {
    let items: unknown = gallery;
    if (typeof gallery === "string") {
        try {
            items = JSON.parse(gallery);
        } catch {
            return null;
        }
    }
    if (!Array.isArray(items)) return null;
    for (const item of items) {
        const url = typeof item === "string" ? item : (item as { url?: unknown } | null)?.url;
        if (typeof url === "string" && url && !isVideoUrl(url)) return url;
    }
    return null;
}
