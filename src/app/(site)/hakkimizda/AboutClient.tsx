"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

export default function AboutClient() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#1a0202]">
            {/* Hero */}
            <LampContainer className="min-h-[50vh] pt-32" visualYOffset={8} disableLine>
                <motion.div
                    initial={{ opacity: 0.5, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="flex flex-col items-center text-center translate-y-40"
                >
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white font-[family-name:var(--font-dm-sans)]"
                    >
                        {t("Hakkımızda", "About Us")}
                    </h1>
                    <p className="mt-6 text-lg text-[#f5f5f5] max-w-2xl font-[family-name:var(--font-dm-sans)]">
                        {t(
                            "İnteraktif etkinlik deneyimleri sunuyoruz.",
                            "We offer interactive event experiences."
                        )}
                    </p>
                </motion.div>
            </LampContainer>

            {/* Content */}
            <section className="py-24 relative z-50 -mt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-lg leading-relaxed text-[#f5f5f5]/90 font-[family-name:var(--font-dm-sans)]">
                    <p>
                        {t(
                            "Yenilikçi fikirleri harika deneyimler yaratacak şekilde hayata geçirmeye tutkunuz. Şirketimiz, dijital çözümlerle iş süreçlerinizde dönüşüm yaratıyor. Veri analizinden müşteri yönetimine, pazarlamadan otomasyona kadar geniş bir yelpazede hizmet sunarak işinizi dijitalleştiriyor ve verimliliğinizi artırıyoruz. Yenilikçi yaklaşımlarımız, yaratıcı çözümlerimiz ve ileri teknoloji kullanımımızla her projenin kalbine tasarımı yerleştiriyoruz. İşbirliğine dayalı ilişkiler geliştirmek, stratejiler oluşturmak ve güçlü etkilere sahip sonuçlar elde etmek önceliğimiz. Şirketler ve kitleler arasında anlamlı bağlantılar kurarak, teknolojinin insan hayatındaki yerini iyileştirmeye odaklanıyoruz. Analitik yaklaşımımızla mevcut operasyonlarınızı inceleyerek, inovasyon ve stratejik planlama ile başarıya ulaşmanız için en etkili yöntemleri belirliyoruz.",
                            "We are passionate about bringing innovative ideas to life in ways that create great experiences. Our company transforms your business processes with digital solutions. We digitize your business and increase your efficiency by offering a wide range of services from data analysis to customer management, marketing to automation. We place design at the heart of every project with our innovative approaches, creative solutions, and advanced technology usage. Developing collaborative relationships, creating strategies, and achieving results with strong impact are our priorities. By building meaningful connections between companies and audiences, we focus on improving the place of technology in human life. By examining your current operations with our analytical approach, we determine the most effective methods for you to achieve success through innovation and strategic planning."
                        )}
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black text-white py-24 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-dm-sans)]">
                        {t("Projeniz İçin Teklif Alın", "Get a Quote for Your Project")}
                    </h2>
                    <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">
                        {t(
                            "Etkinliğiniz için en uygun çözümü birlikte belirleyelim.",
                            "Let's determine the best solution for your event together."
                        )}
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-block px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition transform hover:scale-105"
                    >
                        {t("İletişime Geç", "Get in Touch")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
