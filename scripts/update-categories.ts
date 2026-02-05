import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.serviceCategory.findMany({
        orderBy: { order: "asc" }
    });

    const updates = [
        { name: "AI Photo", name_en: "AI Photo", slug: "ai-photo" },
        { name: "AI Greenbox", name_en: "AI Greenbox", slug: "ai-greenbox" },
        { name: "AI Draw", name_en: "AI Draw", slug: "ai-draw" },
        { name: "İnteraktif Deneyimler", name_en: "Interactive Experiences", slug: "interactive-experiences" },
    ];

    for (let i = 0; i < categories.length && i < updates.length; i++) {
        await prisma.serviceCategory.update({
            where: { id: categories[i].id },
            data: updates[i]
        });
        console.log(`Updated ${categories[i].name} to ${updates[i].name}`);
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
