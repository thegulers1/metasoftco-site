import { phase2CategorySlugs, phase2Routes, type Phase2Locale } from "@/lib/phase2";
import { SOFTWARE_CATEGORY_PATH } from "@/lib/software";

/**
 * Copy for the "Hatıra Masası" homepage designed in Claude Design (October
 * 2026). Every number is a verified operational fact — 1,000+ events, five
 * years since the 2020 founding, the ten cities on record — and every
 * "Referans" names a published project, so do not round up or invent.
 * Project names and counts come from the database at request time.
 */

/** Service slugs (Turkish) whose editpanel image feeds the hover preview. */
export const homeServiceImageSlugs = [
    "ai-photobooth-kirala",
    "ai-greenbox-kiralama",
    "ai-football-card",
    "ai-draw-portre-cizim",
    "photobooth-kirala",
    "strip-photo",
    "cabin-photo",
    "glow-box-photo",
    "dijital-hediye-carki-aktivasyonu",
    "quiz-bilgi-yarismasi",
] as const;

/** Project slugs whose cover image is used by the hero souvenirs or a service preview. */
export const homeProjectImageSlugs = {
    rayban: "ray-ban-x-strip-photo",
    tcmb: "tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi",
    adidas: "adidas-evo-sl-x-ai-try-on-photo",
} as const;

/** Stable cart keys; the souvenirs on the hero table point at these too. */
export type HomeServiceKey =
    | "ai-photo" | "ai-greenbox" | "ai-try-on" | "ai-football-card" | "ai-draw" | "photobooth"
    | "strip-photo" | "cabin-photo" | "glow-box" | "gift-wheel" | "game-quiz" | "software";

type HomeServiceDef = {
    key: HomeServiceKey;
    name: string;
    desc: string;
    href: string;
    image: { service: (typeof homeServiceImageSlugs)[number] } | { project: keyof typeof homeProjectImageSlugs } | null;
};

type HomeRoutes = Record<keyof typeof phase2Routes.tr, string>;

const trCats = phase2CategorySlugs.tr;
const enCats = phase2CategorySlugs.en;

const tr = {
    routes: phase2Routes.tr as HomeRoutes,
    locales: { tr: phase2Routes.tr.home as string, en: phase2Routes.en.home as string },
    nav: [
        { href: phase2Routes.tr.capabilities, label: "KİRALAMA" },
        { href: phase2Routes.tr.products, label: "SATIN ALMA" },
        { href: phase2Routes.tr.work, label: "PROJELER" },
        { href: phase2Routes.tr.about, label: "HAKKIMIZDA" },
        { href: phase2Routes.tr.contact, label: "İLETİŞİM" },
    ] as { href: string; label: string }[],
    navAria: "Ana menü",
    skipLink: "İçeriğe geç",
    homeAria: "MetasoftCo anasayfa",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    menuLabel: "MENÜ",
    localeAria: { tr: "Türkçe", en: "English" },
    cartButton: (n: number) => `TEKLİF LİSTESİ (${n})`,
    quoteCta: "TEKLİF AL ↗",
    cursor: { go: "GİT", write: "YAZ", view: "İNCELE", all: "TÜMÜ", cart: "LİSTE", add: "EKLE", remove: "ÇIKAR", ask: "SOR", grab: "TUT", holding: "TUTTUN", flip: "ÇEVİR", plus: "+ EKLE", added: "EKLENDİ" },
    introWords: ["FİKİR", "YAZILIM", "FİZİKSEL ÜRETİM", "SAHA OPERASYONU"],
    // The headline says what we rent, so HR, event and procurement visitors know in one read.
    heroTitle: "Etkinliğiniz için AI photobooth, photobooth ve interaktif oyun kiralıyoruz.",
    heroLede: "Kurulum, markanıza özel tasarım ve sahadaki ekip dahil, anahtar teslim. Mağaza, showroom ya da ofis gibi kalıcı noktalar için sistemlerimizi satın da alabilirsiniz.",
    heroStats: [
        { value: "1.000+", label: "ETKİNLİK" },
        { value: "10", label: "ŞEHİR" },
        { value: "5+", label: "YIL" },
    ],
    heroPrimary: "ETKİNLİK İÇİN TEKLİF AL ↗",
    heroSecondary: "KALICI KURULUM İÇİN SATIN AL →",
    heroLogos: "Çalıştığımız markalardan bazıları",
    heroDrag: "SÜRÜKLE · FIRLAT",
    heroTap: "DOKUN · ÇEVİR",
    heroScroll: "KAYDIR ↓",
    souvenirAdd: "+ TEKLİFE EKLE",
    marquee: "Oyna ✶ Dokun ✶ Paylaş ✶ Hatırla ✶",
    audience: {
        title: "Size uygun yoldan başlayın",
        items: [
            {
                name: "İK & kurum içi etkinlik",
                desc: "Yılbaşı partisi, bayi toplantısı, şirket günü, lansman. Çalışanlarınızın sıraya girdiği deneyimler; baskı ve QR ile paylaşım dahil.",
                cta: "İK etkinliği için teklif al →",
                href: `${phase2Routes.tr.contact}?kitle=ik`,
            },
            {
                name: "Ajans & etkinlik organizatörü",
                desc: "Tarih ve şehri söyleyin; cihaz, kurulum ve saha ekibi bizden. Ürün sayfalarında alan, elektrik ve kapasite bilgileri hazır.",
                cta: "Kiralama teklifi al →",
                href: `${phase2Routes.tr.contact}?kitle=ajans`,
            },
            {
                name: "Satın alma ekipleri",
                desc: "Teklif şirket unvanınıza hazırlanır, faturalı çalışırız. Referanslar, kapsam ve şirket bilgileri kurumsal sunumda.",
                cta: "Kurumsal sunumu incele →",
                href: "/sunum",
            },
            {
                name: "Mağaza, showroom & ofis",
                desc: "Kiralamak yerine satın alın: sistem mekânınıza göre üretilir, kurulur ve kalıcı olarak teslim edilir.",
                cta: "Satın alma seçenekleri →",
                href: phase2Routes.tr.products,
            },
        ],
    },
    workTitle: "Seçili projeler",
    workMeta: (count: number) => `${count} PROJE · KAYDIRDIKÇA İLERLER`,
    workAll: "Tüm projeler →",
    brandsTitle: "Yeniliğe yön veren markaların tercihi",
    brandsMeta: "REFERANSLAR",
    servicesTitle: "Etkinliğinize ekleyebileceğiniz deneyimler",
    servicesMeta: "BEĞENDİKLERİNİZİ TEKLİF LİSTESİNE EKLEYİN",
    serviceAdd: "+ TEKLİFE EKLE",
    serviceAdded: "✓ LİSTEDE",
    services: [
        { key: "ai-photo", name: "AI Photo", desc: "Katılımcılar saniyeler içinde farklı dünyalara taşınır, kendi karakterlerini oluşturur.", href: `/hizmetler/${trCats.ai}/ai-photobooth-kirala`, image: { service: "ai-photobooth-kirala" } },
        { key: "ai-greenbox", name: "AI Greenbox", desc: "Katılımcıları markaya özel tasarlanan dijital dünyalara taşır. Referans: TCMB, Allianz.", href: `/hizmetler/${trCats.ai}/ai-greenbox-kiralama`, image: { service: "ai-greenbox-kiralama" } },
        { key: "ai-try-on", name: "AI Try-On", desc: "Katılımcı ürünü kamerada üzerinde görür. Referans: adidas EVO SL.", href: `${phase2Routes.tr.work}/adidas-evo-sl-x-ai-try-on-photo`, image: { project: "adidas" } },
        { key: "ai-football-card", name: "AI Football Card", desc: "Katılımcı kendi futbolcu kartında. Referans: Akmerkez.", href: `/hizmetler/${trCats.ai}/ai-football-card`, image: { service: "ai-football-card" } },
        { key: "ai-draw", name: "AI Draw", desc: "Yapay zekâ destekli çizim deneyimi. Referans: BSH.", href: `/hizmetler/${trCats.ai}/ai-draw-portre-cizim`, image: { service: "ai-draw-portre-cizim" } },
        { key: "photobooth", name: "Photobooth", desc: "Markalı çerçeveyle fotoğraf ve GIF; saniyeler içinde baskı, QR ile anında paylaşım.", href: `/hizmetler/${trCats.photo}/photobooth-kirala`, image: { service: "photobooth-kirala" } },
        { key: "strip-photo", name: "Strip Photo", desc: "Kareler tek şeritte; anında baskı ve QR ile dijital indirme. Referans: Ray-Ban, Rollic.", href: `/hizmetler/${trCats.photo}/strip-photo`, image: { service: "strip-photo" } },
        { key: "cabin-photo", name: "Kabin Fotoğraf", desc: "Dış kasa tasarımından yazılım arayüzüne anahtar teslim kabin. Referans: Origins, BUD.", href: `/hizmetler/${trCats.photo}/cabin-photo`, image: { service: "cabin-photo" } },
        { key: "glow-box", name: "Glow Box", desc: "Işıklı fotoğraf kutusu. Referans: AME'28.", href: `/hizmetler/${trCats.photo}/glow-box-photo`, image: { service: "glow-box-photo" } },
        { key: "gift-wheel", name: "Hediye Çarkı", desc: "Dijital hediye çarkı aktivasyonu. Referans: Pegasus.", href: `/hizmetler/${trCats.interactive}/dijital-hediye-carki-aktivasyonu`, image: { service: "dijital-hediye-carki-aktivasyonu" } },
        { key: "game-quiz", name: "İnteraktif Oyun & Quiz", desc: "Unity ile markaya özel oyunlar; 400–500 kullanıcılı canlı quiz. Referans: Enerjisa.", href: `/hizmetler/${trCats.interactive}`, image: { service: "quiz-bilgi-yarismasi" } },
    ] as HomeServiceDef[],
    whyTitle: "Fikirden sahaya tek ekip",
    whyMeta: ["NEDEN METASOFTCO", "İSTANBUL TEKNOKENT · AVCILAR"],
    why: [
        { title: "Fikir", copy: "Hedef kitleyi, mekânı ve kampanya fikrini katılımcı yolculuğuna çeviririz." },
        { title: "Yazılım", copy: "Sahada gördüğünüz her yapay zekâ deneyimini, paneli ve oyunu kendi ekibimiz yazar." },
        { title: "Fiziksel üretim", copy: "Kabinin dış kasasından markalı arayüzüne kadar üretiriz; sabit noktalar için sistemlerimizi satın da alabilirsiniz." },
        { title: "Saha operasyonu", copy: "İstanbul merkezli, Türkiye geneli kurulum ve etkinlik günü operasyonu." },
    ],
    software: {
        meta: "YAZILIM GELİŞTİRME",
        title: "Etkinliklerin arkasındaki yazılım gücü",
        lede: "Sahada gördüğünüz her yapay zekâ deneyimini, paneli ve oyunu kendi ekibimiz yazıyor. Aynı ekip; mobil uygulamadan şirket içi süreç yazılımlarına kadar markanıza özel projeler geliştiriyor.",
        cards: [
            { title: "Mobil Uygulama", body: "iOS ve Android için tek kod tabanıyla cross-platform uygulamalar." },
            { title: "Web Uygulaması & Panel", body: "Yönetim panelleri, portallar ve kuruma özel CRM çözümleri." },
            { title: "Süreç Yazılımları", body: "Talep, onay, iş akışı ve raporlama sistemleri." },
            { title: "Yapay Zekâ & Oyun", body: "AI entegrasyonları, Unity ile oyun ve eğitim uygulamaları." },
        ],
        cta: "Yazılım hizmetleri →",
        href: SOFTWARE_CATEGORY_PATH,
        terminalTitle: "metasoft@teknokent ~ canlı",
        terminal: [
            "$ metasoft deploy enerjisa-quiz --users 500",
            "  ✓ 400–500 kullanıcı · canlı lider tablosu",
            "$ metasoft publish become-hacker zekai",
            "  ✓ App Store & Google Play",
            "$ metasoft run ai-photo --style \"süper kahraman\"",
            "  ✓ baskı + QR ile dijital indirme hazır",
            "$ metasoft sync data-capture --crm",
            "  ✓ katılımcı verisi müşteri paneline aktarıldı",
        ],
    } as { meta: string; title: string; lede: string; cards: { title: string; body: string }[]; cta: string; href: string; terminalTitle: string; terminal: string[] } | null,
    deck: {
        kicker: "SUNUM 2026 · PDF",
        title: "Sektörünüze göre hazırlanmış sunumu alın.",
        lede: "Sektörünüzü seçin; o sektördeki projelerimizi ve önerdiğimiz deneyimleri içeren sunumu e-postanıza gönderelim.",
        sectors: ["Otomotiv", "Finans", "Perakende", "FMCG", "Teknoloji", "Kamu & Kurum"],
        email: "E-posta adresiniz",
        send: "SUNUMU İSTE ↗",
        sending: "GÖNDERİLİYOR…",
        sent: "Talebiniz alındı. Sunumu e-postanıza göndereceğiz.",
        failed: "Gönderilemedi. Lütfen geçerli bir e-posta girip tekrar deneyin.",
        view: "Genel sunumu şimdi inceleyin →",
        viewHref: "/sunum",
        subject: (sector: string) => `Sunum talebi — ${sector}`,
        message: (sector: string) => `Anasayfadaki sunum formundan "${sector}" sektörü için sunum istendi.`,
        visitor: "Anasayfa sunum talebi",
    },
    contactMeta: "SIRADAKİ DENEYİM",
    contactLede: "Sıradaki etkinliğinizi insanların katılmak isteyeceği bir deneyime dönüştürelim.",
    contactBig: "Konuşalım.",
    contactLabels: { email: "E-POSTA", phone: "TELEFON", address: "ADRES", follow: "TAKİP EDİN" },
    address: "İstanbul Teknokent No: 37/1, İç Kapı No: 28, Avcılar / İstanbul",
    legal: [
        { href: "/gizlilik", label: "Gizlilik Politikası" },
        { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
    ],
    baseline: "FİKİR · YAZILIM · FİZİKSEL ÜRETİM · SAHA OPERASYONU",
    whatsappText: "Merhaba, bilgi almak istiyorum.",
    aiButton: "✶ METASOFT AI'YA SOR",
    /** `name` arrives already upper-cased for display. */
    toastAdded: (name: string) => `+ ${name} TEKLİF LİSTESİNE EKLENDİ`,
    toastOpen: "LİSTEYİ AÇ",
    cart: {
        title: (n: number) => `Teklif listeniz (${n})`,
        close: "Teklif listesini kapat",
        empty: "Henüz bir deneyim eklemediniz. Aşağıdaki deneyimler listesinden seçebilir ya da doğrudan iletişim formunu kullanabilirsiniz.",
        promise: "Bu bir satın alma değil. Fiyat ve tarih uygunluğunu 1 iş günü içinde size iletiriz.",
        intentLabel: "Ne düşünüyorsunuz?",
        intents: [
            { value: "rent", label: "Etkinlik için kiralama" },
            { value: "buy", label: "Kalıcı kurulum, satın alma" },
        ],
        company: "Şirket",
        remove: "ÇIKAR",
        name: "Ad Soyad *",
        phone: "Telefon *",
        email: "Kurumsal e-posta *",
        event: "Etkinlik tarihi ve şehir",
        consent: "Göndererek, bilgilerinizin teklif hazırlamak için işlenmesini kabul edersiniz.",
        privacy: "Gizlilik Politikası",
        submit: "TEKLİF AL ↗",
        sending: "GÖNDERİLİYOR…",
        needItem: "Önce listeye en az bir deneyim ekleyin.",
        needFields: "Ad, telefon ve e-posta zorunludur.",
        failed: "Gönderilemedi. Lütfen tekrar deneyin ya da info@metasoftco.com adresine yazın.",
        sentTitle: "Talebiniz alındı.",
        sentBody: "1 iş günü içinde fiyat ve uygunlukla size dönüş yapacağız.",
        notes: "Anasayfadaki teklif listesinden gönderildi.",
        notesIntent: (label: string) => `Talep türü: ${label}`,
        notesCompany: (company: string) => `Şirket: ${company}`,
    },
    tags: { ai: "YAPAY ZEKÂ", photo: "FOTOĞRAF", interactive: "İNTERAKTİF", fallback: "AKTİVASYON" },
};

export type HomeCopy = typeof tr;

const en: HomeCopy = {
    routes: phase2Routes.en,
    locales: tr.locales,
    nav: [
        { href: phase2Routes.en.capabilities, label: "RENTAL" },
        { href: phase2Routes.en.products, label: "BUY" },
        { href: phase2Routes.en.work, label: "WORK" },
        { href: phase2Routes.en.about, label: "ABOUT" },
        { href: phase2Routes.en.contact, label: "CONTACT" },
    ],
    navAria: "Main menu",
    skipLink: "Skip to content",
    homeAria: "MetasoftCo home",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuLabel: "MENU",
    localeAria: tr.localeAria,
    cartButton: (n: number) => `QUOTE LIST (${n})`,
    quoteCta: "GET A QUOTE ↗",
    cursor: { go: "GO", write: "WRITE", view: "VIEW", all: "ALL", cart: "LIST", add: "ADD", remove: "REMOVE", ask: "ASK", grab: "GRAB", holding: "GOT IT", flip: "FLIP", plus: "+ ADD", added: "ADDED" },
    introWords: ["IDEA", "SOFTWARE", "PHYSICAL BUILD", "FIELD OPERATIONS"],
    heroTitle: "AI photo booths, photo booths and interactive games for rent, for your event.",
    heroLede: "Turnkey: setup, brand-specific design and the on-site team included. For permanent spots such as stores, showrooms or offices, our systems can also be bought.",
    heroStats: [
        { value: "1,000+", label: "EVENTS" },
        { value: "10", label: "CITIES" },
        { value: "5+", label: "YEARS" },
    ],
    heroPrimary: "GET AN EVENT QUOTE ↗",
    heroSecondary: "BUY FOR A PERMANENT SPOT →",
    heroLogos: "Some of the brands we work with",
    heroDrag: "DRAG · THROW",
    heroTap: "TAP · FLIP",
    heroScroll: "SCROLL ↓",
    souvenirAdd: "+ ADD TO QUOTE",
    marquee: "Play ✶ Touch ✶ Share ✶ Remember ✶",
    audience: {
        title: "Start from where you are",
        items: [
            {
                name: "HR & internal events",
                desc: "Year-end parties, dealer meetings, company days, launches. Experiences your people queue for; prints and QR sharing included.",
                cta: "Get a quote for an HR event →",
                href: `${phase2Routes.en.contact}?kitle=ik`,
            },
            {
                name: "Agencies & event organisers",
                desc: "Tell us the date and city; devices, setup and on-site crew are on us. Space, power and capacity details are on every product page.",
                cta: "Get a rental quote →",
                href: `${phase2Routes.en.contact}?kitle=ajans`,
            },
            {
                name: "Procurement teams",
                desc: "Quotes are issued to your company's legal name and invoiced. References, scope and company details are in the company presentation.",
                cta: "View the company presentation →",
                href: "/sunum",
            },
            {
                name: "Stores, showrooms & offices",
                desc: "Buy instead of renting: the system is built for your space, installed and handed over for good.",
                cta: "Purchase options →",
                href: phase2Routes.en.products,
            },
        ],
    },
    workTitle: "Selected work",
    workMeta: (count: number) => `${count} PROJECTS · SCROLL TO MOVE`,
    workAll: "All projects →",
    brandsTitle: "Chosen by brands that lead with innovation",
    brandsMeta: "CLIENTS",
    servicesTitle: "Experiences you can add to your event",
    servicesMeta: "ADD WHAT YOU LIKE TO YOUR QUOTE LIST",
    serviceAdd: "+ ADD TO QUOTE",
    serviceAdded: "✓ ON THE LIST",
    services: [
        { key: "ai-photo", name: "AI Photo", desc: "Guests are taken to new worlds in seconds and create characters of their own.", href: `/en/services/${enCats.ai}/ai-photobooth`, image: { service: "ai-photobooth-kirala" } },
        { key: "ai-greenbox", name: "AI Greenbox", desc: "Places guests inside digital worlds designed for the brand. Clients: TCMB, Allianz.", href: `/en/services/${enCats.ai}/ai-greenbox`, image: { service: "ai-greenbox-kiralama" } },
        { key: "ai-try-on", name: "AI Try-On", desc: "Guests see the product on themselves through the camera. Client: adidas EVO SL.", href: `${phase2Routes.en.work}/adidas-evo-sl-x-ai-try-on-photo`, image: { project: "adidas" } },
        { key: "ai-football-card", name: "AI Football Card", desc: "Guests star on their own footballer card. Client: Akmerkez.", href: `/en/services/${enCats.ai}/ai-football-card`, image: { service: "ai-football-card" } },
        { key: "ai-draw", name: "AI Draw", desc: "An AI-assisted drawing experience. Client: BSH.", href: `/en/services/${enCats.ai}/ai-draw`, image: { service: "ai-draw-portre-cizim" } },
        { key: "photobooth", name: "Photobooth", desc: "Photos and GIFs in a branded frame; prints in seconds and instant sharing by QR code.", href: `/en/services/${enCats.photo}/photobooth-rental`, image: { service: "photobooth-kirala" } },
        { key: "strip-photo", name: "Strip Photo", desc: "Frames on a single strip; instant print and a digital copy by QR code. Clients: Ray-Ban, Rollic.", href: `/en/services/${enCats.photo}/strip-photo`, image: { service: "strip-photo" } },
        { key: "cabin-photo", name: "Cabin Photo", desc: "A turnkey booth, from the outer shell design to the software interface. Clients: Origins, BUD.", href: `/en/services/${enCats.photo}/cabin-photo`, image: { service: "cabin-photo" } },
        { key: "glow-box", name: "Glow Box", desc: "An illuminated photo box. Client: AME'28.", href: `/en/services/${enCats.photo}/glow-box-photo`, image: { service: "glow-box-photo" } },
        { key: "gift-wheel", name: "Gift Wheel", desc: "A digital gift wheel activation. Client: Pegasus.", href: `/en/services/${enCats.interactive}/dijital-hediye-carki-aktivasyonu`, image: { service: "dijital-hediye-carki-aktivasyonu" } },
        { key: "game-quiz", name: "Interactive Games & Quiz", desc: "Brand-built Unity games; a live quiz for 400–500 players. Client: Enerjisa.", href: `/en/services/${enCats.interactive}`, image: { service: "quiz-bilgi-yarismasi" } },
    ],
    whyTitle: "One team from idea to venue",
    whyMeta: ["WHY METASOFTCO", "İSTANBUL TEKNOKENT · AVCILAR"],
    why: [
        { title: "Idea", copy: "We turn the audience, the venue and the campaign idea into a guest journey." },
        { title: "Software", copy: "Every AI experience, panel and game you see on site is written by our own team." },
        { title: "Physical build", copy: "We build everything from the booth's outer shell to its branded interface; systems can also be bought for permanent spots." },
        { title: "Field operations", copy: "Based in Istanbul, with setup and event-day operations across Türkiye." },
    ],
    software: null,
    deck: {
        kicker: "PRESENTATION 2026 · PDF",
        title: "Get a presentation tailored to your industry.",
        lede: "Pick your industry and we will email you a presentation with our projects in that field and the experiences we recommend.",
        sectors: ["Automotive", "Finance", "Retail", "FMCG", "Technology", "Public sector"],
        email: "Your email address",
        send: "REQUEST IT ↗",
        sending: "SENDING…",
        sent: "Request received. We will email you the presentation.",
        failed: "Could not send. Please enter a valid email and try again.",
        view: "View the general presentation now (TR) →",
        viewHref: "/sunum",
        subject: (sector: string) => `Sunum talebi (EN) — ${sector}`,
        message: (sector: string) => `Presentation requested from the English homepage for the "${sector}" industry.`,
        visitor: "Homepage presentation request",
    },
    contactMeta: "YOUR NEXT EXPERIENCE",
    contactLede: "Let's turn your next event into an experience people want to be part of.",
    contactBig: "Let's talk.",
    contactLabels: { email: "EMAIL", phone: "PHONE", address: "ADDRESS", follow: "FOLLOW" },
    address: "İstanbul Teknokent No: 37/1, İç Kapı No: 28, Avcılar / Istanbul",
    legal: [
        { href: "/gizlilik", label: "Privacy Policy (TR)" },
        { href: "/kullanim-kosullari", label: "Terms of Use (TR)" },
    ],
    baseline: "IDEA · SOFTWARE · PHYSICAL BUILD · FIELD OPERATIONS",
    whatsappText: "Hello, I would like some information.",
    aiButton: "✶ ASK METASOFT AI",
    toastAdded: (name: string) => `+ ${name} ADDED TO YOUR QUOTE LIST`,
    toastOpen: "OPEN LIST",
    cart: {
        title: (n: number) => `Your quote list (${n})`,
        close: "Close quote list",
        empty: "Nothing here yet. Pick from the experiences list below or use the contact form directly.",
        promise: "This is not a purchase. We send price and date availability within 1 business day.",
        intentLabel: "What are you looking for?",
        intents: [
            { value: "rent", label: "Rental for an event" },
            { value: "buy", label: "Permanent setup, purchase" },
        ],
        company: "Company",
        remove: "REMOVE",
        name: "Full name *",
        phone: "Phone *",
        email: "Work email *",
        event: "Event date and city",
        consent: "By sending, you agree that we process your details to prepare a quote.",
        privacy: "Privacy Policy (TR)",
        submit: "GET A QUOTE ↗",
        sending: "SENDING…",
        needItem: "Add at least one experience to the list first.",
        needFields: "Name, phone and email are required.",
        failed: "Could not send. Please try again or write to info@metasoftco.com.",
        sentTitle: "Request received.",
        sentBody: "We will get back to you with price and availability within 1 business day.",
        notes: "Sent from the quote list on the English homepage.",
        notesIntent: (label: string) => `Request type: ${label}`,
        notesCompany: (company: string) => `Company: ${company}`,
    },
    tags: { ai: "AI", photo: "PHOTO", interactive: "INTERACTIVE", fallback: "ACTIVATION" },
};

export function homeCopy(locale: Phase2Locale): HomeCopy {
    return locale === "en" ? en : tr;
}

/** Maps the free-text project category from the editpanel onto a short card tag. */
export function homeProjectTag(category: string | null, locale: Phase2Locale) {
    const tags = homeCopy(locale).tags;
    const value = (category ?? "").toLocaleLowerCase("tr");
    if (value.includes("yapay") || value.startsWith("ai")) return tags.ai;
    if (value.includes("foto")) return tags.photo;
    if (value.includes("interaktif") || value.includes("interactive")) return tags.interactive;
    return tags.fallback;
}

/** "Türkiye Cumhuriyet Merkez Bankası (TCMB)" reads as "TCMB" at display size. */
export function homeClientName(client: string | null, title: string) {
    const name = client?.trim() || title;
    const short = name.match(/\(([^)]+)\)/)?.[1];
    return short || name;
}
