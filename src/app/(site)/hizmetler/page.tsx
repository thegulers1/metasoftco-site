import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import ServicesListClient from "./ServicesListClient";

export const metadata: Metadata = {
    title: "Hizmetlerimiz",
    description: "MetasoftCo'nun sunduğu yapay zeka, fotoğraf & video ve interaktif hizmetler. Etkinlikleriniz için profesyonel çözümler.",
    openGraph: {
        title: "Hizmetlerimiz | MetasoftCo",
        description: "Yapay zeka, fotoğraf & video ve interaktif hizmetlerimizi keşfedin.",
        url: `${siteConfig.url}/hizmetler`,
    },
};

async function getCategories() {
    return prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            services: {
                orderBy: { order: "asc" },
            },
        },
    });
}

export default async function HizmetlerPage() {
    const categories = await getCategories();
    return <ServicesListClient categories={categories} />;
}
