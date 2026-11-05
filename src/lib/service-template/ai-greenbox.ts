import type { ServiceTemplateProfile } from "./types";

const TCMB = "tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi";
const ALLIANZ = "allianz-x-ai-greenbox";

export function isAiGreenboxPage(category: string, service: string) {
    return category === AI_GREENBOX_PROFILE.categorySlug && service === AI_GREENBOX_PROFILE.serviceSlug;
}

/**
 * AI Greenbox copy for the shared product layout. Every statement comes from
 * the live service record (content / FAQ), the two linked project records or
 * the shared rental operations facts; no figure appears here that is not
 * already published. Prompt moderation, output volume and throughput are
 * deliberately absent: none is documented.
 */
export const AI_GREENBOX_PROFILE: ServiceTemplateProfile = {
    categorySlug: "yapay-zeka-etkinlik-cozumleri",
    serviceSlug: "ai-greenbox-kiralama",
    productName: "AI Greenbox",
    product: {
        eyebrow: "Yapay zekâ ile arka plan üretimi",
        titleLines: ["AI Greenbox", "Kiralama"],
        intro: "Hayal gücü mü, marka dünyası mı? Seçim sizin.",
        description: "Katılımcı pozunu verir; yapay zekâ fotoğrafı saniyeler içinde seçilen dünyaya yerleştirir. Dünyayı katılımcı kendi komutuyla yazar ya da markanız için hazırladığımız konseptlerden biri kullanılır.",
        badges: ["Fiziksel yeşil perde şart değil", "QR ile dijital teslim", "Türkiye geneli kurulum"],
        specs: [
            { term: "Arka plan", value: "Katılımcının komutu veya markaya özel konsept" },
            { term: "Teslim", value: "QR kodla telefona, saniyeler içinde" },
            { term: "Baskı", value: "Kapsama göre planlanır" },
        ],
        galleryFrames: [
            { projectSlug: TCMB, galleryIndex: 0 },
            { projectSlug: ALLIANZ, galleryIndex: 0 },
            { projectSlug: TCMB, galleryIndex: 1 },
            { projectSlug: TCMB, galleryIndex: 2 },
            { projectSlug: TCMB, galleryIndex: 3 },
        ],
        videoProjectSlug: TCMB,
        portraitGallery: true,
    },
    quoteCard: {
        eyebrow: "Etkinliğinize özel",
        title: "Hızlı teklif alın",
        lede: "Tarih, şehir ve konseptinize göre ihtiyacınıza uygun bir teklif hazırlayalım.",
        message: "AI Greenbox teklif talebi.",
    },
    steps: {
        eyebrow: "Katılımcı deneyimi",
        title: "AI Greenbox nasıl çalışır?",
        lede: "Poz verilir, dünya seçilir, görsel saniyeler içinde telefona gelir.",
        items: [
            { title: "Poz verin", body: "Katılımcı kameranın karşısına geçer. Yapay zekâ arka planı kendisi ayırdığı için fiziksel yeşil perde şart değildir; dar alanlarda da çalışır." },
            { title: "Dünyayı seçin", body: "Katılımcı kendi komutunu yazar ya da markanız için önceden hazırladığımız konseptlerden birini seçer." },
            { title: "Yapay zekâ üretir", body: "Fotoğraf seçilen senaryoya göre saniyeler içinde işlenir; kişi yüz hatlarını ve mimiklerini koruyacak şekilde sahneye yerleştirilir." },
            { title: "QR ile teslim", body: "Ekranda beliren QR kodla görsel telefona iner; sosyal paylaşıma uygun formatta gelir. Kapsama göre yerinde baskı da yapılır." },
        ],
    },
    blocks: [
        {
            id: "calisma-bicimleri",
            eyebrow: "İki çalışma biçimi",
            title: "Arka planı kim belirlesin?",
            lede: "Etkinlik stratejinize göre iki moddan biriyle çalışırız.",
            items: [
                { title: "Katılımcı yazar", body: "Katılımcılar kendi komutlarını girer ve hayallerindeki arka planı o anda yaratır. Her kare birbirinden farklı çıkar." },
                { title: "Marka dünyası", body: "Markanızın konseptine (Rönesans, Cyberpunk, Uzay Çağı ya da tamamen marka dünyanız) göre önceden hazırlanmış şablonlar kullanılır. Süreç hızlanır, her çıktı kampanyanızın diliyle uyumlu olur." },
            ],
        },
        {
            id: "ozellestirme",
            eyebrow: "Özelleştirme",
            title: "Her çıktı markanın imzasını taşır",
            lede: "Arka plandan çerçeveye, paylaşım formatına kadar ne olacağını konseptiniz belirler.",
            items: [
                { title: "Konsept ve komut tasarımı", body: "Arka plan ve stiller marka kimliğinize ve etkinlik temanıza göre özel hazırlanır." },
                { title: "Çerçeve, logo ve başlık", body: "Çıktının üstünde kampanya başlığı, logo ve çerçeve yer alabilir. Allianz’da kampanya başlığı ve katılımcının adı kareye işlendi." },
                { title: "Ekran ve giydirme", body: "TCMB etkinliğinde galeri totemi kurumun görsel kimliğiyle hazırlandı. Ekran ve giydirme kapsamı teklif aşamasında netleşir." },
                { title: "Paylaşım formatı", body: "QR ile iletilen görseller Instagram Story ve LinkedIn gönderisi gibi sosyal paylaşıma uygun formatta sunulur." },
            ],
        },
    ],
    scope: {
        eyebrow: "Kiralama ve hazırlık",
        title: "Etkinliğe hazır bir çözüm.",
        lede: "Konsept hazırlığından kuruluma, kapsamı etkinliğinizin ihtiyaçlarına göre belirliyoruz.",
        cta: "Etkinliğinizi planlayalım ↗",
        includedTitle: "Etkinlik kapsamına göre dahil",
        included: [
            "Fotoğraf çekim sistemi ve kamera",
            "Yapay zekâ uygulaması",
            "Konsept ve arka plan hazırlığı",
            "QR kod ile dijital paylaşım",
            "Kurulum ve saha teknik desteği",
        ],
        optionalTitle: "Teklif aşamasında netleşir",
        optional: [
            "Yerinde fotoğraf baskısının kapsamı",
            "Markaya özel çerçeve ve ekran giydirmesi",
            "Özel entegrasyonlar",
            "Etkinlik süresi, lokasyon ve cihaz sayısı",
        ],
        note: "Fiyat; etkinlik süresi, lokasyon, cihaz sayısı, konsept ve tasarım kapsamı ile baskı ihtiyacına göre belirlenir.",
    },
    operations: {
        id: "kurulum-operasyon",
        eyebrow: "Etkinlik öncesi ve sahada",
        title: "Kurulum ve Operasyon",
        lede: "Donanım, hazırlık ve teknik ekip birlikte planlanır.",
    },
    cases: {
        eyebrow: "Gerçek projeler",
        title: "Seçili projeler",
        items: [
            {
                projectSlug: TCMB,
                heading: "TCMB — İstanbul Finans Merkezi",
                kicker: "Kurumsal · Merkez Akademi",
                summary: "Merkez Bankası’nın Merkez Akademi etkinliğinde katılımcılar, İstanbul Finans Merkezi temalı kurumsal çerçevede saniyeler içinde portrelerini aldı. Dijital galeri totemi ve anında basılan fotoğraf kartları etkinlik alanında yer aldı.",
                cardGalleryIndex: 0,
            },
            {
                projectSlug: ALLIANZ,
                heading: "Allianz — Adanın Yıldızı",
                kicker: "Sigorta · Spor etkinliği",
                summary: "Allianz’ın “Adanın Yıldızı” deneyiminde katılımcılar, markaya özel görsel dünyada kişiselleştirilmiş portrelerini oluşturdu.",
                cardGalleryIndex: 0,
            },
        ],
    },
    faq: {
        eyebrow: "Merak edilenler",
        title: "Sıkça sorulan sorular",
        lede: "Arka plan seçimi, kurulum, teslim ve veri konularında.",
        items: [
            {
                q: "Katılımcılar arka planı (komutu) kendileri mi yazıyor?",
                a: "Etkinlik stratejinize göre iki farklı modda çalışabiliyoruz. Dilerseniz katılımcılar kendi komutlarını girerek hayal dünyalarını yaratır; dilerseniz süreci hızlandırmak için markanızın konseptine (Rönesans, Cyberpunk, Uzay Çağı vb.) özel olarak önceden hazırladığımız şablonlar kullanılır.",
            },
            {
                q: "Fiziksel yeşil perde kurulumu zorunlu mu?",
                a: "Hayır. Yapay zekâ arka planı otomatik olarak algılayıp temizleyebildiği için fiziksel bir yeşil perde gerekmez. Bu sayede dar alanlarda da kolayca operasyon sağlanır.",
            },
            {
                q: "Çekimden sonra görselin hazırlanması ve teslimi ne kadar sürüyor?",
                a: "Poz verildikten sonra görsel saniyeler içinde işlenir. Katılımcı ekranda beliren QR kodu okutarak, sosyal paylaşıma uygun formatta hazırlanan görselini telefonuna indirir. Etkinlik kapsamına göre fiziksel baskı da yapılabilir.",
            },
            {
                q: "Yapay zekâ kişinin yüz hatlarını değiştiriyor mu?",
                a: "Sistem, katılımcının yüz hatlarını ve mimiklerini koruyacak şekilde çalışır; amaç kişinin sahnenin doğal bir parçası gibi görünmesidir. Konsept ve çıktı beklentisi etkinlik öncesinde netleştirilir.",
            },
            {
                q: "Kurulum ne kadar sürer, alanda neler gerekir?",
                a: "Tek bir standart 220V priz yeterlidir; internet için kendi 5G altyapımızı getiririz. Kurulumu etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yaparız; cihaz başına ortalama 30–40 dakika sürer ve etkinlik boyunca alanda en az 2 teknik personelimiz bulunur. İstanbul merkezliyiz ve Türkiye genelinde hizmet veriyoruz.",
            },
            {
                q: "AI Greenbox kiralama fiyatı nasıl belirlenir?",
                a: "Fiyat; etkinlik süresi, şehir ve lokasyon, cihaz sayısı, konsept ve tasarım kapsamı ile baskı ihtiyacına göre belirlenir. Nakliye, kurulum ve teknik personel tekliflere dahildir. Etkinlik tarihinizi ve şehrinizi paylaşın, net bir teklif iletelim.",
            },
            {
                q: "Çekilen fotoğraflar ve katılımcı verileri nasıl yönetilir?",
                a: "Fotoğraflar ile katılımcı iletişim verileri ayrı konulardır. Fotoğrafların saklanma koşulları etkinlik öncesinde sizinle netleştirilir. İletişim verisi toplamak deneyimin zorunlu bir parçası değildir: isteğe bağlı Data-Capture & CRM modülü yalnızca talep edildiğinde eklenir; eklenirse formda aydınlatma metni sunulur ve pazarlama izni ayrı, isteğe bağlı bir açık rızayla alınır.",
            },
        ],
    },
    closing: {
        title: "AI Greenbox’ı etkinliğinize taşıyalım.",
        lede: "Tarih, lokasyon ve konseptinizi paylaşın; uygun kurguyu birlikte hazırlayalım.",
    },
};
