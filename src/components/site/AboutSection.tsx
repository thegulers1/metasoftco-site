"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";

const stats = [
    { value: "20", label: { tr: "Yıllık Deneyim", en: "Years Experience" } },
    { value: "20K+", label: { tr: "Etkinlik", en: "Events" } },
    { value: "200+", label: { tr: "Marka", en: "Brands" } },
    { value: "4", label: { tr: "Ülke & Ofis", en: "Countries & Offices" } },
];

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section className="bg-white py-24 sm:py-32 border-t border-black/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">

                    {/* Sol: Metin */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">
                            {t("Biz Kimiz", "Who We Are")}
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-black mb-6 leading-tight">
                            {t("Neden Harikalar?", "Why Extraordinary?")}
                        </h2>
                        <p className="text-lg text-black/60 leading-relaxed mb-4">
                            {t(
                                "2006'dan bu yana markaların, mekanların ve etkinliklerin hikayelerini dijital ve fiziksel deneyimlere dönüştürüyoruz. Müşterilerimizin hikayelerini; mühendislik, teknoloji ve tasarım becerilerimizle harmanlayarak yenilikçi ve akılda kalıcı deneyimler yaratıyoruz.",
                                "Since 2006, we have been transforming the stories of brands, venues and events into digital and physical experiences. We blend our clients' stories with our engineering, technology and design skills to create innovative and memorable experiences."
                            )}
                        </p>
                        <p className="text-lg text-black/60 leading-relaxed mb-8">
                            {t(
                                "Reklam ajanslarından farklı olarak ekibimizdeki yazılım, mekatronik, elektronik ve endüstri mühendisleriyle birlikte hayal kuruyoruz. Yapay zeka, artırılmış gerçeklik, robotik ve IoT gibi teknolojilerle müşterilerimizi inovasyonla buluşturarak Türkiye'nin öncü deneyim ajansı olarak hizmet veriyoruz.",
                                "Unlike advertising agencies, we dream together with software, mechatronics, electronics and industrial engineers in our team. We serve as Turkey's leading experience agency, bringing our clients together with innovation through technologies such as artificial intelligence, augmented reality, robotics and IoT."
                            )}
                        </p>
                        <Link
                            href="/hakkimizda"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-0.5 hover:text-black/60 hover:border-black/60 transition-colors"
                        >
                            {t("Hikayemizi Keşfet", "Discover Our Story")}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Sağ: İstatistikler */}
                    <div className="grid grid-cols-2 gap-px bg-black/10 rounded-2xl overflow-hidden">
                        {stats.map((stat) => (
                            <div key={stat.value} className="bg-white p-8 sm:p-10 flex flex-col justify-center">
                                <p className="text-5xl sm:text-6xl font-black text-black tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-sm font-medium text-black/50 uppercase tracking-widest">
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
