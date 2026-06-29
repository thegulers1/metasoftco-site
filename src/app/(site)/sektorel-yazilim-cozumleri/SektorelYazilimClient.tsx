"use client";

import Link from "next/link";
import { motion } from "motion/react";
import CtaSection from "@/components/site/CtaSection";
import { sectors } from "./data";

interface SektorelYazilimClientProps {
    lang?: "tr" | "en";
}

const ACCENTS = ["#7c3aed", "#22d3ee", "#e879f9", "#fb923c", "#4ade80", "#a78bfa"];

export default function SektorelYazilimClient({ lang = "tr" }: SektorelYazilimClientProps) {
    const isEn = lang === "en";

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div
                    className="aurora-blob aurora-drift"
                    style={{ width: 640, height: 640, top: "-18%", left: "4%", background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)" }}
                />
                <div
                    className="aurora-blob aurora-drift2"
                    style={{ width: 560, height: 560, top: "-12%", right: "0%", background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)" }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))" }}
                />
                <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-16">
                    <div className="max-w-[920px]">
                        <span
                            className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {isEn ? "SECTOR-SPECIFIC DIGITAL TRANSFORMATION" : "SEKTÖRE ÖZEL DİJİTAL DÖNÜŞÜM"}
                        </span>
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-white font-bold tracking-[-0.02em] leading-[0.98] mt-4"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(36px, 6vw, 64px)" }}
                        >
                            {isEn ? "Sectoral software" : "Sektörel yazılım"}
                            <br />
                            <span className="shimmer-text">{isEn ? "solutions." : "çözümleri."}</span>
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* Sectors Grid */}
            <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {sectors.map((sector, index) => {
                        const c1 = ACCENTS[index % ACCENTS.length];
                        return (
                            <Link
                                key={sector.slug}
                                href={
                                    isEn
                                        ? `/en/industry-software-solutions/${sector.slug_en}`
                                        : `/sektorel-yazilim-cozumleri/${sector.slug}`
                                }
                                className="group relative rounded-[20px] overflow-hidden border border-white/10 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                            >
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[.18]"
                                    style={{ background: `radial-gradient(circle at 80% -10%, ${c1}, transparent 60%)` }}
                                />
                                <div className="relative flex items-start justify-between gap-3">
                                    <h3
                                        className="text-white"
                                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600, lineHeight: 1.25 }}
                                    >
                                        {isEn ? sector.name_en : sector.name}
                                    </h3>
                                    <span className="text-[17px] font-semibold shrink-0" style={{ color: c1 }}>→</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <CtaSection />
        </div>
    );
}
