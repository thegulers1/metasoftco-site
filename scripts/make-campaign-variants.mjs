// Yılbaşı kampanyası görsellerinin küçük sürümlerini üretir.
// Neden: images.loader "custom" olduğu için /_next/image kapalı; yerel görseller
// srcset'te hep aynı tam boy dosya olarak gidiyordu. Loader (src/lib/cloudinaryLoader.ts)
// /images/yilbasi/v/ altındaki -480 / -800 / tam boy dosyalardan uygun olanı seçer.
// Kullanım: node scripts/make-campaign-variants.mjs
import { createRequire } from "node:module";
// sharp, Next ile gelen geçişli bağımlılık (pnpm'de üst düzeyde değil); Next üzerinden çözülür.
const require = createRequire(createRequire(import.meta.url).resolve("next/package.json"));
const sharp = require("sharp");
import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const srcDirs = ["src/components/campaigns/yilbasi-2027/assets", "public/images/yilbasi"];
const out = "public/images/yilbasi/v";
mkdirSync(out, { recursive: true });

for (const dir of srcDirs) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".webp") || file.endsWith("-thumb.webp")) continue;
    const name = file.replace(/\.webp$/, "");
    const input = join(dir, file);
    const { width } = await sharp(input).metadata();
    await sharp(input).webp({ quality: 80 }).toFile(join(out, `${name}.webp`));
    for (const w of [480, 800]) {
      if (w >= width) continue;
      await sharp(input).resize({ width: w }).webp({ quality: 74 }).toFile(join(out, `${name}-${w}.webp`));
    }
  }
}
