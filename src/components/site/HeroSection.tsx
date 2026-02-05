"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

// ============================================
// HERO BENTO ITEM TİPİ
// ============================================
interface HeroBentoItem {
    id: string;
    image?: string;
    text?: { tr: string; en: string };
    subtext?: { tr: string; en: string };
    size: "small" | "medium" | "tall" | "wide";
    bgColor?: string;
    textColor?: "light" | "dark";
    rounded?: boolean;
}

// ============================================
// MOCK DATA
// ============================================
const bentoItems: HeroBentoItem[] = [
    {
        id: "1",
        image: "/hero/item-1.jpg",
        size: "small",
        rounded: true,
    },
    {
        id: "2",
        image: "/hero/item-2.jpg",
        size: "medium",
        textColor: "light",
    },
    {
        id: "3",
        image: "/hero/item-3.jpg",
        size: "small",
        textColor: "light",
    },
    {
        id: "4",
        image: "/hero/item-4.jpg",
        size: "small",
        rounded: true,
    },
    {
        id: "5",
        text: { tr: "Yenilikçi Çözümler", en: "Innovative Solutions" },
        subtext: { tr: "Geleceği şekillendiriyoruz", en: "Shaping the future" },
        size: "medium",
        bgColor: "#000",
        textColor: "light",
    },
    {
        id: "6",
        image: "/hero/item-5.jpg",
        size: "tall",
        textColor: "light",
    },
    {
        id: "7",
        image: "/hero/item-6.jpg",
        size: "small",
        rounded: true,
    },
    {
        id: "8",
        image: "/hero/item-7.jpg",
        size: "wide",
        textColor: "light",
    },
];

// Placeholder gradients
const placeholderGradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
];

// Bento boyut sınıfları
const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1",
    tall: "col-span-1 row-span-2",
    wide: "col-span-2 row-span-1",
};

export default function HeroSection() {
    const { language, t } = useLanguage();

    return (
        <section className="bg-[#dce3e8] min-h-[calc(100vh-110px)]">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Side - Text Content */}
                    <div className="lg:col-span-4 flex flex-col justify-center py-8 lg:py-16 lg:sticky lg:top-32">
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-black"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {t("İnteraktif", "Interactive")}
                            <br />
                            {t("Etkinlik", "Event")}
                            <br />
                            {t("Deneyimleri", "Experiences")}
                        </h1>

                        <p className="mt-6 text-base lg:text-lg text-black/60 max-w-sm">
                            {t(
                                "Ekibimizle işbirliği yaparak projelerinizi geleceğe taşıyın.",
                                "Collaborate with our team to take your projects to the future."
                            )}
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-black/80"
                            >
                                {t("İletişime Geç", "Get in Touch")}
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Bento Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-4 gap-3 auto-rows-[100px] sm:auto-rows-[120px] lg:auto-rows-[140px]">
                            {bentoItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] ${sizeClasses[item.size]
                                        } ${item.rounded ? "rounded-full" : "rounded-2xl"}`}
                                >
                                    {/* Background */}
                                    {item.image ? (
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: placeholderGradients[index % placeholderGradients.length],
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0"
                                            style={{ backgroundColor: item.bgColor || "#fff" }}
                                        />
                                    )}

                                    {/* Text Content */}
                                    {item.text && (
                                        <div
                                            className={`absolute inset-0 flex flex-col justify-center p-4 ${item.textColor === "light" ? "text-white" : "text-black"
                                                }`}
                                        >
                                            <span className="text-lg lg:text-xl font-semibold leading-tight">
                                                {language === "en" ? item.text.en : item.text.tr}
                                            </span>
                                            {item.subtext && (
                                                <span className={`mt-1 text-xs ${item.textColor === "light" ? "text-white/70" : "text-black/60"
                                                    }`}>
                                                    {language === "en" ? item.subtext.en : item.subtext.tr}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
