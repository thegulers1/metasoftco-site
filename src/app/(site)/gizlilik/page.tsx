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
        <section className="py-20">
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight mb-6">Gizlilik Politikası</h1>
                <div className="prose prose-neutral max-w-3xl">
                    <p className="text-black/70">
                        MetasoftCo olarak kişisel verilerinizin güvenliği konusunda azami önemi gösteriyoruz. Bu
                        politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde hazırlanmıştır.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">Toplanan Veriler</h2>
                    <p className="text-black/70">
                        İletişim formları ve etkinlik hizmetlerimiz aracılığıyla ad, e-posta ve telefon bilgileri
                        toplanabilir. Bu veriler yalnızca hizmet sunumu amacıyla kullanılır.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">Verilerin Kullanımı</h2>
                    <p className="text-black/70">
                        Toplanan veriler üçüncü taraflarla paylaşılmaz. Yalnızca hizmet iyileştirme ve iletişim
                        amacıyla kullanılır.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">Çerezler</h2>
                    <p className="text-black/70">
                        Sitemiz analitik amaçlı çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri
                        devre dışı bırakabilirsiniz.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">İletişim</h2>
                    <p className="text-black/70">
                        KVKK kapsamındaki haklarınız için:{" "}
                        <a href="mailto:info@metasoftco.com" className="text-red-700 hover:underline">
                            {siteConfig.contact.email}
                        </a>
                    </p>
                </div>
            </Container>
        </section>
    );
}
