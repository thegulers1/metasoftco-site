import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import AiAsistanClient from "./AiAsistanClient";

export const metadata: Metadata = {
    title: "AI Asistan | MetasoftCo",
    description: "MetasoftCo yapay zeka asistanı ile etkinlik hizmetleri, fiyatlar ve çözümler hakkında anında bilgi alın. 7/24 AI destekli canlı destek.",
    openGraph: {
        title: "AI Asistan | MetasoftCo",
        description: "Yapay zeka asistanımız ile etkinlik hizmetleri hakkında anında yanıt alın.",
        url: `${siteConfig.url}/ai-asistan`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/ai-asistan`,
    },
};

export default function AiAsistanPage() {
    return <AiAsistanClient />;
}
