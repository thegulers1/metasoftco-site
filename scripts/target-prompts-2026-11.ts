/** 18 Kasım 2026 — düzeltme listesi bölüm 4: hedef sorularla sayfa eşleştirme.
 * Yalnızca sayfalarda zaten yazan bilgiler kullanılır; fiyat yok, slug ve yayın durumu değişmez.
 *
 * Önizleme:   pnpm exec tsx scripts/target-prompts-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/target-prompts-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/target-prompts-2026-11.ts --rollback /mutlak/yol/backup.json
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

const patches: Patch[] = [
    {
        table: "service",
        slug: "ai-fashion-mirror-akilli-ayna",
        categorySlug: "yapay-zeka-etkinlik-cozumleri",
        fields: {
            metaTitle: "AI Fashion Mirror Kiralama | Sanal Deneme Aynası",
            metaDescription: "Sanal deneme aynası: AI Fashion Mirror, markanızın koleksiyonunu yapay zeka ile katılımcının fotoğrafına giydirir. Adidas ve DeFacto projelerinde kullanıldı.",
            description: "AI Fashion Mirror, moda ve spor markalarının etkinlikleri için yapay zeka destekli bir sanal deneme aynasıdır. Katılımcının fotoğrafı çekilir, markanızın gerçek koleksiyonundan seçtiği ürün yapay zeka ile üzerine giydirilir; kıyafet değiştirmeden kişiselleştirilmiş AI Try-On görseline ulaşır. Adidas EVO SL ve DeFacto x Afra Saraçoğlu projelerinde uyguladığımız bu deneyimi markanıza özel kuruyoruz.",
        },
    },
    {
        table: "service",
        slug: "reflex-wall",
        categorySlug: "interaktif-etkinlik-aktiviteleri",
        fields: {
            metaDescription: "Refleks duvarı kiralama: iki kişinin yarıştığı, rastgele yanan LED butonlara en hızlı basanın kazandığı hız oyunu. Markalı kaplama, skor tablosu ve ekip dahil.",
            description: "Refleks duvarı: iki kişinin aynı anda yarışabildiği; hız, dikkat ve koordinasyonu büyük LED butonlar üzerinde buluşturan, markaya özel giydirilen bir hız oyunu.",
        },
    },
    {
        table: "service",
        slug: "vr-beat-saber-kiralama",
        categorySlug: "vr-ar-deneyimleri",
        fields: {
            metaTitle: "VR Beat Saber Kiralama | Sanal Gerçeklik Ritim Oyunu",
            description: "VR Beat Saber, sanal gerçeklik gözlüğüyle oynanan bir ritim oyunudur: müziğe göre gelen küpler sanal kılıçlarla kesilir. Oyun dış ekrana yansıtılır, izleyenler de deneyime ortak olur.",
            content: { replace: [["VR&nbsp;Bear&nbsp;Saber", "VR&nbsp;Beat&nbsp;Saber"]] },
        },
    },
    {
        table: "sectorPage",
        slug: "antalya-photobooth-kiralama",
        fields: {
            h1: "Antalya Photobooth Kiralama ve Kurumsal Etkinlik Aktivasyonu",
            metaTitle: "Antalya Photobooth Kiralama | Kurumsal Etkinlik ve Aktivasyon",
            content: { replace: [["Şehirde Nirvana otelde bir tohum markasının etkinliğinde kurulum yaptık.", "Şehirde Rijk Zwaan ile iki hafta boyunca hafta sonları Nirvana otelde çalıştık."]] },
            content_en: { replace: [["In the city we installed at a seed brand's event at the Nirvana hotel.", "In the city we worked with Rijk Zwaan at the Nirvana hotel over two consecutive weekends."]] },
            faq: { replace: [["Antalya'da Nirvana otelde bir tohum markasının etkinliğinde kurulum yaptık.", "Antalya'da Rijk Zwaan ile iki hafta boyunca hafta sonları Nirvana otelde çalıştık."]] },
            faq_en: { replace: [["In Antalya we installed at a seed brand's event at the Nirvana hotel.", "In Antalya we worked with Rijk Zwaan at the Nirvana hotel over two consecutive weekends."]] },
            metaDescription: "Antalya'da kurumsal etkinlik ve marka aktivasyonu: bayi toplantısı, kongre ve gala için photobooth, Mirror Booth, 360 Video Booth. İngilizce operatör dahil.",
        },
    },
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
            const show = (v: string | null) => (f === "content" ? `(${(v ?? "").length} karakter HTML)` : (v ?? "(boş)"));
            console.log(`  ${f}: ${show(item.before[f])}\n    → ${show(item.after[f])}${f.startsWith("meta") ? ` (${item.after[f]?.length})` : ""}`);
        }
    }
    console.log(`\n${items.length} kayıt değişecek.`);
    if (!args.includes("--apply") || items.length === 0) return;

    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/target-prompts-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify(items, null, 2));
    await guardedWrite(items, "before", "after");
    console.log(`Uygulandı. Yedek: ${file}`);
}

main().finally(() => prisma.$disconnect());
