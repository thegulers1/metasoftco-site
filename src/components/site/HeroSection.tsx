"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";
import ParticleBackground from "./ParticleBackground";

export default function HeroSection() {
    const { language } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
            <div className="absolute inset-0 z-0">
                <ParticleBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                {/* h1 outside motion wrapper — renders immediately for LCP */}
                <h1
                    className="text-4xl md:text-6xl lg:text-[76px] font-light uppercase tracking-tighter text-[#e5e5e5] mb-6 leading-[1.05]"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                    {language === "tr" ? (
                        <>
                            Türkiye&apos;nin Lider
                            <br />
                            <span className="text-[#e5e5e5]/70">Yapay Zeka &amp;</span>
                            <br />
                            <span className="text-[#e5e5e5]/40">İnteraktif Aktivasyon Ajansı</span>
                        </>
                    ) : (
                        <>
                            Turkey&apos;s Leading
                            <br />
                            <span className="text-[#e5e5e5]/70">AI &amp;</span>
                            <br />
                            <span className="text-[#e5e5e5]/40">Interactive Activation Agency</span>
                        </>
                    )}
                </h1>

                <div className="flex justify-center mt-4 mb-6">
                    <h2 className="text-base md:text-xl lg:text-2xl text-[#e5e5e5]/60 font-light leading-relaxed text-center px-4 max-w-[900px]">
                        {language === "tr" ? (
                            <>
                                <span className="text-[#e5e5e5]/90 font-medium">Stable Diffusion&apos;dan ControlNet&apos;e</span>, en güncel AI teknolojileriyle markanızı etkinliklerin odak noktası yapıyoruz.
                            </>
                        ) : (
                            <>
                                <span className="text-[#e5e5e5]/90 font-medium">From Stable Diffusion to ControlNet</span>, we make your brand the centerpiece of events with the latest AI technologies.
                            </>
                        )}
                    </h2>
                </div>

                <div className="flex justify-center mt-2">
                    <p className="text-sm md:text-base text-[#e5e5e5]/50 font-normal leading-relaxed text-center px-4 max-w-[1000px]">
                        {language === "tr" ? (
                            <>DeFacto&apos;dan Mercedes-Benz&apos;e, Akbank&apos;tan Adidas&apos;a — Türkiye&apos;nin önde gelen markalarının etkinliklerinde sahneyi alan taraf biz olduk. Yazılım, üretim ve prodüksiyon: tek çatı, sıfır koordinasyon sorunu.</>
                        ) : (
                            <>From DeFacto to Mercedes-Benz, Akbank to Adidas — we&apos;ve been behind the scenes at Turkey&apos;s leading brand events. Software, production, and logistics: one roof, zero coordination headaches.</>
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
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </section>
    );
}
