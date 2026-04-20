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

    useEffect(() => {
        setAlternateUrl("/hizmetler", "/en/services");
    }, []);

    const allServices = useMemo(() => {
        return categories.flatMap(cat => cat.services.map(s => ({
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
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-white">
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
                            className="text-5xl md:text-7xl lg:text-[80px] font-light uppercase tracking-tighter text-[#1a1a1a] mb-4"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {t("HİZMETLERİMİZ", "OUR SERVICES")}
                        </h1>
                        <p className="text-sm md:text-base text-[#1a1a1a]/60 uppercase tracking-[0.2em] font-medium">
                            {t("İNTERAKTİF DENEYİM ALANLARI", "INTERACTIVE EXPERIENCE AREAS")}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* Category Filter Bar */}
            <div className="sticky top-20 z-[60] bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8 overflow-x-auto py-6 no-scrollbar">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`whitespace-nowrap text-xs font-bold tracking-widest uppercase transition-all duration-300 pb-1 border-b-2 ${activeCategory === "all" ? "text-red-600 border-red-600" : "text-black/40 border-transparent hover:text-black"
                                }`}
                        >
                            {t("TÜMÜ", "ALL")}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={`whitespace-nowrap text-xs font-bold tracking-widest uppercase transition-all duration-300 pb-1 border-b-2 ${activeCategory === cat.slug ? "text-red-600 border-red-600" : "text-black/40 border-transparent hover:text-black"
                                    }`}
                            >
                                {language === "en" ? (cat.name_en || cat.name) : cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                                        className="group block relative aspect-[4/3] overflow-hidden bg-neutral-100 transition-all duration-500"
                                    >
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
                                                <span
                                                    className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tighter text-center leading-tight"
                                                    style={{ fontFamily: "var(--font-inter-tight)" }}
                                                >
                                                    {language === "en" ? (service.title_en || service.title) : service.title}
                                                </span>
                                            </div>
                                        )}

                                        {/* Reference-style White Box Info */}
                                        <div className="absolute bottom-[20px] left-0">
                                            <div className="bg-white px-6 py-4 border-y border-r border-black/5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 md:opacity-100 md:translate-y-0 md:w-fit md:min-w-[180px]">
                                                <h3 className="text-lg md:text-xl font-bold text-red-600 uppercase tracking-tighter leading-none"
                                                    style={{ fontFamily: "var(--font-inter-tight)" }}>
                                                    {language === "en" ? (service.title_en || service.title) : service.title}
                                                </h3>
                                            </div>
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
                            "Etkinliğiniz veya projeniz için en iyi interaktif çözümleri birlikte hayata geçirelim.",
                            "Let's bring the best interactive solutions to life together for your event or project."
                        )}
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-flex items-center justify-center px-12 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                    >
                        {t("TEKLİF ALIN", "GET A QUOTE")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
