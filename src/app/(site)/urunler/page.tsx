import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { siteConfig, ogImageUrl } from "@/lib/site";
import { capabilityListingImageOverrides } from "@/lib/phase2-content";
import ProductsIndexPrototype from "@/components/phase2/ProductsIndexPrototype";

export const revalidate = 3600;

const ogTitle = "Sistem Satışı & Kalıcı Kurulum | Anahtar Teslim İnteraktif Sistemler — MetasoftCo";
const ogDescription = "Kurumunuz için tasarlanan, üretilen ve kalıcı olarak kurulan anahtar teslim interaktif sistemler.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Sistem Satışı & Kalıcı Kurulum | Anahtar Teslim İnteraktif Sistemler — MetasoftCo",
    description: "Kurumunuz için tasarlanan, üretilen ve kalıcı olarak kurulan anahtar teslim interaktif sistemler. Özel donanım üretimi ve Unity/Python tabanlı yazılım altyapısı.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/urunler`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/urunler`,
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
    ["sale-services"],
    { revalidate: 60 }
);

export default async function UrunlerPage() {
    const services = await getSaleServices();
    const products = services
        .filter((service) => service.image)
        .map((service) => ({
            id: service.id,
            title: service.title,
            image: capabilityListingImageOverrides[service.id] || service.image!,
            href: `/urunler/${service.slug}`,
        }));

    return <ProductsIndexPrototype products={products} locale="tr" />;
}
