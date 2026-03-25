"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ParticleBackground from "@/components/site/ParticleBackground";
import { sectors } from "./data";

interface SektorelYazilimClientProps {
    lang?: "tr" | "en";
}

export default function SektorelYazilimClient({ lang = "tr" }: SektorelYazilimClientProps) {
    const isEn = lang === "en";

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
                            {isEn ? "SECTORAL SOLUTIONS" : "SEKTÖREL ÇÖZÜMLER"}
                        </h1>
                        <p className="text-sm md:text-base text-[#1a1a1a]/60 uppercase tracking-[0.2em] font-medium">
                            {isEn ? "SECTOR-SPECIFIC DIGITAL TRANSFORMATION" : "SEKTÖRE ÖZEL DİJİTAL DÖNÜŞÜM"}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* Sectors Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sectors.map((sector) => (
                            <Link
                                key={sector.slug}
                                href={
                                    isEn
                                        ? `/en/industry-software-solutions/${sector.slug_en}`
                                        : `/sektorel-yazilim-cozumleri/${sector.slug}`
                                }
                                className="group block relative aspect-[4/3] overflow-hidden bg-neutral-900 transition-all duration-500"
                            >
                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
                                    <span
                                        className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tighter text-center leading-tight"
                                        style={{ fontFamily: "var(--font-inter-tight)" }}
                                    >
                                        {isEn ? sector.name_en : sector.name}
                                    </span>
                                </div>
                                {/* White overlay box */}
                                <div className="absolute bottom-[20px] left-0">
                                    <div className="bg-white px-6 py-4 border-y border-r border-black/5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 md:opacity-100 md:translate-y-0 md:w-fit md:min-w-[180px]">
                                        <h3
                                            className="text-lg md:text-xl font-bold text-red-600 uppercase tracking-tighter leading-none"
                                            style={{ fontFamily: "var(--font-inter-tight)" }}
                                        >
                                            {isEn ? sector.name_en : sector.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-32 bg-neutral-50 border-t border-black/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-8 uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {isEn ? "LET'S WORK TOGETHER" : "BİRLİKTE ÇALIŞALIM"}
                    </p>
                    <p className="text-lg text-black/60 mb-12 max-w-2xl mx-auto">
                        {isEn
                            ? "Let's bring the best interactive solutions to life for your event or project."
                            : "Sektörünüze özel en iyi interaktif çözümleri birlikte hayata geçirelim."}
                    </p>
                    <Link
                        href={isEn ? "/en/contact" : "/iletisim"}
                        className="inline-flex items-center justify-center px-12 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                    >
                        {isEn ? "GET A QUOTE" : "TEKLİF ALIN"}
                    </Link>
                </div>
            </section>
        </div>
    );
}
