/** Preview by default; --write backs up and updates only the textile page's copy. */
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { prisma } from "../src/lib/db";

async function main() {
    const row = await prisma.industryPage.findUniqueOrThrow({ where: { slug: "tekstil-sektoru-dijital-donusum" } });
    const services = JSON.parse(row.services || "[]") as { name: string; desc: string; href: string }[];
    const servicesEn = JSON.parse(row.services_en || "[]") as typeof services;
    const data = {
        title: "Tekstil ve Moda Markaları İçin Etkinlik ve Marka Aktivasyonu",
        title_en: "Event Technology and Brand Activations for Textile and Fashion Brands",
        intro: "MetasoftCo, tekstil ve moda markalarının koleksiyon lansmanları, fuar katılımları ve mağaza etkinlikleri için photobooth, yapay zeka fotoğraf deneyimleri ve interaktif aktivasyonlar geliştirir. Deneyimin yazılımını ve görsel tasarımını markanıza göre uyarlayarak kurulum ve saha desteğiyle sunar.",
        intro_en: "MetasoftCo develops photo booths, AI photo experiences and interactive activations for textile and fashion brands' collection launches, trade shows and in-store events. We tailor the software and visual design to your brand and provide setup and on-site support.",
        metaTitle: "Tekstil ve Moda Etkinlik Teknolojileri | MetasoftCo",
        metaTitle_en: "Textile & Fashion Event Technology | MetasoftCo",
        metaDescription: "Tekstil ve moda markalarının koleksiyon lansmanları, fuar ve mağaza etkinlikleri için AI photobooth, interaktif oyun ve markaya özel aktivasyon çözümleri.",
        metaDescription_en: "AI photo booths, interactive games and branded activations for textile and fashion collection launches, trade shows and in-store events.",
        metaKeywords: "tekstil etkinlik teknolojileri, moda marka aktivasyonu, koleksiyon lansmanı, tekstil fuarı photobooth, mağaza etkinliği, etkinlik yazılımı",
        metaKeywords_en: "textile event technology, fashion brand activation, collection launch, trade show photo booth, in-store activation, event software",
        services: JSON.stringify(services.map(s => s.name === "Özel Yazılım" || s.name === "Etkinlik Yazılımı" ? { ...s, name: "Etkinlik Yazılımı", desc: "Koleksiyon lansmanları ve marka aktivasyonları için kampanya mikro siteleri, interaktif ekranlar ve QR ile paylaşım akışları.", href: "/hizmetler/yazilim-gelistirme" } : s)),
        services_en: JSON.stringify(servicesEn.map(s => s.name === "Custom Software" || s.name === "Event Software" ? { ...s, name: "Event Software", desc: "Campaign micro-sites, interactive screens and QR sharing flows for collection launches and brand activations.", href: "/en/services/software-development" } : s)),
        faq: (row.faq || "[]").replace("sosyal medyada viral olur", "katılımcılar tarafından sosyal medyada paylaşılabilir"),
        faq_en: (row.faq_en || "[]").replace("and go viral on social media", "and can be posted on social media by participants"),
    };
    const changed = Object.keys(data).filter(k => row[k as keyof typeof row] !== data[k as keyof typeof data]);
    console.log(JSON.stringify({ slug: row.slug, changed, data }, null, 2));
    if (!process.argv.includes("--write") || !changed.length) return;
    mkdirSync("tmp/brand-positioning", { recursive: true });
    const backup = `tmp/brand-positioning/textile-before-${Date.now()}.json`;
    writeFileSync(backup, JSON.stringify(row, null, 2), { mode: 0o600 });
    const result = await prisma.industryPage.updateMany({ where: { id: row.id, updatedAt: row.updatedAt }, data });
    if (result.count !== 1) throw new Error("Record changed concurrently; nothing written. Review again.");
    const saved = await prisma.industryPage.findUniqueOrThrow({ where: { id: row.id } });
    for (const key of Object.keys(data) as (keyof typeof data)[]) {
        if (saved[key] !== data[key]) throw new Error(`Verification failed: ${key}`);
    }
    console.log(`Verified update. Backup: ${backup}`);
}
main().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => prisma.$disconnect());
