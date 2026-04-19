"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section className="bg-white py-24 sm:py-32 border-t border-black/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
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
            </div>
        </section>
    );
}
