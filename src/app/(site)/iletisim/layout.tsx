import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "İletişim | MetasoftCo",
    description: "MetasoftCo ile iletişime geçin. Interaktif etkinlik teknolojileri, photobooth, AI çözümleri ve özel yazılım geliştirme için teklif alın.",
    keywords: ["metasoftco iletişim", "etkinlik teknolojisi teklif", "yazılım geliştirme teklif", "photobooth kiralama iletişim"],
    openGraph: {
        title: "İletişim | MetasoftCo",
        description: "Projeniz için bizimle iletişime geçin. İstanbul merkezli interaktif deneyim ajansı.",
        url: `${siteConfig.url}/iletisim`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=İletişime+Geç&desc=Projeniz+için+teklif+alın`, width: 1200, height: 630 }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: { card: "summary_large_image", title: "İletişim | MetasoftCo" },
    alternates: { canonical: `${siteConfig.url}/iletisim` },
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
