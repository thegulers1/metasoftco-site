import { prisma } from "../src/lib/db";
const URL = "https://res.cloudinary.com/dqkehdebg/image/upload/v1787058648/metasoftco/projects/presentation/akmerkez-ai-football-card.jpg";
async function main() {
  const u = await prisma.project.update({
    where: { slug: "akmerkez-x-ai-football-card" },
    data: { ogImage: URL },
    select: { slug: true, image: true, ogImage: true },
  });
  console.log(JSON.stringify(u, null, 2));
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
