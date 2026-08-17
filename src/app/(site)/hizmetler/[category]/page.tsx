import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import CapabilityCategoryScreen from "@/components/phase2/CapabilityCategoryScreen";
import { isEnglishCategoryPublishable } from "@/lib/publication";

export const revalidate = 3600;

const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
    "yapay-zeka-etkinlik-cozumleri": [
        {
            question: "AI photo ve face swap etkinliklerde nasıl kullanılır?",
            answer: "MetasoftCo'nun AI Photo sistemleri, Stable Diffusion ve ControlNet teknolojisiyle misafirlerin fotoğraflarını saniyeler içinde Forbes kapak, Cyberpunk, Rönesans gibi farklı konseptlere dönüştürür. Bir stand kurulur, misafir fotoğrafı çekilir ve 5-15 saniye içinde dönüştürülmüş görsel e-posta veya QR kod ile paylaşılır.",
        },
        {
            question: "AI yüz dönüşümü (face swap) ne kadar sürede sonuç verir?",
            answer: "LoRA tabanlı model mimarisi sayesinde yüz dönüşümü 5-15 saniye içinde tamamlanır. Misafire gerçek zamanlı önizleme gösterilir, onay sonrası baskı veya dijital paylaşım yapılır. Saatte 40-60 kişiye kesintisiz hizmet sunulabilir.",
        },
        {
            question: "AI Fashion Mirror (Akıllı Ayna) nedir?",
            answer: "Computer Vision ve AR teknolojisiyle donatılmış interaktif aynalardır. Unity/WebGL tabanlı gerçek zamanlı render ile misafirler sanal kıyafetler giyebilir, marka karakterlerine dönüşebilir. Gerçek zamanlı segmentasyon teknolojisi arka planı otomatik kaldırır. Özellikle tekstil, moda ve marka aktivasyonu etkinlikleri için idealdir.",
        },
        {
            question: "Bu yapay zeka teknolojileri kurumsal etkinliklere uygun mu?",
            answer: "Evet. Tüm sistemler marka kimliğine özel yapılandırılır: logo, renk paleti, tema içerikleri kurumsal kimliğinize göre hazırlanır. KVKK uyumlu veri yönetimi, etkinlik öncesi teknik test ve etkinlik sırası yerinde destek standarttır.",
        },
        {
            question: "Kaç kişilik etkinlikte yapay zeka sistemleri kullanılabilir?",
            answer: "Küçük seminerlerden binlerce katılımcılı fuarlara kadar ölçeklenebilir mimari ile çalışır. Tek istasyon saatte 40-60 kişiye hizmet verir; büyük etkinlikler için birden fazla istasyon kurularak kapasite artırılabilir.",
        },
    ],
    "photobooth-ve-fotograf-aktivasyonlari": [
        {
            question: "Dijital photobooth ile klasik photobooth arasındaki fark nedir?",
            answer: "MetasoftCo dijital photobooth'ları yapay zeka arka plan kaldırma, anlık sosyal medya paylaşımı, marka özelleştirmesi ve analitik raporlama sunar. Klasik photobooth sadece fotoğraf çeker; dijital photobooth bir marka deneyim platformudur ve katılımcı verilerini KVKK uyumlu olarak raporlar.",
        },
        {
            question: "Photobooth kurulumu ne kadar sürer?",
            answer: "MetasoftCo ekibi etkinlik alanına 2-3 saat öncesinde gelerek tüm donanım ve yazılım kurulumunu tamamlar. Kompakt sistemler 45 dakikada hazır hale getirilebilir. Kurulum ve söküm hizmeti fiyata dahildir.",
        },
        {
            question: "Fotoğraflar katılımcılara nasıl iletilir?",
            answer: "E-posta (anında gönderim), SMS ile link veya etkinlik alanındaki kiosk ekranından QR kod okutma seçenekleri mevcuttur. İstek üzerine direkt Instagram veya LinkedIn paylaşımı da yapılabilir.",
        },
        {
            question: "Etkinlik sonrası analitik rapor alınabilir mi?",
            answer: "Evet. Gerçek zamanlı analitik panel ile katılım sayısı, paylaşım oranları, en popüler saatler ve etkileşim süreleri raporlanır. Etkinlik sonrasında PDF rapor sunulur. Tüm veri toplama KVKK uyumlu açık rıza alımı ile gerçekleşir.",
        },
        {
            question: "Hangi etkinlik türleri için photobooth uygundur?",
            answer: "Ürün lansmanları, fuar aktivasyonları, kurumsal yıl sonu partileri, açılış törenleri, mezuniyet törenleri, teknoloji konferansları, perakende aktivasyonları ve düğün organizasyonları başlıca kullanım alanlarıdır.",
        },
    ],
    "interaktif-etkinlik-aktiviteleri": [
        {
            question: "İnteraktif oyunlar kurumsal etkinliklerde ne işe yarar?",
            answer: "Gamification ile çalışan bağlılığı, marka bilinirliği ve etkinlik katılımı artırılır. Anket, ürün tanıtımı ve ödül kampanyaları eğlenceli bir formata dönüştürülür. Leaderboard (sıralama tablosu) ile rekabetçi katılım teşvik edilir.",
        },
        {
            question: "Hangi interaktif oyun konseptleri mevcuttur?",
            answer: "Hazır modüller: İnteraktif Hafıza Oyunu (marka görselleriyle kart eşleştirme), Dijital Hediye Çarkı Aktivasyonu (çark çevirme ve ödül kazanma), Geri Dönüşüm Kazan Oyunu (sürdürülebilirlik temalı). Ayrıca etkinliğe özel tamamen özel oyun mekaniği de geliştirilebilir.",
        },
        {
            question: "Oyunlar marka kimliğiyle özelleştirilebiliyor mu?",
            answer: "Evet. Tüm oyunlar şirket logonuz, renk paletiniz ve içeriğinizle tamamen özelleştirilir. Ürün görselleri, marka sloganları ve kampanya mesajları oyun içine entegre edilir. Marka onayı sonrası konfigürasyon kilitlenir.",
        },
        {
            question: "İnteraktif oyunlar için teknik altyapı gereksinimi nedir?",
            answer: "Tablet (10\"+), büyük dokunmatik ekran veya standart bilgisayar ile çalışır. İnternet bağlantısı ve elektrik prizi yeterlidir. Tüm donanım MetasoftCo tarafından sağlanır ve kurulumu ekibimizce yapılır.",
        },
        {
            question: "Oyunlarda sosyal medya entegrasyonu var mı?",
            answer: "Evet. Oyun sonunda oyuncunun skoru veya kazanım ekranı sosyal medya paylaşım modülüne yönlendirilebilir. Hashtag, marka etiketi ve etkinliğe özel çerçeve desteklenir.",
        },
    ],
};

interface PageProps {
    params: Promise<{ category: string }>;
}

async function getCategoryWithServices(slug: string) {
    return prisma.serviceCategory.findUnique({
        where: { slug },
        include: {
            services: { where: { published: true }, orderBy: { order: "asc" } },
        },
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = await getCategoryWithServices(categorySlug);
    if (!category) return {};

    const title = category.metaTitle || `${category.name} | MetasoftCo`;
    const description = category.metaDescription || siteConfig.description;
    const url = `${siteConfig.url}/hizmetler/${categorySlug}`;

    return {
        title,
        description,
        keywords: category.metaKeywords || undefined,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
            images: [{ url: `${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [`${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`] },
        alternates: {
            canonical: url,
            ...(isEnglishCategoryPublishable(category) && {
                languages: {
                    "x-default": url,
                    tr: url,
                    en: `${siteConfig.url}/en/services/${category.slug_en}`,
                },
            }),
        },
    };
}

export default async function CategoryHubPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    const category = await getCategoryWithServices(categorySlug);

    if (!category) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
        { name: category.name, url: `${siteConfig.url}/hizmetler/${categorySlug}` },
    ]);

    const faqs = categoryFAQs[categorySlug] || [];
    const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <AdminEditUrlSetter url={`/editpanel/services/categories/${category.id}/edit`} />
            <CapabilityCategoryScreen
                locale="tr"
                name={category.name}
                heroTitle={category.heroTitle}
                heroCopy={category.heroContent}
                services={category.services.map((service) => ({
                    id: service.id,
                    title: service.title,
                    image: service.image,
                    href: `/hizmetler/${categorySlug}/${service.slug}`,
                }))}
                faqs={faqs}
            />
        </>
    );
}
