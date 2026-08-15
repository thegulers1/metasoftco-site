import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import WorkIndexPrototype from "@/components/phase2/WorkIndexPrototype";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Projeler | Yapay Zeka & İnteraktif Aktivasyon Referansları — MetasoftCo",
    description: "DeFacto, Akbank, Adidas, Pegasus ve daha fazlası. MetasoftCo'nun gerçekleştirdiği yapay zeka etkinlik ve interaktif aktivasyon projelerini inceleyin.",
    keywords: ["metasoftco projeler", "defacto yapay zeka etkinlik", "akbank interaktif aktivasyon", "AI photobooth referans", "interaktif etkinlik projeleri"],
    openGraph: {
        title: "Projeler | Yapay Zeka & İnteraktif Aktivasyon Referansları — MetasoftCo",
        description: "DeFacto, Akbank, Adidas, Pegasus ve daha fazlası. 100+ marka, 1.000+ etkinlik.",
        url: `${siteConfig.url}/projeler`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Projeler&desc=100%2B+marka+1000%2B+etkinlik+referans%C4%B1`, width: 1200, height: 630 }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: { card: "summary_large_image", title: "Projeler | Yapay Zeka & İnteraktif Aktivasyon Referansları — MetasoftCo" },
    alternates: {
        canonical: `${siteConfig.url}/projeler`,
        languages: {
            "x-default": `${siteConfig.url}/projeler`,
            "tr": `${siteConfig.url}/projeler`,
            "en": `${siteConfig.url}/en/projects`,
        },
    },
};

const getProjects = unstable_cache(
    async () => prisma.project.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: { id: true, slug: true, slug_en: true, image: true, title: true, title_en: true, category: true, description: true, description_en: true, content_en: true, metaTitle_en: true, metaDescription_en: true },
    }),
    ["projects-list"],
    { revalidate: 60 }
);

export default async function ProjectsPage() {
    const projects = (await getProjects())
        .filter((project) => project.image)
        .map((project) => ({ id: project.id, slug: project.slug, title: project.title, image: project.image! }));

    return <WorkIndexPrototype projects={projects} locale="tr" />;
}
