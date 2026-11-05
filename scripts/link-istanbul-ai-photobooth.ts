import "dotenv/config";
import { prisma } from "../src/lib/db";
import { rentalOpsCopy, rentalProductName, toRentalOutput } from "../src/lib/rental-ops";

// Adds one internal link to the Istanbul AI Photobooth page inside the
// "Hangi şehirlerde hizmet veriyorsunuz?" FAQ answer of the AI Photobooth
// service (an own copy of the shared answer). [anchor](/path) renders as a link (src/lib/faq-text.ts).
// Usage: tsx scripts/link-istanbul-ai-photobooth.ts [--apply]
const SLUG = "ai-photobooth-kirala";
const PATH = "/hizmetler/istanbul-ai-photobooth";
const LINK = `[İstanbul AI Photobooth kiralama](${PATH})`;
const SENTENCE = ` İstanbul'daki etkinlikler için ${LINK} sayfamıza göz atabilirsiniz.`;

type Faq = { q: string; a: string };

async function main() {
    const apply = process.argv.includes("--apply");
    const svc = await prisma.service.findFirst({ where: { slug: SLUG } });
    if (!svc?.faq) throw new Error("Service or faq not found");
    if ((svc.content ?? "").includes(PATH)) {
        console.log("Link already in content; nothing to do.");
        return;
    }
    const faq: Faq[] = JSON.parse(svc.faq);
    if (faq.some((f) => f.a.includes(PATH))) {
        console.log("Link already in faq; nothing to do.");
        return;
    }
    // The shared cities answer (src/lib/rental-ops.ts) is used by every rental
    // service; an own question with the same wording replaces it for this one
    // service only (mergeRentalFaq), so the link is not repeated site-wide.
    const shared = rentalOpsCopy("tr")
        .faq(rentalProductName(svc.title, "tr"), toRentalOutput(svc.outputType))
        .find((f) => f.q.startsWith("Hangi şehirlerde hizmet veriyorsunuz"));
    if (!shared) throw new Error("Shared cities FAQ not found");
    const marker = "Türkiye genelinde hizmet veriyoruz.";
    if (!shared.a.includes(marker)) throw new Error("Marker sentence not found");
    const item: Faq = { q: shared.q, a: shared.a.replace(marker, marker + SENTENCE) };
    faq.push(item);
    console.log(item.a);
    if (!apply) return console.log("\nDry run. Pass --apply to write.");
    await prisma.service.update({ where: { id: svc.id }, data: { faq: JSON.stringify(faq) } });
    console.log("Updated.");
}

main().finally(() => prisma.$disconnect());
