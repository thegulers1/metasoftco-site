"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";

interface Project {
    id: string;
    title: string;
    slug: string;
    slug_en: string | null;
    description: string | null;
    image: string | null;
    category: string | null;
    client: string | null;
    projectUrl: string | null;
    title_en: string | null;
    description_en: string | null;
}

interface ProjectShowcaseProps {
    projects: Project[];
}

const accents = ["#22d3ee", "#7c3aed", "#e879f9"];

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const { t, language } = useLanguage();

    const projectHref = (proj: Project) =>
        language === "en" && proj.slug_en
            ? `/en/projects/${proj.slug_en}`
            : `/projeler/${proj.slug}`;

    const featured = projects[0];
    const rest = projects.slice(1, 4);

    return (
        <section className="py-20 sm:py-24 relative bg-[#0a0a0f]" id="projeler">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-12 relative z-10">

                {/* Header */}
                <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                    <div>
                        <span
                            className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            {t("02 — GÜNCEL PROJELER", "02 — RECENT PROJECTS")}
                        </span>
                        <h2
                            className="text-white font-bold tracking-[-0.01em] mt-3"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 44 }}
                        >
                            {t("Sahneye taşıdıklarımız", "What we brought to stage")}
                        </h2>
                    </div>
                    <Link
                        href={language === "en" ? "/en/projects" : "/projeler"}
                        className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-manrope)" }}
                    >
                        {t("Tüm Projeler", "All Projects")} →
                    </Link>
                </div>

                {/* Featured split card */}
                {featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-[18px]"
                    >
                        <Link
                            href={projectHref(featured)}
                            className="group flex flex-col md:flex-row overflow-hidden rounded-[24px] border border-white/10 hover:border-white/30 transition-colors duration-400"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02))" }}
                        >
                            <div className="relative w-full md:w-[46%] aspect-[16/10] md:aspect-auto overflow-hidden bg-[#14141d]">
                                {featured.image ? (
                                    <Image
                                        fill
                                        src={featured.image}
                                        alt={t(featured.title, featured.title_en || featured.title)}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 46vw"
                                    />
                                ) : (
                                    <>
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(135deg,#14141d,#14141d 12px,#1a1a25 12px,#1a1a25 24px)",
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: "radial-gradient(circle at 70% 25%, rgba(124,58,237,.5), transparent 60%)" }}
                                        />
                                        <span
                                            className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.1em] text-[rgba(255,255,255,.5)]"
                                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                                        >
                                            {t("ÖNE ÇIKAN PROJE GÖRSELİ", "FEATURED PROJECT IMAGE")}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                                {featured.category && (
                                    <span
                                        className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)] mb-3"
                                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                                    >
                                        {featured.category}
                                    </span>
                                )}
                                <h3
                                    className="text-white font-bold tracking-[-0.01em] mb-4 leading-[1.05]"
                                    style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 38 }}
                                >
                                    {t(featured.title, featured.title_en || featured.title)}
                                    {featured.client ? <> × {featured.client}</> : null}
                                </h3>
                                {featured.description && (
                                    <p
                                        className="text-[rgba(255,255,255,.6)] leading-relaxed max-w-md mb-6"
                                        style={{ fontFamily: "var(--font-manrope)", fontSize: 15 }}
                                    >
                                        {t(featured.description, featured.description_en || featured.description)}
                                    </p>
                                )}
                                <span
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[var(--acc)] transition-colors"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                >
                                    {t("İncele", "Explore")} →
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* 3-card row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
                    {rest.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                href={projectHref(project)}
                                className="group block overflow-hidden rounded-[24px] border border-white/10 hover:border-white/30 transition-all duration-400"
                                style={{
                                    background: "linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02))",
                                    transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                                }}
                            >
                                <div className="relative h-[200px] overflow-hidden bg-[#14141d] rounded-t-[24px] group-hover:-translate-y-3 transition-transform duration-400" style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}>
                                    {project.image ? (
                                        <Image
                                            fill
                                            src={project.image}
                                            alt={t(project.title, project.title_en || project.title)}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <>
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    backgroundImage:
                                                        "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)",
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0 opacity-50"
                                                style={{
                                                    background: `radial-gradient(circle at 70% 20%, ${accents[index % accents.length]}, transparent 62%)`,
                                                }}
                                            />
                                            {project.category && (
                                                <span
                                                    className="absolute bottom-3.5 left-3.5 text-[11px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.5)]"
                                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                                                >
                                                    {project.category}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="p-6">
                                    {project.category && project.image && (
                                        <span
                                            className="text-[11px] uppercase tracking-[0.1em]"
                                            style={{ fontFamily: "var(--font-jetbrains-mono)", color: accents[index % accents.length], fontWeight: 500 }}
                                        >
                                            {project.category}
                                        </span>
                                    )}
                                    <h4
                                        className="text-white font-semibold mt-2 mb-2"
                                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20 }}
                                    >
                                        {t(project.title, project.title_en || project.title)}
                                    </h4>
                                    {project.description && (
                                        <p
                                            className="text-[rgba(255,255,255,.55)] line-clamp-2"
                                            style={{ fontFamily: "var(--font-manrope)", fontSize: 14, lineHeight: 1.55 }}
                                        >
                                            {t(project.description, project.description_en || project.description)}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
