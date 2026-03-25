import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import SektorelYazilimClient from "@/app/(site)/sektorel-yazilim-cozumleri/SektorelYazilimClient";

export const metadata: Metadata = {
    title: "Industry-Specific Software & Digital Transformation | MetasoftCo",
    description:
        "Interactive event technologies and software solutions tailored for textile, healthcare, food, automotive, retail, finance, and technology sectors.",
    keywords: [
        "industry software solutions",
        "digital transformation",
        "sector-specific event technology",
        "interactive event solutions",
        "brand activation solutions turkey",
    ],
    openGraph: {
        title: "Industry-Specific Software & Digital Transformation | MetasoftCo",
        description: "Interactive event and software solutions tailored for your industry.",
        url: `${siteConfig.url}/en/industry-software-solutions`,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/en/industry-software-solutions`,
        languages: {
            "x-default": `${siteConfig.url}/sektorel-yazilim-cozumleri`,
            tr: `${siteConfig.url}/sektorel-yazilim-cozumleri`,
            en: `${siteConfig.url}/en/industry-software-solutions`,
        },
    },
};

export default function EnPage() {
    return <SektorelYazilimClient lang="en" />;
}
