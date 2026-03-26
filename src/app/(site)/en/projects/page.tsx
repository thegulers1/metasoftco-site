import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import ProjectsHero from "@/app/(site)/projeler/ProjectsHero";
import ProjectsListClient from "@/app/(site)/projeler/ProjectsListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Projects | MetasoftCo",
    description: "Interactive event experiences, photobooth, AI face-swap and custom software projects by MetasoftCo.",
    keywords: ["metasoftco projects", "interactive event projects", "photobooth projects", "AI experience projects"],
    openGraph: {
        title: "Projects | MetasoftCo",
        description: "Interactive digital experiences and custom software projects we built for brands.",
        url: `${siteConfig.url}/en/projects`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Projects&desc=Interactive+event+and+software+projects`, width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: "Projects | MetasoftCo" },
    alternates: {
        canonical: `${siteConfig.url}/en/projects`,
        languages: {
            "x-default": `${siteConfig.url}/projeler`,
            "tr": `${siteConfig.url}/projeler`,
            "en": `${siteConfig.url}/en/projects`,
        },
    },
};

export default async function EnglishProjectsPage() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
            id: true,
            slug: true,
            slug_en: true,
            image: true,
            title: true,
            title_en: true,
            category: true,
            description: true,
            description_en: true,
        },
    });

    return (
        <div className="bg-white min-h-screen">
            <ProjectsHero />
            <ProjectsListClient projects={projects} />
        </div>
    );
}
