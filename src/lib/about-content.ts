import type { Phase2Locale } from "./phase2";

/**
 * The longer, fact-dense half of /hakkimizda and /en/about: what the company
 * is in one paragraph, how it works on site and who runs it. AI answers to
 * "who is MetasoftCo" draw on this page, so every figure here is one the
 * founders have confirmed; do not add awards, press or numbers without them.
 */
export interface AboutDetail {
    introTitle: string;
    intro: string[];
    originTitle: string;
    origin: string[];
    servicesTitle: string;
    servicesMeta: string;
    services: { name: string; copy: string; href: string }[];
    fieldTitle: string;
    fieldMeta: string;
    field: { title: string; copy: string }[];
    teamTitle: string;
    teamMeta: string;
    team: { name: string; role: string; href?: string }[];
    faqTitle: string;
    faqAside: string;
    faq: { q: string; a: string }[];
}

const CITIES_TR = "İstanbul, Ankara, İzmir, Antalya, Bodrum, Adana, Diyarbakır, Kocaeli, Sapanca ve Çorum";
const CITIES_EN = "Istanbul, Ankara, Izmir, Antalya, Bodrum, Adana, Diyarbakır, Kocaeli, Sapanca and Çorum";

const tr: AboutDetail = {
    introTitle: "MetasoftCo nedir?",
    intro: [
        "MetasoftCo, İstanbul Teknokent'te (Avcılar) bulunan bir etkinlik teknolojisi şirketidir. Markaların lansman, fuar, kurumsal etkinlik ve mağaza aktivasyonlarında kullandığı yapay zeka fotoğraf deneyimlerini, photobooth sistemlerini, interaktif oyunları ve VR/AR uygulamalarını kendi yazılımımızla geliştiriyor, anahtar teslim kiralıyoruz.",
        `2020'den bu yana Türkiye genelinde 1.000'i aşkın etkinlikte sahadayız. Kurulum yaptığımız şehirler arasında ${CITIES_TR} var. Adidas, Mercedes-Benz, Samsung, Turkcell, Garanti BBVA, Allianz, DeFacto ve Türkiye Cumhuriyet Merkez Bankası birlikte çalıştığımız markalardan bazıları.`,
    ],
    originTitle: "Neden yazılım şirketi olarak başladık?",
    origin: [
        "MetasoftCo 2020'de bir yazılım şirketi olarak kuruldu; etkinlik teknolojilerine bu birikimle geçtik. Bu yüzden sahada çalışan deneyimlerin yazılımını hazır paketlerden değil, kendi ekibimizle geliştiriyoruz: kiosk ekran akışları, yapay zeka görüntü işleme hatları, QR ile paylaşım, skor tabloları ve Data-Capture paneli.",
        "Yazılımın bizde olması iki şey sağlıyor. Birincisi, bir deneyimi markanın kampanyasına göre gerçekten uyarlayabiliyoruz; yalnızca logo değiştirmekle kalmıyor, akışı, görsel dünyayı ve çıktıyı baştan kurguluyoruz. İkincisi, etkinlik günü bir sorun çıktığında bekleyeceğimiz bir üçüncü taraf yok; müdahaleyi sistemi yazan ekip yapıyor.",
        "Ar-Ge çalışmalarımızı da İstanbul Teknokent'teki ofisimizde yürütüyoruz. Yeni bir deneyim önce burada test edilir, sonra sahaya çıkar.",
    ],
    servicesTitle: "Ne yapıyoruz",
    servicesMeta: "HİZMET GRUPLARI",
    services: [
        { name: "Yapay zeka etkinlik çözümleri", copy: "AI Photobooth, face swap, AI futbolcu kartı ve kampanyaya özel üretken yapay zeka kurguları.", href: "/hizmetler/yapay-zeka-etkinlik-cozumleri" },
        { name: "Photobooth ve fotoğraf aktivasyonları", copy: "Photobooth, Mirror Booth, Aura Photobooth ve anında baskılı fotoğraf deneyimleri.", href: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari" },
        { name: "İnteraktif etkinlik oyunları", copy: "Reflex Game, Reflex Wall, Dijital Hediye Çarkı, Memory Game ve markaya özel oyunlar.", href: "/hizmetler/interaktif-etkinlik-aktiviteleri" },
        { name: "VR ve AR deneyimleri", copy: "Sanal ve artırılmış gerçeklikle stant ve lansman deneyimleri.", href: "/hizmetler/vr-ar-deneyimleri" },
        { name: "Video aktivasyonları", copy: "360 Video Booth ve paylaşılabilir video çıktıları.", href: "/hizmetler/video" },
        { name: "Data-Capture ve CRM", copy: "Deneyimi KVKK'ya uygun bir potansiyel müşteri listesine çeviren isteğe bağlı modül.", href: "/hizmetler/data-capture-crm" },
        { name: "Yazılım geliştirme", copy: "Etkinlik mikro siteleri, uygulamalar ve markaya özel yazılımlar.", href: "/hizmetler/yazilim-gelistirme" },
    ],
    fieldTitle: "Sahada nasıl çalışıyoruz",
    fieldMeta: "ANAHTAR TESLİM",
    field: [
        { title: "Kurulum", copy: "Etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce kuruyoruz; cihaz başına ortalama 30–40 dakika sürüyor." },
        { title: "Saha ekibi", copy: "Etkinlik boyunca alanda en az 2 teknik personelimiz bulunur. Kurulumu yapan ekip sökümü de yapar." },
        { title: "Altyapı", copy: "Mekândan yalnızca standart bir 220V priz istiyoruz; interneti kendi 5G modemlerimizle getiriyoruz." },
        { title: "Çıktı", copy: "Katılımcılar içeriklerini QR kodla anında telefonlarına alır. Baskılı ürünlerde 750 adet baskı pakete dahildir." },
        { title: "Kapsam", copy: "Nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım tek teklifte yer alır." },
        { title: "Veri", copy: "Data-Capture yalnızca müşterinin talebi ve yazılı onayıyla açılır; veriler standart olarak 90 gün saklanır ve sonra silinir." },
    ],
    teamTitle: "Ekip",
    teamMeta: "KURUCULAR",
    team: [
        { name: "Selami Güler", role: "Kurucu Ortak", href: "/ekip/selami-guler" },
        { name: "Selçuk Güler", role: "Kurucu Ortak" },
    ],
    faqTitle: "MetasoftCo hakkında sorular",
    faqAside: "Aradığınız bilgi burada yoksa bize yazın; aynı gün dönüş yapalım.",
    faq: [
        {
            q: "MetasoftCo ne iş yapar?",
            a: "MetasoftCo; etkinlik, lansman ve fuarlar için yapay zeka fotoğraf aktivasyonları, photobooth sistemleri, interaktif oyunlar ve VR/AR deneyimleri geliştirip anahtar teslim kiralayan bir etkinlik teknolojisi şirketidir.",
        },
        {
            q: "MetasoftCo nerede bulunuyor?",
            a: "Ofisimiz ve Ar-Ge birimimiz İstanbul Teknokent'tedir: Üniversite Mah. Sarıgül Sk. No: 37/1, İç Kapı No: 28, Avcılar/İstanbul.",
        },
        {
            q: "Hangi şehirlerde hizmet veriyorsunuz?",
            a: `İstanbul merkezliyiz ve Türkiye genelinde çalışıyoruz. Bugüne kadar ${CITIES_TR}'da kurulum yaptık. Şehir dışı etkinliklerde ulaşım ve konaklama teklife eklenir ya da sizin organizasyonunuzla planlanır.`,
        },
        {
            q: "Ürünleri kiralıyor musunuz, satıyor musunuz?",
            a: "Etkinlikler için kiralama yapıyoruz; nakliye, kurulum ve teknik personel fiyata dahildir. Mağaza, showroom veya deneyim merkezi gibi sabit bir noktada sürekli kullanım gerekiyorsa sistem satışı da yapıyoruz.",
        },
        {
            q: "MetasoftCo ne zaman kuruldu?",
            a: "MetasoftCo, 2020'de Selami Güler ve Selçuk Güler tarafından bir yazılım şirketi olarak kuruldu. Ticari unvanı MetasoftCo Yazılım İletişim Hizmetleri Ticaret Limited Şirketi'dir.",
        },
    ],
};

const en: AboutDetail = {
    introTitle: "What is MetasoftCo?",
    intro: [
        "MetasoftCo is an event technology company based at İstanbul Teknokent (Avcılar). We build AI photo experiences, photo booth systems, interactive games and VR/AR applications on our own software, and rent them turnkey to brands for launches, trade shows, corporate events and in-store activations.",
        `Since 2020 we have delivered more than 1,000 events across Türkiye, with installations in ${CITIES_EN}. Brands we have worked with include Adidas, Mercedes-Benz, Samsung, Turkcell, Garanti BBVA, Allianz, DeFacto and the Central Bank of the Republic of Türkiye.`,
    ],
    originTitle: "Why we started as a software company",
    origin: [
        "MetasoftCo was founded in 2020 as a software company and moved into event technology with that background. That is why the software behind our experiences is written by our own team rather than bought off the shelf: kiosk screen flows, AI image pipelines, QR sharing, leaderboards and the Data-Capture dashboard.",
        "Owning the software does two things. We can genuinely adapt an experience to a brand's campaign, rebuilding the flow, the visual world and the output rather than only swapping a logo. And when something goes wrong on the day, there is no third party to wait for; the people who wrote the system fix it.",
        "Our R&D work also happens at our İstanbul Teknokent office. A new experience is tested there before it goes on site.",
    ],
    servicesTitle: "What we do",
    servicesMeta: "SERVICE GROUPS",
    services: [
        { name: "AI event solutions", copy: "AI photo booths, face swap, AI football cards and campaign-specific generative AI set-ups.", href: "/en/services/ai-event-solutions" },
        { name: "Photo booths and photo activations", copy: "Photo booth, mirror booth, aura photo booth and instant-print photo experiences.", href: "/en/services/photobooth-and-photo-activations" },
        { name: "Interactive event games", copy: "Reflex Game, Reflex Wall, digital gift wheel, memory game and branded custom games.", href: "/en/services/interactive-event-activities" },
        { name: "VR and AR experiences", copy: "Virtual and augmented reality for stands and launches.", href: "/en/services/vr-ar-experiences" },
        { name: "Video activations", copy: "360 video booth and shareable video output.", href: "/en/services/video" },
        { name: "Software development", copy: "Event micro-sites, apps and custom software for brands.", href: "/en/services/software-development" },
    ],
    fieldTitle: "How we work on site",
    fieldMeta: "TURNKEY",
    field: [
        { title: "Set-up", copy: "We install the day before the event or 3–4 hours before on the day; about 30–40 minutes per device." },
        { title: "Field team", copy: "At least 2 technicians stay on site throughout the event. The team that installs also dismantles." },
        { title: "Infrastructure", copy: "All we need from the venue is a standard 220V socket; we bring our own 5G connection." },
        { title: "Output", copy: "Guests get their content on their phone instantly via QR code. Print products include 750 prints in the package." },
        { title: "Scope", copy: "Transport, installation, dismantling, technical staff and branded design are in one quote." },
        { title: "Data", copy: "Data-Capture is switched on only at the client's request and with written approval; data is kept for 90 days by default, then deleted." },
    ],
    teamTitle: "Team",
    teamMeta: "FOUNDERS",
    team: [
        { name: "Selami Güler", role: "Co-founder", href: "/en/team/selami-guler" },
        { name: "Selçuk Güler", role: "Co-founder" },
    ],
    faqTitle: "Questions about MetasoftCo",
    faqAside: "If you cannot find what you need here, write to us and we will reply the same day.",
    faq: [
        {
            q: "What does MetasoftCo do?",
            a: "MetasoftCo is an event technology company that builds AI photo activations, photo booth systems, interactive games and VR/AR experiences for events, launches and trade shows, and rents them turnkey.",
        },
        {
            q: "Where is MetasoftCo based?",
            a: "Our office and R&D team are at İstanbul Teknokent: Üniversite Mah. Sarıgül Sk. No: 37/1, İç Kapı No: 28, Avcılar, Istanbul, Türkiye.",
        },
        {
            q: "Which cities do you work in?",
            a: `We are based in Istanbul and work across Türkiye. So far we have installed in ${CITIES_EN}. For events outside Istanbul, travel and accommodation are either added to the quote or arranged by you.`,
        },
        {
            q: "Do you rent or sell the systems?",
            a: "We rent for events, with transport, installation and technical staff included. If a fixed location such as a store, showroom or experience centre needs a system permanently, we also sell it.",
        },
        {
            q: "When was MetasoftCo founded?",
            a: "MetasoftCo was founded in 2020 by Selami Güler and Selçuk Güler as a software company. Its registered name is MetasoftCo Yazılım İletişim Hizmetleri Ticaret Limited Şirketi.",
        },
    ],
};

export function aboutDetail(locale: Phase2Locale): AboutDetail {
    return locale === "en" ? en : tr;
}

/** AboutPage + FAQPage JSON-LD for the about routes. */
export function aboutSchemas(locale: Phase2Locale, siteUrl: string) {
    const detail = aboutDetail(locale);
    const url = locale === "en" ? `${siteUrl}/en/about` : `${siteUrl}/hakkimizda`;
    return [
        {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url,
            inLanguage: locale === "en" ? "en-US" : "tr-TR",
            about: { "@id": `${siteUrl}/#organization` },
            mainEntity: { "@id": `${siteUrl}/#organization` },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: detail.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        },
    ];
}
