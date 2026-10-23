import "dotenv/config";
import { prisma } from "../src/lib/db";

// 2026-10-23 "Face Swap Blogu — Geliştirme ve İçerik Şartnamesi": the DB part.
// - Guide TR/EN: new meta description and keywords; EN gets the 2 FAQs it lacked.
// - Incoming links: one FAQ each on AI Photobooth and AI Football Card (TR),
//   one closing sentence on the TCMB project (TR/EN).
// Case numbers, images and the LinkedIn URL come later from the team.
// Idempotent; pass --apply to write.

const GUIDE = "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir";
const GUIDE_PATH = `/blog/${GUIDE}`;
const GUIDE_EN_PATH = "/en/blog/how-ai-face-swap-technology-works";
const TCMB = "tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi";

type Faq = { q: string; a: string };

const guide = {
    metaDescription: "Face swap ne demek? Yapay zekânın bir yüzü açı, ışık ve ifadeyi koruyarak başka bir görsele yerleştirmesidir. Nasıl çalışır, güvenli mi, nasıl yapılır?",
    metaKeywords: "face swap ne demek, yapay zeka ile yüz değiştirme, yapay zeka yüz değiştirme, face swap deepfake farkı, difüzyon modeli, AI photobooth",
    metaDescription_en: "What does face swap mean? AI detects a face and places it onto another image while keeping angle, light and expression. How it works, is it safe, how to do it.",
    metaKeywords_en: "what is face swap, AI face swap, artificial intelligence face swap, face swap vs deepfake, diffusion models, AI photo booth",
};

const guideFaqEn: Faq[] = [
    {
        q: "How is face swap used at events?",
        a: "At an AI photo booth, guests take a photo and their face is placed into a character or scene designed around the event's theme. The result is ready in seconds, printed on site and sent to their phone by QR code.",
    },
    {
        q: "How do realistic AI face generators work?",
        a: "Most rely on diffusion models, which build an image step by step from noise. Layers such as ControlNet keep the pose and facial structure fixed, while methods like IP-Adapter and InstantID carry the identity from a reference photo into the new image.",
    },
];

// [anchor](/path) renders as a link on service pages (src/lib/faq-text.ts).
const serviceFaq: Record<string, Faq> = {
    "ai-photobooth-kirala": {
        q: "Face swap nasıl çalışır?",
        a: `Sistem yüzü ve referans noktalarını tespit eder, ardından difüzyon modeli sahneyi katılımcının yüzüyle birlikte yeniden üretir. Adım adım anlatım için: [face swap nasıl çalışır](${GUIDE_PATH})`,
    },
    "ai-football-card": {
        q: "Kartlardaki yüz nasıl oluşturuluyor?",
        a: `Kartlar, AI Photobooth ile aynı yüz koruma teknolojisini kullanır; kişinin hatları korunarak oyuncu görseline yerleştirilir. Ayrıntılar: [yapay zeka ile yüz değiştirme](${GUIDE_PATH})`,
    },
};

const tcmbTr = `<p>Kullanılan teknolojinin nasıl çalıştığını <a href="${GUIDE_PATH}">face swap rehberimizde</a> anlattık.</p>`;
const tcmbEn = `<p>We explain how the technology works in our <a href="${GUIDE_EN_PATH}">face swap guide</a>.</p>`;

function withFaq(value: string | null, extra: Faq[]) {
    const list: Faq[] = value ? JSON.parse(value) : [];
    const known = new Set(list.map((item) => item.q));
    const added = extra.filter((item) => !known.has(item.q));
    return added.length ? JSON.stringify([...list, ...added]) : null;
}

async function main() {
    const apply = process.argv.includes("--apply");
    const writes: Promise<unknown>[] = [];
    const plan: string[] = [];

    const post = await prisma.blogPost.findUnique({ where: { slug: GUIDE } });
    if (!post) throw new Error("Guide not found");
    const postData: Record<string, string> = {};
    for (const [key, value] of Object.entries(guide)) {
        if (post[key as keyof typeof guide] !== value) postData[key] = value;
    }
    const faqEn = withFaq(post.faq_en, guideFaqEn);
    if (faqEn) postData.faq_en = faqEn;
    if (Object.keys(postData).length) {
        plan.push(`guide: ${Object.keys(postData).join(", ")}`);
        if (apply) writes.push(prisma.blogPost.update({ where: { slug: GUIDE }, data: postData }));
    }

    for (const [slug, item] of Object.entries(serviceFaq)) {
        const service = await prisma.service.findFirst({ where: { slug, type: "RENTAL" }, select: { id: true, faq: true } });
        if (!service) throw new Error(`Service not found: ${slug}`);
        const faq = withFaq(service.faq, [item]);
        if (faq) {
            plan.push(`service ${slug}: +1 FAQ`);
            if (apply) writes.push(prisma.service.update({ where: { id: service.id }, data: { faq } }));
        }
    }

    const project = await prisma.project.findUnique({ where: { slug: TCMB }, select: { content: true, content_en: true } });
    if (!project) throw new Error("TCMB project not found");
    const projectData: Record<string, string> = {};
    if (project.content && !project.content.includes(GUIDE_PATH)) projectData.content = project.content + tcmbTr;
    if (project.content_en && !project.content_en.includes(GUIDE_EN_PATH)) projectData.content_en = project.content_en + tcmbEn;
    if (Object.keys(projectData).length) {
        plan.push(`project tcmb: ${Object.keys(projectData).join(", ")}`);
        if (apply) writes.push(prisma.project.update({ where: { slug: TCMB }, data: projectData }));
    }

    console.log(plan.length ? plan.join("\n") : "Nothing to change.");
    if (!apply) return console.log("Dry run. Pass --apply to write.");
    await Promise.all(writes);
    console.log("Applied.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
