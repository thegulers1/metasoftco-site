import "dotenv/config";
import { prisma } from "../src/lib/db";

// Adds buyer questions that AI assistants were asked (October 2026 visibility
// report) to the AI Photobooth and AI Greenbox service FAQs. Answers use only
// verified facts. A question that is already present is left untouched.

type Faq = { q: string; a: string };

const additions: Record<string, Faq[]> = {
    "ai-photobooth-kirala": [
        {
            q: "Kurumsal lansmanlarda AI photobooth kullanmak için hangi çözüm uygun?",
            a: "Lansmanlarda AI Photobooth, misafirin fotoğrafını ürünün ya da kampanyanın temasına özel bir görsele dönüştürür. Tema, fotoğraf çerçevesi, ekran arayüzü ve kiosk giydirmesi markaya göre hazırlanır; tek istasyon saatte 40–60 kişiye hizmet verir ve kalabalık lansmanlarda istasyon sayısı artırılır.",
        },
        {
            q: "Anahtar teslim AI photobooth hizmeti neleri kapsar?",
            a: "Nakliye, kurulum, söküm, etkinlik boyunca en az iki teknik personel ve markaya özel tasarım fiyata dahildir. Mekândan yalnızca standart bir 220V priz istenir; internet kendi 5G modemlerimizle gelir.",
        },
        {
            q: "AI Photobooth ile katılımcı verisi toplanabilir mi?",
            a: "Evet, isteğe bağlı olarak. Data-Capture modülü eklendiğinde katılımcı görselini almak için QR kodu okutur ve formu doldurur; kayıtlar panelinize anlık düşer ve Excel/CSV olarak indirilir.",
        },
    ],
    "ai-greenbox-kiralama": [
        {
            q: "AI Greenbox hangi etkinliklerde kullanıldı?",
            a: "TCMB'nin İstanbul Finans Merkezi'ndeki Merkez Akademi etkinliğinde ve Allianz'ın “Ada'nın Yıldızı” deneyiminde kullanıldı. İki projede de sahneler ve çerçeveler kuruma özel tasarlandı.",
        },
        {
            q: "Markaya özel tasarımlı fotoğraf ve yazılım çözümü sunuyor musunuz?",
            a: "Evet. Yazılımı kendi ekibimiz geliştirdiği için arka plan sahneleri, fotoğraf çerçevesi, ekran arayüzü ve kiosk giydirmesi markanıza özel hazırlanır.",
        },
    ],
};

async function main() {
    for (const [slug, items] of Object.entries(additions)) {
        const service = await prisma.service.findFirst({ where: { slug, type: "RENTAL" } });
        if (!service) {
            console.warn(`Service not found: ${slug}`);
            continue;
        }
        const current: Faq[] = service.faq ? JSON.parse(service.faq) : [];
        const missing = items.filter((item) => !current.some((existing) => existing.q === item.q));
        if (missing.length === 0) {
            console.log(`${slug}: nothing to add.`);
            continue;
        }
        await prisma.service.update({ where: { id: service.id }, data: { faq: JSON.stringify([...current, ...missing]) } });
        console.log(`${slug}: added ${missing.length} question(s).`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
