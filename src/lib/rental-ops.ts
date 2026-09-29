// Shared "how a rental runs" copy, rendered on every event rental service
// (not software) so logistics, scope and service area read the same on all
// product pages and feed the page's FAQ schema. Every figure here is a
// verified operations fact; product-specific numbers (space, capacity,
// screen size) belong in the service's own `specs`, never here.

export type RentalOpsLocale = "tr" | "en";

/** Cities we have actually run events in; also used for `areaServed`. */
export const SERVICE_CITIES = [
    "İstanbul",
    "Ankara",
    "İzmir",
    "Antalya",
    "Bodrum",
    "Adana",
    "Diyarbakır",
    "Kocaeli",
    "Sapanca",
    "Çorum",
];

/**
 * What a guest takes away, set per service in the editpanel (`outputType`):
 * games produce nothing to share, photo/video activations a digital file,
 * print activations a digital file plus a physical print.
 */
export type RentalOutput = "none" | "digital" | "print";

export function toRentalOutput(value: string | null | undefined): RentalOutput {
    return value === "digital" || value === "print" ? value : "none";
}

export interface RentalOpsCopy {
    eyebrow: string;
    title: string;
    logisticsTitle: string;
    logistics: { term: string; value: string }[];
    scopeTitle: string;
    scope: (output: RentalOutput) => string[];
    serviceArea: string;
    cta: string;
    faq: (serviceTitle: string, output: RentalOutput) => { q: string; a: string }[];
}

const cityList = (locale: RentalOpsLocale) => {
    const joiner = locale === "en" ? " and " : " ve ";
    return `${SERVICE_CITIES.slice(0, -1).join(", ")}${joiner}${SERVICE_CITIES.at(-1)}`;
};

const tr: RentalOpsCopy = {
    eyebrow: "Kurumsal kiralama · Anahtar teslim",
    title: "Lojistik, kurulum ve hizmet kapsamı",
    logisticsTitle: "Lojistik ve kurulum",
    logistics: [
        { term: "Enerji", value: "Tek bir standart 220V priz yeterli." },
        { term: "İnternet", value: "Kendi 5G mobil altyapımızla gelir; mekânın ağına ihtiyaç duymayız." },
        { term: "Kurulum", value: "Etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce; cihaz başına ortalama 30–40 dakika." },
        { term: "Saha ekibi", value: "Etkinlik boyunca alanda en az 2 teknik personel." },
    ],
    scopeTitle: "Hizmet kapsamına dahil",
    scope: (output) => [
        "Nakliye, kurulum ve söküm",
        "Etkinlik boyunca teknik saha personeli",
        output === "none" ? "Markaya özel oyun ve ekran arayüzü" : "Markaya özel arayüz ve çıktı tasarımı",
        "Kiosk dış giydirmesi (marka kaplaması)",
        ...(output === "none" ? [] : ["QR ile anında dijital paylaşım"]),
        ...(output === "print" ? ["Saniyeler içinde fiziksel baskı, 750 adet baskı dahil"] : []),
    ],
    serviceArea: `İstanbul Teknokent (Avcılar) merkezli MetasoftCo olarak ${cityList("tr")} başta olmak üzere Türkiye genelindeki kurumsal etkinlik, lansman ve fuarlar için anahtar teslim kurulum sağlıyoruz.`,
    cta: "Etkinliğiniz İçin Teklif Alın",
    faq: (serviceTitle, output) => [
        {
            q: `${serviceTitle} kiralama fiyatı nasıl belirlenir?`,
            a: "Fiyat; etkinlik süresi, şehir ve lokasyon, cihaz sayısı ve kişiselleştirme kapsamına göre belirlenir. Tekliflerimiz anahtar teslimdir: nakliye, kurulum, teknik personel ve markaya özel tasarım fiyata dahildir. Etkinlik tarihinizi ve şehrinizi paylaşın, size net bir teklif iletelim.",
        },
        {
            q: "Sistem kapalı alanlarda ve fuarlarda kullanılabilir mi?",
            a: "Evet. Standart 220V prizin bulunduğu kapalı alanlara, fuar standlarına ve lansman alanlarına kurulur. İnterneti kendi 5G altyapımızla getirdiğimiz için mekânın ağına ihtiyaç duymayız. Gereken alan ürüne göre değişir ve teklif aşamasında netleştirilir.",
        },
        {
            q: "Markaya özel kişiselleştirme yapıyor musunuz?",
            a: output === "none"
                ? "Evet. Oyun ve ekran arayüzü ile kioskun dış giydirmesi markanıza özel hazırlanır."
                : "Evet. Ekran arayüzü, fotoğraf ve çıktı tasarımları ile kioskun dış giydirmesi markanıza özel hazırlanır.",
        },
        {
            q: "Kurulum ne kadar sürer?",
            a: "Kurulumu etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yaparız; cihaz başına ortalama 30–40 dakika sürer. Etkinlik boyunca alanda en az 2 teknik personelimiz bulunur.",
        },
        {
            q: "Hangi şehirlerde hizmet veriyorsunuz?",
            a: `İstanbul merkezliyiz ve Türkiye genelinde hizmet veriyoruz. Bugüne kadar ${cityList("tr")} başta olmak üzere birçok şehirde kurulum yaptık. Şehir dışı etkinliklerde ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır.`,
        },
    ],
};

const en: RentalOpsCopy = {
    eyebrow: "Corporate rental · Turnkey",
    title: "Logistics, setup and what's included",
    logisticsTitle: "Logistics and setup",
    logistics: [
        { term: "Power", value: "A single standard 220V socket is enough." },
        { term: "Internet", value: "We bring our own 5G connection; no venue network needed." },
        { term: "Setup", value: "The day before the event or 3–4 hours before doors open; about 30–40 minutes per device." },
        { term: "On-site crew", value: "At least 2 technicians on site throughout the event." },
    ],
    scopeTitle: "Included in the service",
    scope: (output) => [
        "Transport, setup and teardown",
        "Technical crew throughout the event",
        output === "none" ? "Branded game and screen interface" : "Branded interface and output design",
        "Branded kiosk wrap",
        ...(output === "none" ? [] : ["Instant digital sharing via QR"]),
        ...(output === "print" ? ["Physical prints within seconds, 750 prints included"] : []),
    ],
    serviceArea: `Based at İstanbul Teknokent (Avcılar), MetasoftCo provides turnkey installations for corporate events, launches and trade shows across Türkiye, including ${cityList("en")}.`,
    cta: "Get a Quote for Your Event",
    faq: (serviceTitle, output) => [
        {
            q: `How is ${serviceTitle} rental pricing determined?`,
            a: "Pricing depends on event duration, city and venue, number of devices and the scope of customisation. Our quotes are turnkey: transport, setup, technical crew and branded design are included. Share your event date and city and we will send you a clear quote.",
        },
        {
            q: "Can the system be used indoors and at trade shows?",
            a: "Yes. It can be installed at any indoor venue, trade show stand or launch area with a standard 220V socket. We bring our own 5G connection, so no venue network is needed. The space required depends on the product and is confirmed when we quote.",
        },
        {
            q: "Do you offer brand customisation?",
            a: output === "none"
                ? "Yes. The game and screen interface and the kiosk wrap are designed for your brand."
                : "Yes. The screen interface, photo and output designs and the kiosk wrap are all designed for your brand.",
        },
        {
            q: "How long does setup take?",
            a: "We set up the day before the event or 3–4 hours before doors open; each device takes about 30–40 minutes. At least 2 of our technicians stay on site throughout the event.",
        },
        {
            q: "Which cities do you serve?",
            a: `We are based in İstanbul and work across Türkiye, with installations so far in ${cityList("en")}, among others. For events outside İstanbul, travel and accommodation are either included in the quote or arranged by your team.`,
        },
    ],
};

export function rentalOpsCopy(locale: RentalOpsLocale): RentalOpsCopy {
    return locale === "en" ? en : tr;
}

/**
 * Bare product name from an editor title such as "Photobooth Kirala" or
 * "Aura Photobooth Kiralama: Biofeedback Sensörlü …": drops the subtitle
 * after ":" or "|" and the rental word, so templates can add their own.
 */
export function rentalProductName(serviceTitle: string, locale: RentalOpsLocale): string {
    const rentalWord = locale === "en" ? /\brental\b/gi : /(?<![\p{L}])kirala(ma)?(?![\p{L}])/giu;
    const name = serviceTitle
        .split(/\s*[:|]\s*/)[0]
        .replace(rentalWord, "")
        .replace(/\s{2,}/g, " ")
        .replace(/^[\s–-]+|[\s–-]+$/g, "");
    return name || serviceTitle;
}

/**
 * The service's own questions first, then the shared ones; a service question
 * with the same wording as a shared one replaces it instead of repeating it.
 */
export function mergeRentalFaq(
    serviceFaq: { q: string; a: string }[],
    serviceTitle: string,
    locale: RentalOpsLocale,
    output: RentalOutput,
): { q: string; a: string }[] {
    const own = new Set(serviceFaq.map((item) => item.q.trim().toLocaleLowerCase("tr")));
    const shared = rentalOpsCopy(locale)
        .faq(rentalProductName(serviceTitle, locale), output)
        .filter((item) => !own.has(item.q.trim().toLocaleLowerCase("tr")));
    return [...serviceFaq, ...shared];
}

/** Fallback <title> for a rental service the editor left without a metaTitle. */
export function rentalMetaTitle(serviceTitle: string, locale: RentalOpsLocale): string {
    const rental = locale === "en" ? "Rental" : "Kiralama";
    return `${rentalProductName(serviceTitle, locale)} ${rental} | İstanbul & Türkiye | MetasoftCo`;
}

/** `areaServed` value for rental service schemas. */
export function rentalAreaServed() {
    return [
        { "@type": "Country", name: "Türkiye" },
        ...SERVICE_CITIES.map((name) => ({ "@type": "City", name })),
    ];
}
