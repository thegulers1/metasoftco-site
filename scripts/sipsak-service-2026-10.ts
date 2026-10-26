/**
 * sipsak-service-2026-10.ts
 *
 * Follow-up to scripts/seo-brief-2026-10-23.ts, with the owner's answers:
 * - N-02: the Şipşak service. A photographer roams the venue shooting on
 *   Instax and hands each photo over in a branded magnetic frame; no digital
 *   copy. outputType "instant" keeps the shared rental block from promising a
 *   kiosk, QR sharing or 750 prints.
 * - Links the A101 Pati and Garanti BBVA projects to it and replaces the
 *   "thermal printing" / "phygital" wording in the A101 project.
 * - Photobooth category FAQ: the PDF report is only on request, and the
 *   direct Instagram/LinkedIn sharing claim is dropped.
 *
 *   pnpm tsx scripts/sipsak-service-2026-10.ts          # dry run: prints every change
 *   pnpm tsx scripts/sipsak-service-2026-10.ts --apply  # writes them, service unpublished
 *   pnpm tsx scripts/sipsak-service-2026-10.ts --apply --publish  # after the code deploy
 *
 * Idempotent. Refuses to run against the old Supabase database.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const APPLY = process.argv.includes("--apply");
// The "instant" output type needs the rental-ops code that ships with this
// script; publish only once that code is live, or the page shows kiosk copy.
const PUBLISH = process.argv.includes("--publish");
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

function checkLengths(label: string, title?: string | null, description?: string | null) {
    if (title && title.length > 60) console.warn(`  ! ${label}: title ${title.length} chars`);
    if (description && (description.length < 120 || description.length > 160)) {
        console.warn(`  ! ${label}: description ${description.length} chars`);
    }
}

/** Editor HTML keeps &nbsp; between words; match a phrase whichever space it uses. */
function phrase(text: string): RegExp {
    return new RegExp(text.split(" ").map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(?:&nbsp;|\\s)"));
}

function replaceFaqAnswer(raw: string | null, question: string, edit: (answer: string) => string): string | null {
    if (!raw) return raw;
    const items: Faq[] = JSON.parse(raw);
    const item = items.find((entry) => entry.q === question);
    if (!item) throw new Error(`FAQ question not found: ${question}`);
    item.a = edit(item.a);
    return JSON.stringify(items);
}

// ---------------------------------------------------------------- content

const SLUG = "sipsak-fotograf-aktivasyonu";
const A101 = "a101-pati-kurtaran-ev-sipsak-foto-aktivasyonu";
const GARANTI = "garanti-bbva-genc-x-kulupler-bulusmasi";

const GARANTI_PHOTO = "https://res.cloudinary.com/dqkehdebg/image/upload/v1770928212/metasoftco/projects/y6uulrjc1guvovufnqzv.jpg";
const A101_FRAMES = "https://res.cloudinary.com/dqkehdebg/image/upload/v1791284420/metasoftco/projects/gallery/onosyayfg3omirgn837k.png";
const A101_COVER = "https://res.cloudinary.com/dqkehdebg/image/upload/v1791284841/metasoftco/projects/xgfxsp1rwfvkomyoxzgp.png";

const content = `<h2>Şipşak Fotoğrafçılık Nedir?</h2>
<p>Şipşak fotoğrafçılık, fotoğrafın çekildiği yerde anında çıkıp kişiye elden teslim edildiği fotoğraf hizmetidir. Adını eski sokak fotoğrafçılarının "şipşak" diye çekip kısa sürede teslim ettiği fotoğraflardan alır. Biz bu keyfi etkinliklere Instax anlık fotoğraf makineleri ve markaya özel magnetli çerçevelerle taşıyoruz.</p>

<h2>Etkinlikte Nasıl Çalışır?</h2>
<ol>
<li>Fotoğrafçımız etkinlik alanında dolaşır, misafirleri tek tek ya da gruplar hâlinde yerinde çeker.</li>
<li>Instax ile çekilen fotoğraf makineden anında çıkar.</li>
<li>Fotoğraf, markanıza özel tasarlanmış magnetli çerçeveye yerleştirilir ve misafire elden verilir.</li>
</ol>
<p>Şipşak fotoğrafta dijital kopya verilmez; misafirin elinde kalan, tek ve gerçek bir fotoğraftır. Aynı etkinlikte dijital paylaşım da istiyorsanız <a href="/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala">photobooth kiralama</a> ile birlikte planlayabiliriz.</p>

<h2>Neden Şipşak Fotoğraf?</h2>
<ul>
<li><strong>Kimse sırada beklemez:</strong> Misafir kabine gelmez, fotoğrafçı misafire gider. Kokteyl, gala ve açık alan etkinliklerinde doğal anlar yakalanır.</li>
<li><strong>Eve giden marka:</strong> Magnetli çerçeve buzdolabında ya da masada kalır; logonuz etkinlikten sonra da görünür.</li>
<li><strong>Kurulum gerektirmez:</strong> Kiosk, priz ya da internet ihtiyacı yoktur; kalabalık ve dar alanlarda da çalışır.</li>
<li><strong>Nostaljik ve sıcak:</strong> Özellikle sosyal sorumluluk, kampüs ve aile etkinliklerinde samimi bir atmosfer yaratır.</li>
</ul>

<h2>Sahadan Örnekler</h2>
<p><a href="/projeler/${A101}">A101 Pati &amp; Kurtaran Ev</a>: 4 Ekim Hayvanları Koruma Günü'nde ziyaretçilerin can dostlarıyla çekilen fotoğraflarını A101 Pati'ye özel magnetli çerçevelerle teslim ettik. <a href="/projeler/${GARANTI}">Garanti BBVA Genç × Kulüpler Buluşması</a>: üniversite kulüplerinin buluşmasında fotoğrafçımız Instax ile alanı dolaştı.</p>`;

const faq: Faq[] = [
    { q: "Şipşak fotoğrafçılık nedir?", a: "Şipşak fotoğrafçılık, fotoğrafın çekildiği yerde anında çıkıp kişiye elden teslim edildiği fotoğraf hizmetidir. Etkinliklerde fotoğrafçımız misafirleri Instax ile yerinde çeker ve fotoğrafı markaya özel magnetli çerçeveyle verir." },
    { q: "Şipşak fotoğraf ile photobooth arasındaki fark nedir?", a: "Photobooth'ta misafir kioska gelip kendi fotoğrafını çeker; fotoğraf basılır ve QR kod ile telefona da iner. Şipşak fotoğrafta ise fotoğrafçı etkinlik alanında dolaşıp misafirleri yerinde çeker; sıra oluşmaz, daha doğal kareler yakalanır ve dijital kopya verilmez." },
    { q: "Şipşak fotoğraflar dijital olarak da veriliyor mu?", a: "Hayır. Instax ile çekilen fotoğraf tek ve fizikseldir; misafire magnetli çerçevesiyle elden verilir. Dijital paylaşım isteniyorsa etkinliğe photobooth da eklenebilir." },
    { q: "Şipşak fotoğraf için kurulum gerekiyor mu?", a: "Hayır. Kiosk, priz ya da internet bağlantısı gerekmez; fotoğrafçımız Instax makinesi ve markalı çerçevelerle alanda dolaşarak çalışır." },
];

// ---------------------------------------------------------------- run

async function main() {
    console.log(APPLY ? "APPLY mode: writing to the database\n" : "Dry run: nothing is written (add --apply)\n");
    const host = databaseUrl.replace(/^.*@/, "").replace(/\/.*$/, "");
    console.log(`Database host: ${host}\n`);

    const writes: (() => Promise<unknown>)[] = [];

    const category = await prisma.serviceCategory.findUnique({ where: { slug: "photobooth-ve-fotograf-aktivasyonlari" } });
    if (!category) throw new Error("Photobooth category not found");

    // N-02 service
    const next = {
        title: "Şipşak Fotoğraf Aktivasyonu",
        homeTitle: "Şipşak Foto",
        metaTitle: "Şipşak Fotoğrafçılık | Etkinlikte Instax ile Anında Fotoğraf",
        metaDescription: "Etkinlikler için şipşak fotoğrafçılık: fotoğrafçımız misafirleri Instax ile yerinde çeker, fotoğrafı markanıza özel magnetli çerçeveyle elden teslim eder.",
        metaKeywords: "şipşak fotoğrafçılık, şipşak fotoğraf, şipşak foto, instax fotoğrafçı, etkinlik fotoğrafçısı, anında fotoğraf",
        description: "Fotoğrafçımız etkinlik alanında dolaşarak misafirleri Instax ile yerinde çeker; anında çıkan fotoğraf markanıza özel tasarlanmış magnetli bir çerçeveye yerleştirilip misafire elden verilir. Nostaljik şipşak keyfi, kurumsal etkinlik düzeninde.",
        content,
        faq: JSON.stringify(faq),
        image: GARANTI_PHOTO,
        gallery: JSON.stringify([
            { url: GARANTI_PHOTO, alt: "Kurumsal etkinlikte Instax ile şipşak fotoğraf çeken fotoğrafçı" },
            { url: A101_FRAMES, alt: "A101 Pati'ye özel magnetli çerçevede teslim edilen şipşak fotoğraflar" },
            { url: A101_COVER, alt: "A101 Pati standında şipşak fotoğraf çekimi" },
        ]),
        accentText: "fotoğraf aktivitesi",
        outputType: "instant",
        type: "RENTAL",
        order: 7,
        ...(PUBLISH && { published: true }),
    };
    checkLengths("sipsak", next.metaTitle, next.metaDescription);
    const existing = await prisma.service.findFirst({ where: { slug: SLUG, categoryId: category.id } });
    let serviceId = existing?.id ?? null;
    if (existing) {
        const data = diff(`service/${SLUG}`, existing as unknown as Record<string, unknown>, next);
        if (Object.keys(data).length) writes.push(() => prisma.service.update({ where: { id: existing.id }, data }));
    } else {
        show(`service/${SLUG}`, "(new service)", null, next.title);
        changes++;
        writes.push(async () => {
            const created = await prisma.service.create({ data: { slug: SLUG, categoryId: category.id, published: false, ...next } });
            serviceId = created.id;
        });
    }

    // Projects: link to the service; A101 copy said thermal printing and "phygital".
    for (const slug of [A101, GARANTI]) {
        const project = await prisma.project.findUnique({ where: { slug } });
        if (!project) throw new Error(`Project not found: ${slug}`);
        const fixes: Record<string, unknown> = {};
        if (slug === A101) {
            fixes.content = (project.content ?? "")
                .replace(phrase("Yüksek hızlı termal baskı teknolojimiz ve A101 Pati markasına özel tasarlanan arayüzümüz sayesinde,"), "Instax ile çekilip A101 Pati'ye özel tasarlanan magnetli çerçevelere yerleştirilen fotoğraflar sayesinde,")
                .replace(phrase("bu &quot;Phygital&quot; aktivasyon,"), "bu şipşak fotoğraf aktivasyonu,");
            fixes.content_en = (project.content_en ?? "")
                .replace(phrase("Thanks to our high-speed thermal printing technology and custom-designed UI for A101 Pati,"), "With photos shot on Instax and placed in magnetic frames designed for A101 Pati,")
                .replace(phrase("this &quot;Phygital&quot; activation"), "this instant photo activation");
            fixes.title_en = "A101 Pati & Kurtaran Ev - Instant Photo Activation";
        }
        writes.push(async () => {
            if (!serviceId) throw new Error("Şipşak service id missing");
            const ids: string[] = project.serviceIds ? JSON.parse(project.serviceIds) : [];
            const linked = ids.includes(serviceId) ? project.serviceIds : JSON.stringify([...ids, serviceId]);
            const data = diff(`project/${slug}`, project as unknown as Record<string, unknown>, { ...fixes, serviceIds: linked });
            if (Object.keys(data).length) await prisma.project.update({ where: { id: project.id }, data });
        });
        if (existing) {
            // Dry runs only see the project diff when the service already exists.
            const ids: string[] = project.serviceIds ? JSON.parse(project.serviceIds) : [];
            if (!ids.includes(existing.id) || Object.keys(fixes).some((key) => (project as Record<string, unknown>)[key] !== fixes[key])) {
                console.log(`  project/${slug} · will be updated`);
            }
        } else {
            console.log(`  project/${slug} · serviceIds += new service${slug === A101 ? ", Instax wording" : ""}`);
        }
    }

    // Photobooth category FAQ
    {
        const report = (answer: string) => answer.replace(/Evet\. Gerçek zamanlı analitik panel[^]*?Etkinlik sonrasında PDF rapor sunulur\./, "Evet. Talep edilirse etkinlik sonrasında rapor hazırlıyoruz.");
        const reportEn = (answer: string) => answer.replace(/Yes\. The real-time analytics panel[^]*?A PDF report is provided after the event\./, "Yes. A post-event report is prepared on request.");
        let faqTr = replaceFaqAnswer(category.faq, "Fotoğraflar katılımcılara nasıl iletilir?", (a) => a.replace(" İstek üzerine direkt Instagram veya LinkedIn paylaşımı da yapılabilir.", ""));
        faqTr = replaceFaqAnswer(faqTr, "Etkinlik sonrası analitik rapor alınabilir mi?", report);
        let faqEn = replaceFaqAnswer(category.faq_en, "How are photos delivered to participants?", (a) => a.replace(" Direct Instagram or LinkedIn sharing can also be enabled upon request.", ""));
        faqEn = replaceFaqAnswer(faqEn, "Can I receive an analytics report after the event?", reportEn);
        const data = diff(`category/${category.slug}`, category as unknown as Record<string, unknown>, { faq: faqTr, faq_en: faqEn });
        if (Object.keys(data).length) writes.push(() => prisma.serviceCategory.update({ where: { id: category.id }, data }));
    }

    console.log(`\n${changes} change(s) before project links.`);
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
