import { Metadata } from "next";
import Container from "@/components/site/Container";
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
        <div className="bg-[#0a0a0f] min-h-screen">
            <section className="py-32 sm:py-36">
                <Container>
                    <h1
                        className="text-white font-bold tracking-[-0.02em]"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 5vw, 48px)" }}
                    >
                        İşler
                    </h1>
                    <p
                        className="mt-4 max-w-2xl text-[rgba(255,255,255,.55)]"
                        style={{ fontFamily: "var(--font-manrope)", fontSize: 16, lineHeight: 1.6 }}
                    >
                        Yakında filtrelenebilir portfolio burada olacak.
                    </p>
                </Container>
            </section>
        </div>
    );
}
