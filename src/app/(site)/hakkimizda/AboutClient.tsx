"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { motion } from "motion/react";
import ParticleBackground from "@/components/site/ParticleBackground";
export default function AboutClient() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            {/* Hero Section — Hizmetler sayfasıyla aynı stil */}
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
                            {t("TEKNOLOJİYİ SAHNEYE", "THE TEAM THAT BRINGS")}
                        </h1>
                        <p className="text-sm md:text-base text-[#e5e5e5]/60 uppercase tracking-[0.2em] font-medium">
                            {t("ÇIKARAN EKİP — İSTANBUL, TÜRKİYE", "TECHNOLOGY TO THE STAGE — ISTANBUL, TURKEY")}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
            </section>

            {/* Content */}
            <section className="py-24 bg-[#0d0d0d]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-lg leading-relaxed text-[#e5e5e5]/70"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                    <p className="mb-8">
                        {t(
                            "2020'de İstanbul Bakırköy'de kurulan MetasoftCo, Türkiye'de yapay zeka destekli etkinlik teknolojilerinin öncüsüdür. Stable Diffusion modellerini fine-tune eden, ControlNet pipeline'larını etkinlik ortamına adapte eden, AR ve Computer Vision çözümlerini sahnede çalıştıran tek ekip değiliz — ama bunları fiziksel stand üretimi ve etkinlik prodüksiyonuyla aynı çatı altında sunan sayılı ajanslardan biriyiz.",
                            "Founded in 2020 in Bakırköy, Istanbul, MetasoftCo is a pioneer of AI-powered event technology in Turkey. We're not the only team fine-tuning Stable Diffusion models, adapting ControlNet pipelines for live events, and running AR and Computer Vision solutions on stage — but we are one of the few agencies offering all of this alongside physical stand production and full event production under one roof."
                        )}
                    </p>
                    <p>
                        {t(
                            "Vodafone'dan Samsung'a, Adidas'tan Mercedes-Benz'e 100'den fazla markanın etkinliklerinde sahne alan taraf olduk. Her projede motivasyonumuz aynı: katılımcı etkinliği bitince değil, fotoğrafı telefonuna düşünce hatırlar — ve paylaşır.",
                            "From Vodafone to Samsung, Adidas to Mercedes-Benz — we've been the ones on stage at events for 100+ brands. Our motivation is the same in every project: the participant doesn't remember the event when it ends, they remember it when the photo lands on their phone — and they share it."
                        )}
                    </p>
                </div>
            </section>

            {/* Değerler */}
            <section className="py-24 bg-[#0d0d0d] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tighter text-[#e5e5e5] mb-16 text-center"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("Değerlerimiz", "Our Values")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                        <div className="bg-[#0d0d0d] p-10">
                            <h3 className="text-lg font-bold text-[#e5e5e5] mb-3 uppercase tracking-wider">
                                {t("Teknik Derinlik", "Technical Depth")}
                            </h3>
                            <p className="text-[#e5e5e5]/50 text-sm leading-relaxed">
                                {t(
                                    "Prompt mühendisliğinden sahne lojistiğine her adımı içeride yapıyoruz. Dışarıya bırakmadığımız süreç, kontrolümüzden çıkmayan kalite demektir.",
                                    "We handle every step in-house, from prompt engineering to stage logistics. What we don't outsource, we don't lose control of."
                                )}
                            </p>
                        </div>
                        <div className="bg-[#0d0d0d] p-10">
                            <h3 className="text-lg font-bold text-[#e5e5e5] mb-3 uppercase tracking-wider">
                                {t("Ölçülebilir Etki", "Measurable Impact")}
                            </h3>
                            <p className="text-[#e5e5e5]/50 text-sm leading-relaxed">
                                {t(
                                    "Paylaşım oranı, etkileşim süresi, marka hatırlanırlığı — her aktivasyonun çıktısı raporlanabilir. Hissetmekle yetinmiyoruz, ölçüyoruz.",
                                    "Share rate, engagement duration, brand recall — every activation's output is reportable. We don't settle for gut feeling, we measure."
                                )}
                            </p>
                        </div>
                        <div className="bg-[#0d0d0d] p-10">
                            <h3 className="text-lg font-bold text-[#e5e5e5] mb-3 uppercase tracking-wider">
                                {t("KVKK Önce", "Privacy First")}
                            </h3>
                            <p className="text-[#e5e5e5]/50 text-sm leading-relaxed">
                                {t(
                                    "Kişisel veri etkinlik sonrası silinir; katılımcı güveni marka güvenidir. Tüm sistemler KVKK uyumlu, açık rıza mekanizmasıyla çalışır.",
                                    "Personal data is deleted after the event; participant trust is brand trust. All systems operate with KVKK compliance and explicit consent mechanisms."
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-[#141414] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-4xl md:text-6xl font-bold tracking-tighter text-[#e5e5e5] mb-8 uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("BİRLİKTE ÇALIŞALIM", "LET'S WORK TOGETHER")}
                    </p>
                    <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto">
                        {t(
                            "Etkinliğiniz veya projeniz için en iyi interaktif çözümleri birlikte hayata geçirelim.",
                            "Let's bring the best interactive solutions to life together for your event or project."
                        )}
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-flex items-center justify-center px-12 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                    >
                        {t("TEKLİF ALIN", "GET A QUOTE")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
