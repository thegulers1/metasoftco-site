import { Metadata } from "next";
import Container from "@/components/site/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Kullanım Koşulları | MetasoftCo",
    description: "MetasoftCo web sitesi kullanım koşulları ve hizmet şartları. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.",
    openGraph: {
        title: "Kullanım Koşulları | MetasoftCo",
        description: "MetasoftCo web sitesi kullanım koşulları ve hizmet şartları.",
        url: `${siteConfig.url}/kullanim-kosullari`,
    },
    alternates: {
        canonical: `${siteConfig.url}/kullanim-kosullari`,
    },
};

export default function KullanimKosullariPage() {
    return (
        <div className="bg-[#0a0a0f] min-h-screen">
            <section className="py-32 sm:py-36">
                <Container>
                    <span
                        className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                    >
                        YASAL
                    </span>
                    <h1
                        className="text-white font-bold tracking-[-0.02em] mt-4 mb-10"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 5vw, 48px)" }}
                    >
                        Kullanım Koşulları
                    </h1>
                    <div
                        className="max-w-[700px] text-[rgba(255,255,255,.64)] space-y-7"
                        style={{ fontFamily: "var(--font-manrope)", fontSize: 16, lineHeight: 1.7 }}
                    >
                        <p>
                            Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Herhangi bir
                            sorunuz için{" "}
                            <a href="mailto:info@metasoftco.com" className="text-[var(--acc)] hover:underline">
                                info@metasoftco.com
                            </a>{" "}
                            adresinden bizimle iletişime geçebilirsiniz.
                        </p>
                        <div>
                            <h2
                                className="text-white mb-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600 }}
                            >
                                Hizmet Kullanımı
                            </h2>
                            <p>
                                MetasoftCo tarafından sunulan tüm hizmetler, yürürlükteki Türk hukukuna tabidir.
                                Hizmetlerin kötüye kullanımı durumunda erişim kısıtlanabilir.
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-white mb-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600 }}
                            >
                                Fikri Mülkiyet
                            </h2>
                            <p>
                                Bu sitedeki tüm içerik, görseller ve yazılımlar MetasoftCo'ya aittir. İzinsiz
                                kopyalanamaz veya dağıtılamaz.
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-white mb-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600 }}
                            >
                                İletişim
                            </h2>
                            <p>
                                Sorularınız için: {siteConfig.contact.email} — {siteConfig.contact.phone}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
