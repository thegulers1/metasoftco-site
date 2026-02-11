import { prisma } from "@/lib/db";
import Container from "@/components/site/Container";
import Link from "next/link";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
    });

    return (
        <section className="py-32 bg-white min-h-screen">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6">
                        PROJELER
                    </h1>
                    <p className="text-lg text-black/60 max-w-2xl">
                        Yaratıcılığımızı teknolojiyle birleştirdiğimiz, markalar için tasarladığımız en son işlerimiz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project: { id: string; slug: string; image: string | null; title: string; category: string | null; description: string | null }) => (
                        <Link
                            key={project.id}
                            href={`/projeler/${project.slug}`}
                            className="group block"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/5 mb-4">
                                <img
                                    src={project.image || ""}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-black">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-light text-black mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                                {project.title}
                            </h3>
                            <p className="text-black/50 line-clamp-2 font-light">
                                {project.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
