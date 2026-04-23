"use client";

import { motion } from "motion/react";
import ParticleBackground from "@/components/site/ParticleBackground";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ProjectsHero() {
    const { t } = useLanguage();

    return (
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
                        {t("100+ MARKA, 1.000+ ETKİNLİK", "100+ BRANDS, 1,000+ EVENTS")}
                    </h1>
                    <p className="text-sm md:text-base text-[#e5e5e5]/60 font-light leading-relaxed max-w-2xl mx-auto">
                        {t(
                            "Her proje farklı bir brief'ten, aynı hedefle çıktı: katılımcı etkinliği bittikten sonra da konuşsun. Aşağıdakiler en çok paylaşılan, en çok sorulan projelerimizden bir seçki.",
                            "Every project started from a different brief, with the same goal: keep participants talking long after the event ends. Below is a selection of our most shared and most requested projects."
                        )}
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </section>
    );
}
