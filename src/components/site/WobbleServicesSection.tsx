"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useLanguage } from "@/providers/LanguageProvider";

export default function WobbleServicesSection() {
    const { t } = useLanguage();

    return (
        <section className="bg-slate-950 py-20 relative overflow-hidden">
            {/* Background glow continuation from Lamp */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {t("Hizmetlerimiz", "Our Services")}
                </h2>
                <p className="text-slate-400 max-w-2xl">
                    {t(
                        "Yapay zeka ve teknoloji ile işinizi geleceğe taşıyoruz. İhtiyacınıza özel interaktif çözümler sunuyoruz.",
                        "We take your business to the future with AI and technology. We offer special interactive solutions for your needs."
                    )}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4">
                <WobbleCard
                    containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-900 min-h-[500px] lg:min-h-[300px]"
                    className=""
                >
                    <div className="max-w-xs">
                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            AI Photo & Studio
                        </h2>
                        <p className="mt-4 text-left text-base/6 text-neutral-200">
                            {t(
                                "Yapay zeka destekli profesyonel fotoğraf çekimleri ve sanal stüdyo deneyimleri.",
                                "AI-powered professional photo shoots and virtual studio experiences."
                            )}
                        </p>
                    </div>
                    <div className="hidden md:block absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain text-[150px]">
                        🎨
                    </div>
                </WobbleCard>

                <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-indigo-900">
                    <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        AI Greenbox
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                        {t(
                            "Sanal stüdyo ve ileri seviye greenscreen teknolojileri ile sınırsız mekan seçeneği.",
                            "Unlimited location options with virtual studio and advanced greenscreen technologies."
                        )}
                    </p>
                    <div className="absolute right-0 bottom-0 text-[100px] opacity-20">
                        📹
                    </div>
                </WobbleCard>

                <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-slate-900">
                    <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        AI Draw
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                        {t(
                            "Yapay zeka ile yaratıcılığınızı birleştirin. Tasarım ve çizimde yeni bir dönem.",
                            "Combine your creativity with artificial intelligence. A new era in design and drawing."
                        )}
                    </p>
                    <div className="absolute right-0 bottom-0 text-[100px] opacity-20">
                        ✏️
                    </div>
                </WobbleCard>

                <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-purple-900 min-h-[500px] lg:min-h-[300px]">
                    <div className="max-w-sm">
                        <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            {t("İnteraktif Deneyimler", "Interactive Experiences")}
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                            {t(
                                "Kullanıcılarınız için unutulmaz ve etkileşimli dijital yolculuklar tasarlıyoruz.",
                                "We design unforgettable and interactive digital journeys for your users."
                            )}
                        </p>
                    </div>
                    <div className="hidden md:block absolute -right-10 md:-right-[5%] -bottom-10 object-contain text-[150px]">
                        ✨
                    </div>
                </WobbleCard>
            </div>
        </section>
    );
}
