"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section className="bg-[#1a0202] py-24 sm:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 lg:items-start">
                    {/* Left Column */}
                    <div className="max-w-2xl">
                        <span className="text-orange-500 font-medium tracking-wide text-sm uppercase mb-4 block">
                            {t("Hakkımızda", "About")}
                        </span>
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8 leading-tight">
                            {t(
                                "Tek bir inanç üzerine kurulu bir yaklaşım.",
                                "An approach built on one belief."
                            )}
                        </h2>
                        <Link
                            href="/hakkimizda"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold text-white hover:text-orange-500 transition-colors"
                        >
                            {t("Stüdyoyu keşfedin", "Discover the studio")}
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Right Column */}
                    <div className="max-w-xl lg:mt-0 lg:ml-auto pt-2 lg:pt-14">
                        <p className="text-lg leading-8 text-gray-300">
                            {t(
                                "METASOFTCO basit bir fikir üzerine kuruldu: imajınız gerçekte kim olduğunuzu yansıtmalıdır. İlk günden beri itici gücümüz bu oldu ve üstlendiğimiz her projeyi şekillendiriyor.",
                                "METASOFTCO was founded on a simple idea: your image should reflect who you actually are. That's been our driving force since day one, and it shapes every project we take on."
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
