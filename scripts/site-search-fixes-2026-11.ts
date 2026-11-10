import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { prisma } from "../src/lib/db";

const campaign = "/hizmetler/yilbasi-partisi-aktiviteleri";
const games = "/hizmetler/interaktif-etkinlik-aktiviteleri";
const photo = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";
const photoEn = "/en/services/photobooth-and-photo-activations";
const campaignLabel = "Kurumsal Yılbaşı Partisi Aktiviteleri";
const trLinks = [
    ["Photobooth Kiralama", photo + "/photobooth-kirala"],
    ["Fotoğraf Kabini Kiralama", photo + "/cabin-photo"],
    ["Mirror Booth Kiralama", photo + "/mirror-booth"],
    ["360 Video Booth Kiralama", "/hizmetler/video/360-video-booth"],
    ["AI Photobooth Kiralama", "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala"],
    [campaignLabel, campaign],
];
const enLinks = [
    ["Photo Booth Rental", photoEn + "/photobooth-rental"],
    ["Cabin Photo Booth Rental", photoEn + "/cabin-photo"],
    ["Mirror Booth Rental", photoEn + "/mirror-booth"],
    ["360 Video Booth Rental", "/en/services/video/360-video-booth"],
    ["AI Photo Booth Rental", "/en/services/ai-event-solutions/ai-photobooth"],
];

function afterFirstParagraph(html: string | null, title: string, links: string[][]) {
    if (html?.includes(title)) return html;
    const end = html?.indexOf("</p>") ?? -1;
    if (!html || end < 0) throw new Error("Missing opening paragraph");
    const insert = end + "</p>".length;
    const block = `\n<aside class="ms-blog-rental-options" aria-label="${title}"><p><strong>${title}</strong></p><ul>${links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul></aside>\n`;
    return html.slice(0, insert) + block + html.slice(insert);
}

function insertAfterHeading(html: string | null, heading: string, addition: string) {
    if (html?.includes(addition)) return html;
    const pattern = new RegExp(`<h2(?: [^>]*)?>${heading}</h2>`);
    if (!html || !pattern.test(html)) throw new Error(`Missing section: ${heading}`);
    return html.replace(pattern, (match) => `${match}\n${addition}`);
}

async function main() {
    const apply = process.argv.includes("--apply");
    await prisma.$transaction(async (tx) => {
        if (!apply) await tx.$executeRaw`SET TRANSACTION READ ONLY`;
        const booth = await tx.blogPost.findUniqueOrThrow({ where: { slug: "photobooth-nedir" } });
        const face = await tx.blogPost.findUniqueOrThrow({ where: { slug: "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir" } });
        const category = await tx.serviceCategory.findUniqueOrThrow({ where: { slug: "interaktif-etkinlik-aktiviteleri" } });
        if (!booth.published || !face.published || booth.slug_en !== "what-is-a-photo-booth") throw new Error("Unexpected blog publication state");

        const boothData = {
            content: afterFirstParagraph(booth.content, "Etkinliğiniz için photobooth seçenekleri", trLinks),
            content_en: afterFirstParagraph(booth.content_en, "Photo booth options for your event", enLinks),
            metaTitle: "Photobooth Nedir, Ne Demek? Çeşitleri ve Etkinlikte Kullanımı",
            metaDescription: "Photobooth (fotoğraf kabini), misafirlerin kendi fotoğrafını çektiği bir etkinlik kioskudur. Türlerini, çalışma biçimini ve etkinliğinize uygun seçeneği keşfedin.",
            metaTitle_en: "Photo Booth Meaning: What It Is, Types and How It Works",
        };
        const faceData = {
            content: insertAfterHeading(face.content, "Etkinliklerde Face Swap Kullanım Senaryoları", `<p>Şirketinizin yıl sonu kutlamasında temalı AI Photobooth seçenekleri için <a href="${campaign}">${campaignLabel}</a> sayfamızı inceleyebilirsiniz.</p>`),
            metaDescription: "Face swap, bir yüzü başka bir fotoğrafa yerleştiren yapay zekâ tekniğidir. Nasıl çalıştığını, etkinlikte nasıl kullanıldığını ve nelere dikkat edileceğini öğrenin.",
        };
        const wheel = `<a href="${games}/dijital-hediye-carki-aktivasyonu">Dijital Hediye Çarkı Kiralama</a>`;
        const gameContent = insertAfterHeading(category.content, "En Popüler İnteraktif Etkinlik Oyunları ve Aktiviteleri", `<p>Şirket kutlaması planlıyorsanız <a href="${campaign}">${campaignLabel}</a> sayfasında çekiliş ve quiz seçeneklerini inceleyebilirsiniz.</p>`);
        if (!gameContent.includes(wheel) && !gameContent.includes("<strong>Dijital Hediye Çarkı Aktivasyonu:</strong>")) throw new Error("Missing gift wheel list item");
        const categoryData = {
            content: gameContent.replace("<strong>Dijital Hediye Çarkı Aktivasyonu:</strong>", `<strong>${wheel}:</strong>`),
            metaTitle: "İnteraktif Etkinlik ve İnteraktif Oyun Ne Demek? Örnekler | MetasoftCo",
            metaDescription: "İnteraktif etkinlikte misafirler oyuna katılır. Kurumsal etkinlikler için dijital hediye çarkı, refleks duvarı ve diğer kiralık oyun örneklerini keşfedin.",
        };

        const changed = (before: object, after: Record<string, unknown>) =>
            Object.keys(after).filter((key) => before[key as keyof typeof before] !== after[key]);
        const changes = { booth: changed(booth, boothData), face: changed(face, faceData), category: changed(category, categoryData) };
        console.log(JSON.stringify({ apply, changes }, null, 2));
        if (!apply || !Object.values(changes).some((fields) => fields.length)) return;

        const folder = "output/site-search-fixes";
        mkdirSync(folder, { recursive: true });
        writeFileSync(`${folder}/before-${new Date().toISOString().replace(/[:.]/g, "-")}.json`, JSON.stringify({ booth, face, category }, null, 2), { mode: 0o600, flag: "wx" });
        if (changes.booth.length) await tx.blogPost.update({ where: { id: booth.id, updatedAt: booth.updatedAt }, data: boothData });
        if (changes.face.length) await tx.blogPost.update({ where: { id: face.id, updatedAt: face.updatedAt }, data: faceData });
        if (changes.category.length) await tx.serviceCategory.update({ where: { id: category.id, updatedAt: category.updatedAt }, data: categoryData });
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}).finally(() => prisma.$disconnect());
