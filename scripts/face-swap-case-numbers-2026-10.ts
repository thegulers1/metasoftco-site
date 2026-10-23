import "dotenv/config";
import { prisma } from "../src/lib/db";

// 2026-10-23: case figures for the face swap guide, as given by Selami:
// Akmerkez 230 participants; TCMB 4 days over 2 weeks (2 days a week), 600
// participants; DeFacto 80 participants. Only participant counts were given,
// so no output counts (cards/photos/outfits) are written.
// Idempotent; pass --apply to write.

const GUIDE = "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir";

// [after this sentence, insert this one]
const tr: [string, string][] = [
    ["kişiselleştirilmiş futbolcu kartlarına dönüştü.", " Etkinliğe 230 ziyaretçi katıldı."],
    ["QR kodla telefona aktarıldı.", " İki hafta boyunca, her hafta iki gün olmak üzere toplam 4 gün süren etkinlikte 600 katılımcıya hizmet verdik."],
    ["kendi üzerlerinde gördü.", " Lansmanda 80 misafir deneyime katıldı."],
];
const en: [string, string][] = [
    ["with their own photos and names.", " 230 visitors took part in the experience."],
    ["sent to phones via QR code.", " The event ran for four days over two weeks, two days each week, and served 600 guests in total."],
    ["without changing clothes.", " 80 guests took part during the launch."],
];

function insert(content: string, pairs: [string, string][]) {
    let out = content;
    for (const [anchor, sentence] of pairs) {
        if (out.includes(sentence.trim())) continue;
        const i = out.indexOf(anchor);
        if (i === -1) throw new Error(`Anchor not found: ${anchor}`);
        const at = i + anchor.length;
        out = out.slice(0, at) + sentence + out.slice(at);
    }
    return out;
}

async function main() {
    const post = await prisma.blogPost.findUnique({ where: { slug: GUIDE }, select: { content: true, content_en: true } });
    if (!post || !post.content || !post.content_en) throw new Error("Guide not found");
    const content = insert(post.content, tr);
    const content_en = insert(post.content_en, en);
    const changed = content !== post.content || content_en !== post.content_en;
    console.log(changed ? "Will add case figures (TR/EN)." : "Already added.");
    if (!changed) return;
    if (!process.argv.includes("--apply")) return console.log("Dry run. Pass --apply to write.");
    await prisma.blogPost.update({ where: { slug: GUIDE }, data: { content, content_en } });
    console.log("Applied.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
