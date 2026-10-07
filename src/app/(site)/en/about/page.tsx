import { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";
import AboutPrototype from "@/components/phase2/AboutPrototype";

const ogTitle = "About Us | MetasoftCo";
const ogDescription = "We are a passionate team dedicated to turning innovative ideas into amazing experiences.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "About Us | MetasoftCo",
    description: "Learn about MetasoftCo. We are a passionate team dedicated to turning innovative ideas into amazing experiences.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/en/hakkimizda`,
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
        canonical: `${siteConfig.url}/en/hakkimizda`,
        languages: {
            "x-default": `${siteConfig.url}/hakkimizda`,
            "tr": `${siteConfig.url}/hakkimizda`,
            "en": `${siteConfig.url}/en/hakkimizda`,
        },
    },
};

export default function AboutPage() {
    return <AboutPrototype locale="en" />;
}
