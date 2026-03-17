import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🔄 SEO slug güncellemeleri başlıyor...\n");

    // ─────────────────────────────────────────────────────────────
    // 1. ServiceCategory: yapay-zeka → yapay-zeka-etkinlik-cozumlari
    // ─────────────────────────────────────────────────────────────
    const yapayzeka = await prisma.serviceCategory.findUnique({
        where: { slug: "yapay-zeka" },
    });

    if (yapayzeka) {
        await prisma.serviceCategory.update({
            where: { slug: "yapay-zeka" },
            data: {
                slug: "yapay-zeka-etkinlik-cozumlari",
                metaTitle: "Yapay Zeka Destekli Etkinlik ve Deneyim Çözümleri | MetasoftCo",
            },
        });
        console.log("✅ Kategori: yapay-zeka → yapay-zeka-etkinlik-cozumlari");
    } else {
        console.log("⚠️  Kategori 'yapay-zeka' bulunamadı, atlanıyor.");
    }

    // ─────────────────────────────────────────────────────────────
    // 2. Service: ai-draw → ai-draw-portre-cizim  (yapay-zeka kategorisi)
    // ─────────────────────────────────────────────────────────────
    // Kategori artık güncellendi, yeni slug ile bul
    const yapayzeka2 = await prisma.serviceCategory.findUnique({
        where: { slug: "yapay-zeka-etkinlik-cozumlari" },
    });

    if (yapayzeka2) {
        const aiDraw = await prisma.service.findFirst({
            where: { slug: "ai-draw", categoryId: yapayzeka2.id },
        });
        if (aiDraw) {
            await prisma.service.update({
                where: { id: aiDraw.id },
                data: {
                    slug: "ai-draw-portre-cizim",
                    metaTitle: "AI Draw: Yapay Zeka ile Gerçek Zamanlı Portre Çizimi | MetasoftCo",
                },
            });
            console.log("✅ Hizmet: ai-draw → ai-draw-portre-cizim");
        } else {
            console.log("⚠️  Hizmet 'ai-draw' bulunamadı, atlanıyor.");
        }

        // ─────────────────────────────────────────────────────────────
        // 3. Service: ai-fashion-mirror → ai-fashion-mirror-akilli-ayna
        // ─────────────────────────────────────────────────────────────
        const aiFashion = await prisma.service.findFirst({
            where: { slug: "ai-fashion-mirror", categoryId: yapayzeka2.id },
        });
        if (aiFashion) {
            await prisma.service.update({
                where: { id: aiFashion.id },
                data: {
                    slug: "ai-fashion-mirror-akilli-ayna",
                    metaTitle: "AI Fashion Mirror: İnteraktif Akıllı Moda Aynası | MetasoftCo",
                },
            });
            console.log("✅ Hizmet: ai-fashion-mirror → ai-fashion-mirror-akilli-ayna");
        } else {
            console.log("⚠️  Hizmet 'ai-fashion-mirror' bulunamadı, atlanıyor.");
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Service: reflex-game-interaktif-hiz-oyunu → reflex-game-hiz-ve-rekabet-oyunu
    // ─────────────────────────────────────────────────────────────
    const interaktif = await prisma.serviceCategory.findUnique({
        where: { slug: "interaktif" },
    });

    if (interaktif) {
        // Hem eski orijinal hem de ara slug dene
        const reflexSlugs = [
            "reflex-game-interaktif-hiz-oyunu",
            "reflex-game-interaktif-etkinlik-cozumu",
            "reflex-game",
        ];
        let reflexUpdated = false;
        for (const slug of reflexSlugs) {
            const reflex = await prisma.service.findFirst({
                where: { slug, categoryId: interaktif.id },
            });
            if (reflex) {
                await prisma.service.update({
                    where: { id: reflex.id },
                    data: {
                        slug: "reflex-game-hiz-ve-rekabet-oyunu",
                        metaTitle: "Reflex Game: İnteraktif Hız, Refleks ve Rekabet Oyunu | MetasoftCo",
                    },
                });
                console.log(`✅ Hizmet: ${slug} → reflex-game-hiz-ve-rekabet-oyunu`);
                reflexUpdated = true;
                break;
            }
        }
        if (!reflexUpdated) console.log("⚠️  Reflex Game hizmeti bulunamadı, atlanıyor.");

        // ─────────────────────────────────────────────────────────────
        // 5. Service: dijital-hediye-carki-etkinlik → dijital-hediye-carki-aktivasyonu
        // ─────────────────────────────────────────────────────────────
        const giftSlugs = [
            "dijital-hediye-carki-etkinlik",
            "digital-gift-wheel",
            "dijital-hediye-carki",
        ];
        let giftUpdated = false;
        for (const slug of giftSlugs) {
            const gift = await prisma.service.findFirst({
                where: { slug, categoryId: interaktif.id },
            });
            if (gift) {
                await prisma.service.update({
                    where: { id: gift.id },
                    data: {
                        slug: "dijital-hediye-carki-aktivasyonu",
                        metaTitle: "Dijital Hediye Çarkı: Etkinlik Oyunlaştırma Çözümü | MetasoftCo",
                    },
                });
                console.log(`✅ Hizmet: ${slug} → dijital-hediye-carki-aktivasyonu`);
                giftUpdated = true;
                break;
            }
        }
        if (!giftUpdated) console.log("⚠️  Dijital Hediye Çarkı hizmeti bulunamadı, atlanıyor.");
    } else {
        console.log("⚠️  Kategori 'interaktif' bulunamadı, interaktif hizmetler atlanıyor.");
    }

    // ─────────────────────────────────────────────────────────────
    // 6. BlogPost: etkinlikte-ai-photobooth-neden-kullanmali → etkinliklerde-ai-photobooth-avantajlari
    // ─────────────────────────────────────────────────────────────
    const blog = await prisma.blogPost.findUnique({
        where: { slug: "etkinlikte-ai-photobooth-neden-kullanmali" },
    });
    if (blog) {
        await prisma.blogPost.update({
            where: { slug: "etkinlikte-ai-photobooth-neden-kullanmali" },
            data: {
                slug: "etkinliklerde-ai-photobooth-avantajlari",
                metaTitle: "Etkinliklerde AI Photobooth Kullanmanın 5 Avantajı | MetasoftCo",
            },
        });
        console.log("✅ Blog: etkinlikte-ai-photobooth-neden-kullanmali → etkinliklerde-ai-photobooth-avantajlari");
    } else {
        console.log("⚠️  Blog yazısı bulunamadı (henüz oluşturulmamış olabilir), atlanıyor.");
    }

    console.log("\n✅ Tüm güncellemeler tamamlandı!");
}

main()
    .catch((e) => {
        console.error("❌ Hata:", e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
    });
