"use client";

import { motion } from "motion/react";
import ParticleBackground from "@/components/site/ParticleBackground";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ProjectsHero() {
    const { t } = useLanguage();

    return (
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
                        {t("PROJELERİMİZ", "OUR PROJECTS")}
                    </h1>
                    <p className="text-sm md:text-base text-[#1a1a1a]/60 uppercase tracking-[0.2em] font-medium">
                        {t("YARATICILIK VE TEKNOLOJİNİN BULUŞTUĞU YER", "WHERE CREATIVITY MEETS TECHNOLOGY")}
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
