"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ServicesHero() {
    const { language, t } = useLanguage();
    const heroRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = heroRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden bg-[#0a0a0f]"
        >
            <div
                className="aurora-blob aurora-drift"
                style={{ width: 640, height: 640, top: "-18%", left: "4%", background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)" }}
            />
            <div
                className="aurora-blob aurora-drift2"
                style={{ width: 560, height: 560, top: "-12%", right: "0%", background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)" }}
            />
            <div
                className="aurora-blob aurora-drift3"
                style={{ width: 520, height: 520, top: "8%", left: "40%", background: "radial-gradient(circle, rgba(232,121,249,0.22), transparent 70%)" }}
            />
            <div className="hero-mouse-glow" />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))" }}
            />

            <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-12">
                <div className="max-w-[920px]">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-[30px]"
                    >
                        <span
                            className="h-[7px] w-[7px] rounded-full bg-[#4ade80] live-dot"
                            style={{ boxShadow: "0 0 10px #4ade80" }}
                        />
                        <span
                            className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {t("30+ AKTİVASYON FORMATI · TEK ÇATI", "30+ ACTIVATION FORMATS · ONE ROOF")}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        className="text-white font-bold tracking-[-0.02em] leading-[0.98]"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(40px, 7vw, 76px)" }}
                    >
                        {language === "tr" ? (
                            <>
                                Etkinliğinizi dönüştürecek
                                <br />
                                <span className="shimmer-text">interaktif deneyimler.</span>
                            </>
                        ) : (
                            <>
                                Experiences that transform
                                <br />
                                <span className="shimmer-text">your event.</span>
                            </>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="mt-[26px] max-w-[600px] text-[rgba(255,255,255,.64)]"
                        style={{ fontFamily: "var(--font-manrope)", fontSize: 19, lineHeight: 1.55 }}
                    >
                        {t(
                            "30'dan fazla deneyim arasından dilediğinizi kiralayın veya satın alın. AI Photobooth'tan interaktif oyunlara, kurulum ve operasyonun tamamı bizde — siz sadece anın tadını çıkarın.",
                            "Rent or buy from over 30 experiences. From AI photobooth to interactive games, setup and operation are entirely on us — just enjoy the moment."
                        )}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
