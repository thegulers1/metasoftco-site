import "dotenv/config";
import { prisma } from "../src/lib/db";

async function main() {
    // Trim stray whitespace
    const rollic = await prisma.project.findUnique({ where: { slug: "rollic-summer-party-x-seri-t-foto" } });
    if (rollic && rollic.title !== rollic.title.trim()) {
        await prisma.project.update({ where: { id: rollic.id }, data: { title: rollic.title.trim() } });
        console.log("Trimmed Rollic title.");
    }

    const adidas = await prisma.project.findUnique({ where: { slug: "adidas-evo-sl-x-ai-try-on-photo" } });
    if (adidas && adidas.client && adidas.client !== adidas.client.trim()) {
        await prisma.project.update({ where: { id: adidas.id }, data: { client: adidas.client.trim() } });
        console.log("Trimmed Adidas client field.");
    }

    // Backfill missing client field from obvious title branding
    const garanti = await prisma.project.findUnique({ where: { slug: "garanti-bbva-genc-x-kulupler-bulusmasi" } });
    if (garanti && !garanti.client) {
        await prisma.project.update({ where: { id: garanti.id }, data: { client: "Garanti BBVA" } });
        console.log("Backfilled Garanti BBVA client field.");
    }

    const tavuk = await prisma.project.findUnique({ where: { slug: "tavuk-dunyasi-x-ai-photo" } });
    if (tavuk && !tavuk.client) {
        await prisma.project.update({ where: { id: tavuk.id }, data: { client: "Tavuk Dünyası" } });
        console.log("Backfilled Tavuk Dünyası client field.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
