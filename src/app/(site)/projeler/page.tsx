import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import ProjectsHero from "./ProjectsHero";
import ProjectsListClient from "./ProjectsListClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Projeler | MetasoftCo",
    description: "MetasoftCo'nun gerçekleştirdiği interaktif etkinlik, photobooth, AI yüz değiştirme ve özel yazılım projeleri. Markalar için ürettiğimiz dijital deneyimler.",
    keywords: ["metasoftco projeler", "interaktif etkinlik projeleri", "photobooth projeleri", "AI deneyim projeleri", "yazılım portföy"],
    openGraph: {
        title: "Projeler | MetasoftCo",
        description: "Markalar için ürettiğimiz interaktif dijital deneyimler ve özel yazılım projeleri.",
        url: `${siteConfig.url}/projeler`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Projeler&desc=Interaktif+etkinlik+ve+yazılım+projelerimiz`, width: 1200, height: 630 }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: { card: "summary_large_image", title: "Projeler | MetasoftCo" },
    alternates: { canonical: `${siteConfig.url}/projeler` },
};

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
            id: true,
            slug: true,
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
