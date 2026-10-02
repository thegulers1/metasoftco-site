/**
 * Fixes from the October 2026 SEO audit review, written to the live database.
 * Idempotent: every step compares before writing, so a second run changes nothing.
 *
 *   npx tsx scripts/seo-audit-fixes.ts          # preview
 *   npx tsx scripts/seo-audit-fixes.ts --write  # apply
 */
import "dotenv/config";
import { prisma } from "../src/lib/db";

const WRITE = process.argv.includes("--write");

/** Search titles: short enough for mobile, carrying the phrase people actually search. */
const serviceTitles: Record<string, { metaTitle?: string; metaTitle_en?: string }> = {
    "ai-photobooth-kirala": {
        metaTitle: "AI Photobooth Kiralama | Yapay Zeka Fotoğraf — MetasoftCo",
        metaTitle_en: "AI Photobooth Rental for Events in Türkiye — MetasoftCo",
    },
    "magazine-cover": {
        metaTitle: "Magazine Cover Kiralama | Dergi Kapağı Aktivasyonu — MetasoftCo",
        metaTitle_en: "Magazine Cover Photo Booth Rental — MetasoftCo",
    },
    "reflex-game-hiz-ve-rekabet-oyunu": {
        metaTitle: "Reflex Game Kiralama | Refleks Oyunu — MetasoftCo",
        metaTitle_en: "Reflex Game Rental for Events — MetasoftCo",
    },
    "reflex-wall": {
        metaTitle: "Reflex Wall Kiralama | Refleks Duvarı — MetasoftCo",
    },
    "ai-football-card": {
        metaTitle_en: "AI Football Card Rental | Personalised Player Cards — MetasoftCo",
    },
};

const FACE_SWAP_POST = "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir";
const faceSwapMeta = {
    metaTitle: "Face Swap Nedir? Yapay Zeka Yüz Değiştirme Nasıl Çalışır?",
    metaDescription:
        "Face swap, yapay zekânın bir fotoğraftaki yüzü başka bir görsele yerleştirmesidir. Nasıl çalıştığını ve etkinliklerde nasıl kullanıldığını anlatıyoruz.",
};

/** One AI Photo station serves 40–60 people an hour; the launch guide said 100–150. */
const LAUNCH_POST = "lansmanda-sosyal-medya-icerigi-ve-lead-ureten-aktivasyonlar";
const capacityFixes: { field: "content" | "content_en" | "faq" | "faq_en"; from: string; to: string }[] = [
    {
        field: "content",
        from: "Yüksek kapasitesi sayesinde kalabalık lansmanlarda öne çıkar; yapay zekâ fotoğraf aktivasyonlarında saatte ortalama 100–150 kişiye hizmet verebiliyoruz.",
        to: "Kalabalık lansmanlarda istasyon sayısı artırılarak ölçeklenir; tek bir AI Photo istasyonu saatte 40–60 kişiye hizmet verir.",
    },
    {
        field: "content_en",
        from: "Its high capacity suits busy launches; our AI photo activations serve 100–150 people per hour on average.",
        to: "It scales to busy launches by adding stations; a single AI Photo station serves 40–60 people per hour.",
    },
    {
        field: "faq",
        from: "Sayı açısından AI Photo gibi yüksek kapasiteli fotoğraf aktivasyonları öne çıkar; yapay zekâ fotoğraf aktivasyonlarında saatte ortalama 100–150 kişiye hizmet verebiliyoruz.",
        to: "Sayı açısından AI Photo gibi fotoğraf aktivasyonları öne çıkar; tek bir AI Photo istasyonu saatte 40–60 kişiye hizmet verir ve istasyon sayısı artırılarak kapasite yükseltilir.",
    },
    {
        field: "faq_en",
        from: "For volume, high-capacity photo activations like AI Photo stand out; our AI photo activations serve 100–150 people per hour on average.",
        to: "For volume, photo activations like AI Photo stand out; a single AI Photo station serves 40–60 people per hour, and capacity grows by adding stations.",
    },
];

/** "Metasoftco" in running text; lowercase URLs and e-mail addresses never match. */
const BRAND_CASING = /Metasoftco(?![a-z.])/g;

function log(what: string, before: unknown, after: unknown) {
    console.log(`${WRITE ? "WRITE" : "would write"} ${what}\n    - ${before}\n    + ${after}`);
}

async function fixTitles() {
    for (const [slug, titles] of Object.entries(serviceTitles)) {
        const service = await prisma.service.findFirst({ where: { slug, type: "RENTAL" } });
        if (!service) throw new Error(`Service not found: ${slug}`);
        const data: { metaTitle?: string; metaTitle_en?: string } = {};
        for (const key of ["metaTitle", "metaTitle_en"] as const) {
            const next = titles[key];
            if (next && service[key] !== next) {
                data[key] = next;
                log(`${slug}.${key}`, service[key], next);
            }
        }
        if (WRITE && Object.keys(data).length) await prisma.service.update({ where: { id: service.id }, data });
    }

    const post = await prisma.blogPost.findUnique({ where: { slug: FACE_SWAP_POST } });
    if (!post) throw new Error("Face swap post not found");
    const data: Partial<typeof faceSwapMeta> = {};
    for (const key of ["metaTitle", "metaDescription"] as const) {
        if (post[key] !== faceSwapMeta[key]) {
            data[key] = faceSwapMeta[key];
            log(`${FACE_SWAP_POST}.${key}`, post[key], faceSwapMeta[key]);
        }
    }
    if (WRITE && Object.keys(data).length) await prisma.blogPost.update({ where: { id: post.id }, data });
}

async function fixCapacity() {
    const post = await prisma.blogPost.findUnique({ where: { slug: LAUNCH_POST } });
    if (!post) throw new Error("Launch post not found");
    const data: Record<string, string> = {};
    for (const fix of capacityFixes) {
        const current = post[fix.field] || "";
        if (current.includes(fix.from)) {
            data[fix.field] = current.replace(fix.from, fix.to);
            log(`${LAUNCH_POST}.${fix.field}`, fix.from, fix.to);
        } else if (!current.includes(fix.to)) {
            console.warn(`!! ${fix.field}: neither the old nor the new sentence found — check by hand.`);
        }
    }
    if (WRITE && Object.keys(data).length) await prisma.blogPost.update({ where: { id: post.id }, data });
}

async function fixBrandCasing() {
    const tables = [
        { name: "serviceCategory", rows: await prisma.serviceCategory.findMany(), update: (id: string, data: object) => prisma.serviceCategory.update({ where: { id }, data }) },
        { name: "service", rows: await prisma.service.findMany(), update: (id: string, data: object) => prisma.service.update({ where: { id }, data }) },
        { name: "blogPost", rows: await prisma.blogPost.findMany(), update: (id: string, data: object) => prisma.blogPost.update({ where: { id }, data }) },
        { name: "project", rows: await prisma.project.findMany(), update: (id: string, data: object) => prisma.project.update({ where: { id }, data }) },
        { name: "sectorPage", rows: await prisma.sectorPage.findMany(), update: (id: string, data: object) => prisma.sectorPage.update({ where: { id }, data }) },
        { name: "industryPage", rows: await prisma.industryPage.findMany(), update: (id: string, data: object) => prisma.industryPage.update({ where: { id }, data }) },
    ];
    for (const table of tables) {
        for (const row of table.rows as ({ id: string; slug?: string } & Record<string, unknown>)[]) {
            const data: Record<string, string> = {};
            for (const [key, value] of Object.entries(row)) {
                if (typeof value !== "string" || key === "id" || key.startsWith("slug")) continue;
                const fixed = value.replace(BRAND_CASING, "MetasoftCo");
                if (fixed !== value) {
                    data[key] = fixed;
                    log(`${table.name} ${row.slug}.${key}`, `${value.match(BRAND_CASING)?.length} × "Metasoftco"`, "MetasoftCo");
                }
            }
            if (WRITE && Object.keys(data).length) await table.update(row.id, data);
        }
    }
}

async function main() {
    await fixTitles();
    await fixCapacity();
    await fixBrandCasing();
    console.log(WRITE ? "\nDone." : "\nPreview only — rerun with --write to apply.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
