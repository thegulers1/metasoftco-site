"use client";

import Link from "next/link";
import { motion } from "motion/react";
import CtaSection from "@/components/site/CtaSection";

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
                            {t("SEKTÖREL ÇÖZÜMLER", "SECTOR SOLUTIONS")}
                        </span>
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-white font-bold tracking-[-0.02em] leading-[0.98] mt-4"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(36px, 6vw, 64px)" }}
                        >
                            {t("Sektörünüzü anlayan", "Sector-specific")}
                            <br />
                            <span className="shimmer-text">{t("çözümler.", "solutions.")}</span>
                        </motion.h1>
                        <p
                            className="mt-6 max-w-[640px] text-[rgba(255,255,255,.64)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.55 }}
                        >
                            {t(
                                "Moda markası için Virtual Try-On, banka için gamification, otomotiv için AR test sürüşü — her sektörün kitlesi farklı tepki verir, farklı motivasyonla paylaşır. MetasoftCo, sektörünüzün dinamiklerini bilerek brief'i çözer.",
                                "Virtual Try-On for fashion brands, gamification for banks, AR test drives for automotive — every sector's audience reacts differently and shares with different motivations. MetasoftCo solves the brief knowing your sector's dynamics."
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* Sector Pages Grid */}
            <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {pages.map((page, index) => (
                        <motion.div
                            key={page.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Link
                                href={`${serviceHref}/${page.slug}`}
                                className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 transition-all duration-[.4s] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-3 hover:border-white/30"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#14141d]">
                                    {page.ogImage ? (
                                        <img
                                            src={page.ogImage}
                                            alt={page.h1 || page.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0"
                                            style={{ backgroundImage: "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)" }}
                                        />
                                    )}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-[.34]"
                                        style={{ background: "radial-gradient(circle at 72% 20%, #22d3ee, transparent 64%)" }}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 px-[22px] pt-[22px] pb-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div
                                            className="text-white"
                                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, lineHeight: 1.2, fontWeight: 600 }}
                                        >
                                            {page.h1 || page.title}
                                        </div>
                                        <span className="text-[17px] font-semibold text-[var(--acc)] shrink-0">→</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CtaSection />
        </div>
    );
}
