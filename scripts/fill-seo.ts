/**
 * fill-seo.ts
 * Boş SEO alanlarını (metaTitle, metaDescription, metaKeywords) otomatik doldurur.
 * Çalıştırma: pnpx tsx scripts/fill-seo.ts
 */

import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Metni belirli uzunlukta kır
function truncate(text: string, max: number): string {
    if (!text) return "";
    const clean = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    return clean.length <= max ? clean : clean.slice(0, max - 3) + "...";
}

// Kategori adına göre anahtar kelimeler üret
function categoryKeywords(catName: string, catName_en: string): { tr: string; en: string } {
    const base: Record<string, { tr: string; en: string }> = {
        "interaktif": {
            tr: "interaktif teknoloji, dijital deneyim, etkinlik teknolojisi, interaktif stand, İstanbul",
            en: "interactive technology, digital experience, event technology, interactive stand, Istanbul",
        },
        "yazılım": {
            tr: "yazılım geliştirme, web yazılım, mobil uygulama, özel yazılım, İstanbul",
            en: "software development, web software, mobile app, custom software, Istanbul",
        },
        "stand": {
            tr: "stand tasarımı, stand üretimi, fuar standı, etkinlik standı, İstanbul",
            en: "stand design, stand production, exhibition stand, event stand, Istanbul",
        },
        "prodüksiyon": {
            tr: "etkinlik prodüksiyonu, organizasyon, sahne tasarımı, prodüksiyon şirketi, İstanbul",
            en: "event production, event organization, stage design, production company, Istanbul",
        },
        "fotoğraf": {
            tr: "fotoğraf çekimi, profesyonel fotoğraf, ürün fotoğrafı, İstanbul fotoğraf",
            en: "photography, professional photo, product photography, Istanbul photography",
        },
        "video": {
            tr: "video çekim, video prodüksiyon, kurumsal video, reklam filmi, İstanbul",
            en: "video production, corporate video, commercial film, Istanbul",
        },
        "yapay zeka": {
            tr: "yapay zeka, AI çözümleri, makine öğrenimi, dijital dönüşüm, İstanbul",
            en: "artificial intelligence, AI solutions, machine learning, digital transformation, Istanbul",
        },
    };

    const key = Object.keys(base).find((k) =>
        catName.toLowerCase().includes(k) || (catName_en || "").toLowerCase().includes(k)
    );

    return key
        ? base[key]
        : {
              tr: "MetasoftCo, İstanbul, kreatif ajans, dijital çözümler, deneyim tasarımı",
              en: "MetasoftCo, Istanbul, creative agency, digital solutions, experience design",
          };
}

async function main() {
    const categories = await prisma.serviceCategory.findMany({
        include: { services: true },
    });

    let catUpdated = 0;
    let svcUpdated = 0;

    for (const cat of categories) {
        const catName_en = cat.name_en || cat.name;
        const kw = categoryKeywords(cat.name, catName_en);

        // Kategori SEO
        const catPatch: Record<string, string> = {};

        if (!cat.metaTitle)
            catPatch.metaTitle = truncate(`${cat.name} Hizmetleri | MetasoftCo`, 60);
        if (!cat.metaDescription)
            catPatch.metaDescription = truncate(
                `MetasoftCo'nun ${cat.name} hizmetleri — İstanbul merkezli uçtan uca deneyim ajansı olarak markanıza özel çözümler sunuyoruz.`,
                160
            );
        if (!cat.metaKeywords)
            catPatch.metaKeywords = `${cat.name}, ${kw.tr}, MetasoftCo`;

        if (!cat.metaTitle_en)
            catPatch.metaTitle_en = truncate(`${catName_en} Services | MetasoftCo`, 60);
        if (!cat.metaDescription_en)
            catPatch.metaDescription_en = truncate(
                `MetasoftCo's ${catName_en} services — Istanbul-based end-to-end experience agency delivering tailored solutions for your brand.`,
                160
            );

        if (Object.keys(catPatch).length > 0) {
            await prisma.serviceCategory.update({
                where: { id: cat.id },
                data: catPatch,
            });
            console.log(`✅ KATEGORİ güncellendi: ${cat.name}`);
            catUpdated++;
        } else {
            console.log(`⏭  KATEGORİ zaten dolu: ${cat.name}`);
        }

        // Servis SEO
        for (const svc of cat.services) {
            const title_en = svc.title_en || svc.title;
            const desc = svc.description || svc.title;
            const desc_en = svc.description_en || svc.description || svc.title;

            const patch: Record<string, string> = {};

            if (!svc.metaTitle)
                patch.metaTitle = truncate(`${svc.title} | ${cat.name} | MetasoftCo`, 60);
            if (!svc.metaDescription)
                patch.metaDescription = truncate(desc, 155);
            if (!svc.metaKeywords)
                patch.metaKeywords = `${svc.title}, ${cat.name}, ${kw.tr}, MetasoftCo, İstanbul`;

            if (!svc.metaTitle_en)
                patch.metaTitle_en = truncate(`${title_en} | ${catName_en} | MetasoftCo`, 60);
            if (!svc.metaDescription_en)
                patch.metaDescription_en = truncate(desc_en, 155);
            if (!svc.metaKeywords_en)
                patch.metaKeywords_en = `${title_en}, ${catName_en}, ${kw.en}, MetasoftCo, Istanbul`;

            if (Object.keys(patch).length > 0) {
                await prisma.service.update({
                    where: { id: svc.id },
                    data: patch,
                });
                console.log(`  ✅ HİZMET güncellendi: ${svc.title}`);
                svcUpdated++;
            } else {
                console.log(`  ⏭  HİZMET zaten dolu: ${svc.title}`);
            }
        }
    }

    console.log(`\n🎉 Bitti! ${catUpdated} kategori + ${svcUpdated} hizmet güncellendi.`);
}

main()
    .catch((e) => {
        console.error("❌ Hata:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
