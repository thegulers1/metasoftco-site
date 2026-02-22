export const siteConfig = {
    name: "MetasoftCo",
    title: "MetasoftCo | İnteraktif Etkinlik Deneyimleri, Yapay Zeka ve Yazılım",
    description:
        "Etkinliklerde interaktif oyunlar, photobooth çözümleri, AI photo/face swap ve özel yazılımlar geliştiriyoruz. Markanızı unutulmaz deneyimlerle büyütün.",
    url: "https://metasoftco.com",
    locale: "tr_TR",

    // SEO Keywords
    keywords: [
        "interaktif etkinlik",
        "yapay zeka çözümleri",
        "photobooth",
        "face swap",
        "etkinlik yazılımı",
        "AI photo booth",
        "kurumsal etkinlik",
        "dijital deneyim",
        "marka aktivasyonu",
        "istanbul etkinlik teknolojisi",
    ],

    // Social Media
    social: {
        twitter: "@metasoftco",
        instagram: "@metasoftco",
    },

    // Contact
    contact: {
        email: "info@metasoftco.com",
        phone: "+90 534 233 4051",
        address: "Zeytinlik Mah. Fişekhane Cd. 5/17 Bakırköy, İstanbul, Türkiye",
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
    const image = page?.image || `${siteConfig.url}/og-image.jpg`;
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
            streetAddress: "Zeytinlik Mah. Fişekhane Cd. 5/17",
            addressLocality: "Bakırköy",
            addressRegion: "İstanbul",
            postalCode: "34142",
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
        ],
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
        image: service.image,
        provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        category: service.category,
        areaServed: {
            "@type": "Country",
            name: "Turkey",
        },
    };
}
