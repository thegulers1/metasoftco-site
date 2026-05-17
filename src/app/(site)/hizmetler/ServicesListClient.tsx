"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import ParticleBackground from "@/components/site/ParticleBackground";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface Service {
    id: string;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    slug: string;
    slug_en: string | null;
    image: string | null;
}

interface ServiceCategory {
    id: string;
    name: string;
    name_en: string | null;
    slug: string;
    slug_en: string | null;
    services: Service[];
}

interface ServicesListClientProps {
    categories: ServiceCategory[];
}

export default function ServicesListClient({ categories }: ServicesListClientProps) {
    const { language, t, setAlternateUrl } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredCategories = categories.filter(
        (cat) => !cat.slug.includes("yazilim") && !cat.name.toLowerCase().includes("yazılım")
    );

    useEffect(() => {
        setAlternateUrl("/hizmetler", "/en/services");
    }, []);

    const allServices = useMemo(() => {
        return filteredCategories.flatMap(cat => cat.services.map(s => ({
            ...s,
            categoryName: language === "en" ? (cat.name_en || cat.name) : cat.name,
            categorySlug: cat.slug,
            categorySlugEn: cat.slug_en,
        })));
    }, [categories, language]);

    const filteredServices = useMemo(() => {
        if (activeCategory === "all") return allServices;
        return allServices.filter(s => s.categorySlug === activeCategory);
    }, [allServices, activeCategory]);

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
                <div className="absolute inset-0 z-0">
                    <ParticleBackground />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1
                            className="text-5xl md:text-7xl lg:text-[80px] font-light uppercase tracking-tighter text-[#e5e5e5] mb-4"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {t("ETKİNLİĞİNİZİ DÖNÜŞTÜRECEK", "TRANSFORM YOUR EVENT WITH")}
                        </h1>
                        <p className="text-sm md:text-base text-[#e5e5e5]/60 uppercase tracking-[0.2em] font-medium">
                            {t("İNTERAKTİF AKTİVASYON HİZMETLERİ", "INTERACTIVE ACTIVATION SERVICES")}
                        </p>
                        <p className="mt-6 text-base md:text-lg text-[#e5e5e5]/70 max-w-3xl mx-auto leading-relaxed">
                            {t(
                                "Etkinliklerinizi unutulmaz kılacak 90'dan fazla deneyim! AI Photo Booth, 360 Video, VR ve interaktif kurulumlar arasından dilediğinizi kiralayın veya satın alın. Siz sadece anın tadını çıkarın; kişiselleştirme, kurulum ve operasyon detaylarının tamamı bizde!",
                                "Over 90 experiences to make your events unforgettable! Rent or buy from AI Photo Booth, 360 Video, VR and interactive installations. Just enjoy the moment; personalization, setup and all operation details are on us!"
                            )}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
            </section>

            {/* Category Filter Bar */}
            <div className="sticky top-20 z-[60] bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 overflow-x-auto py-5 no-scrollbar">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`whitespace-nowrap text-xs font-bold tracking-widest uppercase transition-all duration-300 px-5 py-2.5 rounded-[24px] border ${activeCategory === "all"
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-transparent text-white border-white/40 hover:border-white"
                                }`}
                        >
                            {t("TÜMÜ", "ALL")}
                        </button>
                        {filteredCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={`whitespace-nowrap text-xs font-bold tracking-widest uppercase transition-all duration-300 px-5 py-2.5 rounded-[24px] border ${activeCategory === cat.slug
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-transparent text-white border-white/40 hover:border-white"
                                    }`}
                            >
                                {language === "en" ? (cat.name_en || cat.name) : cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((service) => (
                                <motion.div
                                    key={service.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Link
                                        href={language === "en" ? `/en/services/${service.categorySlugEn}/${service.slug_en}` : `/hizmetler/${service.categorySlug}/${service.slug}`}
                                        className="group block relative aspect-[2/3] overflow-hidden bg-[#1a1a1a] rounded-[30px] transition-all duration-500"
                                    >
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-900" />
                                        )}

                                        {/* Bottom gradient */}
                                        <div
                                            className="absolute inset-0 rounded-[30px]"
                                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 55%)" }}
                                        />

                                        {/* Text — bottom left */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <h3
                                                className="text-[18px] font-semibold text-white leading-snug"
                                                style={{ fontFamily: "var(--font-poppins)" }}
                                            >
                                                {language === "en" ? (service.title_en || service.title) : service.title}
                                            </h3>
                                            {(language === "en" ? (service.description_en || service.description) : service.description) && (
                                                <p
                                                    className="mt-1 text-[13px] font-normal leading-snug line-clamp-2"
                                                    style={{ fontFamily: "var(--font-poppins)", color: "rgba(255,255,255,0.7)" }}
                                                >
                                                    {language === "en" ? (service.description_en || service.description) : service.description}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-32 bg-neutral-50 border-t border-black/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-8 uppercase">
                        {t("BİRLİKTE ÇALIŞALIM", "LET'S WORK TOGETHER")}
                    </p>
                    <p className="text-lg text-black/60 mb-12 max-w-2xl mx-auto">
                        {t(
                            "Yapay zeka fotoğraf aktivasyonlarından fiziksel photobooth üretimine, interaktif oyunlardan AR deneyimlerine — tüm hizmetler tek çatı altında. Her çözüm, katılımcıların telefonlarına düşen ve paylaşılan anlar için tasarlanmıştır.",
                            "From AI photo activations to physical photobooth production, from interactive games to AR experiences — all services under one roof. Every solution is designed for moments that land on participants' phones and get shared."
                        )}
                    </p>
                    <Link
                        href={language === "en" ? "/en/contact" : "/iletisim"}
                        className="inline-flex items-center justify-center px-12 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                    >
                        {t("BUGÜN KONUŞALIM →", "LET'S TALK TODAY →")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
