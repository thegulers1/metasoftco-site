"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";

interface Service {
    id: string;
    title: string;
    title_en: string | null;
    homeTitle: string | null;
    homeTitle_en: string | null;
    slug: string;
    slug_en: string | null;
    description: string | null;
    description_en: string | null;
    image: string | null;
    category?: {
        name: string;
        name_en: string | null;
        slug: string;
        slug_en: string | null;
    } | null;
}

interface FeaturedServicesSectionProps {
    services: Service[];
}

export function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
    const { t, language } = useLanguage();
    const serviceBase = language === "en" ? "/en/services" : "/hizmetler";

    const displayTitle = (service: Service) =>
        language === "en"
            ? service.homeTitle_en || service.title_en || service.title
            : service.homeTitle || service.title;

    const grid = services.slice(0, 6);

    return (
        <section className="py-20 sm:py-24 relative bg-[#0a0a0f]" id="hizmetler">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-12 relative z-10">

                {/* Header */}
                <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                    <div>
                        <span
                            className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {t("03 — HİZMETLER", "03 — SERVICES")}
                        </span>
                        <h2
                            className="text-white font-bold tracking-[-0.01em] mt-3"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 44 }}
                        >
                            {t("Sahneye çıkardığımız deneyimler", "Experiences we bring to stage")}
                        </h2>
                    </div>
                    <Link
                        href={serviceBase}
                        className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-manrope)" }}
                    >
                        {t("Tüm Hizmetler", "All Services")} →
                    </Link>
                </div>

                {/* 3x2 grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
                    {grid.map((service, index) => {
                        const categoryName =
                            language === "en"
                                ? service.category?.name_en || service.category?.name
                                : service.category?.name;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                <Link
                                    href={
                                        language === "en"
                                            ? `${serviceBase}/${service.category?.slug_en}/${service.slug_en}`
                                            : `${serviceBase}/${service.category?.slug}/${service.slug}`
                                    }
                                    className="group block overflow-hidden rounded-[20px] border border-white/10 hover:border-white/30 transition-all duration-400 hover:-translate-y-2"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.015))",
                                        transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                                    }}
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#14141d]">
                                        {service.image ? (
                                            <Image
                                                fill
                                                src={service.image}
                                                alt={service.title}
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    backgroundImage:
                                                        "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)",
                                                }}
                                            />
                                        )}
                                        {categoryName && (
                                            <span
                                                className="absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] uppercase backdrop-blur-md bg-black/40 border border-white/10 text-white/80"
                                                style={{ fontFamily: "var(--font-jetbrains-mono)", letterSpacing: ".04em", fontWeight: 500 }}
                                            >
                                                {categoryName}
                                            </span>
                                        )}
                                        <span
                                            className="absolute top-3 right-3 text-[11px] text-white/40"
                                            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3
                                                className="text-white font-semibold"
                                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20 }}
                                            >
                                                {displayTitle(service)}
                                            </h3>
                                            <span className="text-[var(--acc)] group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                        {service.description && (
                                            <p
                                                className="text-[rgba(255,255,255,.55)] mt-2 line-clamp-2"
                                                style={{ fontFamily: "var(--font-manrope)", fontSize: 14, lineHeight: 1.55 }}
                                            >
                                                {language === "en"
                                                    ? service.description_en || service.description
                                                    : service.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
