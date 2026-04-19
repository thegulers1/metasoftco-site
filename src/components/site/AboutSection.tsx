"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";

const stats = [
    { value: "5+", label: { tr: "Yıllık Deneyim", en: "Years Experience" } },
    { value: "1K+", label: { tr: "Etkinlik", en: "Events" } },
    { value: "100+", label: { tr: "Marka", en: "Brands" } },
    { value: "İstanbul", label: { tr: "Merkez Ofis", en: "HQ" } },
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
                            {t("Hakkımızda", "About Us")}
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-black mb-6 leading-tight">
                            {t("Neden Biz?", "Why Us?")}
                        </h2>
                        <p className="text-lg text-black/60 leading-relaxed mb-8">
                            {t(
                                "Yenilikçi fikirleri harika deneyimler yaratacak şekilde hayata geçirmeye tutkunuz. Dijital çözümlerle iş süreçlerinizde dönüşüm yaratıyor; yapay zeka, artırılmış gerçeklik ve interaktif teknolojilerle markanızı unutulmaz kılıyoruz. İşbirliğine dayalı ilişkiler geliştirmek, güçlü etkiler yaratmak ve şirketlerle kitleler arasında anlamlı bağlantılar kurmak önceliğimiz.",
                                "We are passionate about bringing innovative ideas to life in ways that create great experiences. We transform your business processes with digital solutions; making your brand unforgettable with AI, augmented reality and interactive technologies. Developing collaborative relationships, creating strong impacts and building meaningful connections between companies and audiences is our priority."
                            )}
                        </p>
                        <Link
                            href="/hakkimizda"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-0.5 hover:text-black/60 hover:border-black/60 transition-colors"
                        >
                            {t("Daha Fazla", "Learn More")}
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
