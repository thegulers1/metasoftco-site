/** 18 Kasım 2026 — ürün sayfası adlandırması (düzeltme listesi, bölüm 3).
 * Meta başlığa ürün adının yanına piyasa karşılığını ekler; meta açıklama jenerik tanımla başlar.
 * H1, slug ve yayın durumu değişmez.
 *
 * Önizleme:   pnpm exec tsx scripts/product-titles-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/product-titles-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/product-titles-2026-11.ts --rollback /mutlak/yol/backup.json
 * Alanlar arada değişmişse (editpanel'den düzenlenmişse) yazmaz, durur.
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

type Fields = { metaTitle: string | null; metaDescription: string | null };

const patches: Record<string, Fields> = {
    "momento-ball": {
        metaTitle: "Momento Ball Kiralama | Şeffaf Fotoğraf Küresi",
        metaDescription: "Şeffaf fotoğraf küresi kiralama: Momento Ball ile yılbaşı etkinliğinde fotoğraf çekimi, baskı ve şeffaf küre tek pakette. Örnek uygulamayı inceleyin.",
    },
    "wordportre-kirala": {
        metaTitle: "Wordportre Kiralama | Kelimelerden Portre Çizimi",
        metaDescription: "Kelimelerden portre çizimi: Wordportre, katılımcının portresini markanızın kelimeleriyle çizen fotoğraf aktivasyonu; kişiye özel, sanatsal bir hatıra.",
    },
    "glow-box-photo": {
        metaTitle: "Glow Box Photo Kiralama | Işıklı Fotoğraf Kabini",
        metaDescription: "Işıklı fotoğraf kabini kiralama: Glow Box Photo, fütüristik ışık tüneli ve efektleriyle markanız için dikkat çeken, paylaşılabilir fotoğraflar üretir.",
    },
    "interactive-puzzle": {
        metaTitle: "İnteraktif Puzzle Kiralama | Dijital Yapboz Oyunu",
        metaDescription: "Dijital yapboz oyunu kiralama: İnteraktif Puzzle'da katılımcılar markanıza özel görsellerin parçalarını birleştirir; dikkat ve hız isteyen etkinlik oyunu.",
    },
    "star-map": {
        metaTitle: "Star Map Kiralama | Kişiye Özel Yıldız Haritası",
        metaDescription: "Kişiye özel yıldız haritası: Star Map, katılımcının bilgileriyle haritayı saniyeler içinde oluşturur, yapay zeka yorumuyla basar ve hediye olarak verir.",
    },
    "charge-bike": {
        metaTitle: "Charge Bike Kiralama | Pedallı Telefon Şarj İstasyonu",
        metaDescription: "Pedallı telefon şarj istasyonu: Charge Bike'ta pedal çevrildikçe telefon şarj olur, ekrandaki karakter hızlanır. Sürdürülebilirlik temalı etkinlik oyunu.",
    },
    "catch-collect-game": {
        metaTitle: "Catch & Collect Kiralama | Telefonla Oynanan Ürün Toplama Oyunu",
        metaDescription: "Telefonla oynanan ürün toplama oyunu: Catch & Collect'te telefon kumandaya dönüşür, büyük ekranda sepetle markaya özel ürünler yakalanır.",
    },
    "ai-bookmark": {
        metaTitle: "AI Bookmark Kiralama | Yapay Zeka ile Kişiye Özel Kitap Ayracı",
        metaDescription: "Yapay zeka ile kişiye özel kitap ayracı: katılımcı çizim yapar ya da birkaç kelime yazar, yapay zeka bunu özgün bir görsele çevirir ve ayraç olarak basılır.",
    },
    "ai-style": {
        metaTitle: "AI Style Kiralama | Yapay Zeka Stil Portresi",
        metaDescription: "Yapay zeka stil portresi: AI Style, katılımcıların fotoğraflarını markanıza özel stil dünyalarına dönüştüren kişiselleştirilmiş portre deneyimi.",
    },
    "quiz-bilgi-yarismasi": {
        metaTitle: "Quiz Bilgi Yarışması Kiralama | Kurumsal Bilgi Yarışması",
        metaDescription: "Kurumsal bilgi yarışması kiralama: markanıza özel sorular, canlı skor tablosu ve sahada teknik destekle interaktif quiz. Etkinliğiniz için teklif alın.",
    },
};

const select = { id: true, slug: true, metaTitle: true, metaDescription: true } as const;
const args = process.argv.slice(2);

async function rollback(file: string) {
    const backup = JSON.parse(readFileSync(resolve(file), "utf8")) as { id: string; slug: string; before: Fields; after: Fields }[];
    await prisma.$transaction(async (tx) => {
        for (const row of backup) {
            const now = await tx.service.findUniqueOrThrow({ where: { id: row.id }, select });
            if (now.metaTitle !== row.after.metaTitle || now.metaDescription !== row.after.metaDescription) {
                throw new Error(`${row.slug}: uygulamadan sonra değişmiş, geri alma durdu.`);
            }
            await tx.service.update({ where: { id: row.id }, data: row.before });
        }
    });
    console.log(`Geri alındı: ${backup.length} kayıt.`);
}

async function main() {
    const rollbackAt = args.indexOf("--rollback");
    if (rollbackAt >= 0) return rollback(args[rollbackAt + 1]);

    const rows = await prisma.service.findMany({ where: { slug: { in: Object.keys(patches) } }, select });
    const missing = Object.keys(patches).filter((slug) => !rows.some((r) => r.slug === slug));
    if (missing.length) throw new Error(`Bulunamadı: ${missing.join(", ")}`);

    const changes = rows
        .map((r) => ({ id: r.id, slug: r.slug, before: { metaTitle: r.metaTitle, metaDescription: r.metaDescription }, after: patches[r.slug] }))
        .filter((c) => c.before.metaTitle !== c.after.metaTitle || c.before.metaDescription !== c.after.metaDescription);

    for (const c of changes) {
        console.log(`\n${c.slug}`);
        console.log(`  başlık  : ${c.before.metaTitle ?? "(boş)"}\n        → ${c.after.metaTitle} (${c.after.metaTitle?.length})`);
        console.log(`  açıklama: ${c.before.metaDescription ?? "(boş)"}\n        → ${c.after.metaDescription} (${c.after.metaDescription?.length})`);
    }
    console.log(`\n${changes.length} kayıt değişecek.`);
    if (!args.includes("--apply") || changes.length === 0) return;

    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/product-titles-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify(changes, null, 2));

    await prisma.$transaction(async (tx) => {
        for (const c of changes) {
            const now = await tx.service.findUniqueOrThrow({ where: { id: c.id }, select });
            if (now.metaTitle !== c.before.metaTitle || now.metaDescription !== c.before.metaDescription) {
                throw new Error(`${c.slug}: önizlemeden sonra değişmiş, yazma durdu.`);
            }
            await tx.service.update({ where: { id: c.id }, data: c.after });
        }
    });
    console.log(`Uygulandı. Yedek: ${file}`);
}

main().finally(() => prisma.$disconnect());
