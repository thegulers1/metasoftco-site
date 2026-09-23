// One-off: turns on the Data-Capture / CRM block for every participant-facing
// rental service. Adjust individual services from the editpanel afterwards.
// Usage: npx tsx scripts/flag-data-capture.ts [--apply]
import "dotenv/config";
import { prisma } from "@/lib/db";

// Rental services with no individual participant to capture (broadcast,
// screens, static installs).
const EXCLUDED_SLUGS = new Set([
    "twitter-ekrani",
    "5g-360-canli-yayin",
    "vr-konferans",
    "hologram-anit",
]);

async function main() {
    const apply = process.argv.includes("--apply");
    const services = await prisma.service.findMany({
        where: { type: "RENTAL", dataCapture: false },
        select: { id: true, slug: true, title: true },
    });
    const targets = services.filter((service) => !EXCLUDED_SLUGS.has(service.slug));

    for (const service of targets) console.log(`${apply ? "ON " : "would turn on"}  ${service.slug}`);

    if (apply) {
        await prisma.service.updateMany({
            where: { id: { in: targets.map((service) => service.id) } },
            data: { dataCapture: true },
        });
    }
    console.log(`\n${targets.length} service(s) ${apply ? "updated" : "matched (dry run, pass --apply)"}.`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
