"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";

interface Service {
    id: string;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    slug: string;
    slug_en: string | null;
    image: string | null;
    accentText?: string | null;
    accentText_en?: string | null;
    accentColor?: string | null;
    categoryName?: string;
    categorySlug?: string;
    categorySlugEn?: string | null;
    c1?: string;
}

interface ServiceCategory {
    id: string;
    name: string;
    name_en: string | null;
    slug: string;
    slug_en: string | null;
    services: Service[];
}

interface ServicesListClientProps {
    categories: ServiceCategory[];
}

const CATEGORY_ACCENT: Record<string, string> = {
    "yapay-zeka-etkinlik-cozumleri": "#7c3aed",
    "photobooth-ve-fotograf-aktivasyonlari": "#e879f9",
    "interaktif-etkinlik-aktiviteleri": "#fb923c",
};

export default function ServicesListClient({ categories }: ServicesListClientProps) {
    const { language, t, setAlternateUrl } = useLanguage();
    const [active, setActive] = useState<string>("all");

    const filteredCategories = categories.filter(
        (cat) =>
            !cat.slug.includes("yazilim") &&
            !cat.name.toLowerCase().includes("yazılım") &&
            cat.services.length > 0
    );

    useEffect(() => {
        setAlternateUrl("/hizmetler", "/en/services");
    }, []);

    const allServices = useMemo(() => {
        return filteredCategories.flatMap((cat) =>
            cat.services.map((s) => ({
                ...s,
                categoryName: language === "en" ? cat.name_en || cat.name : cat.name,
                categorySlug: cat.slug,
                categorySlugEn: cat.slug_en,
                c1: CATEGORY_ACCENT[cat.slug] || "#22d3ee",
            }))
        );
    }, [filteredCategories, language]);

    const visible = active === "all" ? allServices : allServices.filter((s) => s.categorySlug === active);

    return (
        <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 pt-2 pb-10">
            <div className="sticky top-20 z-[60] -mx-6 sm:-mx-12 px-6 sm:px-12 bg-[#0a0a0f]/90 backdrop-blur-md">
                <div className="flex items-center justify-between gap-5 flex-wrap py-[18px] mb-[30px] border-t border-b border-white/[0.08]">
                    <div className="flex gap-2.5 flex-wrap">
                        <button
                            onClick={() => setActive("all")}
                            className="rounded-full transition-all duration-300 px-[18px] py-[10px] text-[13px] font-semibold cursor-pointer"
                            style={{
                                fontFamily: "var(--font-manrope)",
                                background: active === "all" ? "#fff" : "rgba(255,255,255,.04)",
                                color: active === "all" ? "#0a0a0f" : "rgba(255,255,255,.72)",
                                border: `1px solid ${active === "all" ? "#fff" : "rgba(255,255,255,.14)"}`,
                            }}
                        >
                            {t("Tümü", "All")}
                        </button>
                        {filteredCategories.map((cat) => {
                            const on = cat.slug === active;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActive(cat.slug)}
                                    className="rounded-full transition-all duration-300 px-[18px] py-[10px] text-[13px] font-semibold cursor-pointer"
                                    style={{
                                        fontFamily: "var(--font-manrope)",
                                        background: on ? "#fff" : "rgba(255,255,255,.04)",
                                        color: on ? "#0a0a0f" : "rgba(255,255,255,.72)",
                                        border: `1px solid ${on ? "#fff" : "rgba(255,255,255,.14)"}`,
                                    }}
                                >
                                    {language === "en" ? cat.name_en || cat.name : cat.name}
                                </button>
                            );
                        })}
                    </div>
                    <span
                        className="text-[13px] text-[rgba(255,255,255,.4)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                    >
                        {visible.length} {language === "en" ? "SERVICES" : "HİZMET"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {visible.map((service) => {
                    const title = language === "en" ? service.title_en || service.title : service.title;
                    const description = language === "en" ? service.description_en || service.description : service.description;
                    const metric = language === "en" ? service.accentText_en || service.accentText : service.accentText;
                    const c1 = service.accentColor || service.c1 || "#22d3ee";
                    const href =
                        language === "en"
                            ? `/en/services/${service.categorySlugEn}/${service.slug_en}`
                            : `/hizmetler/${service.categorySlug}/${service.slug}`;

                    return (
                        <Link
                            key={service.id}
                            href={href}
                            className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 transition-all duration-[.4s] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-3 hover:border-white/30"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#14141d]">
                                {service.image ? (
                                    <img
                                        src={service.image}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[.34]"
                                    style={{ background: `radial-gradient(circle at 72% 20%, ${c1}, transparent 64%)` }}
                                />
                                {service.categoryName && (
                                    <div
                                        className="absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 backdrop-blur-sm"
                                        style={{
                                            background: "rgba(10,10,15,.62)",
                                            fontFamily: "var(--font-jetbrains-mono)",
                                            fontSize: 11,
                                            fontWeight: 500,
                                            letterSpacing: ".04em",
                                            color: "rgba(255,255,255,.88)",
                                        }}
                                    >
                                        {service.categoryName.toLocaleUpperCase(language === "en" ? "en" : "tr")}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 px-[22px] pt-[22px] pb-6">
                                <div className="flex items-start justify-between gap-3 mb-2.5">
                                    <div
                                        className="text-white"
                                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, lineHeight: 1.2, fontWeight: 600 }}
                                    >
                                        {title}
                                    </div>
                                    <span className="text-[17px] font-semibold text-[var(--acc)] shrink-0">→</span>
                                </div>
                                {description && (
                                    <p
                                        className="text-[rgba(255,255,255,.55)] mb-4"
                                        style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                    >
                                        {description}
                                    </p>
                                )}
                                {metric && (
                                    <div
                                        className="mt-auto pt-3.5 border-t border-white/[0.08]"
                                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".03em", fontWeight: 500, color: c1 }}
                                    >
                                        {metric}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
