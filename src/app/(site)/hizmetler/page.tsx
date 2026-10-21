import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, generateFAQSchema, generateBreadcrumbSchema, ogImageUrl } from "@/lib/site";
import { serviceListingImage, shortServiceTitle } from "@/lib/service-listing";
import CapabilitiesIndexPrototype from "@/components/phase2/CapabilitiesIndexPrototype";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

const ogTitle = "Etkinlik Teknolojisi Kiralama: AI, Photobooth, Oyun | MetasoftCo";
const ogDescription = "Yapay zeka fotoğraf, photobooth, interaktif oyun ve AR aktivasyonlarını anahtar teslim kiralayın. İstanbul merkezli, Türkiye geneli kurulum ve saha ekibi.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Etkinlik Teknolojisi Kiralama: AI, Photobooth, Oyun | MetasoftCo",
    description: ogDescription,
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/hizmetler`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
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
        include: { services: { where: { published: true, type: "RENTAL" }, orderBy: { order: "asc" } } },
    }),
    ["service-categories"],
    { revalidate: 60 }
);

const serviceFAQs = [
    {
        question: "MetasoftCo hangi hizmetleri sunuyor?",
        answer: "Etkinlikler için anahtar teslim kiralama yapıyoruz: AI photobooth ve yapay zekâ fotoğraf deneyimleri, klasik photobooth ve strip photo, interaktif oyunlar, hediye çarkı, video booth ve VR. Kurulum, markanıza özel tasarım ve sahadaki ekip fiyata dahildir. Mağaza, showroom ya da ofis gibi kalıcı noktalar için sistemlerimizi satın da alabilirsiniz; markanıza özel yazılım da geliştiriyoruz.",
    },
    {
        question: "Yapay zeka etkinlik teknolojilerinde hangi yazılımları kullanıyorsunuz?",
        answer: "Sahadaki tüm deneyimlerin yazılımını kendi ekibimiz geliştiriyor. Görüntü üretiminde Stable Diffusion tabanlı modelleri, kişi takibinde görüntü işlemeyi, oyun ve AR deneyimlerinde Unity'yi kullanıyoruz. Sizin için önemli olan şu: deneyim markanıza göre uyarlanır, etkinlik günü internet bağlantısını ve teknik ekibi biz getiririz.",
    },
    {
        question: "Yapay zeka fotoğraf deneyimi nasıl çalışır?",
        answer: "Katılımcının fotoğrafı cihazın kamerasıyla çekilir; yapay zekâ yüz hatlarını ve ifadeyi koruyarak fotoğrafı saniyeler içinde seçilen konsepte (dergi kapağı, film afişi, markanıza özel bir dünya) dönüştürür. Sonuç QR kod ya da e-posta ile anında paylaşılır, istenirse yerinde basılır.",
    },
    {
        question: "AI Fashion Mirror veya Akıllı Ayna nedir?",
        answer: "Computer Vision ve Artırılmış Gerçeklik (AR) teknolojisiyle donatılmış interaktif bir ayna sistemidir. Unity/WebGL tabanlı gerçek zamanlı render ile misafirler sanal kıyafetler giyebilir, marka karakterlerine dönüşebilir. Özellikle tekstil, moda fuarları ve marka aktivasyonları için idealdir.",
    },
    {
        question: "Mirror Booth İstanbul'da kiralanabilir mi?",
        answer: "Evet. MetasoftCo İstanbul merkezli olup Mirror Booth'u Türkiye genelinde etkinliklere kiralık olarak sunar. Dev dokunmatik ayna ekranı, yüzlerce dijital filtre, anında baskı ve QR kod ile dijital paylaşım içerir; kurulum ve söküm hizmeti dahildir.",
    },
    {
        question: "Etkinlik için photobooth veya AI fotoğraf sistemi nasıl kurulur?",
        answer: "Kurulumu etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yaparız; cihaz başına ortalama 30–40 dakika sürer. Mekândan yalnızca standart bir 220V priz isteriz, interneti kendi 5G altyapımızla getiririz. Nakliye, kurulum, etkinlik boyunca teknik personel ve söküm fiyata dahildir.",
    },
    {
        question: "İstanbul dışında hizmet veriyor musunuz?",
        answer: "Evet. İstanbul Teknokent merkezliyiz ve Türkiye genelinde hizmet veriyoruz; bugüne kadar İstanbul, Ankara, İzmir, Antalya, Muğla (Bodrum), Adana, Diyarbakır, Kocaeli, Sakarya (Sapanca) ve Çorum olmak üzere 10 ilde kurulum yaptık. Şehir dışı etkinliklerde ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır.",
    },
    {
        question: "KVKK kapsamında fotoğraf verileri nasıl korunuyor?",
        answer: "Veri toplanan kurgularda form aydınlatma metniyle sunulur; pazarlama izni ayrı ve isteğe bağlı açık rızayla alınır. Veri sorumlusu müşteri marka, MetasoftCo ise müşterinin talimatlarıyla hareket eden veri işleyendir. Veriler standart olarak 90 gün saklanır ve süre sonunda sistemlerimizden silinir.",
    },
    {
        question: "Etkinlik sırasında teknik destek sağlıyor musunuz?",
        answer: "Evet. Etkinlik boyunca alanda en az 2 teknik personelimiz bulunur; kurulumdan sökümüne kadar sistemi aynı ekip yönetir.",
    },
    {
        question: "Fiyat teklifi nasıl alabilirim?",
        answer: "info@metasoftco.com adresine etkinlik tarihi, lokasyon, tahmini katılımcı sayısı ve istenen hizmetleri belirterek e-posta gönderebilir ya da +90 534 233 4051 numaralı telefonu arayabilirsiniz. Aynı gün dönüş yapılır. İletişim formundaki etkinlik tarihi, şehir ve katılımcı sayısı alanları teklifi hızlandırır.",
    },
    {
        question: "Sistemler ve oyunlar marka kimliğiyle özelleştirilebilir mi?",
        answer: "Evet. Logo, renk paleti, çerçeve tasarımları, tema içerikleri ve başlangıç ekranı tamamen marka kimliğinize göre hazırlanır. Kurumsal onay sürecinize göre marka tasarım dosyaları (AI, PSD) teslim alınarak özelleştirme yapılır.",
    },
    {
        question: "Etkinlik sonrası analitik rapor alınabilir mi?",
        answer: "Evet. Data-Capture modülüyle toplanan kayıtları size özel panelden canlı takip eder, filtreler ve Excel/CSV olarak indirirsiniz; yapay zeka destekli istatistikler etkinliğin performansını özetler. Talep halinde etkinlik sonrası PDF rapor da hazırlanır.",
    },
    {
        question: "MetasoftCo ile iletişime nasıl geçebilirim?",
        answer: "info@metasoftco.com adresine e-posta gönderebilir, +90 534 233 4051 numaralı telefondan ulaşabilir veya metasoftco.com/iletisim sayfasındaki formu doldurabilirsiniz. Hafta içi 09:00-18:00 saatleri arasında WhatsApp üzerinden de destek alınabilir.",
    },
];

export default async function HizmetlerPage() {
    const categories = await getCategories();
    const capabilities = categories.flatMap((category) =>
        category.services
            .map((service) => ({
                id: service.id,
                title: shortServiceTitle(service.title, service.homeTitle),
                image: serviceListingImage(service),
                href: `/hizmetler/${category.slug}/${service.slug}`,
                categorySlug: category.slug,
            }))
    );
    const categoryTabs = categories
        .filter((category) => category.services.length > 0)
        .map((category) => ({ slug: category.slug, name: category.name }));
    const faqSchema = generateFAQSchema(serviceFAQs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <CapabilitiesIndexPrototype capabilities={capabilities} categories={categoryTabs} locale="tr" faqs={serviceFAQs.map((item) => ({ q: item.question, a: item.answer }))} />
        </>
    );
}
