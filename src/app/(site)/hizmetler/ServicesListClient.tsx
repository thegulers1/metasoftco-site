"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

interface Service {
    id: string;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    slug: string;
}

interface ServiceCategory {
    id: string;
    name: string;
    name_en: string | null;
    slug: string;
    services: Service[];
}

interface ServicesListClientProps {
    categories: ServiceCategory[];
}

export default function ServicesListClient({ categories }: ServicesListClientProps) {
    const { language, t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Hero */}
            <section className="bg-black text-white py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("Hizmetlerimiz", "Our Services")}
                    </h1>
                    <p className="mt-4 text-lg text-white/70 max-w-2xl">
                        {t(
                            "Etkinliklerinizi unutulmaz kılmak için sunduğumuz profesyonel çözümler.",
                            "Professional solutions to make your events unforgettable."
                        )}
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {categories.map((category) => (
                        <div key={category.id} className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-black">
                                    {language === "en" ? (category.name_en || category.name) : category.name}
                                </h2>
                                <Link
                                    href={`/hizmetler/${category.slug}`}
                                    className="text-sm text-black/50 hover:text-black"
                                >
                                    {t("Tümünü Gör", "View All")} →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.services.map((service) => (
                                    <Link
                                        key={service.id}
                                        href={`/hizmetler/${category.slug}/${service.slug}`}
                                        className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <h3 className="font-semibold text-lg text-black group-hover:text-black/70 transition">
                                            {language === "en" ? (service.title_en || service.title) : service.title}
                                        </h3>
                                        {(service.description || service.description_en) && (
                                            <p className="mt-2 text-sm text-black/50 line-clamp-2">
                                                {language === "en" ? (service.description_en || service.description) : service.description}
                                            </p>
                                        )}
                                        <div className="mt-4 flex items-center text-sm text-black/40 group-hover:text-black/60 transition">
                                            {t("Detaylar", "Details")}
                                            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black text-white py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        {t("Projeniz İçin Teklif Alın", "Get a Quote for Your Project")}
                    </h2>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">
                        {t(
                            "Etkinliğiniz için en uygun çözümü birlikte belirleyelim.",
                            "Let's determine the best solution for your event together."
                        )}
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition"
                    >
                        {t("İletişime Geç", "Get in Touch")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
