"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { motion } from "motion/react";
import ParticleBackground from "@/components/site/ParticleBackground";

export default function AboutClient() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section — Hizmetler sayfasıyla aynı stil */}
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
                            {t("HAKKIMIZDA", "ABOUT US")}
                        </h1>
                        <p className="text-sm md:text-base text-[#1a1a1a]/60 uppercase tracking-[0.2em] font-medium">
                            {t("METAsoftco — İSTANBUL, TÜRKİYE", "METAsoftco — ISTANBUL, TURKEY")}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* Content */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-lg leading-relaxed text-[#1a1a1a]/70"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                    <p>
                        {t(
                            "Yenilikçi fikirleri harika deneyimler yaratacak şekilde hayata geçirmeye tutkunuz. Şirketimiz, dijital çözümlerle iş süreçlerinizde dönüşüm yaratıyor. Veri analizinden müşteri yönetimine, pazarlamadan otomasyona kadar geniş bir yelpazede hizmet sunarak işinizi dijitalleştiriyor ve verimliliğinizi artırıyoruz. Yenilikçi yaklaşımlarımız, yaratıcı çözümlerimiz ve ileri teknoloji kullanımımızla her projenin kalbine tasarımı yerleştiriyoruz. İşbirliğine dayalı ilişkiler geliştirmek, stratejiler oluşturmak ve güçlü etkilere sahip sonuçlar elde etmek önceliğimiz. Şirketler ve kitleler arasında anlamlı bağlantılar kurarak, teknolojinin insan hayatındaki yerini iyileştirmeye odaklanıyoruz. Analitik yaklaşımımızla mevcut operasyonlarınızı inceleyerek, inovasyon ve stratejik planlama ile başarıya ulaşmanız için en etkili yöntemleri belirliyoruz.",
                            "We are passionate about bringing innovative ideas to life in ways that create great experiences. Our company transforms your business processes with digital solutions. We digitize your business and increase your efficiency by offering a wide range of services from data analysis to customer management, marketing to automation. We place design at the heart of every project with our innovative approaches, creative solutions, and advanced technology usage. Developing collaborative relationships, creating strategies, and achieving results with strong impact are our priorities. By building meaningful connections between companies and audiences, we focus on improving the place of technology in human life. By examining your current operations with our analytical approach, we determine the most effective methods for you to achieve success through innovation and strategic planning."
                        )}
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-neutral-50 border-t border-black/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-8 uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("BİRLİKTE ÇALIŞALIM", "LET'S WORK TOGETHER")}
                    </p>
                    <p className="text-lg text-black/60 mb-12 max-w-2xl mx-auto">
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
