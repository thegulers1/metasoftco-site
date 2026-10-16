import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "İşler | MetasoftCo",
    description: "MetasoftCo'nun gerçekleştirdiği interaktif etkinlik projeleri ve yaratıcı teknoloji çalışmaları.",
    openGraph: {
        title: "İşler | MetasoftCo",
        description: "MetasoftCo'nun gerçekleştirdiği interaktif etkinlik projeleri ve yaratıcı teknoloji çalışmaları.",
        url: `${siteConfig.url}/isler`,
    },
    robots: { index: false, follow: true },
    alternates: {
        canonical: `${siteConfig.url}/isler`,
    },
};

export default function WorksPage() {
    return (
        <div className="ms-page">
            <section className="ms-hero" style={{ minHeight: 0, justifyContent: "flex-start" }}>
                <div className="ms-legal">
                    <h1 className="ms-h1 ms-h1--long" style={{ margin: "14px 0 3vw" }}>
                        İşler
                    </h1>
                    <p className="ms-lede">
                        Yakında filtrelenebilir portfolio burada olacak.
                    </p>
                </div>
            </section>
        </div>
    );
}
