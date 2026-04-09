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
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-black/50">
                    <Link href="/" className="hover:text-black transition">
                        {t("Ana Sayfa", "Home")}
                    </Link>
                    <span>/</span>
                    <Link href="/projeler" className="hover:text-black transition">
                        {t("Projeler", "Projects")}
                    </Link>
                    <span>/</span>
                    <span className="text-black font-medium">{title}</span>
                </nav>

                {/* Project Header */}
                <div className="mb-10">
                    {project.category && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-black/70 mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            {project.category}
                        </span>
                    )}
                    <h1
                        className="text-4xl sm:text-5xl font-bold text-black tracking-tight mt-2"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-4 text-lg text-black/60 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Project Meta */}
                {(project.client || project.category || project.projectUrl) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 p-6 bg-black/[0.02] rounded-2xl">
                    {project.client && (
                        <div>
                            <span className="text-xs uppercase tracking-wider text-black/40 font-medium">
                                {t("Müşteri", "Client")}
                            </span>
                            <p className="mt-1 text-sm font-medium text-black">
                                {project.client}
                            </p>
                        </div>
                    )}
                    {project.category && (
                        <div>
                            <span className="text-xs uppercase tracking-wider text-black/40 font-medium">
                                {t("Kategori", "Category")}
                            </span>
                            <p className="mt-1 text-sm font-medium text-black">
                                {project.category}
                            </p>
                        </div>
                    )}
                    {project.projectUrl && (
                        <div>
                            <span className="text-xs uppercase tracking-wider text-black/40 font-medium">
                                {t("Web Sitesi", "Website")}
                            </span>
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-sm font-medium text-blue-600 hover:underline block"
                            >
                                {t("Siteyi Ziyaret Et →", "Visit Site →")}
                            </a>
                        </div>
                    )}
                </div>
                )}

                {/* Hero Image */}
                {project.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-10">
                        <Image
                            fill
                            src={project.image}
                            alt={title}
                            className="object-contain bg-black/5"
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
                        <h2 className="text-sm uppercase tracking-wider text-black/40 font-medium mb-3">
                            {t("Kullanılan Teknolojiler", "Technologies Used")}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-black/70"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content */}
                {content && (
                    <div
                        className="prose prose-lg max-w-none text-black/80 leading-relaxed mb-16 font-light"
                        dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content.replace(/&nbsp;/g, ' ')) }}
                    />
                )}

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                {t("Proje Galerisi", "Project Gallery")}
                            </h2>
                            <span className="text-[10px] uppercase tracking-widest text-black/30 bg-black/[0.03] px-3 py-1.5 rounded-full border border-black/5">
                                {t("Kaydırınız →", "Scroll →")}
                            </span>
                        </div>
                        <GalleryLightbox images={galleryImages} title={title} />
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-16 pt-8 border-t border-black/10">
                    <Link
                        href="/projeler"
                        className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("Tüm Projelere Dön", "All Projects")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
