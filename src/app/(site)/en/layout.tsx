import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    alternates: {
        canonical: `${siteConfig.url}/en`,
        languages: {
            "x-default": siteConfig.url,
            "tr": siteConfig.url,
            "en": `${siteConfig.url}/en`,
        },
    },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
