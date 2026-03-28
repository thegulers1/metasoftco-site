import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import AiAsistanClient from "./AiAsistanClient";

export const metadata: Metadata = {
    title: "AI Asistan",
    description: "MetasoftCo yapay zeka asistanı ile etkinlik hizmetleri hakkında anında bilgi alın.",
    alternates: {
        canonical: `${siteConfig.url}/ai-asistan`,
    },
};

export default function AiAsistanPage() {
    return <AiAsistanClient />;
}
