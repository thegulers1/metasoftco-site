"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";
import ParticleBackground from "./ParticleBackground";

export default function HeroSection() {
    const { language, t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
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
                        className="text-4xl md:text-7xl lg:text-[88px] font-light uppercase tracking-tighter text-[#1a1a1a] mb-6 leading-[1.05]"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("TEKNOLOJİ", "TECHNOLOGY")}
                        <br />
                        <span className="text-[#1a1a1a]/40 whitespace-nowrap">{t("DENEYİMLE BULUŞUYOR", "MEETS EXPERIENCE")}</span>
                    </h1>

                    <div className="flex justify-center mt-4">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-sm md:text-base lg:text-lg text-[#1a1a1a]/60 font-normal leading-relaxed text-center px-4 max-w-[1000px]"
                        >
                            {language === "tr" ? (
                                <>Metasoftco, markalar için en gelişmiş <span className="font-bold text-[#1a1a1a]/90">interaktif deneyimleri</span> tasarlayan ve hayalleri dijital gerçekliğe dönüştüren İstanbul merkezli bir kreatif teknoloji ajansıdır.</>
                            ) : (
                                <>Metasoftco is an Istanbul-based creative technology agency that designs advanced <span className="font-bold text-[#1a1a1a]/90">interaktif deneyimleri</span> for brands, turning imaginations into digital reality.</>
                            )}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-16 flex justify-center gap-6"
                    >
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator Line - moved up to avoid overlap with next section */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="h-24 w-[1px] bg-[#dc2626]/20 relative overflow-hidden">
                    <motion.div
                        animate={{
                            y: ["-100%", "100%"]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-[#dc2626]"
                    />
                </div>
            </div>

            {/* Bottom Gradient for smoother transition - reduced height to minimize gap */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
