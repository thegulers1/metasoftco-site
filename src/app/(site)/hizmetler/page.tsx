import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig, generateFAQSchema } from "@/lib/site";
import ServicesListClient from "./ServicesListClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Hizmetlerimiz",
    description: "MetasoftCo'nun sunduğu yapay zeka, fotoğraf & video ve interaktif hizmetler. Etkinlikleriniz için profesyonel çözümler.",
    openGraph: {
        title: "Hizmetlerimiz | MetasoftCo",
        description: "Yapay zeka, fotoğraf & video ve interaktif hizmetlerimizi keşfedin.",
        url: `${siteConfig.url}/hizmetler`,
    },
};

async function getCategories() {
    return prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            services: {
                orderBy: { order: "asc" },
            },
        },
    });
}

const serviceFAQs = [
    {
        question: "MetasoftCo hangi hizmetleri sunuyor?",
        answer: "MetasoftCo; AI destekli fotoğraf dönüşümü (face swap), photobooth sistemleri, interaktif oyunlar ve gamification, marka aktivasyonu ve özel yazılım geliştirme hizmetleri sunmaktadır.",
    },
    {
        question: "İstanbul dışında hizmet veriyor musunuz?",
        answer: "Evet, İstanbul merkezli olmakla birlikte Türkiye genelinde etkinlik ve yazılım hizmetleri sunmaktayız.",
    },
    {
        question: "Etkinlik için photobooth veya AI fotoğraf sistemi nasıl kurulur?",
        answer: "MetasoftCo ekibi, etkinlik öncesinde sistemin kurulumunu ve entegrasyonunu üstlenir. Etkinlik türüne göre özelleştirilmiş photobooth veya AI photo booth çözümleri sunulur.",
    },
    {
        question: "Yapay zeka yüz değiştirme (face swap) teknolojisi nasıl çalışır?",
        answer: "Katılımcıların yüzleri gerçek zamanlı yapay zeka algoritmaları ile belirlenen bir şablona veya karaktere dönüştürülür. Sonuç anında dijital olarak paylaşılabilir hale gelir.",
    },
    {
        question: "MetasoftCo ile iletişime nasıl geçebilirim?",
        answer: "info@metasoftco.com adresine e-posta gönderebilir veya +90 534 233 4051 numaralı telefondan ulaşabilirsiniz. Ayrıca metasoftco.com/iletisim sayfasındaki formu doldurabilirsiniz.",
    },
];

export default async function HizmetlerPage() {
    const categories = await getCategories();
    const faqSchema = generateFAQSchema(serviceFAQs);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ServicesListClient categories={categories} />
        </>
    );
}
