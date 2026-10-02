/**
 * Adds the Project.serviceIds column and fills it for the case studies whose
 * activation is known. After this, links are managed in the editpanel
 * (Projeler → İlgili Hizmetler). Idempotent: projects that already have a
 * selection are left alone.
 *
 *   npx tsx scripts/link-projects-to-services.ts          # preview
 *   npx tsx scripts/link-projects-to-services.ts --write  # apply
 */
import "dotenv/config";
import { prisma } from "../src/lib/db";

const WRITE = process.argv.includes("--write");

/** Project slug → slugs of the rental service(s) it showcases. */
const links: Record<string, string[]> = {
    "adidas-evo-sl-x-ai-try-on-photo": ["ai-fashion-mirror-akilli-ayna"],
    "defacto-x-afra-saracoglu-ai-fashion-experience": ["ai-fashion-mirror-akilli-ayna"],
    "akmerkez-x-ai-football-card": ["ai-football-card"],
    "nesquik-x-ai-photo-child": ["ai-photo-child"],
    "allianz-x-ai-greenbox": ["ai-greenbox-kiralama"],
    "tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi": ["ai-greenbox-kiralama"],
    "bsh-x-ai-draw": ["ai-draw-portre-cizim"],
    "corny-x-photobooth": ["photobooth-kirala"],
    "rollic-summer-party-x-seri-t-foto": ["strip-photo"],
    "defacto-x-momento-ball-photo": ["momento-ball"],
    "ame28-x-glow-box": ["glow-box-photo"],
    "bud-x-cabin-photo": ["cabin-photo"],
    "origins-x-kabin-fotograf-aktivitesi": ["cabin-photo"],
    "pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu": ["dijital-hediye-carki-aktivasyonu"],
};

async function main() {
    if (WRITE) await prisma.$executeRawUnsafe(`ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "serviceIds" TEXT`);
    const columnExists = (await prisma.$queryRawUnsafe<unknown[]>(
        `SELECT 1 FROM information_schema.columns WHERE table_name = 'Project' AND column_name = 'serviceIds'`,
    )).length > 0;
    console.log(`Project.serviceIds column: ${columnExists ? "present" : "missing (added on --write)"}`);

    for (const [projectSlug, serviceSlugs] of Object.entries(links)) {
        const services = await prisma.service.findMany({ where: { slug: { in: serviceSlugs }, type: "RENTAL" }, select: { id: true, slug: true } });
        const ids = serviceSlugs.map((slug) => {
            const service = services.find((item) => item.slug === slug);
            if (!service) throw new Error(`Service not found: ${slug}`);
            return service.id;
        });
        const project = await prisma.project.findUnique({ where: { slug: projectSlug }, select: { id: true } });
        if (!project) throw new Error(`Project not found: ${projectSlug}`);
        if (!columnExists) {
            console.log(`would link ${projectSlug} → ${serviceSlugs.join(", ")}`);
            continue;
        }
        const [{ serviceIds }] = await prisma.$queryRawUnsafe<{ serviceIds: string | null }[]>(
            `SELECT "serviceIds" FROM "Project" WHERE id = $1`, project.id,
        );
        if (serviceIds) {
            console.log(`skip ${projectSlug} (already has a selection)`);
            continue;
        }
        console.log(`${WRITE ? "LINK" : "would link"} ${projectSlug} → ${serviceSlugs.join(", ")}`);
        if (WRITE) await prisma.$executeRawUnsafe(`UPDATE "Project" SET "serviceIds" = $1 WHERE id = $2`, JSON.stringify(ids), project.id);
    }
    console.log(WRITE ? "\nDone." : "\nPreview only — rerun with --write to apply.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
