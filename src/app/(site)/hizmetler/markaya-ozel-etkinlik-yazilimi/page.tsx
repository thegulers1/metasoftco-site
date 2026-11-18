import type { Metadata } from "next";
import Link from "next/link";
import { MsCrumbs, MsFaq, MsSectionHead, MsWords } from "@/components/site-ms/parts";
import { siteConfig, generateBreadcrumbSchema, ogImageUrl } from "@/lib/site";
import { AlternateUrl } from "../data-capture-crm/AlternateUrl";

const path = "/hizmetler/markaya-ozel-etkinlik-yazilimi";
const title = "Markaya Özel Etkinlik Yazılımı Geliştirme";
const description = "Lansman, fuar ve marka aktivasyonları için özel oyun, kiosk arayüzü, AI fotoğraf deneyimi ve etkinlik mikro sitesi. Tasarım, geliştirme ve saha kurulumu tek ekipten.";
const url = `${siteConfig.url}${path}`;
export const metadata: Metadata = {
    title: `${title} | MetasoftCo`, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, locale: "tr_TR", type: "website", images: [{ url: ogImageUrl(title, description), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImageUrl(title, description)] },
};
const types = [
    { title: "Markaya özel interaktif oyun", body: "Kampanya temasına göre quiz, skor tablosu, hediye çarkı ve dokunmatik oyun akışları.", href: "/hizmetler/interaktif-etkinlik-aktiviteleri" },
    { title: "AI fotoğraf ve kiosk yazılımı", body: "Etkinlik konseptine özel fotoğraf sahneleri, ekran akışları, markalı çıktılar ve QR ile paylaşım.", href: "/hizmetler/yapay-zeka-etkinlik-cozumleri" },
    { title: "Etkinlik mikro sitesi ve uygulaması", body: "Etkinlik bilgisi, kampanya içeriği, kayıt ve fotoğraf galerisi için markaya özel web deneyimleri.", href: "/hizmetler/etkinlik-mikro-site-ve-uygulama" },
    { title: "Katılımcı formu ve yönetim paneli", body: "Proje kapsamına göre isteğe bağlı kayıt formları, katılımcı verilerinin görüntülenmesi ve Excel/CSV aktarımı.", href: "/hizmetler/data-capture-crm" },
];
const steps = [
    { title: "İhtiyaç ve kapsam", body: "Etkinlik tarihi, hedef kitle, mekân, beklenen katılım ve kampanya hedefini birlikte netleştiriyoruz." },
    { title: "Deneyim ve tasarım", body: "Ekran akışını, marka görsellerini ve katılımcının alacağı çıktıyı hazırlayıp onayınıza sunuyoruz." },
    { title: "Geliştirme ve test", body: "Yazılımı kullanılacak cihaz ve etkinlik senaryosunda test ediyor, içerik ve kullanım akışını kontrol ediyoruz." },
    { title: "Kurulum ve saha kullanımı", body: "Donanım gereken projelerde kurulum, teknik ekip ve etkinlik operasyonunu yazılımla birlikte planlıyoruz." },
];
const projects = [
    { title: "Rollic Summer Party", body: "Etkinlik temasına uyarlanan fotoğraf aktivasyonu ve katılımcı deneyimi.", href: "/projeler/rollic-summer-party-x-seri-t-foto" },
    { title: "Ray-Ban × Strip Photo", body: "Markalı fotoğraf aktivasyonunun çekimden çıktıya kadar sahada uygulanması.", href: "/projeler/ray-ban-x-strip-photo" },
    { title: "Enerjisa Quiz Uygulaması", body: "Yazılım geliştirme kabiliyetimizin bir örneği olan markaya özel bilgi yarışması uygulaması.", href: "/projeler/enerjisa-quiz-uygulamasi" },
];
const faq = [
    { q: "Markaya özel etkinlik yazılımı nedir?", a: "Bir lansman, fuar veya marka aktivasyonunun katılımcı akışına göre geliştirilen oyun, kiosk uygulaması, mikro site ya da fotoğraf deneyimi yazılımıdır. MetasoftCo tasarım ve yazılımı kendi ekibiyle geliştirir; gerektiğinde donanım ve saha kurulumuyla birlikte sunar." },
    { q: "Yalnızca logo ve renkler mi değiştiriliyor?", a: "Kapsama göre ekranlar, oyun akışı, fotoğraf konseptleri ve çıktı tasarımları markaya özel hazırlanabilir. Hazır bir deneyimin uyarlanması ile sıfırdan geliştirme ihtiyacı teklif öncesinde netleştirilir." },
    { q: "Geliştirme ve teslim süresi ne kadar?", a: "Teslim takvimi ekran sayısı, oyun kurgusu, içerik hazırlığı ve entegrasyon ihtiyacına göre belirlenir. Etkinlik tarihini başta paylaşmanızla tasarım onayı, geliştirme, test ve saha kurulumu için takvim oluşturulur." },
    { q: "Yazılım ve cihazı birlikte sağlayabiliyor musunuz?", a: "Evet. Projenin ihtiyacına göre kiosk, kamera, dokunmatik ekran ve baskı donanımını yazılımla birlikte planlıyor; kurulum ve saha desteğini aynı kapsamda sunuyoruz." },
    { q: "Teklif için hangi bilgiler gerekiyor?", a: "Etkinlik tarihi, şehir, mekân, kullanım süresi, beklenen katılımcı sayısı, marka konsepti ve istediğiniz deneyimi paylaşın. Tasarım, yazılım, donanım ve saha desteğinin kapsamını belirleyerek projeye özel teklif hazırlayalım." },
];

export default function CustomEventSoftwarePage() {
    const schemas = [
        generateBreadcrumbSchema([{ name: "Ana Sayfa", url: siteConfig.url }, { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` }, { name: title, url }]),
        { "@context": "https://schema.org", "@type": "Service", name: title, description, url, serviceType: "Etkinlik ve marka aktivasyonu yazılımı geliştirme", provider: { "@id": `${siteConfig.url}/#organization` } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    ];
    return <article className="ms-page">
        {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
        <AlternateUrl trUrl={path} />
        <section className="ms-hero">
            <MsCrumbs items={[{ href: "/", label: "ANA SAYFA" }, { href: "/hizmetler", label: "HİZMETLER" }, { label: "MARKAYA ÖZEL ETKİNLİK YAZILIMI" }]} />
            <h1 className="ms-h1 ms-h1--long" aria-label={title}><MsWords text={"Markaya özel\netkinlik yazılımı."} accent="last" /></h1>
            <div className="ms-hero__foot">
                <p className="ms-lede" style={{ maxWidth: 760 }}>MetasoftCo, lansman, fuar ve marka aktivasyonları için interaktif oyunlar, kiosk uygulamaları, AI fotoğraf deneyimleri ve mikro siteler geliştiren İstanbul merkezli bir etkinlik teknolojisi şirketidir. Tasarım ve yazılımı, gerektiğinde donanım ve saha kurulumuyla birlikte sunuyoruz.</p>
                <Link href="/iletisim" className="ms-pill ms-pill--acc">PROJENİZİ KONUŞALIM ↗</Link>
            </div>
        </section>
        <section className="ms-section" aria-labelledby="custom-types"><MsSectionHead id="custom-types" title="Hangi yazılımları geliştiriyoruz?" meta="KAPSAM" /><div className="ms-cards">{types.map(item => <div key={item.title} className="ms-card"><h3 className="ms-card__title">{item.title}</h3><p className="ms-card__body">{item.body}</p><Link href={item.href} className="ms-hero__jump">Hizmeti inceleyin ↗</Link></div>)}</div></section>
        <section className="ms-section" aria-labelledby="custom-process"><MsSectionHead id="custom-process" title="Fikirden etkinlik alanına" meta="SÜREÇ" /><div className="ms-cards">{steps.map((item, i) => <div key={item.title} className="ms-card"><span className="ms-card__num">0{i + 1}</span><h3 className="ms-card__title">{item.title}</h3><p className="ms-card__body">{item.body}</p></div>)}</div></section>
        <section className="ms-section" aria-labelledby="custom-projects"><MsSectionHead id="custom-projects" title="Sahadaki uygulamalarımız" meta="PROJELER" /><div className="ms-cards">{projects.map(item => <div key={item.title} className="ms-card"><h3 className="ms-card__title">{item.title}</h3><p className="ms-card__body">{item.body}</p><Link href={item.href} className="ms-hero__jump">Projeyi inceleyin ↗</Link></div>)}</div></section>
        <section className="ms-section" aria-labelledby="custom-faq"><MsSectionHead id="custom-faq" title="Proje öncesinde merak edilenler" meta="SORULAR" /><MsFaq items={faq} /><div className="ms-actions"><Link href="/iletisim" className="ms-pill ms-pill--acc">ETKİNLİĞİNİZ İÇİN TEKLİF ALIN ↗</Link><Link href="/hizmetler/yazilim-gelistirme" className="ms-pill ms-pill--line">TÜM YAZILIM HİZMETLERİ</Link></div></section>
    </article>;
}
