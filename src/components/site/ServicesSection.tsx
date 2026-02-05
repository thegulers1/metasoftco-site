"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";

// ============================================
// HİZMET TİPLERİ - Database'den gelen veriler
// ============================================
export interface Service {
    id: string;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    slug: string;
    image: string | null;
    size: string;
    bgColor: string | null;
    textColor: string;
    order: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ServiceCategory {
    id: string;
    name: string;
    name_en: string | null;
    slug: string;
    order: number;
    services: Service[];
    createdAt: Date;
    updatedAt: Date;
}

// Bento grid boyut sınıfları
const sizeClasses: Record<string, string> = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    large: "col-span-2 row-span-2",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
};

// Placeholder gradients
const placeholderGradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
];

// ============================================
// SERVİCES SECTION KOMPONENTİ
// ============================================
interface ServicesSectionProps {
    categories: ServiceCategory[];
    title?: string;
    subtitle?: string;
}

export default function ServicesSection({
    categories,
    title = "Neler Yaparız",
    subtitle = "Hizmetlerimiz",
}: ServicesSectionProps) {
    const { language, t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");

    const currentCategory = categories.find((c) => c.id === activeCategory);

    return (
        <section className="bg-[#e8e8e8] py-16 sm:py-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pl-8 sm:pl-10 lg:pl-12">
                {/* Section Header */}
                <div className="mb-10">
                    <span className="text-xs uppercase tracking-widest text-black/50">
                        {t("Hizmetlerimiz", "Our Services")}
                    </span>
                    <h2
                        className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("Neler Yaparız", "What We Do")}
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className="mb-10 flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-black/5"
                                }`}
                        >
                            {language === "en" ? (category.name_en || category.name) : category.name}
                        </button>
                    ))}
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
                    {currentCategory?.services.map((service, index) => (
                        <Link
                            key={service.id}
                            href={`/hizmetler/${currentCategory.slug}/${service.slug}`}
                            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${sizeClasses[service.size]}`}
                        >
                            {/* Background - Image veya Gradient */}
                            {service.image ? (
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : service.bgColor ? (
                                <div
                                    className="absolute inset-0"
                                    style={{ backgroundColor: service.bgColor }}
                                />
                            ) : (
                                <div
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        background: placeholderGradients[index % placeholderGradients.length],
                                    }}
                                />
                            )}

                            {/* Overlay for text readability */}
                            {service.textColor === "light" && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            )}

                            {/* Content */}
                            <div className={`absolute inset-0 flex flex-col justify-end p-5 ${service.textColor === "light" ? "text-white" : "text-black"
                                }`}>
                                <h3 className="text-lg md:text-xl font-semibold leading-tight">
                                    {language === "en" ? (service.title_en || service.title) : service.title}
                                </h3>
                                {(service.description || service.description_en) && (
                                    <p className={`mt-1 text-sm ${service.textColor === "light" ? "text-white/70" : "text-black/60"
                                        }`}>
                                        {language === "en" ? (service.description_en || service.description) : service.description}
                                    </p>
                                )}
                            </div>

                            {/* Hover Arrow */}
                            <div className={`absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 ${service.textColor === "light" ? "text-white" : "text-black"
                                }`}>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                    >
                        {t("Tüm Hizmetleri Görüntüle", "View All Services")}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ============================================
// GÖRSEL EKLEME REHBERİ:
// ============================================
// 
// 1. Görselleri şu klasörlere koy:
//    /public/services/ai/        → Yapay Zeka görselleri
//    /public/services/photo/     → Fotoğraf & Video görselleri
//    /public/services/interactive/ → İnteraktif görselleri
//
// 2. Her görsel için önerilen boyutlar:
//    - small: 400x360px
//    - medium: 400x400px
//    - large: 800x800px
//    - wide: 800x360px
//    - tall: 400x720px
//
// 3. Görsel ekledikten sonra yukarıdaki Image component'i aktif et
//    (yorum satırlarını kaldır)
//
// 4. Bento grid boyutlarını değiştirmek için service.size değerini güncelle
// ============================================
