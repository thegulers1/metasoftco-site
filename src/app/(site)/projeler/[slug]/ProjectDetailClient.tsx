"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
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
}

export default function ProjectDetailClient({ project }: { project: Project }) {
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

    return (
        <div className="min-h-screen bg-[#0d0d0d] pt-32 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-white/40">
                    <Link href={language === "en" ? "/en" : "/"} className="hover:text-white transition uppercase tracking-widest text-[10px] font-bold">
                        {t("Ana Sayfa", "Home")}
                    </Link>
                    <span className="text-white/20">/</span>
                    <Link href={language === "en" ? "/en/projects" : "/projeler"} className="hover:text-white transition uppercase tracking-widest text-[10px] font-bold">
                        {t("Projeler", "Projects")}
                    </Link>
                    <span className="text-white/20">/</span>
                    <span className="text-[#e5e5e5] font-bold uppercase tracking-widest text-[10px]">{title}</span>
                </nav>

                {/* Project Header */}
                <div className="mb-10">
                    {project.category && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4 border border-red-600/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            {project.category}
                        </span>
                    )}
                    <h1
                        className="text-4xl sm:text-6xl font-light text-[#e5e5e5] tracking-tighter mt-2 leading-[1.1] uppercase"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-6 text-xl text-white/50 leading-relaxed font-normal max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>

                {/* Project Meta */}
                {(project.client || project.category || project.projectUrl) && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                        {project.client && (
                            <div>
                                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                                    {t("Müşteri", "Client")}
                                </span>
                                <p className="mt-1 text-sm font-medium text-[#e5e5e5]">
                                    {project.client}
                                </p>
                            </div>
                        )}
                        {project.category && (
                            <div>
                                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                                    {t("Kategori", "Category")}
                                </span>
                                <p className="mt-1 text-sm font-medium text-[#e5e5e5]">
                                    {project.category}
                                </p>
                            </div>
                        )}
                        {project.projectUrl && (
                            <div>
                                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                                    {t("Web Sitesi", "Website")}
                                </span>
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 text-sm font-medium text-red-500 hover:text-red-400 transition block"
                                >
                                    {t("Siteyi Ziyaret Et →", "Visit Site →")}
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Hero Image */}
                {project.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-10 bg-[#141414]">
                        <Image
                            fill
                            src={project.image}
                            alt={title}
                            className="object-contain"
                            sizes="(max-width: 1200px) 100vw, 896px"
                            priority
                        />
                    </div>
                )}

                {/* Video */}
                {project.video && (
                    <div className="mb-10">
                        <VideoPlayer src={project.video} title={title} />
                    </div>
                )}

                {/* Technologies */}
                {technologies.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
                                {t("Kullanılan Teknolojiler", "Technologies Used")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/5" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60"
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
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
                                {t("Proje Hakkında", "About the Project")}
                            </h2>
                            <div className="h-[1px] flex-1 bg-white/5" />
                        </div>
                        <div
                            className="prose prose-lg prose-invert max-w-none text-white/70 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content.replace(/&nbsp;/g, ' ')) }}
                        />
                    </div>
                )}

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
                                {t("Proje Galerisi", "Project Gallery")}
                            </h2>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                {t("Kaydırınız →", "Scroll →")}
                            </span>
                        </div>
                        <GalleryLightbox images={galleryImages} title={title} />
                    </div>
                )}

                {/* Bottom CTA Banner */}
                <div className="mt-20 bg-[#141414] border border-white/5 rounded-2xl px-8 sm:px-14 py-14 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">
                        {t("Etkinliğinizi Planlayalım", "Let's Plan Your Event")}
                    </p>
                    <p
                        className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("Projeniz için", "Ready for your")}
                        <br />
                        <span className="font-bold">{t("Hemen Teklif Alın", "Get a Quote Now")}</span>
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-8">
                        {t(
                            "Markanıza özel çözümler için ekibimizle hemen iletişime geçin. Size 24 saat içinde geri döneceğiz.",
                            "Contact our team for custom solutions tailored to your brand. We'll get back to you within 24 hours."
                        )}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href={language === "en" ? "/en/contact" : "/iletisim"}
                            className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                        >
                            {t("ETKİNLİĞİMİZİ PLANLAYALIM", "PLAN MY EVENT")}
                        </Link>
                        <a
                            href="tel:+905342334051"
                            className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition uppercase tracking-widest text-xs"
                        >
                            +90 534 233 4051
                        </a>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-10">
                    <Link
                        href={language === "en" ? "/en/projects" : "/projeler"}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white transition"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("TÜM PROJELERE DÖN", "BACK TO ALL PROJECTS")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
