import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, ogImageUrl } from "@/lib/site";
import { capabilityListingImageOverrides } from "@/lib/phase2-content";
import ProductsIndexPrototype from "@/components/phase2/ProductsIndexPrototype";
import { isEnglishServicePublishable } from "@/lib/publication";

export const revalidate = 3600;

const ogTitle = "Permanent System Sales & Turnkey Installation | MetasoftCo";
const ogDescription = "Turnkey interactive systems designed, built, and permanently installed for your organization.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Permanent System Sales & Turnkey Installation | MetasoftCo",
    description: "Turnkey interactive systems designed, built, and permanently installed for your organization. Custom hardware production and Unity/Python-based software infrastructure.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/en/products`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/en/products`,
        languages: {
            "x-default": `${siteConfig.url}/urunler`,
            "tr": `${siteConfig.url}/urunler`,
            "en": `${siteConfig.url}/en/products`,
        },
    },
};

const getSaleServices = unstable_cache(
    async () => prisma.service.findMany({
        where: { type: "SALE", published: true },
        include: { category: true },
        orderBy: { order: "asc" },
    }),
    ["sale-services-en"],
    { revalidate: 60 }
);

export default async function EnglishProductsPage() {
    const services = await getSaleServices();
    const products = services
        .filter((service) => service.image && isEnglishServicePublishable(service, service.category))
        .map((service) => ({
            id: service.id,
            title: service.title_en!,
            image: capabilityListingImageOverrides[service.id] || service.image!,
            href: `/en/products/${service.slug_en}`,
        }));

    return <ProductsIndexPrototype products={products} locale="en" />;
}
