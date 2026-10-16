import { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";

const ogTitle = "Kullanım Koşulları | MetasoftCo";
const ogDescription = "MetasoftCo web sitesi kullanım koşulları ve hizmet şartları.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Kullanım Koşulları | MetasoftCo",
    description: "MetasoftCo web sitesi kullanım koşulları ve hizmet şartları. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/kullanim-kosullari`,
        siteName: siteConfig.name,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
        locale: siteConfig.locale,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/kullanim-kosullari`,
    },
};

export default function KullanimKosullariPage() {
    return (
        <div className="ms-page">
            <section className="ms-hero" style={{ minHeight: 0, justifyContent: "flex-start" }}>
                <div className="ms-legal">
                    <span className="ms-mono ms-acc">
                        YASAL
                    </span>
                    <h1 className="ms-h1 ms-h1--long" style={{ margin: "14px 0 3vw" }}>
                        Kullanım Koşulları
                    </h1>
                    <div className="ms-prose" data-reveal>
                        <p>
                            Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Herhangi bir
                            sorunuz için{" "}
                            <a href="mailto:info@metasoftco.com" className="text-[var(--acc)] hover:underline">
                                info@metasoftco.com
                            </a>{" "}
                            adresinden bizimle iletişime geçebilirsiniz.
                        </p>
                        <div>
                            <h2>
                                Hizmet Kullanımı
                            </h2>
                            <p>
                                MetasoftCo tarafından sunulan tüm hizmetler, yürürlükteki Türk hukukuna tabidir.
                                Hizmetlerin kötüye kullanımı durumunda erişim kısıtlanabilir.
                            </p>
                        </div>
                        <div>
                            <h2>
                                Fikri Mülkiyet
                            </h2>
                            <p>
                                Bu sitedeki tüm içerik, görseller ve yazılımlar MetasoftCo&apos;ya aittir. İzinsiz
                                kopyalanamaz veya dağıtılamaz.
                            </p>
                        </div>
                        <div>
                            <h2>
                                İletişim
                            </h2>
                            <p>
                                Sorularınız için: {siteConfig.contact.email} — {siteConfig.contact.phone}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
