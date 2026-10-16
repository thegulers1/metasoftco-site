"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MsCaps, MsCrumbs, MsFacts, MsFaq, MsProse, MsSectionHead, MsWords, splitHtmlSections } from "@/components/site-ms/parts";
import { MsGallery, MsVideo } from "@/components/site-ms/interactive";
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
    faq?: string | null;
    faq_en?: string | null;
}

interface RelatedService {
    title: string;
    href: string;
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

function parseJsonList<T>(raw: string | null | undefined): T[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

const labels = {
    tr: { videoMeta: "SAHADAN · VİDEO", aboutMeta: "PROJE HAKKINDA", stackMeta: "TEKNOLOJİ", galleryMeta: "GALERİ", faqAside: "Benzer bir aktivasyon mu planlıyorsunuz? Bize yazın; aynı gün dönüş yapalım.", gallery: { close: "KAPAT ×", prev: "← ÖNCEKİ", next: "SONRAKİ →" }, quote: "ETKİNLİĞİNİZ İÇİN TEKLİF ALIN ↗", cursor: { view: "İNCELE", go: "GİT", write: "YAZ" } },
    en: { videoMeta: "ON SITE · VIDEO", aboutMeta: "ABOUT THE PROJECT", stackMeta: "TECHNOLOGY", galleryMeta: "GALLERY", faqAside: "Planning something similar? Write to us and we will reply the same day.", gallery: { close: "CLOSE ×", prev: "← PREV", next: "NEXT →" }, quote: "GET A QUOTE FOR YOUR EVENT ↗", cursor: { view: "VIEW", go: "GO", write: "WRITE" } },
};

export default function ProjectDetailClient({ project, nextProject, relatedServices = [] }: { project: Project; nextProject?: NextProject | null; relatedServices?: RelatedService[] }) {
    const { language, setAlternateUrl } = useLanguage();
    const dictionary = phase2Copy(language);
    const copy = dictionary.projectDetail;
    const t = labels[language === "en" ? "en" : "tr"];

    useEffect(() => {
        const trUrl = `/projeler/${project.slug}`;
        const enUrl = project.slug_en ? `/en/projects/${project.slug_en}` : "/en/projects";
        setAlternateUrl(trUrl, enUrl);
    }, [project.slug, project.slug_en, setAlternateUrl]);

    const isEn = language === "en";
    const up = (text: string) => text.toLocaleUpperCase(isEn ? "en-US" : "tr-TR");
    const title = isEn ? (project.title_en || project.title) : project.title;
    const description = isEn ? (project.description_en || project.description) : project.description;
    const content = isEn ? (project.content_en || project.content) : project.content;

    const technologies = parseTechnologies(project.technologies);
    const gallery = parseGallery(project.gallery);
    const faqs = parseJsonList<{ q: string; a: string }>((isEn && project.faq_en) || project.faq);
    const projectDate = project.projectDate ? new Date(project.projectDate) : null;
    const year = projectDate ? String(projectDate.getFullYear()) : null;

    const facts = [
        project.client && { term: copy.clientTerm, value: project.client },
        project.category && { term: copy.formatTerm, value: project.category },
        year && { term: copy.yearTerm, value: year },
    ].filter((fact): fact is { term: string; value: string } => Boolean(fact));

    const nextTitle = nextProject ? (isEn ? (nextProject.title_en || nextProject.title) : nextProject.title) : null;
    const nextHref = nextProject
        ? (isEn ? `/en/projects/${nextProject.slug_en || nextProject.slug}` : `/projeler/${nextProject.slug}`)
        : null;
    const about = content ? splitHtmlSections(addHeadingAnchors(content.replace(/&nbsp;/g, " "))) : null;

    return (
        <article className="ms-page">
            <section className="ms-hero ms-hero--split">
                <div className="ms-hero__col">
                    <MsCrumbs items={[
                        { href: dictionary.routes.home, label: up(copy.crumbHome) },
                        { href: dictionary.routes.work, label: up(copy.crumbWork) },
                        { label: project.category || title },
                    ]} />
                    <h1 className={`ms-h1 ms-h1--detail${title.length > 34 ? " ms-h1--long" : ""}`} aria-label={title}>
                        <MsWords text={title} accent="last" />
                    </h1>
                    {description && <p className="ms-lede" data-reveal>{description}</p>}
                    <MsFacts facts={facts} />
                    <div className="ms-actions">
                        <Link href={dictionary.routes.contact} className="ms-pill ms-pill--acc" data-cursor={t.cursor.write}>{t.quote}</Link>
                        {project.projectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="ms-pill ms-pill--line" data-cursor={t.cursor.go}>{up(copy.siteValue)} ↗</a>
                        )}
                    </div>
                </div>
                {project.image && (
                    <div className="ms-hero__media" data-reveal>
                        <Image src={project.image} alt={title} fill priority sizes="(max-width: 899px) 100vw, 46vw" />
                        {project.client && <span className="ms-hero__tag ms-mono"><MsCaps text={project.client} /></span>}
                    </div>
                )}
            </section>

            {project.video && (
                <section className="ms-section" aria-labelledby="ms-pvideo">
                    <MsSectionHead id="ms-pvideo" title={copy.videoTitle.replace(/[?.]$/, "")} meta={t.videoMeta} />
                    <div data-reveal><MsVideo src={project.video} title={title} poster={project.image} /></div>
                </section>
            )}

            {about && (
                <section className="ms-section" aria-labelledby="ms-pabout">
                    <MsSectionHead id="ms-pabout" title={copy.aboutTitle} meta={t.aboutMeta} />
                    {about.sections.length === 0 ? (
                        <div data-reveal><MsProse html={about.intro} /></div>
                    ) : (
                        <>
                            {about.intro && <div data-reveal><MsProse html={about.intro} /></div>}
                            <div className="ms-cards">
                                {about.sections.map((section, index) => (
                                    <div key={`${index}-${section.title}`} className={`ms-card${index === 0 ? " ms-card--lead" : ""}`} data-reveal>
                                        <span className="ms-card__num">{String(index + 1).padStart(2, "0")}</span>
                                        <h3 className="ms-card__title" id={section.id}><MsCaps text={section.title} /></h3>
                                        <div className="ms-card__body" dangerouslySetInnerHTML={{ __html: section.html }} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            )}

            {technologies.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-pstack">
                    <MsSectionHead id="ms-pstack" title={copy.stackTitle} meta={t.stackMeta} small />
                    <div className="ms-tags" data-reveal>
                        {technologies.map((tech) => <span key={tech}>{tech}</span>)}
                    </div>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="ms-section" aria-labelledby="ms-pgallery">
                    <MsSectionHead id="ms-pgallery" title={copy.galleryTitle} meta={t.galleryMeta} />
                    <MsGallery images={gallery.map((item, index) => ({ url: item.url, alt: item.alt || copy.galleryAlt(index + 1) }))} labels={t.gallery} />
                </section>
            )}

            {faqs.length > 0 && (
                <section className="ms-faq-wrap" aria-labelledby="ms-pfaq">
                    <div className="ms-faq-wrap__aside" data-reveal>
                        <h2 id="ms-pfaq" className="ms-h2">{copy.faqTitle}<span className="ms-acc">.</span></h2>
                        <p>{t.faqAside}</p>
                    </div>
                    <MsFaq items={faqs} />
                </section>
            )}

            {relatedServices.length > 0 && (
                <div style={{ marginTop: "2vw" }}>
                    {relatedServices.map((service) => (
                        <Link key={service.href} href={service.href} className="ms-capability" data-cursor={t.cursor.view}>
                            <span>{copy.serviceLabel}</span>
                            <strong><MsCaps text={service.title} /> ↗</strong>
                        </Link>
                    ))}
                </div>
            )}

            {nextProject && nextHref && (
                <section className="ms-section">
                    <Link href={nextHref} className="ms-next" data-cursor={t.cursor.view}>
                        <div className="ms-next__copy">
                            <span className="ms-mono">{up(copy.nextLabel)} →</span>
                            <h2 className="ms-next__title">{nextTitle && <MsCaps text={nextTitle} />}</h2>
                        </div>
                        <div className="ms-next__media">
                            {nextProject.image && <Image src={nextProject.image} alt="" fill sizes="(max-width: 899px) 100vw, 50vw" />}
                        </div>
                    </Link>
                </section>
            )}
        </article>
    );
}
