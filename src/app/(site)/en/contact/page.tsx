import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ContactPage from "@/app/(site)/iletisim/page";

export const metadata: Metadata = {
    title: "Contact | MetasoftCo",
    description: "Get in touch with MetasoftCo. Request a quote for interactive event technologies, photobooth, AI solutions, and custom software development.",
    keywords: ["metasoftco contact", "event technology quote", "software development quote", "photobooth rental contact"],
    openGraph: {
        title: "Contact | MetasoftCo",
        description: "Contact us for your project. Istanbul-based interactive experience agency.",
        url: `${siteConfig.url}/en/contact`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Contact+Us&desc=Get+a+quote+for+your+project`, width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: "Contact | MetasoftCo" },
    alternates: {
        canonical: `${siteConfig.url}/en/contact`,
        languages: {
            "x-default": `${siteConfig.url}/iletisim`,
            "tr": `${siteConfig.url}/iletisim`,
            "en": `${siteConfig.url}/en/contact`,
        },
    },
};

export default ContactPage;
