import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "Hakkımızda",
    description: "MetasoftCo hakkında bilgi edinin. Yenilikçi fikirleri harika deneyimler yaratacak şekilde hayata geçirmeye tutkulu bir ekibiz.",
    openGraph: {
        title: "Hakkımızda | MetasoftCo",
        description: "Yenilikçi fikirleri harika deneyimler yaratacak şekilde hayata geçirmeye tutkulu bir ekibiz.",
        url: `${siteConfig.url}/hakkimizda`,
    },
    alternates: {
        canonical: `${siteConfig.url}/hakkimizda`,
        languages: { "x-default": `${siteConfig.url}/hakkimizda`, tr: `${siteConfig.url}/hakkimizda`, en: `${siteConfig.url}/en/hakkimizda` },
    },
};

export default function HakkimizdaPage() {
    return <AboutClient />;
}
