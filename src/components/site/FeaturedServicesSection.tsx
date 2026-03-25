"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";

interface Service {
    id: string;
    title: string;
    title_en: string | null;
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

    // First service = large featured (top row, right side)
    const featuredService = services[0];
    // Next 3 services = bottom row cards
    const bottomServices = services.slice(1, 4);
    // Next 2 services = row 3 cards
    const row3Services = services.slice(4, 6);

    return (
        <section className="pb-24 relative bg-white" id="hizmetler">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ========== ROW 1: 3-column grid (1 text + 2 image) ========== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 items-stretch -mt-12">

                    {/* Column 1: Text - Flex to fill height and match image */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full flex flex-col justify-between"
                        >
                            <div className="flex flex-col">
                                <h2 className="text-[40px] uppercase font-light leading-[1] mb-8 tracking-tighter text-[#1a1a1a] m-0 p-0"
                                    style={{ fontFamily: "var(--font-lato)" }}
                                >
                                    <span className="font-bold">{t("Dijital Aktivite", "Digital Activity")}</span>
                                    <br />
                                    <span>{t("Dünyamız", "Our World")}</span>
                                </h2>
                                <p className="text-[#1a1a1a]/70 text-sm md:text-base leading-relaxed font-normal max-w-sm m-0 p-0">
                                    {t(
                                        "Metasoftco olarak temel amacımız; geleneksel iletişim ve etkileşim kanallarını teknolojiyle yeniden şekillendirerek, markaların dijital çağda hedef kitleleriyle anlamlı ve güçlü bağlar kurmasını sağlamaktır. Sınırları zorlayan yaklaşımımızla, sadece birer teknolojik çözüm değil, katılımcıların zihninde yer eden ve iz bırakan unutulmaz deneyimler tasarlıyoruz.",
                                        "As Metasoftco, our primary goal is to reshape traditional communication and interaction channels with technology, enabling brands to establish meaningful and strong bonds with their target audiences in the digital age. With our boundary-pushing approach, we design not just technological solutions, but unforgettable experiences that stick in the minds of participants and leave a trace."
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Columns 2-3: Large featured image - h-full to match text column perfectly */}
                    {featuredService && (
                        <motion.div
                            className="lg:col-span-2 flex min-h-0"
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link href={language === "en" ? `${serviceBase}/${featuredService.category?.slug_en}/${featuredService.slug_en}` : `${serviceBase}/${featuredService.category?.slug}/${featuredService.slug}`} className="group block w-full h-full">
                                <div className="relative h-full w-full overflow-hidden bg-[#f0f0f0]">
                                    {featuredService.image && (
                                        <Image
                                            fill
                                            src={featuredService.image}
                                            alt={featuredService.title}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 66vw"
                                        />
                                    )}

                                    {/* Overlay box — left-0 to be flush with left side, vertically centered */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white px-8 py-6 border-y border-r border-black/5 max-w-xs transition-colors duration-300">
                                        <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#dc2626] transition-colors duration-300 uppercase tracking-tight"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            {featuredService.title}
                                        </h3>
                                        {featuredService.description && (
                                            <p className="text-xs text-[#1a1a1a]/50 leading-relaxed line-clamp-2">
                                                {language === "en" ? (featuredService.description_en || featuredService.description) : featuredService.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* ========== ROW 2: 3 equal columns ========== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bottomServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Link href={language === "en" ? `${serviceBase}/${service.category?.slug_en}/${service.slug_en}` : `${serviceBase}/${service.category?.slug}/${service.slug}`} className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                                    {service.image && (
                                        <Image
                                            fill
                                            src={service.image}
                                            alt={service.title}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}

                                    {/* Overlay box — left-0 to be flush with left side, bottom aligned */}
                                    <div className="absolute left-0 bottom-[10px] bg-white px-6 py-5 border-y border-r border-black/5 max-w-[85%] transition-colors duration-300">
                                        <h4 className="text-base md:text-lg font-bold text-[#1a1a1a] leading-tight mb-1 group-hover:text-[#dc2626] transition-colors duration-300 uppercase tracking-tight"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            {service.title}
                                        </h4>
                                        {service.category?.name && (
                                            <p className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest font-medium">
                                                {language === "en" ? (service.category.name_en || service.category.name) : service.category.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ========== ROW 3: 2 large cards + narrow red CTA ========== */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
                    {row3Services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="md:col-span-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Link href={language === "en" ? `${serviceBase}/${service.category?.slug_en}/${service.slug_en}` : `${serviceBase}/${service.category?.slug}/${service.slug}`} className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                                    {service.image && (
                                        <Image
                                            fill
                                            src={service.image}
                                            alt={service.title}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}

                                    {/* Overlay box — left-0 to be flush with left side, bottom aligned */}
                                    <div className="absolute left-0 bottom-[10px] bg-white px-6 py-5 border-y border-r border-black/5 max-w-[85%] transition-colors duration-300">
                                        <h4 className="text-base md:text-lg font-bold text-[#1a1a1a] leading-tight mb-1 group-hover:text-[#dc2626] transition-colors duration-300 uppercase tracking-tight"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            {service.title}
                                        </h4>
                                        {service.category?.name && (
                                            <p className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest font-medium">
                                                {language === "en" ? (service.category.name_en || service.category.name) : service.category.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Red CTA box — narrow tall rectangle */}
                    <motion.div
                        className="md:col-span-1"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link href={serviceBase} className="group block h-full">
                            <div className="relative h-full min-h-[280px] md:min-h-0 overflow-hidden bg-[#dc2626] flex items-center justify-center transition-colors duration-300 hover:bg-[#b91c1c]">
                                <span className="text-white text-sm md:text-base font-bold uppercase tracking-[0.2em] text-center px-4 leading-relaxed whitespace-pre-line"
                                    style={{ fontFamily: "var(--font-lato)" }}>
                                    {t("Tüm\nHizmetlerimiz", "View All\nServices")}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
