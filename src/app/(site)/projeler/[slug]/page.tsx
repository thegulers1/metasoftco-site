import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import GalleryLightbox from "@/components/site/GalleryLightbox";

async function getProject(slug: string) {
    const project = await prisma.project.findUnique({
        where: { slug },
    });
    return project;
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    const technologies = project.technologies
        ? JSON.parse(project.technologies)
        : [];

    return (
        <main className="min-h-screen bg-white pt-32 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-black/50">
                    <Link href="/" className="hover:text-black transition">
                        Ana Sayfa
                    </Link>
                    <span>/</span>
                    <span className="text-black font-medium">{project.title}</span>
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
                        {project.title}
                    </h1>
                    {project.description && (
                        <p className="mt-4 text-lg text-black/60 leading-relaxed">
                            {project.description}
                        </p>
                    )}
                </div>

                {/* Project Meta */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 p-6 bg-black/[0.02] rounded-2xl">
                    {project.client && (
                        <div>
                            <span className="text-xs uppercase tracking-wider text-black/40 font-medium">
                                Müşteri
                            </span>
                            <p className="mt-1 text-sm font-medium text-black">
                                {project.client}
                            </p>
                        </div>
                    )}
                    {project.category && (
                        <div>
                            <span className="text-xs uppercase tracking-wider text-black/40 font-medium">
                                Kategori
                            </span>
                            <p className="mt-1 text-sm font-medium text-black">
                                {project.category}
                            </p>
                        </div>
                    )}
                    {project.projectUrl && (
                        <div>
                            <span className="text-xs uppercase tracking-wider text-black/40 font-medium">
                                Web Sitesi
                            </span>
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-sm font-medium text-blue-600 hover:underline block"
                            >
                                Siteyi Ziyaret Et →
                            </a>
                        </div>
                    )}
                </div>

                {/* Hero Image */}
                {project.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-10">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Technologies */}
                {technologies.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-sm uppercase tracking-wider text-black/40 font-medium mb-3">
                            Kullanılan Teknolojiler
                        </h3>
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
                {project.content && (
                    <div className="prose prose-lg max-w-none text-black/80 leading-relaxed mb-16 font-light">
                        {project.content.split("\n").map((paragraph: string, i: number) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                )}

                {/* Project Gallery */}
                {project.gallery && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                Proje Galerisi
                            </h3>
                            <span className="text-[10px] uppercase tracking-widest text-black/30 bg-black/[0.03] px-3 py-1.5 rounded-full border border-black/5">
                                Kaydırınız →
                            </span>
                        </div>

                        <GalleryLightbox
                            images={JSON.parse(project.gallery) as string[]}
                            title={project.title}
                        />
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-16 pt-8 border-t border-black/10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Tüm Projelere Dön
                    </Link>
                </div>
            </div>
        </main>
    );
}
