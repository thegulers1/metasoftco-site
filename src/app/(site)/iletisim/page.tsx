import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ContactPrototype from "@/components/phase2/ContactPrototype";

export const metadata: Metadata = {
    title: "İletişim",
    description: "MetasoftCo ile iletişime geçin. Etkinlikleriniz için yapay zeka ve interaktif aktivite çözümleri sunuyoruz.",
    alternates: {
        canonical: `${siteConfig.url}/iletisim`,
        languages: { "x-default": `${siteConfig.url}/iletisim`, tr: `${siteConfig.url}/iletisim`, en: `${siteConfig.url}/en/contact` },
    },
};

export default function IletisimPage() {
    return <ContactPrototype locale="tr" />;
}
