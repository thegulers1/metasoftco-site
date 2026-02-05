import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DIRECT_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const categories = [
    {
        name: "Yapay Zeka",
        slug: "yapay-zeka",
        order: 1,
        services: [
            {
                title: "ChatBot Geliştirme",
                slug: "chatbot-gelistirme",
                description: "İşletmenize özel yapay zeka destekli chatbot çözümleri",
                size: "medium",
                textColor: "light",
                order: 1,
            },
            {
                title: "Görüntü İşleme",
                slug: "goruntu-isleme",
                description: "Bilgisayarlı görü ve görüntü analizi sistemleri",
                size: "tall",
                textColor: "light",
                order: 2,
            },
            {
                title: "Doğal Dil İşleme",
                slug: "dogal-dil-isleme",
                description: "Metin analizi ve NLP çözümleri",
                size: "small",
                bgColor: "#000",
                textColor: "light",
                order: 3,
            },
            {
                title: "Tahminleme Sistemleri",
                slug: "tahminleme-sistemleri",
                description: "Makine öğrenmesi ile tahmin ve öngörü modelleri",
                size: "wide",
                textColor: "light",
                order: 4,
            },
            {
                title: "Sesli Asistan",
                slug: "sesli-asistan",
                description: "Ses tanıma ve sesli komut sistemleri",
                size: "small",
                textColor: "light",
                order: 5,
            },
            {
                title: "AI Danışmanlık",
                slug: "ai-danismanlik",
                description: "Yapay zeka stratejisi ve uygulama danışmanlığı",
                size: "medium",
                textColor: "dark",
                order: 6,
            },
        ],
    },
    {
        name: "Fotoğraf & Video",
        slug: "fotograf-video",
        order: 2,
        services: [
            {
                title: "Ürün Fotoğrafçılığı",
                slug: "urun-fotografciligi",
                description: "E-ticaret ve katalog için profesyonel ürün çekimleri",
                size: "large",
                textColor: "dark",
                order: 1,
            },
            {
                title: "Tanıtım Filmi",
                slug: "tanitim-filmi",
                description: "Marka ve ürün tanıtım videoları",
                size: "medium",
                textColor: "light",
                order: 2,
            },
            {
                title: "Drone Çekimi",
                slug: "drone-cekimi",
                description: "Havadan görüntüleme ve drone fotoğrafçılığı",
                size: "tall",
                textColor: "light",
                order: 3,
            },
            {
                title: "Etkinlik Çekimi",
                slug: "etkinlik-cekimi",
                description: "Kurumsal etkinlik ve organizasyon çekimleri",
                size: "wide",
                textColor: "light",
                order: 4,
            },
            {
                title: "Video Editing",
                slug: "video-editing",
                description: "Profesyonel video kurgu ve post-prodüksiyon",
                size: "small",
                bgColor: "#1a1a1a",
                textColor: "light",
                order: 5,
            },
            {
                title: "Animasyon",
                slug: "animasyon",
                description: "2D/3D animasyon ve motion graphics",
                size: "small",
                textColor: "light",
                order: 6,
            },
        ],
    },
    {
        name: "İnteraktif",
        slug: "interaktif",
        order: 3,
        services: [
            {
                title: "Web Uygulaması",
                slug: "web-uygulamasi",
                description: "Modern ve ölçeklenebilir web uygulamaları",
                size: "wide",
                textColor: "light",
                order: 1,
            },
            {
                title: "Mobil Uygulama",
                slug: "mobil-uygulama",
                description: "iOS ve Android için native ve cross-platform uygulamalar",
                size: "tall",
                textColor: "light",
                order: 2,
            },
            {
                title: "E-Ticaret",
                slug: "e-ticaret",
                description: "Özelleştirilmiş e-ticaret platformları",
                size: "medium",
                textColor: "dark",
                order: 3,
            },
            {
                title: "AR/VR Deneyimleri",
                slug: "ar-vr-deneyimleri",
                description: "Artırılmış ve sanal gerçeklik uygulamaları",
                size: "large",
                textColor: "light",
                order: 4,
            },
            {
                title: "Interaktif Kiosk",
                slug: "interaktif-kiosk",
                description: "Dokunmatik ekran ve kiosk çözümleri",
                size: "small",
                bgColor: "#000",
                textColor: "light",
                order: 5,
            },
            {
                title: "Oyun Geliştirme",
                slug: "oyun-gelistirme",
                description: "Mobil ve web tabanlı oyun geliştirme",
                size: "small",
                textColor: "light",
                order: 6,
            },
        ],
    },
];

async function main() {
    console.log("🌱 Seeding database...");

    // Önce mevcut verileri temizle
    await prisma.service.deleteMany();
    await prisma.serviceCategory.deleteMany();

    // Kategorileri ve hizmetleri ekle
    for (const cat of categories) {
        const category = await prisma.serviceCategory.create({
            data: {
                name: cat.name,
                slug: cat.slug,
                order: cat.order,
                services: {
                    create: cat.services,
                },
            },
            include: { services: true },
        });
        console.log(`✅ Created category: ${category.name} with ${category.services.length} services`);
    }

    console.log("🎉 Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
