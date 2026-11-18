/** 18 Kasım 2026 — ürün sayfası H1 ve giriş paragrafı (düzeltme listesi, bölüm 3).
 * H1 (`title`) "<Ürün> Kiralama: <Türkçe karşılık>" olur; H1'in altındaki giriş
 * (`description`) ürünün ne olduğunu jenerik kelimelerle söyleyerek başlar, marka
 * adı ikinci cümlede gelir. Cümleler yalnızca ürünün mevcut içeriğinden alındı.
 * Slug, metaTitle, İngilizce alanlar ve sayfa gövdesi (`content`) değişmez.
 * Momento Ball dahil değil: H1'i zaten Türkçe karşılık taşıyor.
 *
 * Önizleme:   pnpm exec tsx scripts/product-h1-intro-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/product-h1-intro-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/product-h1-intro-2026-11.ts --rollback /mutlak/yol/backup.json
 * Alanlar arada değişmişse (editpanel'den düzenlenmişse) yazmaz, durur.
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

type Fields = { title: string; description: string | null };

const patches: Record<string, Fields> = {
    "wordportre-kirala": {
        title: "Wordportre Kiralama: Kelimelerden Portre Çizimi",
        description: "Kelime portre, katılımcının fotoğrafını markanın seçtiği kelimelerden oluşan tipografik bir portreye dönüştüren fotoğraf aktivasyonudur. Wordportre'de kelime havuzunu kampanya sloganı, marka değerleri ya da etkinlik temasıyla siz belirlersiniz; portre etkinlik alanında basılır ve QR kod ile telefona da iner.",
    },
    "glow-box-photo": {
        title: "Glow Box Photo Kiralama: Işıklı Fotoğraf Kabini",
        description: "Işıklı fotoğraf kabini, LED ışık efektleriyle çevrili bir alanda profesyonel fotoğraf makinesiyle çekim yapan bir photobooth'tur. Glow Box Photo'da ışık senaryosu ve arka plan grafikleri markanızın renklerine göre hazırlanır; fotoğraflar basılır ve QR kod ile telefona iner.",
    },
    "interactive-puzzle": {
        title: "Interactive Puzzle Kiralama: Dijital Yapboz Oyunu",
        description: "Dijital yapboz oyunu, katılımcıların ekranda parçaları birleştirerek bir görseli tamamladığı ve süreye karşı yarıştığı interaktif bir oyundur. Interactive Puzzle'da yapboz görseli kampanya ya da lansman görselinizden hazırlanır; en hızlı tamamlayanlar canlı liderlik tablosunda yer alır, istenirse katılımcı formu eklenir.",
    },
    "star-map": {
        title: "Star Map Kiralama: Kişiye Özel Yıldız Haritası",
        description: "Kişiye özel yıldız haritası, katılımcıdan alınan birkaç bilgiyle saniyeler içinde oluşturulan ve yapay zekâ ile yorumlanan bir gökyüzü haritasıdır. Star Map'te harita markalı bir şablonla basılıp hediye edilir; alttaki QR kod ile katılımcı kendine özel yorum dosyasına telefonundan ulaşır.",
    },
    "charge-bike": {
        title: "Charge Bike Kiralama: Pedallı Telefon Şarj İstasyonu",
        description: "Pedallı telefon şarj istasyonu, katılımcıların bisiklet pedalı çevirerek hem telefonlarını şarj ettiği hem de ekrandaki bir yarışa güç verdiği interaktif bir aktivitedir. Charge Bike'ta pedal hızı ekrandaki karakterin hızını belirler; yarışlar bireysel ya da grup hâlinde yapılır, oyun arayüzü markanıza göre tasarlanır.",
    },
    "catch-collect-game": {
        title: "Catch & Collect Kiralama: Telefonla Oynanan Ürün Toplama Oyunu",
        description: "Telefonla oynanan ürün toplama oyunu, katılımcıların akıllı telefonlarını kablosuz kumandaya çevirerek büyük ekrandaki sepeti yönettiği interaktif bir oyundur. Catch & Collect'e QR kod ile bağlanılır; oyuncular markanın ürünlerini toplayarak yüksek skor için yarışır.",
    },
    "ai-bookmark": {
        title: "AI Bookmark Kiralama: Yapay Zekâ ile Kişiye Özel Kitap Ayracı",
        description: "Yapay zekâ kitap ayracı aktivitesi, katılımcının yazdığı kısa bir metni ya da ekrana çizdiği basit bir karalamayı yapay zekâ ile görsele dönüştürüp kitap ayracı olarak bastığı bir deneyimdir. AI Bookmark'ta ayraç tasarımına marka logosu ya da kampanya sloganı eklenir; görsel ayrıca QR kod ile telefona iner.",
    },
    "cabin-photo": {
        title: "Cabin Photo Kiralama: Kapalı Fotoğraf Kabini",
        description: "Kapalı fotoğraf kabini, misafirlerin içine girip fotoğraf çektirdiği, dört tarafı kapalı bir photobooth'tur. Cabin Photo'da fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner; kabin markanıza göre giydirilir.",
    },
    "quiz-bilgi-yarismasi": {
        title: "Quiz Bilgi Yarışması Kiralama: Telefonla Canlı Yarışma",
        description: "Quiz bilgi yarışması, katılımcıların sorulara telefonlarından yanıt verdiği ve sonuçların ekrandaki canlı skor tablosunda gösterildiği interaktif bir yarışmadır. Sorular şirket kültürü, ürünleriniz ya da etkinlik temasına göre hazırlanır; departmanlar ya da ekipler arasında oynanabilir.",
    },
    "ai-style": {
        title: "AI Style Kiralama: Yapay Zekâ Stil Portresi",
        description: "Yapay zekâ stil portresi, katılımcının fotoğrafını seçilen moda, sezon ya da kampanya estetiğine göre yeniden yorumlayan kişiselleştirilmiş bir portre deneyimidir. AI Style'da stil dünyaları markanıza özel kurgulanır; görsel QR kod ile telefona iner, istenirse markalı çerçeveyle basılır.",
    },
};

const select = { id: true, slug: true, title: true, description: true } as const;
const args = process.argv.slice(2);
const same = (a: Fields, b: Fields) => a.title === b.title && a.description === b.description;

async function rollback(file: string) {
    const backup = JSON.parse(readFileSync(resolve(file), "utf8")) as { id: string; slug: string; before: Fields; after: Fields }[];
    await prisma.$transaction(async (tx) => {
        for (const row of backup) {
            const now = await tx.service.findUniqueOrThrow({ where: { id: row.id }, select });
            if (!same(now, row.after)) throw new Error(`${row.slug}: uygulamadan sonra değişmiş, geri alma durdu.`);
            await tx.service.update({ where: { id: row.id }, data: row.before });
        }
    });
    console.log(`Geri alındı: ${backup.length} kayıt.`);
}

async function main() {
    const rollbackAt = args.indexOf("--rollback");
    if (rollbackAt >= 0) return rollback(args[rollbackAt + 1]);

    const rows = await prisma.service.findMany({ where: { slug: { in: Object.keys(patches) }, type: "RENTAL" }, select });
    const missing = Object.keys(patches).filter((slug) => !rows.some((r) => r.slug === slug));
    if (missing.length) throw new Error(`Bulunamadı: ${missing.join(", ")}`);
    if (rows.length !== Object.keys(patches).length) throw new Error("Aynı slug'a sahip birden fazla RENTAL kaydı var, durdu.");

    const changes = rows
        .map((r) => ({ id: r.id, slug: r.slug, before: { title: r.title, description: r.description }, after: patches[r.slug] }))
        .filter((c) => !same(c.before, c.after));

    for (const c of changes) {
        console.log(`\n${c.slug}`);
        console.log(`  H1   : ${c.before.title}\n      → ${c.after.title}`);
        console.log(`  giriş: ${c.before.description ?? "(boş)"}\n      → ${c.after.description}`);
    }
    console.log(`\n${changes.length} kayıt değişecek.`);
    if (!args.includes("--apply") || changes.length === 0) return;

    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/product-h1-intro-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify(changes, null, 2));

    await prisma.$transaction(async (tx) => {
        for (const c of changes) {
            const now = await tx.service.findUniqueOrThrow({ where: { id: c.id }, select });
            if (!same(now, c.before)) throw new Error(`${c.slug}: önizlemeden sonra değişmiş, yazma durdu.`);
            await tx.service.update({ where: { id: c.id }, data: c.after });
        }
    });
    console.log(`Uygulandı. Yedek: ${file}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
