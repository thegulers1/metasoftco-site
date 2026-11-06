/**
 * Occasion landing pages ("etkinlik türü" sayfaları): one template, one entry
 * per occasion (yılbaşı partisi, spor günü, bayi toplantısı…). Each entry is
 * rendered by src/components/phase2/OccasionLanding.tsx at /hizmetler/<slug>.
 *
 * Adding an occasion: add an entry here, then a thin page at
 * src/app/(site)/hizmetler/<slug>/page.tsx (copy the yılbaşı one) and a
 * sitemap line. Services and projects are referenced by their editpanel slug;
 * an unpublished or missing slug is simply skipped, so the page never breaks.
 *
 * Operational scope and timing are confirmed per booking. Do not infer
 * availability, included printing or data-retention promises from shared copy.
 */

export interface OccasionService {
    /** Service slug in the editpanel. */
    slug: string;
    /** One line: why this experience works for this occasion. */
    why: string;
    /** Card name on this page when the editpanel title doesn't fit (e.g. an English product name). */
    name?: string;
}

export interface OccasionTier {
    range: string;
    title: string;
    copy: string;
    /** Product names as the contact form's chips spell them, so they arrive pre-selected. */
    products: string[];
}

export interface Occasion {
    slug: string;
    /** Short name, used in the contact form tag ("Etkinlik: Yılbaşı partisi") and breadcrumbs. */
    name: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    h1: string;
    lede: string;
    /** Seasonal line under the hero, e.g. a booking reminder. */
    notice?: string;
    /** Campaign or package, shown as a highlighted block when set. */
    offer?: { title: string; copy: string } | null;
    tiersTitle: string;
    tiers: OccasionTier[];
    flowTitle: string;
    flow: { title: string; copy: string }[];
    servicesTitle: string;
    services: OccasionService[];
    /** Theme examples (e.g. AI photo outputs) shown as a gallery when present. */
    themesTitle?: string;
    themes?: { url: string; alt: string }[];
    projectsTitle: string;
    projectSlugs: string[];
    /** Optional occasion-specific FAQ introduction; avoids an unverified response-time promise. */
    faqAside?: string;
    faqs: { q: string; a: string }[];
    closing: { title: string; copy: string };
}

export const occasions: Record<string, Occasion> = {
    "yilbasi-partisi-aktiviteleri": {
        slug: "yilbasi-partisi-aktiviteleri",
        name: "Yılbaşı partisi",
        metaTitle: "Kurumsal Yılbaşı Partisi Aktiviteleri: AI Photobooth, Oyun ve Çekiliş | MetasoftCo",
        metaDescription:
            "Şirket yılbaşı partiniz için AI photobooth, strip photo, 360 video booth, hediye çarkı ve canlı quiz kiralama. 2027 temalı deneyimler için teklif ve müsaitlik bilgisi alın.",
        keywords: [
            "kurumsal yılbaşı partisi",
            "yılbaşı partisi aktiviteleri",
            "şirket yılbaşı partisi fikirleri",
            "yılbaşı photobooth kiralama",
            "yılbaşı etkinlik organizasyonu",
            "yılbaşı çekilişi hediye çarkı",
        ],
        h1: "Yılbaşı partiniz için AI photobooth, oyun ve çekiliş.",
        lede:
            "Şirket içi yılbaşı partileri için AI photobooth, oyun ve çekiliş deneyimleri. Kurulum, 2027 temalı ve şirketinize özel tasarım ile saha ekibinin kapsamını etkinliğinize göre birlikte planlayalım.",
        notice:
            "Aralık dönemi için tarih, şehir ve katılımcı sayısını paylaşın. Seçtiğiniz deneyimlerin müsaitliği ve hazırlık takvimi kontrol edildikten sonra rezervasyon koşulları netleştirilir.",
        offer: null,
        tiersTitle: "Kişi sayınıza göre öneri",
        tiers: [
            {
                range: "50–150 KİŞİ",
                title: "Butik parti",
                copy: "Bir fotoğraf noktası ve gece akışına eşlik eden bir çekiliş önerisi; kapasite etkinlik süresi ve katılımcı akışına göre planlanır.",
                products: ["AI Photo", "Hediye Çarkı"],
            },
            {
                range: "150–500 KİŞİ",
                title: "Tüm şirket",
                copy: "Katılımcı akışını desteklemek için iki fotoğraf noktası, yemek arasında departmanlar arası canlı quiz ve sahnede çekiliş önerisi.",
                products: ["AI Photo", "Strip Photo", "İnteraktif Oyun", "Hediye Çarkı"],
            },
            {
                range: "500+ KİŞİ",
                title: "Büyük gece",
                copy: "Birden fazla fotoğraf noktası, sahne için canlı quiz, çekiliş ve gecenin sonunu paylaşılır kılan 360 video.",
                products: ["AI Photo", "Strip Photo", "360 & GIF Video Booth", "İnteraktif Oyun", "Hediye Çarkı"],
            },
        ],
        flowTitle: "Gecenin akışı",
        flow: [
            {
                title: "Karşılama",
                copy: "Girişte fotoğraf noktası: çalışanlar kar küresinde, Noel filminde ya da 2027 afişinde. QR ile dijital paylaşım planlanabilir; baskı seçeneği ve kapsamı teklifte ayrıca belirtilir.",
            },
            {
                title: "Yemek",
                copy: "Ekranlarda departmanlar arası canlı quiz: yılın olayları, şirket kültürü, kim kimdir. Telefonla katılım, canlı skor tablosu.",
            },
            {
                title: "Çekiliş",
                copy: "Hediyeler sahnede, herkesin gözü önünde dijital hediye çarkıyla dağıtılır; adil, hızlı ve gösterili.",
            },
            {
                title: "Parti",
                copy: "360 video booth ve strip photo ile geceden paylaşılabilir hatıralar. Dijital teslim ve varsa baskı kapsamı seçilen deneyime göre netleştirilir.",
            },
        ],
        servicesTitle: "Yılbaşına uyan deneyimler",
        services: [
            { slug: "ai-photobooth-kirala", why: "Kar küresi, Noel filmi, 2027 afişi: temalar şirketinize göre hazırlanır." },
            { slug: "strip-photo", why: "Ekipçe sığılan şerit kareler; masaya konan en sevilen hatıra." },
            { slug: "360-video-booth", why: "Gecenin sosyal medyada en çok paylaşılan videosu." },
            { slug: "dijital-hediye-carki-aktivasyonu", name: "Hediye Çarkı", why: "Çekilişi sahnede, herkesin önünde ve adil yapın." },
            { slug: "quiz-bilgi-yarismasi", name: "Canlı Quiz", why: "Yılın olayları ve şirket kültürü üzerine departmanlar arası yarışma." },
            { slug: "magazine-cover", why: "Herkes yılın dergi kapağında: ödül gecesine de uyar." },
            { slug: "karaoke", why: "Resmi kısmın bittiği an." },
            { slug: "glow-box-photo", name: "Glow Box", why: "Işıklı kutu, karanlık salonda bile parlayan kareler." },
        ],
        themesTitle: "Yılbaşı temaları",
        themes: [],
        projectsTitle: "Şirket partilerinden",
        projectSlugs: ["rollic-summer-party-x-seri-t-foto"],
        faqAside: "Aradığınız cevap burada yoksa etkinlik detaylarınızı paylaşarak bilgi ve teklif talep edebilirsiniz.",
        faqs: [
            {
                q: "Yılbaşı partisi için ne kadar önceden haber vermeliyiz?",
                a: "Tarih, şehir, katılımcı sayısı ve seçtiğiniz deneyimleri mümkün olduğunca erken paylaşın. Müsaitlik, ekip ve hazırlık gereksinimleri kontrol edildikten sonra rezervasyon ve kurulum takvimi netleştirilir; erken başvuru tek başına müsaitlik garantisi oluşturmaz.",
            },
            {
                q: "Otel ya da restoran salonunda kurulum yapabiliyor musunuz?",
                a: "Otel ve restoranlarda kurulum, seçilen deneyimin elektrik, internet ve alan gereksinimleri ile mekânın erişim koşulları kontrol edilerek planlanır. Kurulum günü ve saati etkinlik öncesinde netleştirilir.",
            },
            {
                q: "Gece boyunca başında biri olacak mı?",
                a: "Saha ekibinin görev kapsamı, personel sayısı ve çalışma saatleri seçilen deneyimlere göre teklifte netleştirilir. Kurulum ve söküm planı mekânla birlikte hazırlanır.",
            },
            {
                q: "Tasarımlar şirketimize özel mi hazırlanıyor?",
                a: "Evet. Logo, renkler, çerçeveler, ekran arayüzü ve yapay zekâ temaları şirketinize ve 2027 yılbaşı konseptine göre hazırlanır. Kurumsal onayınızdan sonra sahaya çıkar.",
            },
            {
                q: "Çalışan fotoğrafları nasıl saklanıyor ve veri sorumlulukları nasıl belirleniyor?",
                a: "Fotoğraflar, müşteri marka etkinlik öncesinde talep ederse en fazla 90 gün saklanıp belirlenen süreç kapsamında paylaşılabilir. Böyle bir talep yoksa etkinlik sonrasında otomatik silinir. Veri sorumlusu ve veri işleyen rolleri, bilgilendirme, gerekli izinler ve paylaşım süreçleri projenin kapsamına göre değerlendirilir.",
            },
            {
                q: "Fiyat nasıl belirleniyor?",
                a: "Fiyat; kişi sayısı, etkinlik süresi, şehir, seçilen deneyimler ve özelleştirme kapsamına göre belirlenir. Nakliye, kurulum, tasarım, saha ekibi ve varsa baskı gibi kalemlerin kapsamı teklifte belirtilir. Tarih, şehir ve kişi sayısını paylaşarak teklif talep edebilirsiniz.",
            },
            {
                q: "İstanbul dışında yılbaşı partisi için de geliyor musunuz?",
                a: "Evet. İstanbul merkezliyiz ve Türkiye genelinde kurulum yapıyoruz; şehir dışı etkinliklerde ulaşım ve konaklama teklife dahil edilir.",
            },
        ],
        closing: {
            title: "Yılbaşı etkinliğinizi planlayalım",
            copy: "Tarih, şehir ve kişi sayısını paylaşın; müsaitlik ve ihtiyaçlarınıza göre deneyim kombinasyonu ve teklif kapsamını birlikte netleştirelim.",
        },
    },
};

export function getOccasion(slug: string): Occasion | undefined {
    return occasions[slug];
}

/** Contact form tag for ?durum=<slug>. */
export function occasionLabel(slug: string | null | undefined): string | undefined {
    return slug ? occasions[slug]?.name : undefined;
}
