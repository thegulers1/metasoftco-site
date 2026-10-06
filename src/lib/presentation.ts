import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { cloudinaryOptimize, isVideoUrl } from "@/lib/cloudinary";
import type { Deck, DeckCategory, DeckService, DeckSpec } from "@/lib/presentation-deck";
import { layoutMedia, type MediaSource } from "@/lib/presentation-layout";

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

/** Slide width in CSS px at print size, and how much sharper than that photos are requested. */
const SLIDE_PX = 1600;
const PIXEL_DENSITY = 1.6;
/** next/image device sizes: Cloudinary usually has these variants derived already. */
const IMAGE_WIDTHS = [640, 828, 1080, 1200, 1920];

/**
 * Gallery items can be videos. A slide cannot play one, so a Cloudinary video
 * is shown as a still frame from its first second; any other video is skipped.
 */
function stillFrame(url: string) {
    if (!isVideoUrl(url)) return url;
    if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) return null;
    return url.replace("/video/upload/", "/video/upload/so_1,f_jpg/").replace(/\.[a-z0-9]+($|\?)/i, ".jpg$1");
}

/** Delivery URL sized for a photo drawn `cqw` wide on the slide. */
function sizedUrl(url: string, cqw: number) {
    const needed = (cqw / 100) * SLIDE_PX * PIXEL_DENSITY;
    const width = IMAGE_WIDTHS.find((w) => w >= needed) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
    if (url.includes("/video/upload/so_1,f_jpg/")) return url.replace("so_1,f_jpg/", `so_1,f_jpg,q_auto,w_${width}/`);
    return cloudinaryOptimize(url, width);
}

/**
 * Width ÷ height of a Cloudinary asset, read from its fl_getinfo endpoint.
 * The layout is built from these ratios so no photo is cropped. A versioned
 * URL never changes, so the answer is cached for a month; a failed lookup
 * throws and is therefore not cached.
 */
const fetchImageRatio = unstable_cache(
    async (url: string): Promise<number> => {
        const infoUrl = url.includes("/video/upload/so_1,f_jpg/")
            ? url.replace("so_1,f_jpg/", "so_1,f_jpg,fl_getinfo/")
            : url.replace("/image/upload/", "/image/upload/fl_getinfo/");
        const res = await fetch(infoUrl, { signal: AbortSignal.timeout(8000) });
        const info = (await res.json()) as { input?: { width?: number; height?: number } };
        const { width, height } = info.input ?? {};
        if (!res.ok || !width || !height) throw new Error(`No size for ${url}`);
        return width / height;
    },
    ["presentation-image-ratio"],
    { revalidate: 60 * 60 * 24 * 30 },
);

async function mediaSource(url: string): Promise<MediaSource> {
    if (!url.includes("res.cloudinary.com")) return { url, ratio: null };
    return { url, ratio: await fetchImageRatio(url).catch(() => null) };
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
    let coverImage = null as string | null;

    const deckCategories = await Promise.all(
        categories
            .filter((category) => category.services.length > 0)
            .map(async (category, index): Promise<DeckCategory> => {
                const isSoftware = category.slug === SOFTWARE_CATEGORY_SLUG;
                latest = Math.max(latest, category.updatedAt.getTime());

                const services = await Promise.all(
                    category.services.map(async (service): Promise<DeckService> => {
                        latest = Math.max(latest, service.updatedAt.getTime());
                        const gallery = galleryUrls(service.gallery);
                        const image = [service.image, ...gallery].find((url) => url && !isVideoUrl(url)) || null;
                        if (service.slug === COVER_SERVICE_SLUG && image) coverImage = image;

                        let media: DeckService["media"] = null;
                        if (image) {
                            const extras = gallery
                                .filter((url) => url !== image)
                                .map(stillFrame)
                                .filter((url): url is string => Boolean(url))
                                .slice(0, 3);
                            const [main, ...thumbs] = await Promise.all([image, ...extras].map(mediaSource));
                            const layout = layoutMedia(main, thumbs);
                            media = { ...layout, items: layout.items.map((item) => ({ ...item, url: sizedUrl(item.url, item.w) })) };
                        }

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
                            media,
                            href: `/hizmetler/${category.slug}/${service.slug}`,
                            isRental: !isSoftware,
                            newSince: isNew ? `${TR_MONTHS[created.getMonth()]} ${created.getFullYear()}` : null,
                        };
                    }),
                );

                const heroLead = trimToSentences(stripHtml(category.heroContent), 220);
                return {
                    id: category.id,
                    no: String(index + 1).padStart(2, "0"),
                    name: category.name,
                    lead: CATEGORY_LEADS[category.slug] ?? heroLead,
                    cover: services.find((service) => service.image)?.image ?? null,
                    services,
                };
            }),
    );

    const firstImage = deckCategories.flatMap((c) => c.services).find((s) => s.image)?.image ?? null;

    return {
        version: formatDate(new Date(latest || now)),
        coverImage: coverImage ? cloudinaryOptimize(coverImage, COVER_IMAGE_WIDTH) : firstImage,
        categories: deckCategories,
        serviceCount: deckCategories.reduce((sum, c) => sum + c.services.length, 0),
    };
}

// Bump the key suffix when the deck's shape changes, so a stale cached deck is not served after a deploy.
export const getPresentationDeck = unstable_cache(loadDeck, [PRESENTATION_CACHE_TAG, "v4"], {
    revalidate: 300,
    tags: [PRESENTATION_CACHE_TAG],
});
