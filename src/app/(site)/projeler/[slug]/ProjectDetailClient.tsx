"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft as ArrowLeft, IconArrowRight as ArrowRight } from "@tabler/icons-react";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import VideoPlayer from "@/components/site/VideoPlayer";
import { SignalHeading } from "@/components/phase2/SignalHeading";
import { splitSignalTitle } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { useLanguage } from "@/providers/LanguageProvider";
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

/**
 * Technologies come from the editor as a JSON array or as one delimited string.
 * Records in the database use commas, middle dots and bullets interchangeably,
 * so every entry is split on all three to land on one chip per technology.
 */
function splitTechnologyString(value: string): string[] {
    return value.split(/[,·•]/).map((part) => part.trim()).filter(Boolean);
}

function parseTechnologies(raw: string | null): string[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.flatMap((item) => splitTechnologyString(String(item)));
    } catch {
        // Fall through to the delimited-string form.
    }
    return splitTechnologyString(raw);
}

function parseGallery(raw: string | null): { url: string; alt?: string }[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as (string | { url: string; alt?: string })[];
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item) => (typeof item === "string" ? { url: item } : item));
    } catch {
        return [];
    }
}

export default function ProjectDetailClient({ project, nextProject }: { project: Project; nextProject?: NextProject | null }) {
    const { language, setAlternateUrl } = useLanguage();
    const dictionary = phase2Copy(language);
    const copy = dictionary.projectDetail;

    useEffect(() => {
        const trUrl = `/projeler/${project.slug}`;
        const enUrl = project.slug_en ? `/en/projects/${project.slug_en}` : "/en/projects";
        setAlternateUrl(trUrl, enUrl);
    }, [project.slug, project.slug_en, setAlternateUrl]);

    const isEn = language === "en";
    const title = isEn ? (project.title_en || project.title) : project.title;
    const description = isEn ? (project.description_en || project.description) : project.description;
    const content = isEn ? (project.content_en || project.content) : project.content;

    const technologies = parseTechnologies(project.technologies);
    const gallery = parseGallery(project.gallery);
    const projectDate = project.projectDate ? new Date(project.projectDate) : null;
    const year = projectDate ? String(projectDate.getFullYear()) : null;

    const { solid, outline } = splitSignalTitle(title);

    // The stack is deliberately absent here: it gets its own section below, and
    // a full technology list overflows a quarter-width fact cell.
    const facts = [
        project.client && { term: copy.clientTerm, value: project.client },
        project.category && { term: copy.formatTerm, value: project.category },
        year && { term: copy.yearTerm, value: year },
    ].filter((fact): fact is { term: string; value: string } => Boolean(fact));

    const nextTitle = nextProject ? (isEn ? (nextProject.title_en || nextProject.title) : nextProject.title) : null;
    const nextHref = nextProject
        ? (isEn ? `/en/projects/${nextProject.slug_en || nextProject.slug}` : `/projeler/${nextProject.slug}`)
        : null;

    return (
        <article className="phase2 p2-screen p2-project-detail">
            <header className="p2-container p2-detail-top">
                <nav className="p2-detail-top__crumb" aria-label={copy.crumbWork}>
                    <Link href={dictionary.routes.home}>{copy.crumbHome}</Link>
                    <span>{"  /  "}</span>
                    <Link href={dictionary.routes.work}>{copy.crumbWork}</Link>
                    <span>{"  /  "}</span>
                    {project.category || title}
                </nav>

                <div className="p2-detail-top__heading">
                    <SignalHeading solid={solid} outline={outline} label={title} />
                    {description && <p>{description}</p>}
                </div>

                {facts.length > 0 && (
                    <dl>
                        {facts.map((fact) => (
                            <div key={fact.term}>
                                <dt>{fact.term}</dt>
                                <dd>{fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}

                {project.image && (
                    <figure className="p2-detail-main-image">
                        <Image src={project.image} alt={title} fill priority sizes="100vw" />
                    </figure>
                )}
            </header>

            {project.video && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.videoTitle}</h2>
                    <div className="p2-detail-video">
                        <VideoPlayer src={project.video} fallbackPoster={project.image} title={title} />
                    </div>
                </section>
            )}

            {content && (
                <section className="p2-container p2-detail-section p2-detail-section--about">
                    <h2>{copy.aboutTitle}</h2>
                    <div
                        className="p2-prose"
                        dangerouslySetInnerHTML={{ __html: addHeadingAnchors(content.replace(/&nbsp;/g, " ")) }}
                    />
                </section>
            )}

            {technologies.length > 0 && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.stackTitle}</h2>
                    <div className="p2-tag-row">
                        {technologies.map((tech) => <span key={tech}>{tech}</span>)}
                    </div>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="p2-container p2-detail-section">
                    <h2>{copy.galleryTitle}</h2>
                    <GalleryLightbox
                        variant="grid"
                        images={gallery.map((item, index) => ({ url: item.url, alt: item.alt || copy.galleryAlt(index + 1) }))}
                        title={title}
                    />
                </section>
            )}

            {nextProject && nextHref && (
                <section className="p2-container p2-detail-section">
                    <Link href={nextHref} className="p2-next-project p2-next-project--standalone">
                        <div>
                            <span>{copy.nextLabel}</span>
                            <h2>{nextTitle}</h2>
                        </div>
                        {nextProject.image && <Image src={nextProject.image} alt="" fill sizes="55vw" />}
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </section>
            )}

            <div className="p2-container p2-detail-foot">
                <Link href={dictionary.routes.work} className="p2-back-link">
                    <ArrowLeft aria-hidden="true" /> {copy.backLabel}
                </Link>
                {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="p2-back-link">
                        {copy.siteValue} <ArrowRight aria-hidden="true" />
                    </a>
                )}
            </div>

            <section className="p2-screen-cta">
                <div className="p2-container">
                    <SignalHeading as="h2" solid={copy.ctaSolid} outline={copy.ctaOutline} />
                    <Link href={dictionary.routes.contact} className="p2-screen-button">{copy.ctaButton} <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>
        </article>
    );
}
