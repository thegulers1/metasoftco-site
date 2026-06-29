"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";
import CtaSection from "@/components/site/CtaSection";

const VALUES = [
    {
        n: "01",
        title: { tr: "TEKNİK DERİNLİK", en: "TECHNICAL DEPTH" },
        desc: {
            tr: "Prompt mühendisliğinden sahne lojistiğine her adımı içeride yapıyoruz. Dışarıya bırakmadığımız süreç, kontrolümüzden çıkmayan kalite demektir.",
            en: "We handle every step in-house, from prompt engineering to stage logistics. What we don't outsource, we don't lose control of.",
        },
        c1: "#7c3aed",
    },
    {
        n: "02",
        title: { tr: "ÖLÇÜLEBİLİR ETKİ", en: "MEASURABLE IMPACT" },
        desc: {
            tr: "Paylaşım oranı, etkileşim süresi, marka hatırlanırlığı — her aktivasyonun çıktısı raporlanabilir. Hissetmekle yetinmiyoruz, ölçüyoruz.",
            en: "Share rate, engagement duration, brand recall — every activation's output is reportable. We don't settle for gut feeling, we measure.",
        },
        c1: "#22d3ee",
    },
    {
        n: "03",
        title: { tr: "KVKK ÖNCE", en: "PRIVACY FIRST" },
        desc: {
            tr: "Kişisel veri etkinlik sonrası silinir; katılımcı güveni marka güvenidir. Tüm sistemler KVKK uyumlu, açık rıza mekanizmasıyla çalışır.",
            en: "Personal data is deleted after the event; participant trust is brand trust. All systems operate with KVKK compliance and explicit consent mechanisms.",
        },
        c1: "#e879f9",
    },
];

const STATS = [
    { value: "1K+", label: { tr: "etkinlikte sahne", en: "events on stage" } },
    { value: "100+", label: { tr: "marka güvendi", en: "brands trusted us" } },
    { value: "5+", label: { tr: "yıl uzmanlık", en: "years of expertise" } },
    { value: "∞", label: { tr: "deneyim potansiyeli", en: "experience potential" } },
];

export default function AboutClient() {
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
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Hero */}
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

                <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-16">
                    <div className="max-w-[920px]">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-[30px]"
                        >
                            <span className="h-[7px] w-[7px] rounded-full bg-[#4ade80] live-dot" style={{ boxShadow: "0 0 10px #4ade80" }} />
                            <span
                                className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                            >
                                {t("İSTANBUL · 2020'DEN BERİ", "ISTANBUL · SINCE 2020")}
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
                                    Teknolojiyi sahneye
                                    <br />
                                    <span className="shimmer-text">çıkaran ekip.</span>
                                </>
                            ) : (
                                <>
                                    The team that brings
                                    <br />
                                    <span className="shimmer-text">technology to the stage.</span>
                                </>
                            )}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.12 }}
                            className="mt-[26px] max-w-[640px] text-[rgba(255,255,255,.64)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 19, lineHeight: 1.55 }}
                        >
                            {t(
                                "2020'de İstanbul Bakırköy'de kurulan MetasoftCo, Türkiye'de yapay zeka destekli etkinlik teknolojilerinin öncüsüdür.",
                                "Founded in 2020 in Bakırköy, Istanbul, MetasoftCo is a pioneer of AI-powered event technology in Turkey."
                            )}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Intro paragraphs */}
            <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 py-20 sm:py-24">
                <div
                    className="max-w-[760px] mx-auto text-center text-[rgba(255,255,255,.64)]"
                    style={{ fontFamily: "var(--font-manrope)", fontSize: 17, lineHeight: 1.7 }}
                >
                    <p className="mb-7">
                        {t(
                            "Stable Diffusion modellerini fine-tune eden, ControlNet pipeline'larını etkinlik ortamına adapte eden, AR ve Computer Vision çözümlerini sahnede çalıştıran tek ekip değiliz — ama bunları fiziksel stand üretimi ve etkinlik prodüksiyonuyla aynı çatı altında sunan sayılı ajanslardan biriyiz.",
                            "We're not the only team fine-tuning Stable Diffusion models, adapting ControlNet pipelines for live events, and running AR and Computer Vision solutions on stage — but we are one of the few agencies offering all of this alongside physical stand production and full event production under one roof."
                        )}
                    </p>
                    <p>
                        {t(
                            "Vodafone'dan Samsung'a, Adidas'tan Mercedes-Benz'e 100'den fazla markanın etkinliklerinde sahne alan taraf olduk. Her projede motivasyonumuz aynı: katılımcı etkinliği bitince değil, fotoğrafı telefonuna düşünce hatırlar — ve paylaşır.",
                            "From Vodafone to Samsung, Adidas to Mercedes-Benz — we've been the ones on stage at events for 100+ brands. Our motivation is the same in every project: the participant doesn't remember the event when it ends, they remember it when the photo lands on their phone — and they share it."
                        )}
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-16 flex flex-wrap justify-center gap-12 sm:gap-16 border-t border-white/[0.08] pt-14">
                    {STATS.map((stat) => (
                        <div key={stat.value} className="text-center">
                            <p
                                className="text-white font-bold tracking-[-0.01em]"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 36 }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "var(--font-manrope)" }}>
                                {stat.label[language]}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Değerlerimiz */}
            <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 pb-20 sm:pb-24">
                <div className="text-center mb-12">
                    <span
                        className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                    >
                        {t("DEĞERLERİMİZ", "OUR VALUES")}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {VALUES.map((v) => (
                        <div
                            key={v.n}
                            className="relative rounded-[20px] border border-white/10 overflow-hidden p-8"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                        >
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[.18]"
                                style={{ background: `radial-gradient(circle at 80% -10%, ${v.c1}, transparent 60%)` }}
                            />
                            <div className="relative">
                                <span
                                    className="text-[12px]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", color: v.c1, fontWeight: 500 }}
                                >
                                    {v.n}
                                </span>
                                <h3
                                    className="text-white mt-4 mb-3"
                                    style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, fontWeight: 600 }}
                                >
                                    {v.title[language]}
                                </h3>
                                <p
                                    className="text-[rgba(255,255,255,.55)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                >
                                    {v.desc[language]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <CtaSection />
        </div>
    );
}
