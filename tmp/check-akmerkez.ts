import { prisma } from "../src/lib/db";
async function main() {
  const p: any = await prisma.project.findFirst({ where: { slug: "akmerkez-x-ai-football-card" } });
  for (const [k, v] of Object.entries(p)) {
    if (typeof v === "string" && v.includes("akmerkez-ai-football-card")) console.log(k, "=>", v);
  }
  const g = await (prisma as any).projectImage?.findMany?.({ where: { projectId: p.id } }).catch(() => null);
  console.log("gallery:", JSON.stringify(g, null, 2));
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
