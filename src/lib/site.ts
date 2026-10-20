import { cloudinaryOptimize } from "./cloudinary";
import { SERVICE_CITIES } from "./rental-ops";

export const siteConfig = {
    name: "MetasoftCo",
    title: "MetasoftCo | Yapay Zeka Etkinlik & İnteraktif Aktivasyon Ajansı — İstanbul",
    description:
        "Etkinlik, lansman ve fuarlar için yapay zeka photobooth, interaktif oyun ve aktivasyon kiralama. Kurulum dahil, İstanbul merkezli, Türkiye geneli.",
    url: "https://www.metasoftco.com",
    locale: "tr_TR",

    // SEO Keywords
    keywords: [
        "yapay zeka etkinlik",
        "interaktif aktivasyon",
        "AI photo aktivasyonu",
        "photobooth",
        "face swap",
        "etkinlik yazılımı",
        "kurumsal etkinlik çözümleri",
        "dijital deneyim ajansı",
        "marka aktivasyonu",
        "istanbul etkinlik ajansı",
        "stable diffusion etkinlik",
        "controlnet aktivasyon",
        "yapay zeka fotoğraf",
        "interaktif etkinlik ajansı",
        "AR etkinlik",
        "virtual try-on",
        "corporate event technology istanbul",
        "event photobooth turkey",
        "gamification etkinlik",
        "etkinlik aktivasyon çözümleri",
        "AI photobooth istanbul",
        "yapay zeka aktivasyon ajansı",
    ],

    // Social Media
    social: {
        twitter: "@metasoftco",
        instagram: "@metasoftco",
        youtube: "https://www.youtube.com/@MetasoftCo",
        // Filled in when the URLs are confirmed; empty values stay out of sameAs.
        pinterest: "",
        facebook: "",
        googleBusiness: "",
        wikidata: "",
    },

    // Contact
    contact: {
        email: "info@metasoftco.com",
        phone: "+90 534 233 4051",
        address: "Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1 İç Kapı No: 28, Avcılar/İstanbul, Türkiye",
    },

    // Company Info (for structured data)
    company: {
        legalName: "MetasoftCo Yazılım İletişim Hizmetleri Ticaret Limited Şirketi",
        foundingDate: "2020",
        founders: ["Selami Güler", "Selçuk Güler"],
    },
};

/** Builds the dynamic 1200x630 OG image URL for a page's own title/description. */
export function ogImageUrl(title: string, description: string) {
    return `${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`;
}

// SEO helper functions
export function generateMetaTags(page?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: "website" | "article";
}) {
    const title = page?.title
        ? `${page.title} | ${siteConfig.name}`
        : siteConfig.title;
    const description = page?.description || siteConfig.description;
    const keywords = [...siteConfig.keywords, ...(page?.keywords || [])].join(", ");
    const ogTitle = page?.title ? `${page.title} | ${siteConfig.name}` : siteConfig.title;
    const ogDesc = page?.description || siteConfig.description;
    const image = page?.image || ogImageUrl(ogTitle, ogDesc);
    const url = page?.url || siteConfig.url;
    const type = page?.type || "website";

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: siteConfig.locale,
            type,
        },
        twitter: {
            card: "summary_large_image" as const,
            title,
            description,
            images: [image],
            creator: siteConfig.social.twitter,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large" as const,
                "max-snippet": -1,
            },
        },
        verification: {
            // Google Search Console - buraya verification kodunu ekle
            // google: "your-google-verification-code",
            // Yandex Webmaster. public/yandex_82d1c7f6daf8f8bf.html dosyasi da
            // ayni kodu dogruluyor; meta etiketi dosya kaybolursa yedek islevi gorur.
            yandex: "82d1c7f6daf8f8bf",
        },
    };
}

// Public profiles of the company itself. Empty entries are skipped, so a
// profile (Google Business Profile, Wikidata…) can be filled in later.
const companyProfiles = [
    `https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`,
    `https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`,
    "https://www.linkedin.com/company/metasoftco",
    siteConfig.social.youtube,
    siteConfig.social.pinterest,
    siteConfig.social.facebook,
    siteConfig.social.googleBusiness,
    siteConfig.social.wikidata,
];

// JSON-LD for the company, rendered on every page from the root layout.
// ProfessionalService carries the address, service area and contact details
// AI answers and local results look for; Organization keeps it a company.
export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.company.legalName,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/blackLogo.png`,
        image: `${siteConfig.url}/og`,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        foundingDate: siteConfig.company.foundingDate,
        founders: siteConfig.company.founders.map((name) => ({
            "@type": "Person",
            name,
        })),
        address: {
            "@type": "PostalAddress",
            streetAddress: "Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1, İç Kapı No: 28",
            addressLocality: "Avcılar",
            addressRegion: "İstanbul",
            postalCode: "34320",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 40.9917,
            longitude: 28.7189,
        },
        areaServed: [
            { "@type": "Country", name: "Türkiye" },
            ...SERVICE_CITIES.map((name) => ({ "@type": "City", name })),
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
            hoursAvailable: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
        },
        sameAs: companyProfiles.filter(Boolean),
    };
}

/** WebSite entity for the root layout; ties pages to the publisher above. */
export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: ["tr-TR", "en-US"],
        publisher: { "@id": `${siteConfig.url}/#organization` },
    };
}

// JSON-LD structured data for LocalBusiness (AI aramaları için Organization'dan daha güçlü)
export function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        legalName: siteConfig.company.legalName,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        priceRange: "$$-$$$",
        logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/blackLogo.png`,
        },
        image: `${siteConfig.url}/og`,
        foundingDate: siteConfig.company.foundingDate,
        founders: siteConfig.company.founders.map((name) => ({
            "@type": "Person",
            name,
        })),
        address: {
            "@type": "PostalAddress",
            streetAddress: "Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1, İç Kapı No: 28",
            addressLocality: "Avcılar",
            addressRegion: "İstanbul",
            postalCode: "34320",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 40.9917,
            longitude: 28.7189,
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
        },
        areaServed: {
            "@type": "Country",
            name: "Turkey",
        },
        knowsAbout: [
            "Interaktif Etkinlik Teknolojileri",
            "Yapay Zeka Çözümleri",
            "Photobooth Sistemleri",
            "AI Yüz Değiştirme (Face Swap)",
            "Marka Aktivasyonu",
            "Gamification",
            "Özel Yazılım Geliştirme",
            "Stable Diffusion AI Image Generation",
            "LoRA Fine-tuning",
            "ControlNet Architecture",
            "Augmented Reality (AR) Experiences",
            "Computer Vision",
            "Real-time Image Processing",
            "WebGL Interactive Experiences",
            "Event Analytics & Reporting",
            "KVKK Uyumlu Veri İşleme",
            "Corporate Event Technology",
            "Brand Activation Technology",
            "Interactive Experience Design",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "MetasoftCo Hizmetleri",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "AI Photo & Face Swap",
                        serviceType: "AI Photography & Event Technology",
                        description: "Stable Diffusion ve ControlNet teknolojisiyle etkinliklerde misafirlerin yüzlerini saniyeler içinde Forbes kapak, Cyberpunk, Rönesans gibi farklı konseptlere dönüştürür.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "AI Draw — Yapay Zeka Portre Çizimi",
                        serviceType: "AI Art Generation & Event Technology",
                        description: "Gerçek zamanlı yapay zeka ile misafirlerin portrelerini yağlıboya, karakalem, empresyonist gibi sanat stillerinde anında dijital veya baskılı çıktıya dönüştürür.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "AI Fashion Mirror — Akıllı Ayna & AR",
                        serviceType: "Augmented Reality & Interactive Event Technology",
                        description: "Computer Vision ve Artırılmış Gerçeklik (AR) ile donatılmış interaktif aynalar. Unity/WebGL tabanlı gerçek zamanlı render ile misafirler sanal kıyafetler giyebilir, marka karakterlerine dönüşebilir.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Photobooth Çözümleri",
                        serviceType: "Digital Photobooth & Brand Activation",
                        description: "Kurumsal etkinlikler için AI destekli dijital photobooth: marka özelleştirme, anlık sosyal medya paylaşımı, anında baskı ve KVKK uyumlu analitik raporlama.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Mirror Booth",
                        serviceType: "Interactive Mirror Photo Booth & Event Technology",
                        description: "Dev dokunmatik ayna ekranı, yüzlerce dijital filtre ve interaktif efektlerle etkinliklerde anında baskı ve dijital paylaşım sunan photobooth çözümü. İstanbul ve Türkiye geneli kiralık hizmet.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "İnteraktif Oyunlar & Gamification",
                        serviceType: "Event Gamification & Interactive Experience",
                        description: "Kurumsal etkinliklerde çalışan bağlılığını artıran oyunlaştırma çözümleri: Hafıza Oyunu, Dijital Hediye Çarkı, özel oyun mekaniği geliştirme. Sosyal medya entegrasyonu dahil.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Marka Aktivasyonu",
                        serviceType: "Brand Activation & Digital Experience",
                        description: "Etkinliklerde marka bilinirliğini ve müşteri bağlılığını artıran dijital etkileşim deneyimleri. Kampanya hedeflerine özel tasarlanmış interaktif aktivasyon sistemleri.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Etkinlik Analitiği & Kurumsal Yazılım",
                        serviceType: "Event Analytics & Custom Software Development",
                        description: "Etkinlik başarısını somut verilerle ölçen özel analitik paneller. KVKK uyumlu veri toplama, gerçek zamanlı katılım metrikleri ve talep halinde etkinlik sonrası PDF rapor.",
                    },
                },
            ],
        },
        sameAs: [
            `https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`,
            `https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`,
            "https://www.linkedin.com/company/metasoftco",
            siteConfig.social.youtube,
        ],
    };
}

// JSON-LD structured data for SoftwareApplication (AI rich results)
export function generateSoftwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "MetasoftCo AI Interactive Suite",
        url: siteConfig.url,
        operatingSystem: "Web, Windows, iOS, Android",
        applicationCategory: "MultimediaApplication",
        description: "Stable Diffusion ve ControlNet tabanlı interaktif etkinlik yazılımları. AI Photo Booth, AI Face Swap, AR deneyimleri ve dijital gamification çözümleri.",
        author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        featureList: [
            "AI Photo Booth",
            "AI Face Swap (Stable Diffusion + ControlNet)",
            "AI Draw — Portrait Generation",
            "AR Fashion Mirror",
            "Interactive Games & Gamification",
            "Digital Gift Wheel",
            "Real-time Image Processing",
            "KVKK Compliant Data Management",
        ],
        offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            description: "Etkinliğe özel AI aktivasyon çözümleri — fiyat teklifi için iletişime geçin.",
            seller: {
                "@type": "Organization",
                name: siteConfig.name,
            },
        },
    };
}

// JSON-LD structured data for FAQPage
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

// JSON-LD BreadcrumbList schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export interface FaqEntry { q: string; a: string; }

/** Parses a stored FAQ JSON column, skipping entries missing a question or answer. */
export function parseFaq(json: string | null | undefined): FaqEntry[] {
    if (!json) return [];
    try {
        const items = JSON.parse(json);
        return Array.isArray(items) ? items.filter((item) => item?.q?.trim() && item?.a?.trim()) : [];
    } catch {
        return [];
    }
}

export function generateFaqSchema(items: FaqEntry[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };
}

// JSON-LD structured data for service
export function generateServiceSchema(service: {
    name: string;
    description: string;
    url: string;
    image?: string;
    category: string;
    areaServed?: Record<string, unknown>[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        image: cloudinaryOptimize(service.image, 1200),
        serviceType: service.category,
        provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            sameAs: [
                "https://instagram.com/metasoftco",
                "https://www.linkedin.com/company/metasoftco",
                "https://www.youtube.com/@MetasoftCo",
            ],
        },
        areaServed: service.areaServed ?? {
            "@type": "Country",
            name: "Turkey",
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            areaServed: "TR",
        },
    };
}

/** Cuts long editor copy to a search-snippet length at a word boundary. */
export function snippet(text: string, max = 158) {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max - 1).replace(/[\s,;:—–-]+\S*$/, "") + "…";
}

/**
 * Case study schema for a project page: an Article about the client brand,
 * written and published by MetasoftCo, so "who built X for Y" questions can
 * be answered from the page itself.
 */
export function generateProjectSchema(project: {
    title: string;
    description: string;
    url: string;
    image: string | null;
    client: string | null;
    date: Date;
    updatedAt?: Date;
    locale: "tr" | "en";
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: project.title,
        description: project.description,
        url: project.url,
        mainEntityOfPage: { "@type": "WebPage", "@id": project.url },
        ...(project.image && { image: project.image }),
        datePublished: project.date.toISOString(),
        ...(project.updatedAt && { dateModified: project.updatedAt.toISOString() }),
        inLanguage: project.locale === "en" ? "en-US" : "tr-TR",
        articleSection: project.locale === "en" ? "Case study" : "Vaka çalışması",
        ...(project.client && { about: { "@type": "Organization", name: project.client } }),
        author: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url },
        publisher: {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/blackLogo.png` },
        },
    };
}
