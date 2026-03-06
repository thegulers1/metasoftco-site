"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import Container from "@/components/site/Container";

interface Project {
    id: string;
    slug: string;
    image: string | null;
    title: string;
    title_en: string | null;
    category: string | null;
    description: string | null;
    description_en: string | null;
}

export default function ProjectsListClient({ projects }: { projects: Project[] }) {
    const { language } = useLanguage();

    return (
        <section className="pb-32 bg-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => {
                        const title = language === "en" ? (project.title_en || project.title) : project.title;
                        const description = language === "en" ? (project.description_en || project.description) : project.description;

                        return (
                            <Link
                                key={project.id}
                                href={`/projeler/${project.slug}`}
                                className="group block"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/5 mb-4">
                                    <img
                                        src={project.image || ""}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {project.category && (
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-black">
                                                {project.category}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-2xl font-light text-black mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                                    {title}
                                </h3>
                                {description && (
                                    <p className="text-black/50 line-clamp-2 font-light">
                                        {description}
                                    </p>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
