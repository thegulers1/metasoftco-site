import "dotenv/config";
import { prisma } from "../src/lib/db";

async function addEnglishMirrorBoothFaq() {
    const category = await prisma.serviceCategory.findUnique({ where: { slug: "photobooth-ve-fotograf-aktivasyonlari" } });
    if (!category) throw new Error("Photobooth category not found");
    const existing: { q: string; a: string }[] = category.faq_en ? JSON.parse(category.faq_en) : [];
    if (existing.some((f) => /mirror booth/i.test(f.q))) {
        console.log("EN Mirror Booth FAQ already present, skipping.");
        return;
    }
    const updated = [
        ...existing,
        {
            q: "Can I rent a Mirror Booth in Istanbul?",
            a: "Yes. MetasoftCo is an Istanbul-based agency and rents Mirror Booth systems for events across Turkey. It features a large touchscreen mirror display, hundreds of digital filters, instant printing, and QR-code digital sharing; setup and teardown are included. The interface and print frame are fully brand-customizable.",
        },
    ];
    await prisma.serviceCategory.update({ where: { id: category.id }, data: { faq_en: JSON.stringify(updated) } });
    console.log("Added English Mirror Booth FAQ entry.");
}

async function fillEmptyCategoryFaqs() {
    const targets = [
        {
            slug: "video",
            faq: [
                {
                    q: "Etkinliklerde video aktivasyonları nasıl kullanılır?",
                    a: "360 Video Booth ve GIF & Video Booth gibi sistemler, katılımcıların hareketli görüntülerini saniyeler içinde markalı, paylaşılabilir içeriklere dönüştürür. Kurulum ve saha desteği MetasoftCo ekibi tarafından sağlanır.",
                },
                {
                    q: "Video aktivasyonları marka kimliğiyle özelleştirilebilir mi?",
                    a: "Evet. Çerçeve tasarımı, karşılama ekranı ve paylaşım şablonları markanızın logosu ve renkleriyle özelleştirilir.",
                },
                {
                    q: "Çekilen videolar katılımcılara nasıl iletilir?",
                    a: "QR kod ile anında dijital indirme veya e-posta/SMS üzerinden paylaşım seçenekleri mevcuttur.",
                },
            ],
            faq_en: [
                {
                    q: "How are video activations used at events?",
                    a: "Systems like 360 Video Booth and GIF & Video Booth turn participants' motion footage into branded, shareable content within seconds. Setup and on-site support are provided by the MetasoftCo team.",
                },
                {
                    q: "Can video activations be customized with our brand?",
                    a: "Yes. The frame design, welcome screen, and sharing templates are customized with your logo and brand colors.",
                },
            ],
        },
        {
            slug: "vr-ar-deneyimleri",
            faq: [
                {
                    q: "VR aktivasyonları kurumsal etkinliklerde nasıl kullanılır?",
                    a: "VR Beat Saber gibi sistemler, katılımcıları rekabetçi ve eğlenceli bir deneyime dahil ederek stant önünde doğal bir izleyici kalabalığı oluşturur. Skor tabelası ile yarışma formatına dönüştürülebilir.",
                },
                {
                    q: "VR sistemleri için ne kadar alan gerekir?",
                    a: "Standart bir VR istasyonu yaklaşık 2x2 metrelik güvenli bir alanda kurulur. Ekipman ve teknik destek MetasoftCo tarafından sağlanır.",
                },
            ],
            faq_en: [
                {
                    q: "How are VR activations used at corporate events?",
                    a: "Systems like VR Beat Saber draw a natural crowd by engaging participants in a competitive, entertaining experience, which can be turned into a leaderboard competition.",
                },
            ],
        },
    ];

    for (const t of targets) {
        const category = await prisma.serviceCategory.findUnique({ where: { slug: t.slug } });
        if (!category) continue;
        if (category.faq) {
            console.log(`${t.slug}: FAQ already present, skipping.`);
            continue;
        }
        await prisma.serviceCategory.update({
            where: { id: category.id },
            data: { faq: JSON.stringify(t.faq), faq_en: JSON.stringify(t.faq_en) },
        });
        console.log(`${t.slug}: FAQ (TR+EN) added.`);
    }
}

async function main() {
    await addEnglishMirrorBoothFaq();
    await fillEmptyCategoryFaqs();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
