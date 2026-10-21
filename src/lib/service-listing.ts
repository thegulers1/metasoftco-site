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

/**
 * Short card title for listing pages. Service titles in the editpanel are
 * written for search ("İris Fotoğrafçılığı (Iris Photo) ve Makro Göz Çekimi
 * Etkinlik Aktivasyonu Kiralama"); on a page that is already about renting,
 * the card only needs the product name. The full title stays on the detail
 * page and in the page metadata. The editpanel's "home title", when filled,
 * wins, trimmed the same way.
 */
export function shortServiceTitle(title: string, homeTitle?: string | null): string {
    // The editpanel's short title wins, but gets the same trimming ("Human vs AI Kiralama" -> "Human vs AI").
    let text = homeTitle?.trim() || title.trim();
    // Keep what comes before a subtitle: "X | Y", "X: Y", "X - Y"; a question keeps its mark.
    text = text.split(/\s+[|–—-]\s+|:\s+/)[0];
    const question = text.indexOf("?");
    if (question > 0) text = text.slice(0, question + 1);
    text = text
        .replace(/^Kurumsal Etkinlikler İçin\s+/i, "")
        .replace(/\s*\([^)]*\)\s*/g, " ")
        .replace(/\s+(Etkinlik\s+)?Aktivasyonu?\s+Kiralama$/i, "")
        .replace(/\s+(Kiralama|Kirala|Rental|Hire)$/i, "")
        .replace(/\s+(Etkinlik\s+)?Aktivasyonu$/i, "")
        .replace(/\s{2,}/g, " ")
        .trim();
    return text || title.trim();
}
