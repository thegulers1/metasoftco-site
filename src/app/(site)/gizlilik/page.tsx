import { Metadata } from "next";
import { siteConfig, ogImageUrl } from "@/lib/site";

const ogTitle = "Gizlilik Politikası | MetasoftCo";
const ogDescription = "MetasoftCo gizlilik politikası ve KVKK kapsamında kişisel veri işleme esasları.";
const ogImage = ogImageUrl(ogTitle, ogDescription);

export const metadata: Metadata = {
    title: "Gizlilik Politikası | MetasoftCo",
    description: "MetasoftCo gizlilik politikası ve KVKK kapsamında kişisel veri işleme esasları. Etkinlik hizmetlerinde kişisel verilerinizin nasıl korunduğunu öğrenin.",
    openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${siteConfig.url}/gizlilik`,
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
        canonical: `${siteConfig.url}/gizlilik`,
    },
};

export default function GizlilikPage() {
    return (
        <div className="ms-page">
            <section className="ms-hero" style={{ minHeight: 0, justifyContent: "flex-start" }}>
                <div className="ms-legal">
                    <span className="ms-mono ms-acc">
                        KVKK
                    </span>
                    <h1 className="ms-h1 ms-h1--long" style={{ margin: "14px 0 3vw" }}>
                        Gizlilik Politikası
                    </h1>
                    <div className="ms-prose" data-reveal>
                        <p>
                            MetasoftCo olarak kişisel verilerinizin güvenliği konusunda azami önemi gösteriyoruz. Bu
                            politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde hazırlanmıştır.
                        </p>
                        <div>
                            <h2>
                                Toplanan Veriler
                            </h2>
                            <p>
                                İletişim formları ve etkinlik hizmetlerimiz aracılığıyla ad, e-posta ve telefon bilgileri
                                toplanabilir. Bu veriler yalnızca hizmet sunumu amacıyla kullanılır.
                            </p>
                        </div>
                        <div>
                            <h2>
                                Verilerin Kullanımı
                            </h2>
                            <p>
                                Toplanan veriler üçüncü taraflarla paylaşılmaz. Yalnızca hizmet iyileştirme ve iletişim
                                amacıyla kullanılır.
                            </p>
                        </div>
                        <div>
                            <h2>
                                Çerezler
                            </h2>
                            <p>
                                Sitemiz analitik amaçlı çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre
                                dışı bırakabilirsiniz.
                            </p>
                        </div>
                        <div>
                            <h2>
                                İletişim
                            </h2>
                            <p>
                                KVKK kapsamındaki haklarınız için:{" "}
                                <a href="mailto:info@metasoftco.com" className="text-[var(--acc)] hover:underline">
                                    {siteConfig.contact.email}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
