"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function HeroSection() {
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
            className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]"
        >
            {/* Aurora blobs */}
            <div
                className="aurora-blob aurora-drift"
                style={{
                    width: 620,
                    height: 620,
                    top: "-10%",
                    left: "-8%",
                    background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)",
                }}
            />
            <div
                className="aurora-blob aurora-drift2"
                style={{
                    width: 560,
                    height: 560,
                    top: "10%",
                    right: "-10%",
                    background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)",
                }}
            />
            <div
                className="aurora-blob aurora-drift3"
                style={{
                    width: 680,
                    height: 680,
                    bottom: "-20%",
                    left: "30%",
                    background: "radial-gradient(circle, rgba(232,121,249,0.22), transparent 70%)",
                }}
            />
            <div className="hero-mouse-glow" />

            {/* Darkening overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(10,10,15,.15), rgba(10,10,15,.82))" }}
            />

            <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 sm:px-12 pt-28 pb-20">
                {/* Live badge */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 mb-8"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] live-dot" />
                    <span
                        className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                    >
                        {t("CANLI · İSTANBUL · YAPAY ZEKA AKTİVASYON", "LIVE · ISTANBUL · AI ACTIVATION")}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="text-white font-bold tracking-[-0.02em] leading-[0.97]"
                    style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "clamp(40px, 7vw, 82px)",
                    }}
                >
                    {language === "tr" ? (
                        <>
                            Markanı etkinliğin
                            <br />
                            <span className="shimmer-text">kahramanı</span> yap.
                        </>
                    ) : (
                        <>
                            Make your brand
                            <br />
                            the <span className="shimmer-text">hero</span> of the event.
                        </>
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 }}
                    className="mt-7 max-w-[580px] text-[rgba(255,255,255,.64)]"
                    style={{ fontFamily: "var(--font-manrope)", fontSize: 19, lineHeight: 1.55 }}
                >
                    {t(
                        "Stable Diffusion'dan ControlNet'e — yapay zekayla kurgulanan interaktif aktivasyonlar. Katılımcı izleyici değil, anın merkezi olur. Yazılım, üretim ve prodüksiyon tek çatı altında.",
                        "From Stable Diffusion to ControlNet — interactive activations engineered with AI. The participant isn't a spectator, they're the center of the moment. Software, production and logistics under one roof."
                    )}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.18 }}
                    className="mt-10 flex flex-wrap items-center gap-4"
                >
                    <Link
                        href={language === "en" ? "/en/projects" : "/projeler"}
                        className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(90deg, #7c3aed, var(--acc))", fontFamily: "var(--font-manrope)" }}
                    >
                        {t("Projeleri Gör", "View Projects")} →
                    </Link>
                    <Link
                        href={language === "en" ? "/en/contact" : "/iletisim"}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-semibold text-white/85 hover:border-white/30 hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-manrope)" }}
                    >
                        {t("30 Günde Sahnede", "On Stage in 30 Days")}
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 flex flex-wrap gap-12"
                >
                    {[
                        { value: "1K+", label: t("etkinlikte sahne", "events on stage") },
                        { value: "100+", label: t("marka güvendi", "brands trusted us") },
                        { value: "5+", label: t("yıl uzmanlık", "years of expertise") },
                        { value: "∞", label: t("deneyim potansiyeli", "experience potential") },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p
                                className="text-white font-bold tracking-[-0.01em]"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32 }}
                            >
                                {stat.value}
                            </p>
                            <p
                                className="text-white/50 text-sm mt-1"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        </section>
    );
}
