import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../src/lib/db";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SLUG = "akmerkez-x-ai-football-card";
const FILE = "/Users/lawlieties/Downloads/zydnibirplvgtg5ld1r3.jpeg";

async function main() {
  const res = await cloudinary.uploader.upload(FILE, {
    public_id: "metasoftco/projects/presentation/akmerkez-ai-football-card",
    overwrite: true,
    invalidate: true,
    resource_type: "image",
  });
  console.log("uploaded:", res.secure_url, res.width + "x" + res.height, res.format);

  const updated = await prisma.project.update({
    where: { slug: SLUG },
    data: { image: res.secure_url },
    select: { slug: true, image: true },
  });
  console.log("db:", JSON.stringify(updated, null, 2));
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
