import type { ServiceTemplateProfile } from "./types";

const ADIDAS = "adidas-evo-sl-x-ai-try-on-photo";
const DEFACTO = "defacto-x-afra-saracoglu-ai-fashion-experience";

export function isFashionMirrorPage(category: string, service: string) {
    return category === FASHION_MIRROR_PROFILE.categorySlug && service === FASHION_MIRROR_PROFILE.serviceSlug;
}

/**
 * AI Fashion Mirror copy. Every statement comes from the service record
 * (content / FAQ) or from the two linked project records; no figure appears
 * here that is not already published on the live service page.
 */
export const FASHION_MIRROR_PROFILE: ServiceTemplateProfile = {
    categorySlug: "yapay-zeka-etkinlik-cozumleri",
    serviceSlug: "ai-fashion-mirror-akilli-ayna",
    productName: "AI Fashion Mirror",
    product: {
        eyebrow: "Yapay zekâ ile sanal kıyafet deneme",
        titleLines: ["AI Fashion Mirror", "Kiralama"],
        intro: "Markanızın gerçek koleksiyonunu, etkinlik katılımcılarının üzerinde yapay zekâ ile gösterin.",
        description: "Katılımcı kıyafet değiştirmeden, tek bir fotoğrafla kişiselleştirilmiş bir AI Try-On görseline ulaşır. Koleksiyon hazırlığı, kiosk, kurulum ve saha desteğini birlikte planlıyoruz.",
        badges: ["Markanın gerçek koleksiyonu", "QR ile dijital teslim", "Türkiye geneli kurulum"],
        specs: [
            { term: "Deneyim", value: "Fotoğraf tabanlı AI Try-On" },
            { term: "Operasyon", value: "Kurulum ve saha ekibi" },
            { term: "Fotoğraf baskısı", value: "Kapsama göre planlanır" },
        ],
        galleryFrames: [
            { projectSlug: ADIDAS, galleryIndex: 0 },
            { projectSlug: DEFACTO, galleryIndex: 1 },
            { projectSlug: ADIDAS, galleryIndex: 2 },
            { projectSlug: DEFACTO, galleryIndex: 3 },
            { projectSlug: ADIDAS, galleryIndex: 3 },
        ],
        videoProjectSlug: ADIDAS,
        portraitGallery: true,
    },
    quoteCard: {
        eyebrow: "Etkinliğinize özel",
        title: "Hızlı teklif alın",
        lede: "Tarih, şehir ve koleksiyonunuza göre ihtiyacınıza uygun bir teklif hazırlayalım.",
        message: "AI Fashion Mirror (AI Try-On) teklif talebi.",
    },
    steps: {
        eyebrow: "Katılımcı deneyimi",
        title: "AI Fashion Mirror nasıl çalışır?",
        lede: "Deneme kabinine girmeden, fotoğraftan kişiselleştirilmiş moda görseline.",
        items: [
            { title: "Fotoğraf çekilir", body: "Kamera ve dokunmatik ekranla katılımcının fotoğrafı alınır; bu fotoğraf görselin temel referansıdır." },
            { title: "Koleksiyondan ürün seçilir", body: "Etkinlikten önce hazırlanan ürün ve kombinler arasından katılımcı dokunmatik ekranda seçim yapar." },
            { title: "Yapay zekâ giydirir", body: "Sistem seçilen ürünü fotoğrafa uygular; duruş, oran, kumaş görünümü ve ışık uyumu dikkate alınarak doğal bir sonuç hedeflenir." },
            { title: "Görsel teslim edilir", body: "AI Try-On görseli ekranda gösterilir, QR kodla paylaşılır; kapsama göre fiziksel baskı olarak teslim edilir." },
        ],
    },
    blocks: [
        {
            id: "koleksiyon-hazirligi",
            eyebrow: "Koleksiyon hazırlığı",
            title: "Koleksiyon sisteme etkinlikten önce hazırlanır",
            lede: "Sahadaki akıcılık, etkinlik öncesi hazırlıktan gelir.",
            items: [
                { title: "Ürün görselleri", body: "Markanın ürün fotoğrafları ve koleksiyon görselleri sisteme alınır. Yeni sezon, lansman ürünleri veya kampanya parçaları seçilebilir." },
                { title: "Seçki ve kapsam", body: "Spor giyim, mont, ceket, üst giyim, özel kombin ve kampanya parçaları deneyime dahil edilebilir. Entegre edilecek ürün sayısı proje kapsamında netleşir." },
                { title: "Model hazırlığı", body: "Koleksiyona göre yapay zekâ iş akışı kurulur. DeFacto x Afra Saraçoğlu projesinde kumaş dokusu, dikiş detayı ve desenler için özel eğitilmiş modeller kullanıldı." },
                { title: "Arayüz ve kiosk giydirmesi", body: "Dokunmatik ekranın renkleri, ürün seçim alanları, logolar ve kiosk dış giydirmesi markanın görsel kimliğine göre tasarlanır." },
            ],
        },
        {
            id: "kullanim-alanlari",
            eyebrow: "Kullanım alanları",
            title: "Hangi etkinliklerde kullanılır?",
            lede: "Aynı sistem, farklı markalara ve etkinlik formatlarına uyarlanır.",
            items: [
                { title: "Moda koleksiyonu lansmanları", body: "Yeni sezon ürünlerinin katılımcılar üzerinde dijital olarak gösterilmesi." },
                { title: "Spor giyim etkinlikleri", body: "Spor markalarının koleksiyonlarına özel AI Try-On deneyimleri." },
                { title: "Fuar ve kurumsal organizasyonlar", body: "Ziyaretçilere interaktif ürün deneyimi sunulması." },
                { title: "AVM ve perakende etkinlikleri", body: "Mağaza ve alışveriş alanlarında sanal kombin deneyimi." },
                { title: "Pop-up mağazalar ve marka aktivasyonları", body: "Sınırlı süreli koleksiyonların ve kampanya ürünlerinin kişiselleştirilmiş görsellerle tanıtılması." },
                { title: "Influencer ve basın lansmanları", body: "Davetlilere özel moda çekimi görselleri." },
            ],
        },
        {
            id: "sinirlar",
            eyebrow: "Netlik için",
            title: "Ne olduğu, ne olmadığı",
            lede: "Beklentiyi baştan doğru kurmak için.",
            items: [
                { title: "Fotoğraf tabanlı sanal deneme", body: "Sistem çekilen fotoğraf üzerinde yapay zekâ ile görsel üretir; canlı video takibiyle çalışan gerçek zamanlı bir AR aynası değildir." },
                { title: "Görsel deneyim, ölçü doğrulaması değil", body: "Sonuç, ürünün kişi üzerinde nasıl görünebileceğini gösterir; fiziksel beden ölçümünü veya kalıbı kesin doğrulayan bir prova sistemi değildir." },
            ],
        },
    ],
    scope: {
        eyebrow: "Kiralama ve hazırlık",
        title: "Etkinliğe hazır bir çözüm.",
        lede: "Koleksiyon hazırlığından kuruluma, kapsamı etkinliğinizin ihtiyaçlarına göre belirliyoruz.",
        cta: "Etkinliğinizi planlayalım ↗",
        includedTitle: "Etkinlik kapsamına göre dahil",
        included: [
            "Fotoğraf kiosk sistemi ve kamera",
            "Yapay zekâ uygulaması",
            "Markaya özel ekran ve kiosk tasarımı",
            "Ürün koleksiyonu hazırlığı",
            "QR kod ile dijital paylaşım",
            "Kurulum ve saha teknik desteği",
        ],
        optionalTitle: "Teklif aşamasında netleşir",
        optional: [
            "Fiziksel fotoğraf baskısının kapsamı",
            "Özel entegrasyonlar",
            "Entegre edilecek ürün ve kombin sayısı",
            "Etkinlik süresi, lokasyon ve cihaz sayısı",
        ],
        note: "Fiyat; etkinlik süresi, lokasyon, cihaz sayısı, ürün seçenekleri, baskı ihtiyacı ve tasarım kapsamına göre belirlenir.",
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
                projectSlug: ADIDAS,
                heading: "Adidas EVO SL AI Try-On",
                kicker: "Spor giyim · Ürün lansmanı",
                summary: "Adidas EVO SL lansmanında katılımcılar koleksiyon parçalarını tek bir fotoğrafla üzerlerinde gördü; sonuçlar QR kodla paylaşıldı ve fiziksel çıktı olarak teslim edildi.",
                cardGalleryIndex: 0,
            },
            {
                projectSlug: DEFACTO,
                heading: "DeFacto x Afra Saraçoğlu AI Fashion",
                kicker: "Moda · Koleksiyon lansmanı",
                summary: "DeFacto'nun Afra Saraçoğlu koleksiyonu lansmanında katılımcılar kıyafet değiştirmeden koleksiyonun kombinlerini kendi üzerlerinde denedi.",
                cardGalleryIndex: 1,
            },
        ],
    },
    faq: {
        eyebrow: "Merak edilenler",
        title: "Sıkça sorulan sorular",
        lede: "Koleksiyon entegrasyonu, kurulum ve teslim seçenekleri hakkında.",
        items: [
            {
                q: "AI Fashion Mirror nedir ve nasıl çalışır?",
                a: "AI Fashion Mirror, katılımcıların markanın gerçek koleksiyonundaki kıyafetleri yapay zekâ ile dijital olarak denemesini sağlayan interaktif bir etkinlik aktivitesidir. Katılımcının fotoğrafı kamera ve dokunmatik ekranla çekilir, katılımcı koleksiyondan bir ürün veya kombin seçer ve yapay zekâ seçilen ürünü fotoğrafa uygulayarak kişiselleştirilmiş bir AI Try-On görseli oluşturur. Katılımcının kıyafet değiştirmesi ya da deneme kabinine girmesi gerekmez. Görsel QR kodla paylaşılabilir; fiziksel baskı etkinlik kapsamına göre planlanır.",
            },
            {
                q: "AI Try-On sistemine markamızın gerçek kıyafetleri eklenebilir mi?",
                a: "Evet. Markanızın gerçek koleksiyonundan seçilen kıyafet ve kombinler sisteme entegre edilebilir; spor giyim, mont, ceket, üst giyim, özel kombin ve kampanya parçaları dahil edilebilir. Ürün görselleri etkinlikten önce hazırlanır. Entegre edilecek ürün sayısı ve uygunluk proje kapsamında belirlenir. Ekran arayüzü, fotoğraf konseptleri ve kiosk giydirmesi de markanızın kimliğine göre özelleştirilebilir.",
            },
            {
                q: "AI Fashion Mirror ile gerçek zamanlı akıllı ayna arasındaki fark nedir?",
                a: "AI Fashion Mirror fotoğraf tabanlı yapay zekâ görsel üretimi kullanır: katılımcı fotoğrafını çektirip kıyafet seçimini yaptıktan sonra sistem yeni bir AI Try-On görseli oluşturur. Gerçek zamanlı akıllı aynalar ise genellikle kullanıcının hareketlerini canlı video veya artırılmış gerçeklik üzerinden takip eder; AI Fashion Mirror böyle bir canlı AR aynası değildir. Sonuç, ürünün kişi üzerinde nasıl görünebileceğini gösteren görsel bir deneyimdir; fiziksel beden ölçümünü veya kalıbı kesin olarak doğrulayan bir prova sistemi değildir.",
            },
            {
                q: "AI Fashion Mirror hangi etkinliklerde kullanılabilir?",
                a: "Moda koleksiyonu lansmanları, spor giyim etkinlikleri, fuarlar, AVM ve perakende etkinlikleri, pop-up mağazalar, marka aktivasyonları ile influencer ve basın lansmanları için uygundur. Adidas EVO SL ve DeFacto x Afra Saraçoğlu projeleri, deneyimin farklı marka koleksiyonlarına nasıl uyarlandığının örnekleridir. Sistem standart 220V prizin bulunduğu kapalı alanlara, fuar standlarına ve lansman alanlarına kurulur; internet için kendi 5G altyapımızı getiririz. İstanbul merkezliyiz ve Türkiye genelinde hizmet veriyoruz.",
            },
            {
                q: "AI Fashion Mirror kiralama hizmetine neler dahildir?",
                a: "Etkinlik kapsamına göre fotoğraf kiosk sistemi ve kamera, yapay zekâ uygulaması, markaya özel ekran ve kiosk tasarımı, ürün koleksiyonu hazırlığı, QR kod ile dijital paylaşım, kurulum ve saha teknik desteği yer alır. Kurulumu etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yaparız; cihaz başına ortalama 30–40 dakika sürer ve etkinlik boyunca alanda en az 2 teknik personelimiz bulunur. Fiziksel fotoğraf baskısı ve özel entegrasyonların kapsamı teklif aşamasında netleştirilir.",
            },
            {
                q: "AI Fashion Mirror kiralama fiyatı nasıl belirlenir?",
                a: "Fiyat; etkinlik süresi, şehir ve lokasyon, cihaz sayısı, kullanılacak ürün ve kombin seçenekleri, baskı ihtiyacı ve markaya özel tasarım kapsamına göre belirlenir. Tekliflerimiz anahtar teslimdir: nakliye, kurulum, teknik personel ve markaya özel tasarım fiyata dahildir. Şehir dışı etkinliklerde ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır. Etkinlik tarihinizi, şehrinizi ve koleksiyonunuzu paylaşın, size net bir teklif iletelim.",
            },
            {
                q: "Toplanan veriler KVKK kapsamında nasıl yönetiliyor?",
                a: "AI Try-On fotoğrafları ile katılımcı iletişim verileri ayrı konulardır. AI Try-On fotoğraflarının saklanma koşulları etkinlik öncesinde müşteriyle birlikte netleştirilir. Katılımcı iletişim verisi toplamak ise deneyimin zorunlu bir parçası değildir: isteğe bağlı Data-Capture & CRM modülü yalnızca talep edildiğinde eklenir. Modül eklenirse katılımcılar QR kodla ulaştıkları mikro sitede ad, şirket ve e-posta gibi bilgilerini paylaşabilir; formda aydınlatma metni sunulur ve pazarlama izni ayrı, isteğe bağlı bir açık rızayla alınır. Bu verilerin işlenme ve paylaşım koşulları ile saklama süresi etkinlik öncesinde müşteriyle netleştirilir.",
            },
        ],
    },
    closing: {
        title: "AI Fashion Mirror’ı etkinliğinize taşıyalım.",
        lede: "Tarih, lokasyon ve koleksiyonunuzu paylaşın; uygun kurguyu birlikte hazırlayalım.",
    },
};
