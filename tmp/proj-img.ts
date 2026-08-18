import { prisma } from "../src/lib/db";
async function main() {
  const p = await prisma.project.findFirst({ where: { slug: "akmerkez-x-ai-football-card" } });
  console.log(JSON.stringify({ id: p?.id, slug: p?.slug, image: p?.image }, null, 2));
  const all = await prisma.project.findMany({ select: { slug: true, image: true } });
  for (const a of all) console.log(a.slug, "|", a.image);
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
