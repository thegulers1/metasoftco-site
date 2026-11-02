/**
 * aura-page-2026-11.ts
 *
 * Aura service page rework: "aura photo booth kiralama" becomes the page's
 * target, the hype ("real energy", "electromagnetic", "mystical", "zero
 * latency") goes, and the "aura fotoğrafçılığı nedir" query moves to a new
 * blog post that links back. Also fills the English FAQ, which was falling back
 * to Turkish, and adds internal links with the target anchor.
 *
 *   pnpm tsx scripts/aura-page-2026-11.ts          # dry run: prints every change
 *   pnpm tsx scripts/aura-page-2026-11.ts --apply  # writes them
 *
 * Idempotent. Refuses to run against the old Supabase database.
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

function checkLengths(label: string, title?: string | null, description?: string | null) {
    if (title && title.length > 60) console.warn(`  ! ${label}: title ${title.length} chars`);
    if (description && (description.length < 120 || description.length > 160)) {
        console.warn(`  ! ${label}: description ${description.length} chars`);
    }
}

/** Replaces `from` with `to`, unless `to` is already there; a missing `from` is an error. */
function swap(content: string | null, from: string, to: string, label: string): string {
    const text = content ?? "";
    if (text.includes(to)) return text;
    if (!text.includes(from)) throw new Error(`${label}: anchor text not found`);
    return text.replace(from, to);
}

// ---------------------------------------------------------------- content

const PB = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";
const AURA = `${PB}/aura-photobooth-kiralama`;
const BLOG_SLUG = "aura-fotografciligi-nedir";

const contentTr = `<h2>Aura Photo Booth Nasıl Çalışır?</h2>
<p><strong>Filtre değil, sensör: renkler ellerinizdeki ölçümden gelir.</strong> Bu yüzden her misafir kendine özel bir sonuç alır, aynı kişi bile farklı anlarda farklı tonlarda bir fotoğraf çıkarabilir.</p>
<ol>
<li>Misafir kabine geçer ve ellerini biofeedback sensör kutularının üzerine koyar.</li>
<li>Yazılımımız sensörlerden gelen anlık veriyi bir renk paletine çevirir.</li>
<li>Renkler portrenin çevresine işlenir; yapay zekâ ya da yüz filtresi kullanılmaz.</li>
<li>Fotoğraf markaya özel çerçeveyle saniyeler içinde basılır, QR kod ile telefona da iner.</li>
</ol>

<h2>Aura Photo Booth Kiralama Kapsamı</h2>
<ul>
<li>Aura kabini, biofeedback sensör kutuları, kamera ve baskı makinesi</li>
<li>Pakete dahil 750 baskı ve QR ile dijital paylaşım</li>
<li>Markaya özel çerçeve, ekran arayüzü ve kabin giydirmesi</li>
<li>İsteğe göre markanıza ve temaya uygun renk yorum kartları</li>
<li>Nakliye, kurulum, söküm ve etkinlik boyunca en az iki teknik personel</li>
</ul>
<p>Mekândan yalnızca tek bir 220V priz bekliyoruz; internet kendi 5G altyapımızla gelir.</p>

<h2>Aura Photobooth Hangi Etkinliklere Uygun?</h2>
<p>Her katılımcıya kişisel bir sonuç verdiği için misafirler birbirlerinin renklerini merak eder ve kabinin önünde kendiliğinden sohbet başlar. Güzellik, wellness ve moda markalarının etkinliklerinde, lansmanlarda, festivallerde ve fuarlarda öne çıkar. <strong>LilyRose × DeFacto</strong> etkinliğinde bu aktiviteyi markaya özel çerçeveyle kurduk ve 150 baskı yaptık; kareleri aşağıdaki galeride görebilirsiniz.</p>

<h2>Aura Photo Booth Fiyatları Nasıl Belirlenir?</h2>
<p>Fiyatı etkinlik süresi, gün sayısı, şehir, baskı adedi ve markaya özel tasarım kapsamı belirler. Kurulum, söküm ve saha ekibi fiyata dahildir. Etkinliğinizin tarihini ve şehrini paylaşırsanız <a href="/iletisim">net bir teklif</a> hazırlarız. Etkenlerin ayrıntısını <a href="/blog/photobooth-kiralama-fiyati-neye-gore-belirlenir">Photobooth kiralama fiyatı neye göre belirlenir?</a> yazımızda anlattık.</p>

<h2>Aura Fotoğrafçılığı Nedir?</h2>
<p>Aura fotoğrafçılığı, kişinin portresini sensör ölçümlerinden oluşan renkli bir ışık alanıyla birlikte gösteren fotoğraf türüdür. Renklerin anlamları bilimsel bir ölçüm değil, bu geleneğin eğlenceli yorumlarıdır. Nasıl çalıştığını ve renklerin geleneksel anlamlarını <a href="/blog/${BLOG_SLUG}">Aura fotoğrafçılığı nedir?</a> rehberimizde anlattık.</p>
<p>Başka türlerle karşılaştırmak isterseniz <a href="${PB}/photobooth-kirala">photobooth kiralama</a> ve <a href="${PB}/mirror-booth">Mirror Booth kiralama</a> sayfalarımıza bakabilirsiniz.</p>`;

const contentEn = `<h2>How Does the Aura Photo Booth Work?</h2>
<p><strong>A sensor, not a filter: the colours come from the reading on your hands.</strong> That is why every guest gets a personal result, and the same person can come out in different tones at different moments.</p>
<ol>
<li>The guest steps into the booth and rests their hands on the biofeedback sensor boxes.</li>
<li>Our software turns the live sensor data into a colour palette.</li>
<li>The colours are drawn around the portrait; no AI or face filters are used.</li>
<li>The photo is printed in a branded frame within seconds and also reaches the guest's phone via QR code.</li>
</ol>

<h2>What the Aura Photo Booth Rental Includes</h2>
<ul>
<li>Aura booth, biofeedback sensor boxes, camera and printer</li>
<li>750 prints in the package, plus digital sharing via QR</li>
<li>Branded frame, screen interface and booth wrap</li>
<li>Optional colour interpretation cards for your brand and theme</li>
<li>Transport, setup, teardown and at least two technicians throughout the event</li>
</ul>
<p>All we need from the venue is a single 220V socket; internet comes over our own 5G connection.</p>

<h2>Which Events Suit an Aura Photo Booth?</h2>
<p>Because every guest gets a personal result, people get curious about each other's colours and conversations start on their own in front of the booth. It works especially well for beauty, wellness and fashion brands, and at launches, festivals and trade shows. We ran it at a <strong>LilyRose × DeFacto</strong> event with a branded frame and produced 150 prints; the gallery below shows photos from it.</p>

<h2>How Is Aura Photo Booth Pricing Determined?</h2>
<p>Pricing depends on event duration, number of days, city, print volume and the scope of branded design. Setup, teardown and on-site crew are included. Share your event date and city and we will <a href="/en/contact">send you a clear quote</a>.</p>

<h2>What Is Aura Photography?</h2>
<p>Aura photography is a type of portrait that shows a person surrounded by a coloured field of light based on sensor readings. The colour meanings are playful interpretations from this tradition, not a scientific measurement.</p>
<p>To compare other options, see our <a href="/en/services/photobooth-and-photo-activations/photobooth-rental">photo booth rental</a> and <a href="/en/services/photobooth-and-photo-activations/mirror-booth">mirror booth rental</a> pages.</p>`;

const faqTr: Faq[] = [
    { q: "Aura photo booth nedir?", a: "Aura photo booth, misafirin ellerini biofeedback sensörlerine koyduğu ve sensör ölçümünden oluşan renklerin portresinin çevresine işlendiği bir fotoğraf aktivasyonudur. Fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner." },
    { q: "Aura fotoğrafçılığı nedir?", a: "Aura fotoğrafçılığı, kişinin portresini çevresinde beliren renkli bir ışık alanıyla birlikte gösteren fotoğraf türüdür. Renkler, kişinin ellerini koyduğu sensörlerden alınan anlık ölçümlere göre oluşur; bu yüzden her çekimde farklı bir sonuç çıkar." },
    { q: "Aura fotoğrafındaki renkler bilimsel mi?", a: "Hayır. Sensörler gerçek zamanlı veri okur, ancak renklerin anlamları aura fotoğrafçılığı geleneğinden gelen eğlenceli yorumlardır ve tıbbi ya da bilimsel bir değerlendirme değildir. Aura photo booth'u etkinliklerde sohbet başlatan bir deneyim olarak sunuyoruz." },
    { q: "Aura photo booth'ta yapay zeka kullanılıyor mu?", a: "Hayır. Yapay zekâ ya da yüz filtresi kullanılmaz; renkler biofeedback sensörlerinden gelen anlık veriyle oluşur." },
];

const faqEn: Faq[] = [
    { q: "What is an aura photo booth?", a: "An aura photo booth is a photo activation where guests rest their hands on biofeedback sensors and colours based on the reading are drawn around their portrait. The photo is printed within seconds and also reaches their phone via QR code." },
    { q: "What is aura photography?", a: "Aura photography is a type of portrait that shows a person surrounded by a coloured field of light. The colours come from live readings of sensors the person rests their hands on, so every shot comes out differently." },
    { q: "Are the colours in an aura photo scientific?", a: "No. The sensors read live data, but the colour meanings are playful interpretations from the aura photography tradition, not a medical or scientific assessment. We present the aura photo booth as an experience that starts conversations at events." },
    { q: "Does the aura photo booth use AI?", a: "No. No AI or face filters are used; the colours are based on live data from the biofeedback sensors." },
];

const blogFaq: Faq[] = [
    { q: "Aura fotoğrafçılığı nedir?", a: "Aura fotoğrafçılığı, kişinin portresini çevresinde beliren renkli bir ışık alanıyla birlikte gösteren fotoğraf türüdür. Renkler, kişinin ellerini koyduğu sensörlerden alınan anlık ölçümlere göre oluşur." },
    { q: "Aura fotoğrafı nasıl çekilir?", a: "Kişi ellerini sensörlerin üzerine koyar, yazılım ölçümleri renge çevirir, kamera portreyi çeker ve renkler kişinin çevresine yerleştirilir." },
    { q: "Aura fotoğrafındaki renkler ne anlama gelir?", a: "Gelenekte kırmızı enerjiyle, turuncu yaratıcılıkla, sarı neşeyle, yeşil dengeyle, mavi sakinlikle, mor ise sezgiyle eşleştirilir. Bu anlamlar eğlence amaçlı yorumlardır." },
    { q: "Aura fotoğrafı bilimsel mi?", a: "Hayır. Sensörler fizyolojik bir ölçüm yapabilir, ancak bunun bir aura ya da ruh hâli gösterdiğine dair bilimsel kanıt yoktur. Tıbbi ya da psikolojik bir değerlendirme yerine geçmez." },
    { q: "Aura fotoğrafı her seferinde aynı mı çıkar?", a: "Hayır. Ölçümler o anki duruma göre değiştiği için aynı kişi farklı zamanlarda farklı tonlarda bir fotoğraf alabilir." },
];

const galleryAlts = [
    "LilyRose × DeFacto etkinliğinde pembe ve mavi tonlarda aura fotoğrafı, aura photo booth",
    "Pembe ve mor aura renkleriyle çekilmiş portre, markaya özel LilyRose × DeFacto çerçevesi",
    "Mavi ve mor tonlarda aura fotoğrafı, LilyRose × DeFacto etkinliği",
    "Kırmızı, turuncu ve yeşil tonlarda aura fotoğrafı, aura photobooth kiralama",
    "Sarı, turuncu ve pembe tonlarda aura fotoğrafı, LilyRose × DeFacto çerçevesi",
    "Mor ve mavi tonlarda aura portresi, etkinlik aura photo booth çıktısı",
];

// ---------------------------------------------------------------- run

async function main() {
    console.log(APPLY ? "APPLY mode: writing to the database\n" : "Dry run: nothing is written (add --apply)\n");
    const host = databaseUrl.replace(/^.*@/, "").replace(/\/.*$/, "");
    console.log(`Database host: ${host}\n`);

    const writes: (() => Promise<unknown>)[] = [];

    const category = await prisma.serviceCategory.findUnique({ where: { slug: "photobooth-ve-fotograf-aktivasyonlari" } });
    if (!category) throw new Error("Photobooth category not found");
    const aura = await prisma.service.findFirst({ where: { slug: "aura-photobooth-kiralama", categoryId: category.id } });
    if (!aura) throw new Error("Aura service not found");

    // Blog first: the service page links to it.
    {
        const next = {
            title: "Aura Fotoğrafçılığı Nedir? Nasıl Çalışır, Renkler Ne Anlama Gelir?",
            metaTitle: "Aura Fotoğrafçılığı Nedir? Nasıl Çalışır, Renkler Ne Demek?",
            metaDescription: "Aura fotoğrafçılığı, sensör ölçümlerini portrenin çevresinde renklere çeviren fotoğraf türüdür. Nasıl çalışır, renkler ne anlama gelir, bilimsel mi?",
            excerpt: "Aura fotoğrafçılığı, kişinin portresini sensör ölçümlerinden oluşan renkli bir ışık alanıyla gösterir. Nasıl çalıştığını, renklerin geleneksel anlamlarını ve bilimsel olup olmadığını anlatıyoruz.",
            content: read("aura-fotografciligi-nedir-tr.html"),
            author: "Selami Güler",
            category: "Etkinlik Teknolojileri",
            metaKeywords: "aura fotoğrafçılığı, aura fotoğrafçılığı nedir, aura fotoğrafı, aura renkleri, aura photo booth",
            serviceIds: JSON.stringify([aura.id]),
            faq: JSON.stringify(blogFaq),
            published: true,
        };
        checkLengths("blog", next.metaTitle, next.metaDescription);
        const post = await prisma.blogPost.findUnique({ where: { slug: BLOG_SLUG } });
        if (post) {
            const data = diff(`blog/${BLOG_SLUG}`, post as unknown as Record<string, unknown>, next);
            if (Object.keys(data).length) writes.push(() => prisma.blogPost.update({ where: { id: post.id }, data }));
        } else {
            show(`blog/${BLOG_SLUG}`, "(new post)", null, next.title);
            changes++;
            writes.push(() => prisma.blogPost.create({ data: { slug: BLOG_SLUG, ...next, publishedAt: new Date() } }));
        }
    }

    // The service page
    {
        const gallery: { url: string; alt?: string }[] = JSON.parse(aura.gallery ?? "[]");
        if (gallery.length !== galleryAlts.length) throw new Error(`Expected ${galleryAlts.length} gallery images, found ${gallery.length}`);
        const next = {
            title: "Aura Photo Booth Kiralama",
            metaTitle: "Aura Photo Booth Kiralama | Sensörlü Aura Fotoğraf Kabini",
            metaDescription: "Aura photo booth kiralama: biofeedback sensörlü aura kabini, 750 baskı dahil, anahtar teslim kurulum, Türkiye geneli hizmet. Filtre değil, sensör ölçümü.",
            metaKeywords: "aura photo booth kiralama, aura photobooth kiralama, aura fotoğraf kabini, aura kabini, sensörlü aura fotoğrafı",
            description: "Filtre değil, sensör: Aura Photo Booth'ta renkler misafirin ellerindeki ölçümden gelir. Aura photobooth kiralama paketimiz kabin, 750 baskı, markalı tasarım, kurulum ve saha ekibini kapsar.",
            content: contentTr,
            faq: JSON.stringify(faqTr),
            gallery: JSON.stringify(gallery.map((item, index) => ({ url: item.url, alt: galleryAlts[index] }))),
            title_en: "Aura Photo Booth Rental",
            metaTitle_en: "Aura Photo Booth Rental | Sensor-Based Aura Photography",
            metaDescription_en: "Aura photo booth rental: biofeedback sensors turn each guest's reading into a colour aura portrait. 750 prints, turnkey setup, available across Türkiye.",
            metaKeywords_en: "aura photo booth rental, aura photobooth rental, aura photography booth, aura booth for events",
            description_en: "A sensor, not a filter: in the Aura Photo Booth the colours come from the reading on each guest's hands. Our rental covers the booth, 750 prints, branded design, setup and on-site crew.",
            content_en: contentEn,
            faq_en: JSON.stringify(faqEn),
        };
        checkLengths("aura", next.metaTitle, next.metaDescription);
        checkLengths("aura EN", next.metaTitle_en, next.metaDescription_en);
        const data = diff(`service/${aura.slug}`, aura as unknown as Record<string, unknown>, next);
        if (Object.keys(data).length) writes.push(() => prisma.service.update({ where: { id: aura.id }, data }));
    }

    // Internal links with the target anchor
    {
        const anchor = `<a href="${AURA}">aura photo booth kiralama</a>`;
        const content = swap(
            category.content,
            " Türler arasındaki farkları",
            ` Renkleri sensör ölçümünden gelen kişiye özel bir portre için ${anchor} seçeneğimiz var. Türler arasındaki farkları`,
            "category",
        );
        const data = diff(`category/${category.slug}`, category as unknown as Record<string, unknown>, { content });
        if (Object.keys(data).length) writes.push(() => prisma.serviceCategory.update({ where: { id: category.id }, data }));

        const photobooth = await prisma.service.findFirst({ where: { slug: "photobooth-kirala", categoryId: category.id } });
        if (!photobooth) throw new Error("Photobooth service not found");
        const photoboothContent = swap(
            photobooth.content,
            '">AI Photobooth</a> seçeneklerimiz var.',
            `">AI Photobooth</a>, renkleri sensör ölçümünden gelen bir portre için ${anchor} seçeneklerimiz var.`,
            "photobooth",
        );
        const photoboothData = diff(`service/${photobooth.slug}`, photobooth as unknown as Record<string, unknown>, { content: photoboothContent });
        if (Object.keys(photoboothData).length) writes.push(() => prisma.service.update({ where: { id: photobooth.id }, data: photoboothData }));

        const guide = await prisma.blogPost.findUnique({ where: { slug: "photobooth-nedir" } });
        if (!guide) throw new Error("Photobooth guide not found");
        const guideData = diff("blog/photobooth-nedir", guide as unknown as Record<string, unknown>, { content: read("photobooth-nedir-tr.html") });
        if (Object.keys(guideData).length) writes.push(() => prisma.blogPost.update({ where: { id: guide.id }, data: guideData }));
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
