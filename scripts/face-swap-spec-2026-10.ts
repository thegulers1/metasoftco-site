import "dotenv/config";
import { prisma } from "../src/lib/db";

// 2026-10-23 "Face Swap Blogu — Geliştirme ve İçerik Şartnamesi": the DB part.
// - Guide TR/EN: new meta description and keywords; EN gets the 2 FAQs it lacked.
// - Incoming links: one FAQ each on AI Photobooth and AI Football Card (TR),
//   one closing sentence on the TCMB project (TR/EN).
// - The 4-step diagram (GÖRSEL 2) under the steps list, TR/EN.
// Case numbers, photos and the LinkedIn URL come later from the team.
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

// GÖRSEL 2 of the spec, under the "4 Adım" list (file in public/images/blog/face-swap/).
const DIAGRAM = "/images/blog/face-swap/face-swap-4-adim.webp";
const diagram = (alt: string) =>
    `\n<figure><img src="${DIAGRAM}" width="1600" height="700" loading="lazy" decoding="async" alt="${alt}"></figure>`;
const diagramTr = diagram("Face swap'in 4 adımı: yüz tespiti, referans noktaları, hizalama ve harmanlama");
const diagramEn = diagram("The 4 steps of face swap: face detection, landmarks, alignment and blending");

/** Inserts `html` right after the first </ol> that follows `heading`. */
function afterListUnder(content: string, heading: string, html: string) {
    const h = content.indexOf(heading);
    if (h === -1) throw new Error(`Heading not found: ${heading}`);
    const end = content.indexOf("</ol>", h);
    if (end === -1) throw new Error(`No list under: ${heading}`);
    const at = end + "</ol>".length;
    return content.slice(0, at) + html + content.slice(at);
}

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
    if (post.content && !post.content.includes(DIAGRAM)) {
        postData.content = afterListUnder(post.content, "Nasıl Çalışır? (4 Adım)", diagramTr);
    }
    if (post.content_en && !post.content_en.includes(DIAGRAM)) {
        postData.content_en = afterListUnder(post.content_en, "How Does AI Face Swap Work? (4 Steps)", diagramEn);
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
