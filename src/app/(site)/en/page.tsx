import type { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";
import HomeExperience from "@/components/home/HomeExperience";
import { homeFontClassName } from "@/components/home/fonts";
import { getHomeData } from "@/lib/home-data";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

const pageTitle = "AI Event Activations & Experiential Technology | MetasoftCo";
const pageDescription = "AI-powered photo, video, games and interactive installations for brands and agencies—from creative concept and software to on-site production.";
const ogImage = ogImageUrl(pageTitle, pageDescription);

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${siteConfig.url}/en`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: pageTitle }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: [ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/en`,
        languages: { "x-default": siteConfig.url, tr: siteConfig.url, en: `${siteConfig.url}/en` },
    },
};

export default async function EnglishHomePage() {
    const data = await getHomeData("en");
    return <HomeExperience locale="en" fontClassName={homeFontClassName} {...data} />;
}
