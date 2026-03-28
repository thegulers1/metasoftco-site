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
                {/* h1 outside motion wrapper — renders immediately for LCP */}
                <h1
                    className="text-4xl md:text-7xl lg:text-[88px] font-light uppercase tracking-tighter text-[#1a1a1a] mb-6 leading-[1.05]"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                    {t("Fikirden Sahneye,", "From Idea to Stage,")}
                    <br />
                    <span className="text-[#1a1a1a]/40">{t("Yazılımdan Üretime.", "From Software to Production.")}</span>
                </h1>

                <div className="flex justify-center mt-4">
                    <p className="text-sm md:text-base lg:text-lg text-[#1a1a1a]/60 font-normal leading-relaxed text-center px-4 max-w-[1000px]">
                        {language === "tr" ? (
                            <>MetasoftCo, markalar için sadece dijital dünyalar kurgulamakla kalmayan; <span className="font-bold text-[#1a1a1a]/90">özel yazılımları, interaktif teknolojileri, fiziksel stand üretimini</span> ve etkinlik prodüksiyonunu tek çatı altında buluşturan İstanbul merkezli uçtan uca deneyim ajansıdır.</>
                        ) : (
                            <>MetasoftCo is an Istanbul-based end-to-end experience agency that goes beyond building digital worlds for brands — bringing together <span className="font-bold text-[#1a1a1a]/90">custom software, interactive technologies, physical stand production</span> and event production under one roof.</>
                        )}
                    </p>
                </div>
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
