"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    category: string | null;
    projectUrl: string | null;
    title_en: string | null;
    description_en: string | null;
}

interface ProjectShowcaseProps {
    projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const { t } = useLanguage();

    const p = (i: number) => projects[i] || null;

    return (
        <section className="py-24 relative bg-white" id="projeler">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ========== ROW 1: 4 cols — [Title 2col] [Text 1col] [Image 1col] ========== */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                    {/* Col 1-2: Title + description (spans 2) */}
                    <motion.div
                        className="md:col-span-2 bg-[#f7f7f7] p-10 flex flex-col justify-between min-h-[360px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div>
                            <h2 className="text-[36px] md:text-[42px] uppercase leading-[1] tracking-tighter text-[#1a1a1a] mb-6"
                                style={{ fontFamily: "var(--font-lato)" }}
                            >
                                <span className="font-light">{t("Güncel", "Recent")}</span>
                                <br />
                                <span className="font-bold">{t("Projelerimiz", "Projects")}</span>
                            </h2>
                            <p className="text-[#1a1a1a]/60 text-sm leading-relaxed max-w-sm">
                                {t(
                                    "Markalar için tasarladığımız interaktif deneyimler ve dijital çözümlerden bazıları. Her projemiz, hedef kitleyle güçlü bağlar kurmak ve unutulmaz anlar yaratmak üzerine kurgulanmıştır.",
                                    "Some of the interactive experiences and digital solutions we have designed for brands. Each project is crafted to build strong connections with the target audience and create unforgettable moments."
                                )}
                            </p>
                        </div>
                        <Link href="/projeler" className="inline-flex items-center text-sm font-semibold text-[#1a1a1a] uppercase tracking-widest mt-6 hover:text-[#dc2626] transition-colors group">
                            {t("Daha Fazla", "Learn More")}
                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </motion.div>

                    {/* Col 3: First project — text card */}
                    {p(0) && (
                        <motion.div
                            className="bg-white border border-black/5 p-8 flex flex-col justify-center min-h-[360px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <Link href={`/projeler/${p(0)!.slug}`} className="group">
                                <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] leading-tight mb-4 group-hover:text-[#dc2626] transition-colors uppercase tracking-tight"
                                    style={{ fontFamily: "var(--font-lato)" }}>
                                    {t(p(0)!.title, p(0)!.title_en || p(0)!.title)}
                                </h3>
                                {p(0)!.description && (
                                    <p className="text-sm text-[#1a1a1a]/50 leading-relaxed line-clamp-4">
                                        {t(p(0)!.description!, p(0)!.description_en || p(0)!.description!)}
                                    </p>
                                )}
                            </Link>
                        </motion.div>
                    )}

                    {/* Col 4: First project — image (same project as text card) */}
                    {p(0) && (
                        <motion.div
                            className="min-h-[360px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <Link href={`/projeler/${p(0)!.slug}`} className="group block h-full">
                                <div className="relative h-full w-full overflow-hidden bg-[#f0f0f0]">
                                    {p(0)!.image ? (
                                        <Image
                                            fill
                                            src={p(0)!.image!}
                                            alt={t(p(0)!.title, p(0)!.title_en || p(0)!.title)}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                                    )}
                                    <div className="absolute left-0 bottom-[10px] bg-white px-5 py-4 border-y border-r border-black/5 max-w-[90%]">
                                        <h4 className="text-sm font-bold text-[#1a1a1a] leading-tight uppercase tracking-tight group-hover:text-[#dc2626] transition-colors"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            {t(p(0)!.title, p(0)!.title_en || p(0)!.title)}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* ========== ROW 2: 5 cols — [p1 Text] [p1 Image] [p2 Text] [p2 Image] [Red CTA] ========== */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">

                    {/* Col 1: p1 — text card */}
                    {p(1) && (
                        <motion.div
                            className="bg-white border border-black/5 p-6 flex flex-col justify-center min-h-[360px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <Link href={`/projeler/${p(1)!.slug}`} className="group">
                                <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] leading-tight mb-3 group-hover:text-[#dc2626] transition-colors uppercase tracking-tight"
                                    style={{ fontFamily: "var(--font-lato)" }}>
                                    {t(p(1)!.title, p(1)!.title_en || p(1)!.title)}
                                </h3>
                                {p(1)!.description && (
                                    <p className="text-xs text-[#1a1a1a]/50 leading-relaxed line-clamp-4">
                                        {t(p(1)!.description!, p(1)!.description_en || p(1)!.description!)}
                                    </p>
                                )}
                            </Link>
                        </motion.div>
                    )}

                    {/* Col 2: p1 — image card */}
                    {p(1) && (
                        <motion.div
                            className="min-h-[360px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <Link href={`/projeler/${p(1)!.slug}`} className="group block h-full">
                                <div className="relative h-full w-full overflow-hidden bg-[#f0f0f0]">
                                    {p(1)!.image ? (
                                        <Image
                                            fill
                                            src={p(1)!.image!}
                                            alt={t(p(1)!.title, p(1)!.title_en || p(1)!.title)}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 20vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                                    )}
                                    <div className="absolute left-0 bottom-[10px] bg-white px-4 py-3 border-y border-r border-black/5 max-w-[90%]">
                                        <h4 className="text-xs font-bold text-[#1a1a1a] leading-tight uppercase tracking-tight group-hover:text-[#dc2626] transition-colors"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            {t(p(1)!.title, p(1)!.title_en || p(1)!.title)}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Col 3: p2 — text card */}
                    {p(2) && (
                        <motion.div
                            className="bg-white border border-black/5 p-6 flex flex-col justify-center min-h-[360px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <Link href={`/projeler/${p(2)!.slug}`} className="group">
                                <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] leading-tight mb-3 group-hover:text-[#dc2626] transition-colors uppercase tracking-tight"
                                    style={{ fontFamily: "var(--font-lato)" }}>
                                    {t(p(2)!.title, p(2)!.title_en || p(2)!.title)}
                                </h3>
                                {p(2)!.description && (
                                    <p className="text-xs text-[#1a1a1a]/50 leading-relaxed line-clamp-4">
                                        {t(p(2)!.description!, p(2)!.description_en || p(2)!.description!)}
                                    </p>
                                )}
                            </Link>
                        </motion.div>
                    )}

                    {/* Col 4: p2 — image card */}
                    {p(2) && (
                        <motion.div
                            className="min-h-[360px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <Link href={`/projeler/${p(2)!.slug}`} className="group block h-full">
                                <div className="relative h-full w-full overflow-hidden bg-[#f0f0f0]">
                                    {p(2)!.image ? (
                                        <Image
                                            fill
                                            src={p(2)!.image!}
                                            alt={t(p(2)!.title, p(2)!.title_en || p(2)!.title)}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 20vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                                    )}
                                    <div className="absolute left-0 bottom-[10px] bg-white px-4 py-3 border-y border-r border-black/5 max-w-[90%]">
                                        <h4 className="text-xs font-bold text-[#1a1a1a] leading-tight uppercase tracking-tight group-hover:text-[#dc2626] transition-colors"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            {t(p(2)!.title, p(2)!.title_en || p(2)!.title)}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Col 5: Red CTA */}
                    <motion.div
                        className="min-h-[360px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <Link href="/projeler" className="group block h-full">
                            <div className="relative h-full w-full overflow-hidden bg-[#dc2626] flex items-center justify-center transition-colors duration-300 hover:bg-[#b91c1c]">
                                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-center px-3 leading-relaxed whitespace-pre-line"
                                    style={{ fontFamily: "var(--font-lato)" }}>
                                    {t("Tüm\nProjelerimiz", "View All\nProjects")}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

