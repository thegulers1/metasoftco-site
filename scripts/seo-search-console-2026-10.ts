/**
 * seo-search-console-2026-10.ts
 *
 * Content half of the October 2026 Search Console / GEO review: titles and
 * meta descriptions for pages with impressions but no clicks, the rewritten
 * face swap article (TR + EN), the "interaktif etkinlik ne demek" definition,
 * the aura photography section and a few copy fixes.
 *
 *   pnpm tsx scripts/seo-search-console-2026-10.ts          # dry run: prints every change
 *   pnpm tsx scripts/seo-search-console-2026-10.ts --apply  # writes them
 *
 * Idempotent: fields already holding the new value are skipped, FAQ entries
 * are merged by question, inserted sections are detected by their heading.
 * Refuses to run against the old Supabase database (see docs/database-migration.md).
 */

import * as dotenv from "dotenv";
dotenv.config();

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const APPLY = process.argv.includes("--apply");
const databaseUrl = process.env.DATABASE_URL ?? "";
if (/supabase/i.test(databaseUrl)) {
    const message = "DATABASE_URL points at Supabase, but the live site reads the Coolify database: open the metasoftco-db-ssh tunnel and point .env at 127.0.0.1:15432.";
    if (APPLY) {
        console.error(message);
        process.exit(1);
    }
    console.warn(`${message} Showing a dry run against the old copy.\n`);
}

const pool = new Pool({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

type Faq = { q: string; a: string };
const read = (name: string) => readFileSync(join(__dirname, "content", name), "utf8").trim();

// ---------------------------------------------------------------- helpers

let changes = 0;

function show(label: string, field: string, before: unknown, after: unknown) {
    const cut = (value: unknown) => {
        const text = value == null ? "∅" : String(value);
        return text.length > 160 ? `${text.slice(0, 157)}… (${text.length} chars)` : text;
    };
    console.log(`  ${label} · ${field}\n    - ${cut(before)}\n    + ${cut(after)}`);
}

/** Keeps only the fields whose value actually changes, and logs them. */
function diff(label: string, current: Record<string, unknown>, next: Record<string, unknown>): Record<string, unknown> {
    const data: Record<string, unknown> = {};
    for (const [field, value] of Object.entries(next)) {
        if (current[field] === value) continue;
        show(label, field, current[field], value);
        data[field] = value;
    }
    changes += Object.keys(data).length;
    return data;
}

function mergeFaq(raw: string | null, additions: Faq[], first = false): string {
    const existing: Faq[] = raw ? JSON.parse(raw) : [];
    const known = new Set(existing.map((item) => item.q.trim().toLocaleLowerCase("tr-TR")));
    const fresh = additions.filter((item) => !known.has(item.q.trim().toLocaleLowerCase("tr-TR")));
    if (fresh.length === 0) return raw ?? "[]";
    return JSON.stringify(first ? [...fresh, ...existing] : [...existing, ...fresh]);
}

function checkLengths(label: string, title?: string | null, description?: string | null) {
    if (title && title.length > 65) console.warn(`  ! ${label}: title ${title.length} chars`);
    if (description && (description.length < 120 || description.length > 160)) {
        console.warn(`  ! ${label}: description ${description.length} chars`);
    }
}

async function service(categorySlug: string, slug: string) {
    const row = await prisma.service.findFirst({ where: { slug, category: { slug: categorySlug } } });
    if (!row) throw new Error(`Service not found: ${categorySlug}/${slug}`);
    return row;
}

// ---------------------------------------------------------------- content

const FACE_SWAP_SLUG = "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir";
// Byline with a profile page (src/lib/team.ts); only written with --author,
// once Selami has confirmed the article goes out under his name.
const FACE_SWAP_AUTHOR = "Selami Güler";
const SET_AUTHOR = process.argv.includes("--author");

const faceSwapFaqTr: Faq[] = [
    {
        q: "Face swap ücretsiz mi?",
        a: "Telefon uygulamalarının ve web araçlarının çoğu ücretsiz bir sürüm sunar; yüksek çözünürlük, filigransız çıktı ya da daha fazla şablon genellikle abonelik veya kredi gerektirir. Etkinliklerde kullanılan profesyonel sistemler ise etkinlik başına kiralanır; kiosk, baskı, kurulum ve teknik personel fiyata dahildir.",
    },
    {
        q: "Face swap videoda da yapılabilir mi?",
        a: "Evet. Videoda yüz değiştirme aynı işlemi her kare için tekrarladığından daha fazla işlem gücü ister ve kareler arasında tutarlılık sağlamak daha zordur. Etkinliklerde fotoğraf tabanlı face swap tercih edilir; sonuç saniyeler içinde hazır olur ve basılabilir.",
    },
    {
        q: "Yüz değiştirme uygulamaları fotoğrafımı saklıyor mu?",
        a: "Uygulamadan uygulamaya değişir. Birçok uygulama fotoğrafı işlemek için kendi sunucusuna yükler; bir kısmı belirli bir süre saklar ya da model geliştirmek için kullanabilir. Kullanmadan önce gizlilik politikasında saklama süresine ve verinin eğitimde kullanılıp kullanılmadığına bakın.",
    },
    {
        q: "Face swap ile deepfake aynı şey mi?",
        a: "Hayır. Benzer tekniklerle çalışabilirler ama amaçları farklıdır. Face swap, kişinin kendi isteğiyle yaptığı ve dönüşüm olduğu bilinen bir görsel eğlencedir. Deepfake ise birini söylemediği ya da yapmadığı bir şeyi yapıyor gibi göstermek için, çoğu zaman o kişinin haberi olmadan üretilen içeriktir.",
    },
    {
        q: "Gerçekçi yapay zeka yüz oluşturucuları nasıl çalışır?",
        a: "Çoğu difüzyon modellerine dayanır: model görüntüyü gürültüden adım adım üretir. ControlNet gibi katmanlar pozu ve yüz hatlarını sabit tutar, IP-Adapter ve InstantID gibi yöntemler referans fotoğraftaki kimliği yeni görsele taşır. Işık, cilt dokusu ve saç detayları bu yönlendirme sayesinde tutarlı kalır.",
    },
];

const faceSwapFaqEn: Faq[] = [
    {
        q: "What is face swap?",
        a: "Face swap is the use of AI to place a face from one photo onto another image or character while keeping the angle, lighting and expression.",
    },
    {
        q: "How does AI face swap work?",
        a: "The system detects the face and its landmarks such as the eyes, nose and lips, aligns it to the target image, then a deep learning model generates the face in the new scene and blends skin tone and light.",
    },
    {
        q: "Is face swap free?",
        a: "Most phone apps and web tools have a free tier; higher resolution, watermark-free output or more templates usually need a subscription or credits. Professional event systems are rented per event, with the kiosk, printing, installation and technical staff included.",
    },
    {
        q: "Can face swap be done on video?",
        a: "Yes. Video face swap repeats the process for every frame, so it needs more computing power and frame-to-frame consistency is harder. Events usually use photo-based face swap, which is ready in seconds and can be printed.",
    },
    {
        q: "Do face swap apps keep my photo?",
        a: "It depends on the app. Many upload the photo to their own servers for processing, and some keep it for a period or use it to improve their models. Check the privacy policy for retention and training use before you start.",
    },
    {
        q: "Is face swap the same as a deepfake?",
        a: "No. They can use similar techniques, but the purpose differs. Face swap is entertainment a person chooses, knowing the result is a transformation. A deepfake shows someone saying or doing something they never did, usually without their knowledge.",
    },
    {
        q: "How long does a face swap take at an event?",
        a: "The photo is processed within seconds. A single AI photo booth station serves an average of 40–60 guests an hour.",
    },
];

const hubDefinition =
    "İnteraktif etkinlik ne demek? Katılımcıların izleyici olarak kalmak yerine oynayarak, dokunarak ve yarışarak sürece dahil olduğu etkinlik biçimidir.";

const hubFaq: Faq[] = [
    {
        q: "İnteraktif etkinlik ne demek?",
        a: "İnteraktif etkinlik, katılımcıların sahneyi ya da standı yalnızca izlemek yerine oyun, dokunmatik ekran, sensör veya yapay zeka gibi araçlarla deneyime bizzat katıldığı etkinliktir. Lansman, fuar, festival ve kurumsal toplantılarda katılımcının markayla bağ kurması için kullanılır.",
    },
];

const auraSectionTr = `<h2>Aura Fotoğrafçılığı Nedir, Nasıl Çalışır?</h2>
<p>Aura fotoğrafçılığı, kişinin fotoğrafını çevresinde beliren renkli bir halkayla birlikte gösteren bir fotoğraf türüdür. Klasik aura kameraları, kişinin ellerini koyduğu sensörlerden aldığı ölçümleri renklere çevirir ve bu renkleri portrenin etrafına yansıtır. Ortaya çıkan görsel, o anki ölçümlere göre her seferinde farklı renk tonlarında oluşur.</p>
<p>Aura Photobooth'ta süreç şöyle işler: katılımcı kabine geçer ve ellerini biofeedback sensör kutularına yerleştirir. Sistem sensörlerden gelen anlık verileri okur, yazılımımız bu verileri bir renk paletine dönüştürür ve renkleri gerçek zamanlı olarak portrenin çevresine işler. Fotoğraf saniyeler içinde basılır ya da QR kodla telefona aktarılır.</p>
<p>Renklerin anlamları (örneğin mor için sezgi, turuncu için yaratıcılık) aura fotoğrafçılığı geleneğinden gelen eğlenceli yorumlardır; bilimsel ya da tıbbi bir ölçüm sonucu değildir. Bu yüzden Aura Photobooth'u bir sağlık analizi olarak değil, katılımcılar arasında sohbet başlatan, her seferinde farklı sonuç veren bir etkinlik deneyimi olarak sunuyoruz. Renk yorum kartları markanıza ve etkinliğin temasına göre hazırlanabilir.</p>
`;

const auraFaq: Faq[] = [
    {
        q: "Aura fotoğrafçılığı nedir?",
        a: "Aura fotoğrafçılığı, kişinin portresini çevresinde beliren renkli bir halkayla birlikte gösteren fotoğraf türüdür. Renkler, kişinin ellerini koyduğu sensörlerden alınan anlık ölçümlere göre oluşur; bu yüzden her çekimde farklı bir sonuç çıkar.",
    },
    {
        q: "Aura fotoğrafındaki renkler bilimsel mi?",
        a: "Hayır. Sensörler gerçek zamanlı veri okur, ancak renklerin anlamları aura fotoğrafçılığı geleneğinden gelen eğlenceli yorumlardır ve tıbbi ya da bilimsel bir değerlendirme değildir. Aura Photobooth'u etkinliklerde sohbet başlatan bir deneyim olarak sunuyoruz.",
    },
];

// ---------------------------------------------------------------- run

async function main() {
    console.log(APPLY ? "APPLY mode: writing to the database\n" : "Dry run: nothing is written (add --apply)\n");
    const host = databaseUrl.replace(/^.*@/, "").replace(/\/.*$/, "");
    console.log(`Database host: ${host}\n`);

    const writes: (() => Promise<unknown>)[] = [];

    // 1.1 + section 2: face swap article, TR + EN
    {
        const post = await prisma.blogPost.findUnique({ where: { slug: FACE_SWAP_SLUG } });
        if (!post) throw new Error("Face swap post not found");
        const linked = await prisma.service.findMany({
            where: {
                OR: [
                    { slug: "ai-photobooth-kirala", category: { slug: "yapay-zeka-etkinlik-cozumleri" } },
                    { slug: "ai-football-card", category: { slug: "yapay-zeka-etkinlik-cozumleri" } },
                ],
            },
            select: { id: true },
        });
        const serviceIds: string[] = post.serviceIds ? JSON.parse(post.serviceIds) : [];
        const mergedIds = [...new Set([...serviceIds, ...linked.map((row) => row.id)])];

        const next = {
            title: "Yapay Zeka ile Yüz Değiştirme (Face Swap): Ne Demek, Nasıl Çalışır?",
            metaTitle: "Face Swap Ne Demek? Yapay Zeka ile Yüz Değiştirme Rehberi",
            metaDescription: "Face swap, yapay zekâ ile bir yüzü başka bir görsele yerleştirmektir. Nasıl çalıştığını, güvenli kullanımını ve etkinliklerde nasıl yapıldığını anlatıyoruz.",
            excerpt: "Face swap ne demek, yapay zeka ile yüz değiştirme nasıl çalışır, deepfake'ten farkı ne? Teknolojiyi, güvenli kullanımı ve etkinliklerdeki uygulamasını anlatıyoruz.",
            content: read("face-swap-tr.html"),
            faq: mergeFaq(post.faq, faceSwapFaqTr),
            ...(SET_AUTHOR && { author: FACE_SWAP_AUTHOR }),
            serviceIds: JSON.stringify(mergedIds),
            title_en: "AI Face Swap: What It Is and How It Works",
            metaTitle_en: "What Is Face Swap? How AI Face Swapping Works | MetasoftCo",
            metaDescription_en: "Face swap uses AI to place one face onto another image. How it works, how it differs from deepfakes, how to use it safely and how events do it in seconds.",
            excerpt_en: "What face swap means, how AI face swapping works and how it differs from deepfakes, plus safe use and how it runs at events.",
            content_en: read("face-swap-en.html"),
            faq_en: mergeFaq(post.faq_en, faceSwapFaqEn),
        };
        checkLengths("blog TR", next.metaTitle, next.metaDescription);
        checkLengths("blog EN", next.metaTitle_en, next.metaDescription_en);
        const data = diff(`blog/${post.slug}`, post as unknown as Record<string, unknown>, next);
        if (Object.keys(data).length) writes.push(() => prisma.blogPost.update({ where: { id: post.id }, data }));
    }

    // 1.2 interactive hub
    {
        const category = await prisma.serviceCategory.findUnique({ where: { slug: "interaktif-etkinlik-aktiviteleri" } });
        if (!category) throw new Error("Hub category not found");
        const liveGames = await prisma.service.count({ where: { categoryId: category.id, published: true, type: "RENTAL" } });
        const heroContent = category.heroContent?.includes("İnteraktif etkinlik ne demek?")
            ? category.heroContent
            : `${hubDefinition} ${category.heroContent ?? ""}`.trim();
        const next = {
            metaTitle: "İnteraktif Etkinlik Nedir? Oyun ve Aktivasyonlar | MetasoftCo",
            metaDescription: `İnteraktif etkinlik, katılımcının izlemek yerine oynayıp dokunarak dahil olduğu deneyimdir. Reflex Game, hediye çarkı ve ${liveGames} oyunu anahtar teslim kiralayın.`,
            heroContent,
            faq: mergeFaq(category.faq, hubFaq, true),
        };
        checkLengths("hub", next.metaTitle, next.metaDescription);
        const data = diff(`category/${category.slug}`, category as unknown as Record<string, unknown>, next);
        if (Object.keys(data).length) writes.push(() => prisma.serviceCategory.update({ where: { id: category.id }, data }));
    }

    // 1.3 + 1.4 DeFacto projects
    {
        const projects: { slug: string; next: Record<string, string> }[] = [
            {
                slug: "defacto-x-afra-saracoglu-ai-fashion-experience",
                next: {
                    title: "DeFacto x Afra Saraçoğlu: AI Fashion Experience",
                    title_en: "DeFacto x Afra Saraçoğlu: AI Fashion Experience",
                    metaTitle: "DeFacto x Afra Saraçoğlu: Yapay Zeka ile Sanal Deneme",
                    metaDescription: "DeFacto'nun Afra Saraçoğlu koleksiyonu lansmanında misafirler, yapay zekâ ile kıyafetleri saniyeler içinde kendi üzerlerinde gördü. Kurguyu inceleyin.",
                    metaTitle_en: "DeFacto x Afra Saraçoğlu: AI Virtual Try-On Case Study",
                    metaDescription_en: "How we built an AI virtual try-on for DeFacto's Afra Saraçoğlu collection launch: guests saw the pieces on themselves in seconds. See the set-up.",
                },
            },
            {
                slug: "defacto-x-momento-ball-photo",
                next: {
                    title: "DeFacto x Momento Ball Photo",
                    metaTitle: "DeFacto Momento Ball: Mağaza İçi Fotoğraf Aktivasyonu",
                    metaDescription: "DeFacto mağazalarında kurduğumuz Momento Ball aktivasyonunda müşterinin fotoğrafı saniyeler içinde şeffaf bir küreye yerleşen markalı bir hatıraya dönüştü.",
                },
            },
        ];
        for (const { slug, next } of projects) {
            const project = await prisma.project.findUnique({ where: { slug } });
            if (!project) throw new Error(`Project not found: ${slug}`);
            checkLengths(slug, next.metaTitle, next.metaDescription);
            if (next.metaTitle_en) checkLengths(`${slug} EN`, next.metaTitle_en, next.metaDescription_en);
            const data = diff(`project/${slug}`, project as unknown as Record<string, unknown>, next);
            if (Object.keys(data).length) writes.push(() => prisma.project.update({ where: { id: project.id }, data }));
        }
    }

    // 1.5 – 1.12 services
    const services: { category: string; slug: string; next: Record<string, string>; fix?: (row: Record<string, unknown>) => Record<string, string> }[] = [
        {
            category: "interaktif-etkinlik-aktiviteleri",
            slug: "reflex-wall",
            next: {
                metaTitle: "Reflex Wall Kiralama | Refleks Duvarı Oyunu — MetasoftCo",
                metaDescription: "İki kişinin aynı anda yarıştığı LED butonlu refleks duvarı. Markaya özel kaplama, skor tablosu, kurulum ve teknik ekip dahil; fuar ve lansmanlar için.",
            },
        },
        {
            category: "interaktif-etkinlik-aktiviteleri",
            slug: "reflex-game-hiz-ve-rekabet-oyunu",
            next: {
                metaDescription: "Reflex Game kiralama: 30 saniyede rastgele yanan LED butonlara basılan hız oyunu. Skor tablosu ve markalı tasarımla stantta kuyruk oluşturur. Anahtar teslim.",
                metaTitle_en: "Interactive Reflex Game Rental for Events | MetasoftCo",
                metaDescription_en: "Rent an interactive LED reflex game: players hit randomly lit buttons for 30 seconds while a live leaderboard draws a crowd. Branded, delivered and staffed.",
            },
        },
        {
            category: "vr-ar-deneyimleri",
            slug: "vr-beat-saber-kiralama",
            next: {
                title_en: "Beat Saber VR Rental",
                metaTitle_en: "Beat Saber VR Rental for Events & Trade Shows | MetasoftCo",
                metaDescription_en: "Beat Saber VR rental for corporate events, launches and trade shows. Headsets, big-screen mirroring, branded setup and on-site staff included. Get a quote.",
            },
            // "VR Bear Saber" typo in the English copy.
            fix: (row) => Object.fromEntries(
                (["content_en", "description_en"] as const)
                    .filter((field) => typeof row[field] === "string" && /Bear(\s|&nbsp;)Saber/.test(row[field] as string))
                    .map((field) => [field, (row[field] as string).replace(/Bear(\s|&nbsp;)Saber/g, "Beat$1Saber")]),
            ),
        },
        {
            category: "yapay-zeka-etkinlik-cozumleri",
            slug: "ai-football-card",
            next: {
                metaTitle: "Yapay Zeka Futbolcu Kartı Yapma | Etkinlik Kiralama — MetasoftCo",
                metaDescription: "Fotoğrafı yapay zekâ ile saniyeler içinde kişiye özel futbolcu kartına çeviriyoruz. Anında baskı ve QR paylaşım; maç, fan ve lansman etkinlikleri için.",
                metaTitle_en: "AI Football Card Rental | Custom Player Cards — MetasoftCo",
                metaDescription_en: "We turn guests' photos into personalised AI football player cards in seconds. Instant prints and QR sharing for fan zones, sponsor activations and launches.",
            },
        },
        {
            category: "yapay-zeka-etkinlik-cozumleri",
            slug: "ai-bookmark",
            next: {
                metaTitle_en: "AI Bookmark Maker Rental for Events | MetasoftCo",
                metaDescription_en: "Guests sketch or type an idea and our AI turns it into a printed, personalised bookmark in seconds. A take-home activation for book fairs and brand events.",
            },
        },
        {
            category: "photobooth-ve-fotograf-aktivasyonlari",
            slug: "aura-photobooth-kiralama",
            next: {
                metaTitle: "Aura Fotoğrafçılığı & Aura Photobooth Kiralama | MetasoftCo",
                metaDescription: "Aura fotoğrafçılığı nedir? Biofeedback sensörleri anlık veriyi renkli bir aura fotoğrafına çevirir. Etkinlikler için aura photobooth kiralama ve anında baskı.",
            },
            fix: (row) => {
                const out: Record<string, string> = { faq: mergeFaq(row.faq as string | null, auraFaq, true) };
                const content = (row.content as string | null) ?? "";
                if (!content.includes("Aura Fotoğrafçılığı Nedir")) {
                    // After the opening section: before the second <h2>, or at the end.
                    const headings = [...content.matchAll(/<h2[\s>]/gi)];
                    const at = headings.length >= 2 ? headings[1].index! : content.length;
                    out.content = `${content.slice(0, at)}${auraSectionTr}${content.slice(at)}`;
                }
                return out;
            },
        },
    ];

    for (const item of services) {
        const row = await service(item.category, item.slug);
        const next = { ...item.next, ...(item.fix?.(row as unknown as Record<string, unknown>) ?? {}) };
        checkLengths(`${item.slug} TR`, next.metaTitle, next.metaDescription);
        checkLengths(`${item.slug} EN`, next.metaTitle_en, next.metaDescription_en);
        const data = diff(`service/${item.category}/${item.slug}`, row as unknown as Record<string, unknown>, next);
        if (Object.keys(data).length) writes.push(() => prisma.service.update({ where: { id: row.id }, data }));
    }

    console.log(`\n${changes} field change(s) in ${writes.length} record(s).`);
    if (!APPLY) return;
    for (const write of writes) await write();
    console.log("Written.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
