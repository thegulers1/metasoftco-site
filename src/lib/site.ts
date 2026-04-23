import { cloudinaryOptimize } from "./cloudinary";

export const siteConfig = {
    name: "MetasoftCo",
    title: "MetasoftCo | Yapay Zeka Etkinlik & İnteraktif Aktivasyon Ajansı — İstanbul",
    description:
        "Stable Diffusion, ControlNet ve AR teknolojileriyle kurgulanmış yapay zeka etkinlik çözümleri, interaktif aktivasyonlar ve uçtan uca prodüksiyon. İstanbul merkezli dijital deneyim ajansı.",
    url: "https://metasoftco.com",
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
    },

    // Contact
    contact: {
        email: "info@metasoftco.com",
        phone: "+90 534 233 4051",
        address: "Zeytinlik, Fişekhane Cd. 5/17, 34140 Bakırköy/İstanbul, Türkiye",
    },

    // Company Info (for structured data)
    company: {
        legalName: "MetasoftCo",
        foundingDate: "2020",
        founders: ["Selami Güler"],
    },
};

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
    const image = page?.image ||
        `${siteConfig.url}/og?title=${encodeURIComponent(ogTitle)}&desc=${encodeURIComponent(ogDesc.slice(0, 120))}`;
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
        },
    };
}

// JSON-LD structured data for organization
export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        legalName: siteConfig.company.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        foundingDate: siteConfig.company.foundingDate,
        founders: siteConfig.company.founders.map((name) => ({
            "@type": "Person",
            name,
        })),
        address: {
            "@type": "PostalAddress",
            streetAddress: "Zeytinlik, Fişekhane Cd. 5/17",
            addressLocality: "Bakırköy",
            addressRegion: "İstanbul",
            postalCode: "34140",
            addressCountry: "TR",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
        },
        sameAs: [
            `https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`,
            `https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`,
            "https://www.linkedin.com/company/metasoftco",
            siteConfig.social.youtube,
        ],
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
            url: `${siteConfig.url}/logo.png`,
        },
        image: `${siteConfig.url}/og`,
        foundingDate: siteConfig.company.foundingDate,
        founders: siteConfig.company.founders.map((name) => ({
            "@type": "Person",
            name,
        })),
        address: {
            "@type": "PostalAddress",
            streetAddress: "Zeytinlik, Fişekhane Cd. 5/17",
            addressLocality: "Bakırköy",
            addressRegion: "İstanbul",
            postalCode: "34140",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 40.9766,
            longitude: 28.8572,
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
                        description: "Stable Diffusion ve ControlNet teknolojisiyle etkinliklerde misafirlerin yüzlerini saniyeler içinde Forbes kapak, Cyberpunk, Rönesans gibi farklı konseptlere dönüştürür. LoRA tabanlı mimari %99 yüz doğruluğu sağlar.",
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
                        description: "Etkinlik başarısını somut verilerle ölçen özel analitik paneller. KVKK uyumlu veri toplama, gerçek zamanlı katılım metrikleri ve etkinlik sonrası PDF raporlama.",
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
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
            ratingCount: "120",
        },
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

// JSON-LD structured data for service
export function generateServiceSchema(service: {
    name: string;
    description: string;
    url: string;
    image?: string;
    category: string;
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
        areaServed: {
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
