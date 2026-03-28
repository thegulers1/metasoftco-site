import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, generateFAQSchema } from "@/lib/site";
import ServicesListClient from "./ServicesListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "İnteraktif Etkinlik Hizmetleri ve Dijital Aktivasyonlar | MetasoftCo",
    description: "MetasoftCo'nun sunduğu yapay zeka, fotoğraf & video ve interaktif hizmetler. Etkinlikleriniz için profesyonel dijital aktivasyon çözümleri.",
    openGraph: {
        title: "İnteraktif Etkinlik Hizmetleri ve Dijital Aktivasyonlar | MetasoftCo",
        description: "Yapay zeka, fotoğraf & video ve interaktif hizmetlerimizi keşfedin.",
        url: `${siteConfig.url}/hizmetler`,
    },
    alternates: {
        canonical: `${siteConfig.url}/hizmetler`,
        languages: {
            "x-default": `${siteConfig.url}/hizmetler`,
            "tr": `${siteConfig.url}/hizmetler`,
            "en": `${siteConfig.url}/en/services`,
        },
    },
};

const getCategories = unstable_cache(
    async () => prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: { services: { orderBy: { order: "asc" } } },
    }),
    ["service-categories"],
    { revalidate: 60 }
);

const serviceFAQs = [
    {
        question: "MetasoftCo hangi hizmetleri sunuyor?",
        answer: "MetasoftCo; AI destekli fotoğraf dönüşümü (face swap), yapay zeka portre çizimi (AI Draw), AI Fashion Mirror (akıllı ayna & AR), dijital photobooth sistemleri, interaktif oyunlar ve gamification, marka aktivasyonu ve özel yazılım geliştirme hizmetleri sunmaktadır.",
    },
    {
        question: "Yapay zeka etkinlik teknolojilerinde hangi yazılımları kullanıyorsunuz?",
        answer: "Stable Diffusion (görüntü üretimi), LoRA fine-tuning (kişiselleştirilmiş model eğitimi), ControlNet (yüz yapısı ve pozisyon koruma), Computer Vision (gerçek zamanlı kişi takibi ve segmentasyon), Unity ve WebGL (AR deneyimleri) teknolojileri kullanılmaktadır.",
    },
    {
        question: "Yapay zeka yüz değiştirme (face swap) teknolojisi nasıl çalışır?",
        answer: "Katılımcının yüzü kameradan alınır, LoRA ve ControlNet tabanlı yapay zeka modeli 5-15 saniye içinde yüzü seçilen konsepte (Forbes kapak, Cyberpunk, Rönesans vb.) dönüştürür. Yüz benzerliği %99 doğrulukla korunur. Sonuç e-posta, SMS veya QR kod ile anında paylaşılır.",
    },
    {
        question: "AI Fashion Mirror veya Akıllı Ayna nedir?",
        answer: "Computer Vision ve Artırılmış Gerçeklik (AR) teknolojisiyle donatılmış interaktif bir ayna sistemidir. Unity/WebGL tabanlı gerçek zamanlı render ile misafirler sanal kıyafetler giyebilir, marka karakterlerine dönüşebilir. Özellikle tekstil, moda fuarları ve marka aktivasyonları için idealdir.",
    },
    {
        question: "Etkinlik için photobooth veya AI fotoğraf sistemi nasıl kurulur?",
        answer: "MetasoftCo ekibi etkinlik alanına 2-3 saat öncesinde gelerek tüm donanım ve yazılım kurulumunu tamamlar. Kompakt sistemler 45 dakikada hazır hale getirilebilir. Kurulum, etkinlik sırası teknik destek ve söküm hizmeti fiyata dahildir.",
    },
    {
        question: "İstanbul dışında hizmet veriyor musunuz?",
        answer: "Evet, İstanbul merkezli olmakla birlikte Ankara, İzmir, Bursa ve Türkiye genelinde etkinlik kurulum ve hizmet sunmaktayız. Uluslararası etkinlikler için de talep alıyoruz.",
    },
    {
        question: "KVKK kapsamında fotoğraf verileri nasıl korunuyor?",
        answer: "Her kullanıcıya kiosk ekranında Türkçe açık rıza formu gösterilir ve onay alınmadan işlem başlamaz. Toplanan veriler etkinlik bitiminden sonra belirlenen süre içinde güvenli biçimde silinir. İstek üzerine KVKK uyumluluk belgesi sunulur.",
    },
    {
        question: "Etkinlik sırasında teknik destek sağlıyor musunuz?",
        answer: "Evet. Her etkinlikte en az bir teknik uzman yerinde bulunur. Büyük etkinliklerde çoklu teknik destek ekibi görevlendirilir. Olası teknik sorunlara müdahale için tüm yedek ekipman sahaya getirilir.",
    },
    {
        question: "Fiyat teklifi nasıl alabilirim?",
        answer: "info@metasoftco.com adresine etkinlik tarihi, lokasyon, tahmini katılımcı sayısı ve istenen hizmetleri belirterek e-posta gönderebilir ya da +90 534 233 4051 numaralı telefonu arayabilirsiniz. 24 saat içinde detaylı teklif sunulur.",
    },
    {
        question: "Sistemler ve oyunlar marka kimliğiyle özelleştirilebilir mi?",
        answer: "Evet. Logo, renk paleti, çerçeve tasarımları, tema içerikleri ve başlangıç ekranı tamamen marka kimliğinize göre hazırlanır. Kurumsal onay sürecinize göre marka tasarım dosyaları (AI, PSD) teslim alınarak özelleştirme yapılır.",
    },
    {
        question: "Etkinlik sonrası analitik rapor alınabilir mi?",
        answer: "Evet. Gerçek zamanlı analitik panel ile katılım sayısı, paylaşım oranları, en popüler saatler ve etkileşim süreleri raporlanır. Etkinlik sonrasında 24-48 saat içinde PDF rapor sunulur.",
    },
    {
        question: "MetasoftCo ile iletişime nasıl geçebilirim?",
        answer: "info@metasoftco.com adresine e-posta gönderebilir, +90 534 233 4051 numaralı telefondan ulaşabilir veya metasoftco.com/iletisim sayfasındaki formu doldurabilirsiniz. Hafta içi 09:00-18:00 saatleri arasında WhatsApp üzerinden de destek alınabilir.",
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
