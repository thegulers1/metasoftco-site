"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";

const stats = [
    { value: "5+", label: { tr: "YIL ETKİNLİK UZMANLIGI", en: "YEARS OF EVENT EXPERTISE" } },
    { value: "1K+", label: { tr: "ETKİNLİKTE SAHNE ALDIK", en: "EVENTS ON STAGE" } },
    { value: "100+", label: { tr: "MARKA GÜVENDİ", en: "BRANDS TRUSTED US" } },
    { value: "∞", label: { tr: "DENEYİM POTANSİYELİ", en: "EXPERIENCE POTENTIAL" } },
];

export function AboutSection() {
    const { t, language } = useLanguage();

    return (
        <section className="bg-[#0d0d0d] py-24 sm:py-32 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">

                    {/* Sol: Metin */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5e5e5]/40 mb-4 block">
                            {t("Hakkımızda", "About Us")}
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#e5e5e5] mb-6 leading-tight">
                            {t("Neden Biz?", "Why Us?")}
                        </h2>
                        <p className="text-lg leading-relaxed mb-8" style={{color: 'rgba(229,229,229,0.6)'}}>
                            {t(
                                "Çoğu ajans ya teknolojiyi, ya sahneyi bilir — ikisini aynı anda yönetemez. MetasoftCo, Stable Diffusion modellerini fine-tune ettiği gün stand montajını da koordine eder. AI Photo'dan fiziksel Momento Ball üretimine, yazılım geliştirmeden etkinlik lojistiğine: 5 yılda 1.000'den fazla etkinlikte, 100'den fazla markaya bu farkı kanıtladık.",
                                "Most agencies know either the technology or the stage — but not both at once. MetasoftCo fine-tunes Stable Diffusion models the same day it coordinates stand assembly. From AI Photo to physical Momento Ball production, from software development to event logistics: we've proven this difference to 100+ brands across 1,000+ events in 5 years."
                            )}
                        </p>
                        <Link
                            href={language === "en" ? "/en/hakkimizda" : "/hakkimizda"}
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#e5e5e5] border-b-2 border-white/20 pb-0.5 hover:text-white hover:border-white/50 transition-colors"
                        >
                            {t("Daha Fazla", "Learn More")}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Sağ: İstatistikler */}
                    <div className="grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
                        {stats.map((stat) => (
                            <div key={stat.value} className="bg-[#141414] p-8 sm:p-10 flex flex-col justify-center">
                                <p className="text-5xl sm:text-6xl font-black text-[#e5e5e5] tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-sm font-medium text-[#e5e5e5]/50 tracking-widest leading-tight">
                                    {t(stat.label.tr, stat.label.en)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
