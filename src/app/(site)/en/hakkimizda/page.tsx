import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import AboutClient from "@/app/(site)/hakkimizda/AboutClient";

export const metadata: Metadata = {
    title: "About Us | MetasoftCo",
    description: "Learn about MetasoftCo. We are a passionate team dedicated to turning innovative ideas into amazing experiences.",
    openGraph: {
        title: "About Us | MetasoftCo",
        description: "We are a passionate team dedicated to turning innovative ideas into amazing experiences.",
        url: `${siteConfig.url}/en/hakkimizda`,
        locale: "en_US",
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
    return <AboutClient />;
}
