import { Metadata } from "next";
import Container from "@/components/site/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | MetasoftCo",
    description: "MetasoftCo gizlilik politikası ve KVKK kapsamında kişisel veri işleme esasları. Etkinlik hizmetlerinde kişisel verilerinizin nasıl korunduğunu öğrenin.",
    openGraph: {
        title: "Gizlilik Politikası | MetasoftCo",
        description: "MetasoftCo gizlilik politikası ve KVKK kapsamında kişisel veri işleme esasları.",
        url: `${siteConfig.url}/gizlilik`,
    },
    alternates: {
        canonical: `${siteConfig.url}/gizlilik`,
    },
};

export default function GizlilikPage() {
    return (
        <div className="bg-[#0a0a0f] min-h-screen">
            <section className="py-32 sm:py-36">
                <Container>
                    <span
                        className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                    >
                        KVKK
                    </span>
                    <h1
                        className="text-white font-bold tracking-[-0.02em] mt-4 mb-10"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(32px, 5vw, 48px)" }}
                    >
                        Gizlilik Politikası
                    </h1>
                    <div
                        className="max-w-[700px] text-[rgba(255,255,255,.64)] space-y-7"
                        style={{ fontFamily: "var(--font-manrope)", fontSize: 16, lineHeight: 1.7 }}
                    >
                        <p>
                            MetasoftCo olarak kişisel verilerinizin güvenliği konusunda azami önemi gösteriyoruz. Bu
                            politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde hazırlanmıştır.
                        </p>
                        <div>
                            <h2
                                className="text-white mb-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600 }}
                            >
                                Toplanan Veriler
                            </h2>
                            <p>
                                İletişim formları ve etkinlik hizmetlerimiz aracılığıyla ad, e-posta ve telefon bilgileri
                                toplanabilir. Bu veriler yalnızca hizmet sunumu amacıyla kullanılır.
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-white mb-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600 }}
                            >
                                Verilerin Kullanımı
                            </h2>
                            <p>
                                Toplanan veriler üçüncü taraflarla paylaşılmaz. Yalnızca hizmet iyileştirme ve iletişim
                                amacıyla kullanılır.
                            </p>
                        </div>
                        <div>
                            <h2
                                className="text-white mb-3"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 20, fontWeight: 600 }}
                            >
                                Çerezler
                            </h2>
                            <p>
                                Sitemiz analitik amaçlı çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre
                                dışı bırakabilirsiniz.
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
                                KVKK kapsamındaki haklarınız için:{" "}
                                <a href="mailto:info@metasoftco.com" className="text-[var(--acc)] hover:underline">
                                    {siteConfig.contact.email}
                                </a>
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
