import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "Hakkımızda | MetasoftCo",
    description: "MetasoftCo hakkında bilgi edinin. İstanbul merkezli, yenilikçi fikirleri harika dijital deneyimlere dönüştüren interaktif etkinlik teknolojisi ekibiyiz.",
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
