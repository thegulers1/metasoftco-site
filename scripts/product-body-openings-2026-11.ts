/** 19 Kasım 2026 — ürün sayfası gövdesi: ilk blok slogan yerine "<Ürün> nedir?" başlığı ve jenerik tanımla açılır.
 * Yalnızca sayfada zaten yazan bilgiler kullanılır; geri kalan metin, slug ve yayın durumu değişmez.
 * Momento Ball (zaten tanımla açılıyor) ve Quiz (gövdesi boş) dahil değil.
 *
 * Önizleme:   pnpm exec tsx scripts/product-body-openings-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/product-body-openings-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/product-body-openings-2026-11.ts --rollback /mutlak/yol/backup.json
 * Alanlar arada değişmişse yazmaz, durur.
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

type Table = "service" | "sectorPage";
type Values = Record<string, string | null>;
/** A field is either replaced whole or has exact substrings swapped. */
type Change = string | { replace: [string, string][] };
type Patch = { table: Table; slug: string; categorySlug?: string; fields: Record<string, Change> };

const svc = (slug: string, categorySlug: string, tr: [string, string], en: [string, string]): Patch => ({
    table: "service",
    slug,
    categorySlug,
    fields: { content: { replace: [tr] }, content_en: { replace: [en] } },
});

const patches: Patch[] = [
    svc("ai-bookmark", "yapay-zeka-etkinlik-cozumleri",
        ["<p><strong>Okuma&nbsp;Deneyiminizi&nbsp;Yeniden&nbsp;Tasarlayın</strong></p>",
            "<h2>AI Bookmark nedir?</h2><p>AI Bookmark, yapay zekâ ile kişiye özel kitap ayracı hazırlayan bir etkinlik aktivitesidir. Katılımcı kısa bir metin yazar ya da ekrana basit bir çizim yapar; yapay zekâ bunu özgün bir görsele dönüştürür ve görsel kitap ayracı olarak basılır. Ayraç tasarımına marka logosu ya da kampanya sloganı eklenir, görsel QR kod ile telefona da iner.</p>"],
        ["<p><strong>Redesign&nbsp;Your&nbsp;Reading&nbsp;Experience</strong></p>",
            "<h2>What is AI Bookmark?</h2><p>AI Bookmark is an event activity that creates a personalised bookmark with AI. A guest writes a short text or draws a simple sketch on screen; AI turns it into an original image, which is printed as a bookmark. Your logo or campaign line goes on the design, and the image is also sent to the guest's phone via QR code.</p>"]),
    svc("charge-bike", "interaktif-etkinlik-aktiviteleri",
        ["<h3><strong>Charge&nbsp;Bike:&nbsp;Pedal&nbsp;Çevir,&nbsp;Geleceği&nbsp;Şarj&nbsp;Et!</strong></h3>",
            "<h2>Charge Bike nedir?</h2><p>Charge Bike, pedallı bir telefon şarj istasyonudur: katılımcılar bisiklet pedalı çevirerek hem telefonlarını şarj eder hem de ekrandaki bir yarışa güç verir. Pedal hızı ekrandaki karakterin hızını belirler; yarışlar bireysel ya da grup hâlinde yapılır ve oyun arayüzü markanıza göre tasarlanır.</p>"],
        ["<h3><strong>Charge&nbsp;Bike:&nbsp;Pedal&nbsp;for&nbsp;Power,&nbsp;Charge&nbsp;the&nbsp;Future!</strong></h3>",
            "<h2>What is Charge Bike?</h2><p>Charge Bike is a pedal-powered phone charging station: guests pedal a bike to charge their phones and to power a race on screen. Pedalling speed sets the on-screen character's speed; races can be solo or in groups, and the game interface is designed for your brand.</p>"]),
    svc("catch-collect-game", "interaktif-etkinlik-aktiviteleri",
        ["<h1>Catch&nbsp;&amp;&nbsp;Collect:&nbsp;Telefonla&nbsp;Kontrol&nbsp;Edilen&nbsp;Dijital&nbsp;Ürün&nbsp;Toplama&nbsp;Oyunu</h1><p><strong>Telefonunu&nbsp;oyun&nbsp;kumandasına&nbsp;dönüştür,&nbsp;markanın&nbsp;ürünlerini&nbsp;sepette&nbsp;topla&nbsp;ve&nbsp;en&nbsp;yüksek&nbsp;puana&nbsp;ulaş!</strong></p>",
            "<h2>Catch &amp; Collect nedir?</h2>"],
        ["<h1>Catch&nbsp;&amp;&nbsp;Collect:&nbsp;A&nbsp;Digital&nbsp;Product&nbsp;Collection&nbsp;Game&nbsp;Controlled&nbsp;by&nbsp;Phone</h1><p><strong>Transform&nbsp;your&nbsp;phone&nbsp;into&nbsp;a&nbsp;game&nbsp;controller,&nbsp;collect&nbsp;the&nbsp;brand&#39;s&nbsp;products&nbsp;in&nbsp;the&nbsp;basket,&nbsp;and&nbsp;reach&nbsp;the&nbsp;highest&nbsp;score!</strong></p>",
            "<h2>What is Catch &amp; Collect?</h2>"]),
    svc("star-map", "interaktif-etkinlik-aktiviteleri",
        ["<p><strong>AI&nbsp;Star&nbsp;Map:&nbsp;Yıldızların&nbsp;Rehberliğinde&nbsp;Kendi&nbsp;Hikâyeni&nbsp;Keşfet!</strong></p>",
            "<h2>Star Map nedir?</h2><p>Star Map, kişiye özel yıldız haritası hazırlayan bir etkinlik aktivitesidir. Katılımcıdan alınan birkaç bilgiyle gökyüzü haritası saniyeler içinde oluşturulur ve yapay zekâ ile yorumlanır. Harita markalı bir şablonla basılıp hediye edilir; alttaki QR kod ile katılımcı kendine özel yorum dosyasına telefonundan ulaşır.</p>"],
        ["<p><strong>AI&nbsp;Star&nbsp;Map:&nbsp;Discover&nbsp;Your&nbsp;Story&nbsp;Guided&nbsp;by&nbsp;the&nbsp;Stars!</strong></p>",
            "<h2>What is Star Map?</h2><p>Star Map is an event activity that creates a personalised star map. From a few details the guest gives, a sky map is generated in seconds and interpreted with AI. The map is printed on a branded template as a gift, and a QR code on it opens the guest's own reading on their phone.</p>"]),
    svc("glow-box-photo", "photobooth-ve-fotograf-aktivasyonlari",
        ["<h3><strong>Işıkların&nbsp;Büyüsüyle&nbsp;Tanışın:&nbsp;Glow&nbsp;Box&nbsp;Photo</strong></h3>",
            "<h2>Glow Box Photo nedir?</h2><p>Glow Box Photo, LED ışık efektleriyle çevrili bir alanda profesyonel fotoğraf makinesiyle çekim yapan ışıklı bir fotoğraf kabinidir. Işık senaryosu ve arka plan grafikleri markanızın renklerine göre hazırlanır; fotoğraflar basılır ve QR kod ile telefona iner.</p>"],
        ["<h3><strong>Immerse&nbsp;in&nbsp;Light:&nbsp;Glow&nbsp;Box&nbsp;Photo</strong></h3>",
            "<h2>What is Glow Box Photo?</h2><p>Glow Box Photo is an illuminated photo booth that shoots with a professional camera inside a space framed by LED light effects. The light sequence and background graphics are prepared in your brand colours; photos are printed and sent to the guest's phone via QR code.</p>"]),
    svc("interactive-puzzle", "interaktif-etkinlik-aktiviteleri",
        ["<p><strong>Parçaları&nbsp;Birleştirin,&nbsp;Markanızı&nbsp;Keşfettirin:&nbsp;Interactive&nbsp;Puzzle</strong></p>",
            "<h2>Interactive Puzzle nedir?</h2><p>Interactive Puzzle, katılımcıların ekranda parçaları birleştirerek bir görseli tamamladığı ve süreye karşı yarıştığı dijital bir yapboz oyunudur. Yapboz görseli kampanya ya da lansman görselinizden hazırlanır; en hızlı tamamlayanlar canlı liderlik tablosunda yer alır, istenirse katılımcı formu eklenir.</p>"],
        ["<p><strong>Combine&nbsp;the&nbsp;Pieces,&nbsp;Discover&nbsp;Your&nbsp;Brand:&nbsp;Interactive&nbsp;Puzzle</strong></p>",
            "<h2>What is Interactive Puzzle?</h2><p>Interactive Puzzle is a digital jigsaw game in which guests assemble pieces on screen to complete an image, racing against the clock. The puzzle image is made from your campaign or launch visual; the fastest players appear on a live leaderboard, and a sign-up form can be added.</p>"]),
    svc("ai-style", "yapay-zeka-etkinlik-cozumleri",
        ["<h3><strong>Tarzınızı Yapay Zeka ile Yeniden Yorumlayın: AI Style</strong></h3>", "<h2>AI Style nedir?</h2>"],
        ["<h3><strong>Reinterpret Your Style with AI: AI Style</strong></h3>", "<h2>What is AI Style?</h2>"]),
    svc("wordportre-kirala", "photobooth-ve-fotograf-aktivasyonlari",
        ["<p><strong>Kelimelerin&nbsp;Gücüyle&nbsp;Kendi&nbsp;Sanat&nbsp;Eserinizi&nbsp;Yaratın!</strong>&nbsp;", "<h2>Wordportre nedir?</h2><p>"],
        ["<p><strong>Create&nbsp;Your&nbsp;Own&nbsp;Artwork&nbsp;with&nbsp;the&nbsp;Power&nbsp;of&nbsp;Words!</strong>&nbsp;", "<h2>What is Wordportre?</h2><p>"]),
];

const args = process.argv.slice(2);
type Planned = { table: Table; id: string; slug: string; before: Values; after: Values };

type Client = Pick<typeof prisma, "service" | "sectorPage">;
function model(table: Table, client: Client = prisma) {
    return (table === "service" ? client.service : client.sectorPage) as unknown as {
        findFirst(args: unknown): Promise<Record<string, unknown> | null>;
        findUniqueOrThrow(args: unknown): Promise<Record<string, unknown>>;
        update(args: unknown): Promise<unknown>;
    };
}

function apply(current: string | null, change: Change, slug: string, field: string) {
    if (typeof change === "string") return change;
    let next = current ?? "";
    for (const [from, to] of change.replace) {
        if (!next.includes(from) && next.includes(to)) continue; // already applied
        if (!next.includes(from)) throw new Error(`${slug}.${field}: "${from}" bulunamadı.`);
        next = next.split(from).join(to);
    }
    return next;
}

async function plan(): Promise<Planned[]> {
    const out: Planned[] = [];
    for (const patch of patches) {
        const where = patch.table === "service" ? { slug: patch.slug, category: { slug: patch.categorySlug } } : { slug: patch.slug };
        const row = await model(patch.table).findFirst({ where });
        if (!row) throw new Error(`Bulunamadı: ${patch.table} ${patch.slug}`);
        const before: Values = {};
        const after: Values = {};
        for (const [field, change] of Object.entries(patch.fields)) {
            const current = (row[field] as string | null) ?? null;
            const next = apply(current, change, patch.slug, field);
            if (next !== current) {
                before[field] = current;
                after[field] = next;
            }
        }
        if (Object.keys(after).length) out.push({ table: patch.table, id: row.id as string, slug: patch.slug, before, after });
    }
    return out;
}

async function guardedWrite(items: Planned[], from: "before" | "after", to: "before" | "after") {
    await prisma.$transaction(async (tx) => {
        for (const item of items) {
            const fields = Object.keys(item[from]);
            const now = await model(item.table, tx).findUniqueOrThrow({ where: { id: item.id }, select: Object.fromEntries(fields.map((f) => [f, true])) });
            for (const f of fields) {
                if ((now[f] ?? null) !== item[from][f]) throw new Error(`${item.slug}.${f}: arada değişmiş, yazma durdu.`);
            }
            await model(item.table, tx).update({ where: { id: item.id }, data: item[to] });
        }
    });
}

async function main() {
    const rollbackAt = args.indexOf("--rollback");
    if (rollbackAt >= 0) {
        const items = JSON.parse(readFileSync(resolve(args[rollbackAt + 1]), "utf8")) as Planned[];
        await guardedWrite(items, "after", "before");
        console.log(`Geri alındı: ${items.length} kayıt.`);
        return;
    }

    const items = await plan();
    for (const item of items) {
        console.log(`\n${item.table} ${item.slug}`);
        for (const f of Object.keys(item.after)) {
            const show = (v: string | null) => (f.startsWith("content") ? `(${(v ?? "").length} karakter HTML)` : (v ?? "(boş)"));
            console.log(`  ${f}: ${show(item.before[f])}\n    → ${show(item.after[f])}${f.startsWith("meta") ? ` (${item.after[f]?.length})` : ""}`);
        }
    }
    console.log(`\n${items.length} kayıt değişecek.`);
    if (!args.includes("--apply") || items.length === 0) return;

    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/product-body-openings-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify(items, null, 2));
    await guardedWrite(items, "before", "after");
    console.log(`Uygulandı. Yedek: ${file}`);
}

main().finally(() => prisma.$disconnect());
