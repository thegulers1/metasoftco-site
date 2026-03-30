import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const templates = (title: string) => [
    `${title} - Kurumsal Etkinlik ve Marka Aktivasyon Çözümleri | MetasoftCo`,
    `Etkinlikler için İnteraktif ${title} Deneyimi ve Dijital Hatıralar | MetasoftCo`,
    `Profesyonel ${title} Hizmeti ve Yeni Nesil Etkinlik Teknolojileri | MetasoftCo`,
];

async function main() {
    const services = await prisma.service.findMany({
        select: { id: true, title: true, gallery: true },
    });

    let updated = 0;
    let skipped = 0;

    for (const service of services) {
        if (!service.gallery) { skipped++; continue; }

        let items: (string | { url: string; alt?: string })[];
        try {
            items = JSON.parse(service.gallery);
        } catch { skipped++; continue; }

        if (!items.length) { skipped++; continue; }

        const t = templates(service.title);
        const newItems = items.map((item, i) => {
            const url = typeof item === "string" ? item : item.url;
            return { url, alt: t[i % 3] };
        });

        await prisma.service.update({
            where: { id: service.id },
            data: { gallery: JSON.stringify(newItems) },
        });

        console.log(`✓ ${service.title} — ${newItems.length} görsel güncellendi`);
        updated++;
    }

    console.log(`\nTamamlandı: ${updated} hizmet güncellendi, ${skipped} atlandı.`);
    await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
