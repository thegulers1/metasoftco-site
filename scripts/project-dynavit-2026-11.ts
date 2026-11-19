/** 19 Kasım 2026 — Eczacıbaşı Dynavit × AI Photo proje sayfası (/projeler/eczacibasi-dynavit-x-ai-photo).
 * Bilgi kullanıcıdan (bkz. sector-dynavit-2026-11.ts): 8 Ağustos 2024, Kanyon AVM, voleybol dönemi,
 * "Aradığın Destek!" kampanyası, AI Photo kiosku, QR ile paylaşım ve logolu çerçeveyle anında baskı.
 * Rakam yok; görseller public/images/projeler/dynavit-kanyon/. Sağlık sektör sayfasındaki bölüm
 * bu projeye bağlanır.
 *
 * Önizleme:   pnpm exec tsx scripts/project-dynavit-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/project-dynavit-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/project-dynavit-2026-11.ts --rollback /mutlak/yol/backup.json
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

const SLUG = "eczacibasi-dynavit-x-ai-photo";
const IMG = "/images/projeler/dynavit-kanyon";
const AI_PHOTO = "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala";
const SECTOR_SLUG = "saglik-sektoru";
const SECTOR_FROM = "logolu çerçeveyle anında basıldı.</p>";
const SECTOR_TO = `logolu çerçeveyle anında basıldı. <a href="/projeler/${SLUG}">Projenin ayrıntıları</a>.</p>`;

const faq = [
    {
        q: "Dynavit aktivasyonu nerede ve ne zaman yapıldı?",
        a: "8 Ağustos 2024'te İstanbul Kanyon AVM'de, Eczacıbaşı'nın Dynavit markası için \"Aradığın Destek!\" kampanyası kapsamında yapıldı.",
    },
    {
        q: "Ziyaretçiler aktivasyondan ne aldı?",
        a: "Ziyaretçiler fotoğraflarını AI Photo kioskunda çektirdi; yapay zekâ onları voleybol temalı görsellere yerleştirdi. Görseller QR kod ile telefona indi ya da Eczacıbaşı ve Dynavit logolu çerçeveyle anında basıldı.",
    },
    {
        q: "Bu kurulum başka bir sağlık markası için uyarlanabilir mi?",
        a: "Evet. Kiosk giydirmesi, yapay zekâ görsel temaları ve baskı çerçevesi her marka ve kampanya için yeniden tasarlanır.",
    },
];
const faqEn = [
    {
        q: "Where and when did the Dynavit activation take place?",
        a: "On 8 August 2024 at Kanyon shopping mall in İstanbul, for Eczacıbaşı's Dynavit brand as part of its \"Aradığın Destek!\" campaign.",
    },
    {
        q: "What did visitors take away?",
        a: "Visitors had their photo taken at the AI Photo kiosk and AI placed them in volleyball-themed images. The images went to their phones via QR code or were printed on the spot in an Eczacıbaşı and Dynavit branded frame.",
    },
    {
        q: "Can this setup be adapted for another health brand?",
        a: "Yes. The kiosk wrap, AI image themes and print frame are redesigned for each brand and campaign.",
    },
];

const project = {
    slug: SLUG,
    slug_en: SLUG,
    title: "Eczacıbaşı Dynavit × AI Photo",
    title_en: "Eczacıbaşı Dynavit × AI Photo",
    client: "Eczacıbaşı Dynavit",
    category: "Yapay Zeka",
    projectDate: new Date("2024-08-08T00:00:00.000Z"),
    featured: false,
    published: true,
    order: 0,
    image: `${IMG}/dynavit-kiosk-kanyon.webp`,
    gallery: JSON.stringify([
        { url: `${IMG}/dynavit-kiosk-kanyon.webp`, alt: "Kanyon AVM'de Eczacıbaşı Dynavit giydirmeli AI Photo kiosku ve fotoğraf yazıcısı" },
        { url: `${IMG}/dynavit-voleybol-ai-gorsel.webp`, alt: "Dynavit AI Photo aktivasyonunda üretilen voleybol temalı yapay zekâ görseli" },
        { url: `${IMG}/dynavit-baski-elde.webp`, alt: "Eczacıbaşı ve Dynavit logolu çerçeveyle basılmış voleybol temalı AI fotoğraf" },
        { url: `${IMG}/dynavit-baski-elde-2.webp`, alt: "Dynavit aktivasyonundan anında basılan logolu yapay zekâ fotoğrafı" },
    ]),
    technologies: JSON.stringify(["AI Photo", "Anında baskı", "QR ile paylaşım"]),
    serviceIds: JSON.stringify(["cmkjohn4800012orrjn8ixgjb"]),
    description: "8 Ağustos 2024'te Kanyon AVM'de Eczacıbaşı Dynavit için \"Aradığın Destek!\" kampanyasıyla giydirilmiş bir AI Photo kiosku kurduk. Ziyaretçiler kendilerini voleybol temalı yapay zekâ görsellerinde gördü; görseller QR kod ile telefona indi ya da logolu çerçeveyle anında basıldı.",
    description_en: "On 8 August 2024 we set up an AI Photo kiosk wrapped in Eczacıbaşı Dynavit's \"Aradığın Destek!\" campaign at Kanyon mall in İstanbul. Visitors saw themselves in volleyball-themed AI images, sent to their phones via QR code or printed on the spot in a branded frame.",
    content: [
        "<h2>Proje özeti</h2>",
        "<p>Eczacıbaşı'nın vitamin ve takviye markası Dynavit için 8 Ağustos 2024'te İstanbul Kanyon AVM'de bir yapay zekâ fotoğraf aktivasyonu kurduk. Kiosk, markanın \"Aradığın Destek!\" kampanyasıyla giydirildi. Voleybol heyecanının yaşandığı günlerde AVM ziyaretçileri birkaç saniye içinde kendilerini voleybol temalı yapay zekâ görsellerinde gördü.</p>",
        "<h2>Deneyim nasıl işledi?</h2>",
        "<ol><li><strong>Çekim:</strong> Ziyaretçi, <a href=\"" + AI_PHOTO + "\">AI Photo</a> kioskunun dokunmatik ekranından başlayıp fotoğrafını çektirdi.</li>",
        "<li><strong>Yapay zekâ görseli:</strong> Fotoğraf, kampanya için hazırlanan voleybol temalı sahnelere yapay zekâ ile yerleştirildi.</li>",
        "<li><strong>Paylaşım ve baskı:</strong> Görsel QR kod ile ziyaretçinin telefonuna indi ya da Eczacıbaşı ve Dynavit logolu çerçeveyle kioskun yanındaki yazıcıdan anında basıldı.</li></ol>",
        "<h2>Neden AVM'de bir AI Photo kiosku?</h2>",
        "<p>Bir tüketici kampanyasını AVM koridorunda görünür kılmanın yolu, insanları durdurup bir şey yaşatmaktır. Kendini sporcu olarak gören ziyaretçi, kampanya mesajını taşıyan bir fotoğrafla ayrılır; basılı çerçeve eve, dijital görsel sosyal medyaya gider. Kurulum tek bir prize ihtiyaç duyar, interneti kendi 5G altyapımızla getiririz.</p>",
        "<p>Sağlık ve ilaç markalarıyla yaptığımız diğer çalışmalar için <a href=\"/sektorel-etkinlik-cozumleri/saglik-sektoru\">sağlık sektörü sayfamıza</a> bakabilirsiniz.</p>",
    ].join(""),
    content_en: [
        "<h2>Project summary</h2>",
        "<p>On 8 August 2024 we ran an AI photo activation at Kanyon mall in İstanbul for Dynavit, Eczacıbaşı's vitamin and supplement brand. The kiosk was wrapped in the brand's \"Aradığın Destek!\" campaign. During a summer of volleyball excitement, mall visitors saw themselves in volleyball-themed AI images within seconds.</p>",
        "<h2>How the experience worked</h2>",
        "<ol><li><strong>Capture:</strong> Visitors started on the touchscreen of the <a href=\"/en/services/ai-event-solutions/ai-photobooth\">AI Photo</a> kiosk and had their photo taken.</li>",
        "<li><strong>AI image:</strong> AI placed the photo into volleyball-themed scenes prepared for the campaign.</li>",
        "<li><strong>Share and print:</strong> The image went to the visitor's phone via QR code or was printed on the spot in an Eczacıbaşı and Dynavit branded frame.</li></ol>",
        "<h2>Why an AI Photo kiosk in a mall?</h2>",
        "<p>The way to make a consumer campaign visible in a mall corridor is to get people to stop and take part. A visitor who sees themselves as an athlete leaves with a photo that carries the campaign message: the printed frame goes home, the digital image goes to social media. The setup needs a single socket, and we bring our own 5G connection.</p>",
    ].join(""),
    metaTitle: "Eczacıbaşı Dynavit × AI Photo | Kanyon AVM Aktivasyonu",
    metaDescription: "Kanyon AVM'de Eczacıbaşı Dynavit için AI Photo kiosku: voleybol temalı yapay zekâ görselleri, QR ile paylaşım ve logolu çerçeveyle anında baskı.",
    metaTitle_en: "Eczacıbaşı Dynavit × AI Photo | Kanyon Mall Activation",
    metaDescription_en: "An AI Photo kiosk for Eczacıbaşı Dynavit at Kanyon mall: volleyball-themed AI images, QR sharing and instant prints in a branded frame.",
    faq: JSON.stringify(faq),
    faq_en: JSON.stringify(faqEn),
};

const args = process.argv.slice(2);

async function main() {
    const rollbackAt = args.indexOf("--rollback");
    if (rollbackAt >= 0) {
        const backup = JSON.parse(readFileSync(resolve(args[rollbackAt + 1]), "utf8")) as { projectId: string; sectorId: string; sectorBefore: string; sectorAfter: string };
        await prisma.$transaction(async (tx) => {
            const now = await tx.industryPage.findUniqueOrThrow({ where: { id: backup.sectorId }, select: { content: true } });
            if (now.content !== backup.sectorAfter) throw new Error("Sektör sayfası uygulamadan sonra değişmiş, geri alma durdu.");
            await tx.industryPage.update({ where: { id: backup.sectorId }, data: { content: backup.sectorBefore } });
            await tx.project.delete({ where: { id: backup.projectId } });
        });
        return console.log("Geri alındı: proje silindi, sektör bağlantısı kaldırıldı.");
    }

    if (await prisma.project.findUnique({ where: { slug: SLUG } })) return console.log("Proje zaten var, değişiklik yok.");
    const sector = await prisma.industryPage.findUniqueOrThrow({ where: { slug: SECTOR_SLUG }, select: { id: true, content: true } });
    const sectorBefore = sector.content ?? "";
    if (sectorBefore.split(SECTOR_FROM).length !== 2) throw new Error("Sektör sayfasında bağlantı yeri tek ve beklenen biçimde değil, durdu.");
    const sectorAfter = sectorBefore.replace(SECTOR_FROM, SECTOR_TO);

    for (const [k, v] of Object.entries(project)) {
        if (k.startsWith("meta")) console.log(`${k}: ${v} (${String(v).length})`);
    }
    console.log(`\nSektör sayfasına bağlantı: …${SECTOR_TO}`);
    if (!args.includes("--apply")) return;

    const created = await prisma.$transaction(async (tx) => {
        const now = await tx.industryPage.findUniqueOrThrow({ where: { id: sector.id }, select: { content: true } });
        if (now.content !== sectorBefore) throw new Error("Sektör sayfası önizlemeden sonra değişmiş, yazma durdu.");
        const row = await tx.project.create({ data: project });
        await tx.industryPage.update({ where: { id: sector.id }, data: { content: sectorAfter } });
        return row;
    });
    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/project-dynavit-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify({ projectId: created.id, sectorId: sector.id, sectorBefore, sectorAfter }, null, 2));
    console.log(`Uygulandı. Yedek: ${file}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
