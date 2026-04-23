"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ParticleBackground from "@/components/site/ParticleBackground";

interface SectorPageItem {
    id: string;
    title: string;
    slug: string;
    h1: string | null;
    excerpt: string | null;
    ogImage: string | null;
}

interface SektorelCozumlerClientProps {
    pages: SectorPageItem[];
    lang?: "tr" | "en";
}

export default function SektorelCozumlerClient({ pages, lang = "tr" }: SektorelCozumlerClientProps) {
    const t = (tr: string, en: string) => lang === "en" ? en : tr;
    const serviceHref = lang === "en" ? "/en/sector-solutions" : "/sektorel-cozumler";
    const contactHref = lang === "en" ? "/en/contact" : "/iletisim";

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
                            {t("SEKTÖRÜNÜZÜ ANLAYAN", "SECTOR-SPECIFIC")}
                        </h1>
                        <p className="text-sm md:text-base text-[#1a1a1a]/60 font-light leading-relaxed max-w-2xl mx-auto">
                            {t(
                                "Moda markası için Virtual Try-On, banka için gamification, otomotiv için AR test sürüşü — her sektörün kitlesi farklı tepki verir, farklı motivasyonla paylaşır. MetasoftCo, sektörünüzün dinamiklerini bilerek brief'i çözer.",
                                "Virtual Try-On for fashion brands, gamification for banks, AR test drives for automotive — every sector's audience reacts differently and shares with different motivations. MetasoftCo solves the brief knowing your sector's dynamics."
                            )}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* Sector Pages Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pages.map((page, index) => (
                            <motion.div
                                key={page.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link
                                    href={`${serviceHref}/${page.slug}`}
                                    className="group block relative aspect-[4/3] overflow-hidden bg-neutral-100 transition-all duration-500"
                                >
                                    {page.ogImage ? (
                                        <img
                                            src={page.ogImage}
                                            alt={page.h1 || page.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
                                            <span
                                                className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tighter text-center leading-tight"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {page.h1 || page.title}
                                            </span>
                                        </div>
                                    )}

                                    {/* White Box Info */}
                                    <div className="absolute bottom-[20px] left-0">
                                        <div className="bg-white px-6 py-4 border-y border-r border-black/5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 md:opacity-100 md:translate-y-0 md:w-fit md:min-w-[180px]">
                                            <h3 className="text-lg md:text-xl font-bold text-red-600 uppercase tracking-tighter leading-none"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}>
                                                {page.h1 || page.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
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
                            "Sektörünüze özel aktivasyon brief'inizi paylaşın, 24 saat içinde somut bir konsept önerisiyle geri dönelim.",
                            "Share your sector-specific activation brief and we'll come back with a concrete concept proposal within 24 hours."
                        )}
                    </p>
                    <Link
                        href={contactHref}
                        className="inline-flex items-center justify-center px-12 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                    >
                        {t("BUGÜN KONUŞALIM →", "LET'S TALK TODAY →")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
