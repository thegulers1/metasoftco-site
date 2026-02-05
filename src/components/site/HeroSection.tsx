"use client";

import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { InteractiveStars } from "@/components/ui/interactive-stars";
import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import { StarButton } from "@/components/ui/star-button";

export default function HeroSection() {
    const { language, t } = useLanguage();

    return (
        <LampContainer className="min-h-screen">
            <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 flex flex-col items-center"
            >
                <h1 className="py-4 text-center text-4xl font-medium tracking-tight md:text-7xl font-[family-name:var(--font-dm-sans)]">
                    <EncryptedText
                        text={t("İnteraktif Etkinlik Deneyimleri", "Interactive Event Experiences")}
                        encryptedClassName="text-slate-500"
                        revealedClassName="text-[#f5f5f5]"
                        revealDelayMs={30}
                        flipDelayMs={30}
                    />
                </h1>
                <p className="mt-6 text-center text-base lg:text-lg text-[#f5f5f5] max-w-2xl">
                    {t(
                        "Yapay zeka destekli çözümlerimizle etkinliklerinizi unutulmaz kılın. Hırsınıza ayak uyduran bir marka.",
                        "Make your events unforgettable with our AI-powered solutions. A brand that keeps up with your ambition."
                    )}
                </p>
                <div className="mt-8">
                    <StarButton
                        onClick={() => {
                            const element = document.getElementById("hizmetler");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {t("Neler Yapıyoruz?", "What We Do")}
                    </StarButton>
                </div>
                <InteractiveStars className="absolute -inset-20 z-0" />
            </motion.div>
        </LampContainer>
    );
}
