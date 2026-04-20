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
        <section className="py-20">
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight mb-6">Kullanım Koşulları</h1>
                <div className="prose prose-neutral max-w-3xl">
                    <p className="text-black/70">
                        Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Herhangi bir sorunuz
                        için{" "}
                        <a href="mailto:info@metasoftco.com" className="text-red-700 hover:underline">
                            info@metasoftco.com
                        </a>{" "}
                        adresinden bizimle iletişime geçebilirsiniz.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">Hizmet Kullanımı</h2>
                    <p className="text-black/70">
                        MetasoftCo tarafından sunulan tüm hizmetler, yürürlükteki Türk hukukuna tabidir. Hizmetlerin
                        kötüye kullanımı durumunda erişim kısıtlanabilir.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">Fikri Mülkiyet</h2>
                    <p className="text-black/70">
                        Bu sitedeki tüm içerik, görseller ve yazılımlar MetasoftCo'ya aittir. İzinsiz kopyalanamaz veya
                        dağıtılamaz.
                    </p>
                    <h2 className="text-xl font-medium mt-8 mb-3">İletişim</h2>
                    <p className="text-black/70">
                        Sorularınız için: {siteConfig.contact.email} — {siteConfig.contact.phone}
                    </p>
                </div>
            </Container>
        </section>
    );
}
