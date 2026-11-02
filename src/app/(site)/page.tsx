import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import HomeExperience from "@/components/home/HomeExperience";
import { homeFontClassName } from "@/components/home/fonts";
import { getHomeData } from "@/lib/home-data";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords.join(", "),
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og`, width: 1200, height: 630, alt: siteConfig.title }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og`],
        creator: siteConfig.social.twitter,
    },
    alternates: {
        canonical: siteConfig.url,
        languages: { "x-default": siteConfig.url, tr: siteConfig.url, en: `${siteConfig.url}/en` },
    },
};

export default async function HomePage() {
    const data = await getHomeData("tr");
    return <HomeExperience locale="tr" fontClassName={homeFontClassName} {...data} />;
}
