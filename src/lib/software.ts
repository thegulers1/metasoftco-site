// Software development line. It lives under Hizmetler as its own category so
// it is managed from the editpanel like any other service; this module holds
// the few strings the event-toned templates would otherwise get wrong.
// Turkish only for now — there is no English software category yet.

export const SOFTWARE_CATEGORY_SLUG = "yazilim-gelistirme";
export const SOFTWARE_CATEGORY_PATH = `/hizmetler/${SOFTWARE_CATEGORY_SLUG}`;

export function isSoftwareCategory(slug: string | null | undefined): boolean {
    return slug === SOFTWARE_CATEGORY_SLUG;
}

/** Replaces the event facts/CTA on the software category page. */
export const softwareCategoryCopy = {
    facts: [
        { term: "Hizmet", value: null },
        { term: "Platform", value: "iOS · Android · Web" },
        { term: "Kapsam", value: "Fikirden yayına" },
        { term: "Destek", value: "İlk yıl bakım ücretsiz" },
    ],
    ctaSolid: "Yazılım projenizi",
    ctaOutline: "birlikte geliştirelim.",
    ctaButton: "Projenizi Konuşalım",
};

/** Replaces the event fallback facts/CTA on software service pages. */
export const softwareServiceCopy = {
    fallbackFacts: [
        { term: "Kapsam", value: "Fikirden yayına" },
        { term: "Destek", value: "İlk yıl bakım ücretsiz" },
        { term: "Gizlilik", value: "NDA ile çalışma" },
    ],
    ctaSolid: "Bu yazılımı",
    ctaOutline: "markanıza özel geliştirelim.",
    ctaPrimary: "Projenizi Konuşalım",
    ctaSecondary: "Tüm Yazılım Hizmetleri",
};

/** Homepage section — sits after the event content so the hero stays event-first. */
export const softwareHomeCopy = {
    eyebrow: "YAZILIM GELİŞTİRME",
    title: "Etkinliklerin arkasındaki\n{yazılım gücü.}",
    titleLabel: "Etkinliklerin arkasındaki yazılım gücü.",
    lede:
        "Sahada gördüğünüz her yapay zeka deneyimini, paneli ve oyunu kendi ekibimiz yazıyor. Aynı ekip; mobil uygulamadan şirket içi süreç yazılımlarına kadar markanıza özel projeler geliştiriyor.",
    cards: [
        { title: "Mobil Uygulama", body: "iOS ve Android için tek kod tabanıyla cross-platform uygulamalar." },
        { title: "Web Uygulaması & Panel", body: "Yönetim panelleri, portallar ve kuruma özel CRM çözümleri." },
        { title: "Süreç Yazılımları", body: "Talep, onay, iş akışı ve raporlama sistemleri." },
        { title: "Yapay Zeka & Oyun", body: "AI entegrasyonları, Unity ile oyun ve eğitim uygulamaları." },
    ],
    proof: [
        "Enerjisa · 400–500 kullanıcılı quiz uygulaması",
        "App Store'da yayında: Become Hacker, ZekAI",
        "Data-Capture CRM ve müşteri paneli",
    ],
    cta: "Yazılım Projenizi Konuşalım",
};
