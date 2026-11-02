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
 * Facts used in the copy come from src/lib/rental-ops.ts (3-day notice,
 * same-day reply, 220V, own 5G, 2 technicians, 90-day data retention).
 * Do not add claims that are not true for every booking.
 */

export interface OccasionService {
    /** Service slug in the editpanel. */
    slug: string;
    /** One line: why this experience works for this occasion. */
    why: string;
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
    faqs: { q: string; a: string }[];
    closing: { title: string; copy: string };
}

export const occasions: Record<string, Occasion> = {
    "yilbasi-partisi-aktiviteleri": {
        slug: "yilbasi-partisi-aktiviteleri",
        name: "Yılbaşı partisi",
        metaTitle: "Kurumsal Yılbaşı Partisi Aktiviteleri: AI Photobooth, Oyun ve Çekiliş | MetasoftCo",
        metaDescription:
            "Şirket yılbaşı partiniz için AI photobooth, strip photo, 360 video booth, hediye çarkı ve canlı quiz kiralama. Kurulum, 2027 temalı tasarım ve saha ekibi dahil; teklif aynı gün.",
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
            "Şirket içi yılbaşı partileri için anahtar teslim deneyimler: kurulum, 2027 temalı ve şirketinize özel tasarım, gece boyunca sahadaki ekip dahil. Teklifiniz aynı gün.",
        notice:
            "Aralık en yoğun dönemimiz. Etkinlikten 3 gün önce haber vermeniz yeterli, ama yılbaşı haftası için tarihinizi şimdiden ayırtmak size daha fazla seçenek bırakır.",
        offer: null,
        tiersTitle: "Kişi sayınıza göre öneri",
        tiers: [
            {
                range: "50–150 KİŞİ",
                title: "Butik parti",
                copy: "Herkesin en az bir kez fotoğraf çektirdiği tek bir fotoğraf noktası ve geceyi toparlayan bir çekiliş.",
                products: ["AI Photo", "Hediye Çarkı"],
            },
            {
                range: "150–500 KİŞİ",
                title: "Tüm şirket",
                copy: "Sıra oluşmaması için iki fotoğraf noktası, yemek arasında departmanlar arası canlı quiz ve sahnede çekiliş.",
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
                copy: "Girişte fotoğraf noktası: çalışanlar kar küresinde, Noel filminde ya da 2027 afişinde. Baskı ve QR ile anında ellerinde.",
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
                copy: "360 video booth ve strip photo ile gecenin en çok paylaşılan anları; herkes eve bir hatırayla döner.",
            },
        ],
        servicesTitle: "Yılbaşına uyan deneyimler",
        services: [
            { slug: "ai-photobooth-kirala", why: "Kar küresi, Noel filmi, 2027 afişi: temalar şirketinize göre hazırlanır." },
            { slug: "strip-photo", why: "Ekipçe sığılan şerit kareler; masaya konan en sevilen hatıra." },
            { slug: "360-video-booth", why: "Gecenin sosyal medyada en çok paylaşılan videosu." },
            { slug: "dijital-hediye-carki-aktivasyonu", why: "Çekilişi sahnede, herkesin önünde ve adil yapın." },
            { slug: "quiz-bilgi-yarismasi", why: "Yılın olayları ve şirket kültürü üzerine departmanlar arası yarışma." },
            { slug: "magazine-cover", why: "Herkes yılın dergi kapağında: ödül gecesine de uyar." },
            { slug: "karaoke", why: "Resmi kısmın bittiği an." },
            { slug: "glow-box-photo", why: "Işıklı kutu, karanlık salonda bile parlayan kareler." },
        ],
        themesTitle: "Yılbaşı temaları",
        themes: [],
        projectsTitle: "Şirket partilerinden",
        projectSlugs: ["rollic-summer-party-x-seri-t-foto"],
        faqs: [
            {
                q: "Yılbaşı partisi için ne kadar önceden haber vermeliyiz?",
                a: "Etkinlikten 3 gün önce haber vermeniz yeterli. Aralık en yoğun dönemimiz olduğu için tarihinizi erken netleştirmek, istediğiniz deneyimin o gece müsait olmasını garantiler.",
            },
            {
                q: "Otel ya da restoran salonunda kurulum yapabiliyor musunuz?",
                a: "Evet. Tek bir standart 220V priz yeterli; interneti kendi 5G altyapımızla getiririz, mekânın ağına ihtiyaç duymayız. Kurulumu etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yaparız.",
            },
            {
                q: "Gece boyunca başında biri olacak mı?",
                a: "Evet. Etkinlik boyunca alanda en az 2 teknik personelimiz bulunur; kurulumdan sökümüne kadar sistemi aynı ekip yönetir. Bitiş saati teklifte birlikte netleşir.",
            },
            {
                q: "Tasarımlar şirketimize özel mi hazırlanıyor?",
                a: "Evet. Logo, renkler, çerçeveler, ekran arayüzü ve yapay zekâ temaları şirketinize ve 2027 yılbaşı konseptine göre hazırlanır. Kurumsal onayınızdan sonra sahaya çıkar.",
            },
            {
                q: "Çalışan fotoğrafları KVKK'ya uygun saklanıyor mu?",
                a: "Evet. Veri sorumlusu şirketiniz, MetasoftCo ise talimatlarınızla hareket eden veri işleyendir. Fotoğraflar standart olarak 90 gün saklanır ve süre sonunda sistemlerimizden silinir; farklı bir süre sözleşmede kararlaştırılabilir.",
            },
            {
                q: "Fiyat nasıl belirleniyor?",
                a: "Kişi sayısı, etkinlik süresi, şehir ve seçtiğiniz deneyim sayısına göre. Nakliye, kurulum, tasarım ve saha ekibi fiyata dahildir. Tarih, şehir ve kişi sayısını paylaşın, fiyatı aynı gün iletelim.",
            },
            {
                q: "İstanbul dışında yılbaşı partisi için de geliyor musunuz?",
                a: "Evet. İstanbul merkezliyiz ve Türkiye genelinde kurulum yapıyoruz; şehir dışı etkinliklerde ulaşım ve konaklama teklife dahil edilir.",
            },
        ],
        closing: {
            title: "Yılbaşı tarihinizi ayırtalım",
            copy: "Tarih, şehir ve kişi sayısını paylaşın; size uygun kombinasyonu ve fiyatı aynı gün iletelim.",
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
