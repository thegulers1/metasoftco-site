import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { cloudinaryOptimize } from "@/lib/cloudinary";
import type { Deck, DeckCategory, DeckService, DeckSpec } from "@/lib/presentation-deck";

/**
 * Data for the /sunum page and its PDF export. The deck is built from the
 * live service catalogue, so a service published in the editpanel shows up in
 * the presentation without anyone touching a slide. Only published RENTAL
 * services are included; SALE pages (kurumsal satış) never enter the deck.
 */

export const PRESENTATION_CACHE_TAG = "presentation-deck";

/** A service stays marked "Yeni" for this many days after it was created. */
const NEW_WINDOW_DAYS = 60;
/** Titles longer than this fall back to the shorter homepage title. */
const MAX_TITLE_LENGTH = 48;
const MAX_LEAD_LENGTH = 380;
const MAX_POINTS = 4;
const MAX_SPECS = 4;
/**
 * Widths match next/image's device sizes so Cloudinary usually serves an
 * already-derived variant; a fresh transform per image makes the PDF slow.
 */
const MAIN_IMAGE_WIDTH = 1200;
const THUMB_WIDTH = 640;
const COVER_IMAGE_WIDTH = 1080;

const SOFTWARE_CATEGORY_SLUG = "yazilim-gelistirme";
const COVER_SERVICE_SLUG = "ai-photobooth-kirala";

const EVENT_SPECS: DeckSpec[] = [
    { label: "Kurulum", value: "Cihaz başı 30–40 dk" },
    { label: "Sahada", value: "2 teknik personel" },
    { label: "İnternet", value: "Kendi 5G modemimiz" },
];

const SOFTWARE_SPECS: DeckSpec[] = [
    { label: "Bakım", value: "İlk yıl ücretsiz" },
    { label: "Kaynak kod", value: "Talep halinde teslim" },
    { label: "Gizlilik", value: "Talep halinde NDA" },
];

/** Chapter intros written for the deck; other categories use their hero text. */
const CATEGORY_LEADS: Record<string, string> = {
    "yapay-zeka-etkinlik-cozumleri":
        "Katılımcının fotoğrafı, çizimi ya da sesi yapay zekâyla saniyeler içinde markanıza özel bir içeriğe dönüşür; baskı veya QR ile anında paylaşılır.",
    "photobooth-ve-fotograf-aktivasyonlari":
        "Baskısı anında elde, dijital kopyası QR ile telefonda: markanıza özel tasarlanan, sosyal medyada paylaşılmak için kurgulanmış fotoğraf deneyimleri.",
    "interaktif-etkinlik-aktiviteleri":
        "Standınıza rekabet ve kalabalık getiren oyunlar: liderlik tabloları, ödül mekanikleri ve markanıza özel içerikle.",
    video:
        "360 derece dönüşlerden GIF ve kısa videolara; ağır çekim ve markaya özel grafiklerle anında paylaşılan video deneyimleri.",
    "vr-ar-deneyimleri":
        "Sanal ve artırılmış gerçeklikle katılımcıları başka bir dünyaya taşıyan, izleyenleri de heyecanlandıran sahne deneyimleri.",
    [SOFTWARE_CATEGORY_SLUG]:
        "Etkinlik teknolojilerini geliştiren aynı ekip: mobil uygulama, web paneli, süreç yazılımı ve yapay zekâ entegrasyonu.",
};

const TR_MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function stripHtml(html: string | null | undefined) {
    return (html ?? "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

/** "AI Photo & AI Photobooth Kiralama | Etkinlik Aktivasyonları" → "AI Photo & AI Photobooth" */
function cleanTitle(title: string | null | undefined) {
    return (title ?? "")
        .split(" | ")[0]
        .split(":")[0]
        .replace(/\s+Kirala(ma)?\b.*$/iu, "")
        .trim();
}

function displayTitle(title: string, homeTitle: string | null) {
    const full = cleanTitle(title);
    const short = cleanTitle(homeTitle);
    return full.length > MAX_TITLE_LENGTH && short ? short : full;
}

/** Cuts at a sentence boundary so a long description never ends mid-word. */
function trimToSentences(text: string, max: number) {
    if (text.length <= max) return text;
    const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [];
    let out = "";
    for (const sentence of sentences) {
        if ((out + sentence).length > max) break;
        out += sentence;
    }
    return out.trim() || `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function parseJsonArray<T>(value: string | null | undefined): T[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function galleryUrls(gallery: string | null) {
    return parseJsonArray<string | { url?: string }>(gallery)
        .map((item) => (typeof item === "string" ? item : item.url))
        .filter((url): url is string => Boolean(url));
}

export function parsePresentationPoints(value: string | null | undefined) {
    return (value ?? "")
        .split("\n")
        .map((line) => line.replace(/^[-•*\s]+/, "").trim())
        .filter(Boolean)
        .slice(0, MAX_POINTS);
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Europe/Istanbul",
    }).format(date);
}

async function loadDeck(): Promise<Deck> {
    const categories = await prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            services: {
                where: { published: true, type: "RENTAL" },
                orderBy: { order: "asc" },
            },
        },
    });

    const now = Date.now();
    let latest = 0;
    let coverImage: string | null = null;

    const deckCategories = categories
        .filter((category) => category.services.length > 0)
        .map((category, index): DeckCategory => {
            const isSoftware = category.slug === SOFTWARE_CATEGORY_SLUG;
            latest = Math.max(latest, category.updatedAt.getTime());

            const services = category.services.map((service): DeckService => {
                latest = Math.max(latest, service.updatedAt.getTime());
                const gallery = galleryUrls(service.gallery);
                const image = service.image || gallery[0] || null;
                const thumbs = gallery.filter((url) => url !== image).slice(0, 3);
                if (service.slug === COVER_SERVICE_SLUG && image) coverImage = image;

                const specs = parseJsonArray<DeckSpec>(service.specs)
                    .filter((spec) => spec?.label?.trim() && spec?.value?.trim())
                    .slice(0, MAX_SPECS);
                const created = service.createdAt;
                const isNew = now - created.getTime() < NEW_WINDOW_DAYS * 86_400_000;

                return {
                    id: service.id,
                    title: displayTitle(service.title, service.homeTitle),
                    lead: trimToSentences(stripHtml(service.description), MAX_LEAD_LENGTH),
                    points: parsePresentationPoints(service.presentationPoints),
                    specs: specs.length ? specs : isSoftware ? SOFTWARE_SPECS : EVENT_SPECS,
                    image: image ? cloudinaryOptimize(image, MAIN_IMAGE_WIDTH) : null,
                    thumbs: image ? thumbs.map((url) => cloudinaryOptimize(url, THUMB_WIDTH)) : [],
                    href: `/hizmetler/${category.slug}/${service.slug}`,
                    isRental: !isSoftware,
                    newSince: isNew ? `${TR_MONTHS[created.getMonth()]} ${created.getFullYear()}` : null,
                };
            });

            const heroLead = trimToSentences(stripHtml(category.heroContent), 220);
            return {
                id: category.id,
                no: String(index + 1).padStart(2, "0"),
                name: category.name,
                lead: CATEGORY_LEADS[category.slug] ?? heroLead,
                cover: services.find((service) => service.image)?.image ?? null,
                services,
            };
        });

    const firstImage = deckCategories.flatMap((c) => c.services).find((s) => s.image)?.image ?? null;

    return {
        version: formatDate(new Date(latest || now)),
        coverImage: coverImage ? cloudinaryOptimize(coverImage, COVER_IMAGE_WIDTH) : firstImage,
        categories: deckCategories,
        serviceCount: deckCategories.reduce((sum, c) => sum + c.services.length, 0),
    };
}

export const getPresentationDeck = unstable_cache(loadDeck, [PRESENTATION_CACHE_TAG], {
    revalidate: 300,
    tags: [PRESENTATION_CACHE_TAG],
});
