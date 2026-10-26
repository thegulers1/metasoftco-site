/**
 * seo-brief-2026-10-23.ts
 *
 * The SEO implementation brief of 23 October 2026 (brief tasks in brackets):
 * hediye çarkı [P-01], photobooth / "fotoğraf kabini" [P-02], İstanbul and İzmir
 * city pages [P-03, P-04], 360 Video Booth [P-05], Mirror Booth [P-06], the new
 * "Photobooth Nedir?" guide [N-01], the aura definition heading [T-01], Mirror
 * Booth internal links [T-02] and the gift wheel's English meta [E-01].
 *
 * Left out on purpose: the Şipşak service [N-02] waits for the owner to confirm
 * how it runs; ⚠️ figures (360 platform capacity, shot length, stock cut-off)
 * were dropped; FAQ and body blocks the pages already had were not duplicated.
 *
 *   pnpm tsx scripts/seo-brief-2026-10-23.ts          # dry run: prints every change
 *   pnpm tsx scripts/seo-brief-2026-10-23.ts --apply  # writes them
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

/** Puts `html` in front of the content unless its first heading is already there. */
function prepend(content: string | null, html: string): string {
    const heading = html.match(/<h2>(.*?)<\/h2>/)![1];
    if (content?.includes(heading)) return content ?? "";
    return `${html}\n${content ?? ""}`;
}

function checkLengths(label: string, title?: string | null, description?: string | null) {
    if (title && title.length > 60) console.warn(`  ! ${label}: title ${title.length} chars`);
    if (description && (description.length < 120 || description.length > 160)) {
        console.warn(`  ! ${label}: description ${description.length} chars`);
    }
}

async function service(categorySlug: string, slug: string) {
    const row = await prisma.service.findFirst({ where: { slug, category: { slug: categorySlug } } });
    if (!row) throw new Error(`Service not found: ${categorySlug}/${slug}`);
    return row;
}

const PB = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";

// ---------------------------------------------------------------- content

const wheelFaq: Faq[] = [
    { q: "Hediye çarkı nedir?", a: "Hediye çarkı, etkinlik ziyaretçilerinin dokunmatik ekrandaki dijital çarkı çevirerek hediye kazandığı interaktif bir oyundur. Çark durduğunda kazanılan ödül ekranda gösterilir." },
    { q: "Hediye çarkı kiralama fiyatı neye göre belirlenir?", a: "Fiyat; etkinlik süresi ve gün sayısı, şehir, markaya özel tasarım kapsamı ve form/lead toplama gibi ek özelliklere göre belirlenir. Kurulum, söküm ve saha personeli fiyata dahildir. Etkinlik tarihi ve şehrinizi paylaşırsanız aynı gün teklif hazırlarız." },
    { q: "Çarktaki hediyeleri ve dilimleri biz mi belirliyoruz?", a: "Evet. Dilim sayısı, hediye türleri ve çarkın tasarımı etkinlik öncesinde sizinle birlikte belirlenir; çark markanızın renkleri ve logosuyla hazırlanır." },
    { q: "Hediye çarkı ile katılımcı verisi toplanabilir mi?", a: "Evet. Çarkı çevirmeden önce QR ile kısa bir form doldurma adımı eklenebilir. Kayıtlar KVKK onayıyla alınır, etkinlik boyunca müşteri panelinden izlenir ve Excel/CSV olarak indirilir." },
    { q: "Hediye çarkı için ne kadar alan ve ne gerekir?", a: "Tek bir kiosk alanı ve standart bir 220V priz yeterlidir. İnternet bağlantısını kendi 5G altyapımızla sağlıyoruz; kurulum ve söküm ekibimiz tarafından yapılır." },
];

const photoboothIntro = `<h2>Fotoğraf Kabini (Photobooth) Nedir?</h2>
<p>Fotoğraf kabini, Türkçede yaygın adıyla photobooth, katılımcıların kamera, ekran ve baskı makinesinden oluşan bir kiosk ile kendi fotoğraflarını çektiği bir etkinlik aktivasyonudur. Misafir ekrandan modu seçer, geri sayımla poz verir, fotoğraf saniyeler içinde markaya özel çerçeveyle basılır ve QR kod ile telefonuna da iner. Ayrıntılı rehber için: <a href="/blog/photobooth-nedir">Photobooth nedir?</a></p>`;

// Replaces the page's shorter "Kiralamaya Dahil Olanlar" list instead of adding a second one.
const photoboothScope = `<h2>Photobooth Kiralama Neleri Kapsar?</h2>
<ul>
<li>Kompakt photobooth kiosku (2 m² alan yeterli), kamera, ışık ve baskı makinesi</li>
<li>Fotoğraf, GIF ve Boomerang çekim modları; sihirli arka plan (greenbox) ve filtreler</li>
<li>Markaya özel baskı çerçevesi, karşılama ekranı ve kiosk kaplaması</li>
<li>Anında fiziksel baskı (pakete 750 baskı dahil) ve QR ile dijital paylaşım</li>
<li>Nakliye, kurulum, söküm ve etkinlik boyunca en az iki teknik personel</li>
</ul>`;

const photoboothTypes = `<h2>Hangi Photobooth Türü Size Uygun?</h2>
<p>Klasik photobooth hızlı, kompakt ve her mekâna uyar. Daha gösterişli bir sahne isteyenler için <a href="${PB}/mirror-booth">Mirror Booth kiralama</a> (ayna ekranlı), içine girilen kapalı bir kabin isteyenler için <a href="${PB}/cabin-photo">Cabin Photo</a>, hareketli içerik için <a href="/hizmetler/video/360-video-booth">360 Video Booth</a>, katılımcıyı başka bir karaktere dönüştürmek için <a href="/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala">AI Photobooth</a> seçeneklerimiz var. Fiyatlandırmayı belirleyen etkenleri <a href="/blog/photobooth-kiralama-fiyati-neye-gore-belirlenir">bu yazımızda</a> anlattık.</p>`;

const photoboothFaq: Faq[] = [
    { q: "Fotoğraf kabini ile photobooth aynı şey mi?", a: "Evet. Photobooth, fotoğraf kabininin İngilizce adıdır. Etkinliklerde kullanılan modern photobooth'lar kapalı kabin yerine açık bir kiosk şeklindedir ve fotoğrafın yanında GIF, Boomerang ve dijital paylaşım da sunar. Kapalı kabin isteyenler için Cabin Photo da kiralıyoruz." },
    { q: "Photobooth kiralama fiyatı neye göre belirlenir?", a: "Etkinlik süresi, gün sayısı, şehir, baskı adedi ve markaya özel tasarım kapsamı fiyatı belirler. Kurulum, söküm ve saha personeli fiyata dahildir. Etkinlik tarihi ve şehrinizle aynı gün teklif hazırlarız." },
    { q: "Fotoğraflar misafirlere nasıl teslim edilir?", a: "Fotoğraf saniyeler içinde markaya özel çerçeveyle basılır; aynı anda QR kod ile misafirin telefonuna dijital olarak iner. Pakete 750 baskı dahildir." },
];

const videoBoothIntro = `<h2>360 Video Booth Nedir?</h2>
<p>360 video booth, katılımcının yuvarlak bir platformun üzerinde durduğu ve bir kollu kameranın etrafında dönerek çekim yaptığı video aktivasyonudur. Birkaç saniyelik poz ya da dans, yavaş çekim, hız rampası, müzik ve markalı grafiklerle birleşerek sosyal medyada paylaşılmaya hazır kısa bir videoya dönüşür. Video QR kod ile katılımcının telefonuna anında iner.</p>

<h2>360 Video Booth Nasıl Çalışır?</h2>
<ol>
<li>Katılımcı platforma çıkar.</li>
<li>Operatör çekimi başlatır, kamera kolu katılımcının etrafında döner.</li>
<li>Yazılım yavaş çekim, müzik ve marka grafiklerini otomatik ekler.</li>
<li>Video yanındaki ekranda gösterilir ve QR kod ile telefona iner.</li>
</ol>`;

const videoBoothFaq: Faq[] = [
    { q: "360 videolar misafirlere nasıl ulaşır?", a: "Video hazırlandıktan sonra ekrandaki QR kodu okutan katılımcı videoyu telefonuna indirir ve doğrudan sosyal medyada paylaşabilir." },
];

const mirrorIntro = `<h2>Mirror Booth Nedir?</h2>
<p>Mirror booth, boy aynası görünümünde dokunmatik bir ekranın arkasına kamera yerleştirilmiş bir photobooth türüdür. Ayna, katılımcıyı animasyonlar ve sesli komutlarla karşılar, poz vermeye yönlendirir, çekimden sonra fotoğrafın üzerine doğrudan ayna üzerinden imza ya da not ekletir. Fotoğraf saniyeler içinde basılır ve QR kod ile telefona iner. Klasik <a href="${PB}/photobooth-kirala">photobooth kiralama</a> seçeneğine göre daha gösterişli bir sahne yaratır; gala, lansman ve kurumsal davetlerde öne çıkar.</p>`;

const categoryContent = `<p>Bu kategoride misafirin kendi fotoğrafını çektiği, sonucu saniyeler içinde basılı ya da dijital olarak aldığı aktivasyonlar yer alıyor. En çok kiralanan seçenek kompakt <a href="${PB}/photobooth-kirala">photobooth (fotoğraf kabini)</a>; içine girilen kapalı bir kabin isteyenler için <a href="${PB}/cabin-photo">Cabin Photo</a> var. Ayna ekranlı, sesli yönlendirmeli bir deneyim isteyenler için <a href="${PB}/mirror-booth">Mirror Booth kiralama</a> seçeneğimizi inceleyebilirsiniz. Türler arasındaki farkları <a href="/blog/photobooth-nedir">Photobooth nedir?</a> rehberimizde anlattık.</p>`;

const blogFaq: Faq[] = [
    { q: "Photobooth nedir?", a: "Photobooth (fotoğraf kabini), misafirlerin kamera, ekran ve baskı makinesinden oluşan bir kiosk ile kendi fotoğraflarını çektiği ve sonucu saniyeler içinde basılı ve dijital olarak aldığı bir etkinlik aktivasyonudur." },
    { q: "Booth ne demek?", a: "Booth, İngilizcede kabin, bölme veya stant anlamına gelir. Photo booth ise fotoğraf kabini demektir. Fuarlardaki stantlara da booth denir." },
    { q: "Photobooth ile fotoğraf kabini aynı şey mi?", a: "Evet. Fotoğraf kabini photobooth'un Türkçe karşılığıdır. Etkinliklerde kiralanan modern photobooth'lar çoğunlukla kapalı kabin değil, açık bir kiosk şeklindedir." },
    { q: "Photobooth çeşitleri nelerdir?", a: "En yaygın türler klasik photobooth, kapalı kabin (Cabin Photo), mirror booth, 360 video booth, AI photobooth, aura photobooth ve GIF/video booth'tur. Her biri farklı alan ihtiyacına ve etkinlik hedefine uygundur." },
    { q: "Photobooth için ne kadar alan gerekir?", a: "Klasik photobooth için yaklaşık 2 m², 360 video booth için yaklaşık 3 m², mirror booth için yaklaşık 4 m², kapalı Cabin Photo için yaklaşık 5 m² alan ve standart bir 220V priz yeterlidir." },
    { q: "Photobooth'tan çıkan fotoğraflar nasıl teslim edilir?", a: "Fotoğraflar saniyeler içinde markaya özel çerçeveyle basılır ve aynı anda QR kod ile misafirin telefonuna dijital olarak iner." },
];

// ---------------------------------------------------------------- run

async function main() {
    console.log(APPLY ? "APPLY mode: writing to the database\n" : "Dry run: nothing is written (add --apply)\n");
    const host = databaseUrl.replace(/^.*@/, "").replace(/\/.*$/, "");
    console.log(`Database host: ${host}\n`);

    const writes: (() => Promise<unknown>)[] = [];
    const queue = (label: string, row: { id: string }, current: unknown, next: Record<string, unknown>, update: (id: string, data: Record<string, unknown>) => Promise<unknown>) => {
        const data = diff(label, current as Record<string, unknown>, next);
        if (Object.keys(data).length) writes.push(() => update(row.id, data));
    };
    const updateService = (id: string, data: Record<string, unknown>) => prisma.service.update({ where: { id }, data });
    const updateSector = (id: string, data: Record<string, unknown>) => prisma.sectorPage.update({ where: { id }, data });

    // N-01 first: the pages below link to it.
    {
        const slug = "photobooth-nedir";
        const ids = await prisma.service.findMany({
            where: {
                published: true,
                OR: [
                    { slug: "photobooth-kirala", category: { slug: "photobooth-ve-fotograf-aktivasyonlari" } },
                    { slug: "mirror-booth", category: { slug: "photobooth-ve-fotograf-aktivasyonlari" } },
                    { slug: "360-video-booth", category: { slug: "video" } },
                    { slug: "ai-photobooth-kirala", category: { slug: "yapay-zeka-etkinlik-cozumleri" } },
                ],
            },
            select: { id: true },
            orderBy: { id: "asc" },
        });
        if (ids.length !== 4) throw new Error(`Expected 4 linked services, found ${ids.length}`);
        const next = {
            title: "Photobooth Nedir? Çeşitleri, Nasıl Çalışır ve Etkinlikte Nasıl Kullanılır?",
            metaTitle: "Photobooth Nedir? Booth Ne Demek? Türleri ve Kullanımı",
            metaDescription: "Photobooth (fotoğraf kabini), misafirlerin kendi fotoğrafını çekip anında baskı aldığı kiosktur. Booth ne demek, türleri neler, etkinlikte nasıl kullanılır?",
            excerpt: "Photobooth, Türkçesiyle fotoğraf kabini; misafirlerin kendi fotoğrafını çekip saniyeler içinde baskı ve dijital kopya aldığı bir etkinlik kioskudur. Booth kelimesinin anlamını, photobooth türlerini, nasıl çalıştığını ve etkinliğe göre doğru seçimi anlatıyoruz.",
            content: read("photobooth-nedir-tr.html"),
            author: "Selami Güler",
            category: "Etkinlik Teknolojileri",
            metaKeywords: "photobooth nedir, photo booth nedir, booth ne demek, fotoğraf kabini, photobooth kiralama, photobooth çeşitleri",
            serviceIds: JSON.stringify(ids.map((row) => row.id)),
            faq: JSON.stringify(blogFaq),
            published: true,
        };
        checkLengths("blog", next.metaTitle, next.metaDescription);
        const post = await prisma.blogPost.findUnique({ where: { slug } });
        if (post) {
            const { faq, ...rest } = next;
            queue(`blog/${slug}`, post, post, { ...rest, faq: mergeFaq(post.faq, blogFaq) }, (id, data) => prisma.blogPost.update({ where: { id }, data }));
        } else {
            show(`blog/${slug}`, "(new post)", null, next.title);
            changes++;
            writes.push(() => prisma.blogPost.create({ data: { slug, ...next, publishedAt: new Date() } }));
        }
    }

    // P-01 + E-01 gift wheel
    {
        const row = await service("interaktif-etkinlik-aktiviteleri", "dijital-hediye-carki-aktivasyonu");
        const next = {
            title: "Hediye Çarkı Kiralama",
            metaTitle: "Hediye Çarkı Kiralama | Dijital Çarkıfelek — MetasoftCo",
            metaDescription: "Etkinlik ve fuarlar için hediye çarkı kiralama: dokunmatik ekranlı dijital çarkıfelek, markalı tasarım, isteğe bağlı form ile lead toplama. Kurulum dahil.",
            description: "Ziyaretçiler dokunmatik ekrandaki dijital çarkı çevirir, kazandığı hediye saniyeler içinde ekranda belirir. Fuar standında, mağaza açılışında ve lansmanda hem kuyruk oluşturan hem de katılımcı verisi toplayan bir oyun.",
            metaKeywords: "hediye çarkı kiralama, hediye çarkı, dijital çarkıfelek, çark sistemi, fuar hediye çarkı, etkinlik çarkıfelek",
            content: read("hediye-carki-tr.html"),
            faq: mergeFaq(row.faq, wheelFaq, true),
            metaTitle_en: "Prize Wheel Rental for Events | Digital Spin Wheel",
            metaDescription_en: "Rent a digital prize wheel for events and trade shows: touchscreen spin-to-win game, branded design and optional lead-capture form. Setup and staff included.",
        };
        checkLengths("wheel", next.metaTitle, next.metaDescription);
        checkLengths("wheel EN", next.metaTitle_en, next.metaDescription_en);
        queue(`service/${row.slug}`, row, row, next, updateService);
    }

    // P-02 photobooth
    {
        const row = await service("photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala");
        let content = prepend(row.content, photoboothIntro);
        content = content.replace(/<h3><strong>Kiralamaya Dahil Olanlar<\/strong><\/h3>\s*<ul>[\s\S]*?<\/ul>/, photoboothScope);
        if (!content.includes("Photobooth Kiralama Neleri Kapsar?")) throw new Error("photobooth: inclusions block not found");
        if (!content.includes("Hangi Photobooth Türü Size Uygun?")) content = `${content.trimEnd()}\n${photoboothTypes}`;
        const next = {
            metaTitle: "Photobooth Kiralama | Fotoğraf Kabini Kiralama — MetasoftCo",
            metaDescription: "Etkinlik için photobooth (fotoğraf kabini) kiralama: fotoğraf, GIF, Boomerang, anında baskı ve QR paylaşım. 2 m² alan yeterli; kurulum ve personel dahil.",
            description: "Photobooth, yani fotoğraf kabini; misafirlerin kendi fotoğraflarını çekip saniyeler içinde baskı aldığı kompakt bir kiosk. Fotoğraf, GIF ve Boomerang modları, sihirli arka plan ve markaya özel çerçeveyle kurumsal etkinlik, lansman ve fuarlarda.",
            content,
            faq: mergeFaq(row.faq, photoboothFaq, true),
        };
        checkLengths("photobooth", next.metaTitle, next.metaDescription);
        queue(`service/${row.slug}`, row, row, next, updateService);
    }

    // P-05 360 Video Booth
    {
        const row = await service("video", "360-video-booth");
        const next = {
            metaTitle: "360 Video Booth Kiralama | 360 Derece Video Platformu",
            metaDescription: "360 video booth kiralama: dönen kamerayla yavaş çekim 360 derece video, markalı grafikler, QR ile anında paylaşım. 3 m² alan; kurulum ve personel dahil.",
            content: prepend(row.content, videoBoothIntro),
            faq: mergeFaq(row.faq, videoBoothFaq),
        };
        checkLengths("360", next.metaTitle, next.metaDescription);
        queue(`service/${row.slug}`, row, row, next, updateService);
    }

    // P-06 Mirror Booth
    {
        const row = await service("photobooth-ve-fotograf-aktivasyonlari", "mirror-booth");
        const next = {
            metaDescription: "Mirror booth kiralama: dokunmatik ayna ekran, sesli yönlendirme, ayna üzerine imza, anında baskı ve QR paylaşım. 4 m² alan; kurulum ve personel dahil.",
            content: prepend(row.content, mirrorIntro),
        };
        checkLengths("mirror", row.metaTitle, next.metaDescription);
        queue(`service/${row.slug}`, row, row, next, updateService);
    }

    // T-01 aura: the definition section moves to the top under the exact
    // "nedir" heading; the hand-written SSS block in the body moves into the FAQ.
    {
        const row = await service("photobooth-ve-fotograf-aktivasyonlari", "aura-photobooth-kiralama");
        let content = row.content ?? "";
        const section = content.match(/<h2>Aura Fotoğrafçılığı Nedir, Nasıl Çalışır\?<\/h2>[\s\S]*?(?=<h2>)/);
        if (section) {
            content = section[0].replace("Nedir, Nasıl Çalışır?", "Nedir?") + content.replace(section[0], "");
        }
        const inlineFaq: Faq[] = [];
        const sss = content.match(/<h2>Sıkça(?:&nbsp;|\s)Sorulan(?:&nbsp;|\s)Sorular[\s\S]*$/);
        if (sss) {
            for (const [, q, a] of sss[0].matchAll(/<p><strong>(.*?)<\/strong>(?:&nbsp;|\s)*(.*?)<\/p>/g)) {
                const clean = (text: string) => text.replace(/&nbsp;/g, " ").replace(/<[^>]+>/g, "").trim();
                inlineFaq.push({ q: clean(q), a: clean(a) });
            }
            content = content.replace(sss[0], "").trimEnd();
        }
        if (!content.startsWith("<h2>Aura Fotoğrafçılığı Nedir?</h2>")) throw new Error("aura: definition section not at the top");
        const next = { content, faq: mergeFaq(row.faq, inlineFaq) };
        queue(`service/${row.slug}`, row, row, next, updateService);
    }

    // T-02 photobooth category: a short "about" block linking the booth types
    {
        const category = await prisma.serviceCategory.findUnique({ where: { slug: "photobooth-ve-fotograf-aktivasyonlari" } });
        if (!category) throw new Error("Photobooth category not found");
        if (category.content && !category.content.includes("Mirror Booth kiralama")) throw new Error("Category already has content; merge by hand");
        queue(`category/${category.slug}`, category, category, { content: categoryContent }, (id, data) => prisma.serviceCategory.update({ where: { id }, data }));
    }

    // P-03 İstanbul
    {
        const row = await prisma.sectorPage.findUnique({ where: { slug: "istanbul-ai-photobooth" } });
        if (!row) throw new Error("İstanbul page not found");
        const content = (row.content ?? "")
            .replace("<h2>İstanbul'da Kiralayabileceğiniz Aktiviteler</h2>", "<h2>İstanbul'da Kiralayabileceğiniz Photobooth Türleri ve Aktiviteler</h2>")
            .replace(`<a href="${PB}/photobooth-kirala">Photobooth</a>`, `<a href="${PB}/photobooth-kirala">Klasik photobooth (fotoğraf kabini)</a>`);
        const next = {
            title: "İstanbul Photobooth Kiralama",
            h1: "İstanbul Photobooth Kiralama: AI, Klasik ve 360 Booth",
            metaTitle: "Photobooth İstanbul | AI ve Klasik Photobooth — MetasoftCo",
            metaDescription: "İstanbul'da photobooth kiralama: AI, klasik, mirror ve 360 booth. Maslak, Levent, Ataşehir, Kadıköy ve tüm ilçelerde kurulum, markalı tasarım ve saha ekibi.",
            excerpt: "İstanbul Teknokent'teki ekibimizle şehrin her iki yakasında kurumsal etkinlik, lansman, fuar ve AVM aktivasyonları için AI photobooth, klasik photobooth, mirror booth ve 360 video booth kuruyoruz.",
            content,
        };
        checkLengths("istanbul", next.metaTitle, next.metaDescription);
        queue(`sector/${row.slug}`, row, row, next, updateSector);
    }

    // P-04 İzmir
    {
        const row = await prisma.sectorPage.findUnique({ where: { slug: "izmir-photobooth-kiralama" } });
        if (!row) throw new Error("İzmir page not found");
        const next = {
            metaTitle: "Photo Booth İzmir | Photobooth Kiralama — MetasoftCo",
            metaDescription: "İzmir'de photo booth kiralama: AI photobooth, klasik fotoğraf kabini ve 360 video booth. Kurumsal etkinlik ve fuarlar için kurulum ve saha ekibi dahil.",
        };
        checkLengths("izmir", next.metaTitle, next.metaDescription);
        queue(`sector/${row.slug}`, row, row, next, updateSector);
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
