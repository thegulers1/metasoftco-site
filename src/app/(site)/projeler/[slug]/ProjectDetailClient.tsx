"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import CtaSection from "@/components/site/CtaSection";
import { addHeadingAnchors } from "@/lib/utils";

interface Project {
    id: string;
    slug: string;
    slug_en?: string | null;
    title: string;
    title_en: string | null;
    description: string | null;
    description_en: string | null;
    content: string | null;
    content_en: string | null;
    image: string | null;
    gallery: string | null;
    category: string | null;
    client: string | null;
    projectUrl: string | null;
    technologies: string | null;
    video: string | null;
    projectDate?: Date | string | null;
}

interface NextProject {
    slug: string;
    slug_en: string | null;
    title: string;
    title_en: string | null;
    image: string | null;
    category: string | null;
}

export default function ProjectDetailClient({ project, nextProject }: { project: Project; nextProject?: NextProject | null }) {
    const { language, t, setAlternateUrl } = useLanguage();

    useEffect(() => {
        const trUrl = `/projeler/${project.slug}`;
        const enUrl = project.slug_en ? `/en/projects/${project.slug_en}` : "/en/projects";
        setAlternateUrl(trUrl, enUrl);
    }, [project.slug, project.slug_en]);

    const title = language === "en" ? (project.title_en || project.title) : project.title;
    const description = language === "en" ? (project.description_en || project.description) : project.description;
    const content = language === "en" ? (project.content_en || project.content) : project.content;

    const technologies: string[] = (() => { try { return project.technologies ? JSON.parse(project.technologies) : []; } catch { return project.technologies ? project.technologies.split(",").map(s => s.trim()).filter(Boolean) : []; } })();
    const galleryImages: (string | { url: string; alt?: string })[] = (() => { try { return project.gallery ? JSON.parse(project.gallery) : []; } catch { return []; } })();

    const projectDate = project.projectDate ? new Date(project.projectDate) : null;
    const dateLabel = projectDate
        ? projectDate.toLocaleDateString(language === "en" ? "en-US" : "tr-TR", { month: "long", year: "numeric" })
        : null;
    const nextTitle = nextProject ? (language === "en" ? (nextProject.title_en || nextProject.title) : nextProject.title) : null;
    const nextHref = nextProject
        ? (language === "en"
            ? `/en/projects/${nextProject.slug_en || nextProject.slug}`
            : `/projeler/${nextProject.slug}`)
        : null;

    return (
        <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20">
            <div className="mx-auto max-w-[840px] px-6 sm:px-8">
                {/* Breadcrumb */}
                <nav
                    className="mb-8 flex items-center gap-2 text-[rgba(255,255,255,.4)]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                >
                    <Link href={language === "en" ? "/en" : "/"} className="hover:text-white transition-colors">
                        {t("Ana Sayfa", "Home")}
                    </Link>
                    <span>/</span>
                    <Link href={language === "en" ? "/en/projects" : "/projeler"} className="hover:text-white transition-colors">
                        {t("Projeler", "Projects")}
                    </Link>
                    <span>/</span>
                    <span className="text-white/70">{title}</span>
                </nav>

                {/* Project Header */}
                <div className="mb-10">
                    {(project.category || dateLabel) && (
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            {project.category && (
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px]">
                                    <span className="h-[7px] w-[7px] rounded-full bg-[var(--acc)]" style={{ boxShadow: "0 0 10px var(--acc)" }} />
                                    <span
                                        className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                                    >
                                        {project.category}
                                    </span>
                                </div>
                            )}
                            {dateLabel && (
                                <span
                                    className="text-[rgba(255,255,255,.4)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".06em" }}
                                >
                                    {dateLabel}
                                </span>
                            )}
                        </div>
                    )}
                    <h1
                        className="text-white font-bold tracking-[-0.02em] leading-[1.05]"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 6vw, 56px)" }}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p
                            className="mt-6 max-w-[640px] text-[rgba(255,255,255,.64)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.6 }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* Project Meta */}
                {(project.client || project.category || project.projectUrl) && (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 p-6 rounded-[20px] border border-white/10"
                        style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                    >
                        {project.client && (
                            <div>
                                <span
                                    className="text-[rgba(255,255,255,.4)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                                >
                                    {t("Müşteri", "Client")}
                                </span>
                                <p className="mt-1.5 text-white" style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600 }}>
                                    {project.client}
                                </p>
                            </div>
                        )}
                        {project.category && (
                            <div>
                                <span
                                    className="text-[rgba(255,255,255,.4)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                                >
                                    {t("Kategori", "Category")}
                                </span>
                                <p className="mt-1.5 text-white" style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600 }}>
                                    {project.category}
                                </p>
                            </div>
                        )}
                        {project.projectUrl && (
                            <div>
                                <span
                                    className="text-[rgba(255,255,255,.4)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                                >
                                    {t("Web Sitesi", "Website")}
                                </span>
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1.5 block text-[var(--acc)] hover:text-white transition-colors"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 14, fontWeight: 600 }}
                                >
                                    {t("Siteyi Ziyaret Et →", "Visit Site →")}
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Hero Image — full-bleed, cinematic */}
            {project.image && (
                <div className="mx-auto max-w-[1200px] px-6 sm:px-8 mb-10">
                    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#14141d]">
                        <Image
                            fill
                            src={project.image}
                            alt={title}
                            className="object-cover"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-[840px] px-6 sm:px-8">

                {/* Video */}
                {project.video && (
                    <div className="mb-10">
                        <VideoPlayer src={project.video} title={title} />
                    </div>
                )}

                {/* Technologies */}
                {technologies.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-5">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Kullanılan Teknolojiler", "Technologies Used")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center rounded-full border border-white/10 px-3.5 py-1.5 text-[rgba(255,255,255,.7)]"
                                    style={{ background: "rgba(255,255,255,.04)", fontFamily: "var(--font-manrope)", fontSize: 13, fontWeight: 500 }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content */}
                {content && (
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-[var(--acc)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Proje Hakkında", "About the Project")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/[0.08]" />
                        </div>
                        <div
                            className="prose prose-xl prose-invert max-w-none prose-a:text-[var(--acc)] prose-a:no-underline hover:prose-a:underline prose-p:leading-[1.75]"
                            style={{ fontFamily: "var(--font-manrope)" }}
                            dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content.replace(/&nbsp;/g, ' ')) }}
                        />
                    </div>
                )}
            </div>

            {/* Gallery — full-bleed */}
            {galleryImages.length > 0 && (
                <div className="mx-auto max-w-[1200px] px-6 sm:px-8 mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2
                            className="text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                        >
                            {t("Proje Galerisi", "Project Gallery")}
                        </h2>
                        <span
                            className="rounded-full border border-white/10 px-3 py-1.5 text-[rgba(255,255,255,.5)]"
                            style={{ background: "rgba(255,255,255,.04)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                        >
                            {t("Kaydırınız →", "Scroll →")}
                        </span>
                    </div>
                    <GalleryLightbox images={galleryImages} title={title} />
                </div>
            )}

            <div className="mx-auto max-w-[840px] px-6 sm:px-8">

                {/* Back Button */}
                <div className="mb-10">
                    <Link
                        href={language === "en" ? "/en/projects" : "/projeler"}
                        className="inline-flex items-center gap-2 text-[rgba(255,255,255,.4)] hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, letterSpacing: ".1em", textTransform: "uppercase" }}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("Tüm Projelere Dön", "Back to All Projects")}
                    </Link>
                </div>
            </div>

            {/* Next Project */}
            {nextProject && nextHref && (
                <div className="mx-auto max-w-[1200px] px-6 sm:px-8 mb-20">
                    <Link
                        href={nextHref}
                        className="group relative block aspect-[16/6] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#14141d]"
                    >
                        {nextProject.image && (
                            <Image
                                fill
                                src={nextProject.image}
                                alt={nextTitle || ""}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1200px) 100vw, 1200px"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                        <div className="absolute inset-0 flex flex-col items-start justify-end p-8 sm:p-10">
                            <span
                                className="text-[var(--acc)] mb-2"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".14em", fontWeight: 500, textTransform: "uppercase" }}
                            >
                                {t("Sıradaki Proje", "Next Project")}
                            </span>
                            <h3
                                className="text-white font-bold tracking-[-0.01em] flex items-center gap-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(22px, 4vw, 34px)" }}
                            >
                                {nextTitle}
                                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </h3>
                        </div>
                    </Link>
                </div>
            )}

            <CtaSection />
        </div>
    );
}
