/** 18 Kasım 2026 — sağlık sektör sayfasına Dynavit referansı.
 * Bilgi kullanıcıdan: Eczacıbaşı Dynavit, 8 Ağustos 2024, Kanyon AVM, voleybol
 * dönemi; AI Photo kiosku, voleybol temalı görseller, anında baskı (fotoğraflarda
 * görülüyor). Görseller public/images/projeler/dynavit-kanyon/ altında.
 *
 * Önizleme:   pnpm exec tsx scripts/sector-dynavit-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/sector-dynavit-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/sector-dynavit-2026-11.ts --rollback /mutlak/yol/backup.json
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

const SLUG = "saglik-sektoru";
const ANCHOR = "<h2>Kongre merkezinde ve otelde kurulum</h2>";
const IMG = "/images/projeler/dynavit-kanyon";

const section = [
    "<h2>Sağlık markalarının tüketici etkinlikleri</h2>",
    "<p>Kongrelerin dışında sağlık markalarının tüketiciye dönük etkinliklerinde de sahadayız. 8 Ağustos 2024'te Eczacıbaşı'nın Dynavit markası için İstanbul Kanyon AVM'de, \"Aradığın Destek!\" kampanyasıyla giydirilmiş bir <a href=\"/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala\">AI Photo</a> kiosku kurduk. Voleybol heyecanının yaşandığı o günlerde ziyaretçiler kendilerini voleybol temalı yapay zekâ görsellerinde gördü; görseller QR kod ile telefona indi ya da Eczacıbaşı ve Dynavit logolu çerçeveyle anında basıldı.</p>",
    `<figure style="max-width:420px"><img src="${IMG}/dynavit-kiosk-kanyon.webp" alt="Kanyon AVM'de Eczacıbaşı Dynavit giydirmeli AI Photo kiosku ve fotoğraf yazıcısı" width="1200" height="1600" loading="lazy"></figure>`,
    `<figure><img src="${IMG}/dynavit-baski-elde.webp" alt="Dynavit AI Photo aktivasyonundan voleybol temalı, logolu basılı yapay zekâ fotoğrafı" width="1600" height="1200" loading="lazy"></figure>`,
].join("");

const faqItem = {
    q: "Sağlık markalarının tüketici etkinliklerinde de çalışıyor musunuz?",
    a: "Evet. Örneğin 8 Ağustos 2024'te Eczacıbaşı'nın Dynavit markası için Kanyon AVM'de \"Aradığın Destek!\" kampanyasıyla giydirilmiş bir AI Photo kiosku kurduk; ziyaretçiler voleybol temalı yapay zekâ görsellerini QR kod ile telefonlarına aldı ya da logolu çerçeveyle bastırdı.",
};

type Fields = { content: string | null; faq: string | null };
const select = { id: true, content: true, faq: true } as const;
const args = process.argv.slice(2);

async function main() {
    const rollbackAt = args.indexOf("--rollback");
    if (rollbackAt >= 0) {
        const backup = JSON.parse(readFileSync(resolve(args[rollbackAt + 1]), "utf8")) as { id: string; before: Fields; after: Fields };
        const now = await prisma.industryPage.findUniqueOrThrow({ where: { id: backup.id }, select });
        if (now.content !== backup.after.content || now.faq !== backup.after.faq) throw new Error("Uygulamadan sonra değişmiş, geri alma durdu.");
        await prisma.industryPage.update({ where: { id: backup.id }, data: backup.before });
        return console.log("Geri alındı.");
    }

    const row = await prisma.industryPage.findUniqueOrThrow({ where: { slug: SLUG }, select });
    if (row.content?.includes("Dynavit")) return console.log("Zaten ekli, değişiklik yok.");
    if (!row.content?.includes(ANCHOR)) throw new Error("Bölüm yeri bulunamadı; içerik beklenenden farklı, durdu.");

    const faq = JSON.parse(row.faq ?? "[]") as { q: string; a: string }[];
    const after: Fields = {
        content: row.content.replace(ANCHOR, section + ANCHOR),
        faq: JSON.stringify([...faq.slice(0, -1), faqItem, ...faq.slice(-1)]),
    };
    console.log(`Eklenecek bölüm:\n${section}\n\nEklenecek SSS: ${faqItem.q}\n${faqItem.a}`);
    if (!args.includes("--apply")) return;

    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/sector-dynavit-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify({ id: row.id, before: { content: row.content, faq: row.faq }, after }, null, 2));
    await prisma.$transaction(async (tx) => {
        const now = await tx.industryPage.findUniqueOrThrow({ where: { id: row.id }, select });
        if (now.content !== row.content || now.faq !== row.faq) throw new Error("Önizlemeden sonra değişmiş, yazma durdu.");
        await tx.industryPage.update({ where: { id: row.id }, data: after });
    });
    console.log(`Uygulandı. Yedek: ${file}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
