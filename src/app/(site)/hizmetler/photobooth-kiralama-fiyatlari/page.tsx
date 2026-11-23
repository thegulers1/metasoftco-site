import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, generateFaqSchema, generateServiceSchema, siteConfig } from "@/lib/site";
import { MsCrumbs, MsFaq, MsSectionHead } from "@/components/site-ms/parts";
import { AlternateUrl } from "../data-capture-crm/AlternateUrl";

const path = "/hizmetler/photobooth-kiralama-fiyatlari";
const url = siteConfig.url + path;
const title = "Photobooth Kiralama Fiyatları | Etkinliğinize Özel Teklif";
const description = "Photobooth kiralama fiyatını belirleyen ekipman, etkinlik süresi, baskı, tasarım ve lojistik kapsamını inceleyin. Etkinliğinize özel teklif isteyin.";
export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", locale: "tr_TR", siteName: siteConfig.name } };
const faq = [
    { q: "Photobooth kiralama fiyatı nasıl belirlenir?", a: "Seçilen sistem, şehir, etkinlik süresi, baskı ihtiyacı, tasarım ve saha ekibi kapsamı birlikte değerlendirilir. Aynı ekipman farklı programlarda farklı kapsam gerektirebilir; teklif etkinliğinize özel hazırlanır." },
    { q: "Teklif istemek için hangi bilgileri paylaşmalıyım?", a: "Etkinlik tarihi, şehir, mekân, çalışma süresi, tahmini katılım ve istediğiniz çıktıyı paylaşabilirsiniz. Dijital teslim, baskı veya video tercihiniz ekipman ve ekip planını etkiler." },
    { q: "Baskı, kurulum ve personel teklife dahil mi?", a: "Nakliye, kurulum, söküm, tasarım, saha ekibi ve varsa baskı kapsamı teklif içinde netleştirilir. Teklifleri karşılaştırırken her kalemin dahil olup olmadığını ve çalışma süresini kontrol edin." },
    { q: "Satın almak mı kiralamak mı daha uygun?", a: "Etkinlik, davet ve fuarlarda kiralama değerlendirilebilir. Mağaza veya showroom gibi sürekli kullanım noktalarında kalıcı kurulum ve sistem satışı ayrıca değerlendirilir." },
];
const factors = [
    ["Deneyim ve ekipman", "Klasik photobooth, AI Photo, aynalı kabin veya video deneyimi farklı donanım ve yazılım gerektirir. Önce katılımcının alacağı çıktıyı belirleyelim."],
    ["Etkinlik süresi ve katılım", "Çalışma saatleri, ziyaretçi akışı ve eş zamanlı çekim ihtiyacı istasyon ve saha ekibi planını belirler."],
    ["Baskı ve dijital teslim", "Basılı fotoğraf, şerit baskı ve dijital teslim seçeneklerini birlikte netleştirelim. Baskı kapsamı ve sarf ihtiyacı teklifte belirtilir."],
    ["Tasarım ve özelleştirme", "Markalı çerçeve, karşılama ekranı, ekipman giydirmesi veya özel AI sahnesi gibi ihtiyaçları kapsam içinde tanımlayalım."],
    ["Şehir ve lojistik", "Ulaşım, yükleme saatleri, açık veya kapalı alan, internet ve elektrik koşulları kurulum planını etkiler."],
];
export default function PhotoboothPricingPage() {
    const schemas = [generateBreadcrumbSchema([{ name: "Ana Sayfa", url: siteConfig.url }, { name: "Hizmetler", url: siteConfig.url + "/hizmetler" }, { name: "Photobooth Kiralama Fiyatları", url }]), generateServiceSchema({ name: "Photobooth kiralama", description, url, category: "Photobooth kiralama" }), generateFaqSchema(faq)];
    return <article className="ms-page">
        <AlternateUrl trUrl={path} />
        {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
        <section className="ms-hero">
            <MsCrumbs items={[{ href: "/hizmetler", label: "HİZMETLER" }, { label: "PHOTOBOOTH KİRALAMA FİYATLARI" }]} />
            <h1 className="ms-h1 ms-h1--long">Photobooth kiralama fiyatları</h1>
            <p className="ms-lede">Doğru teklif, etkinliğinizin kapsamıyla başlar. Şehir, tarih, çalışma süresi ve katılımcının alacağı hatıraya göre photobooth deneyiminizi birlikte planlayalım.</p>
            <div className="ms-actions"><Link href="/iletisim?urun=Photobooth" className="ms-pill ms-pill--acc">ETKİNLİĞİME ÖZEL TEKLİF AL ↗</Link><Link href="/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala" className="ms-pill ms-pill--line">PHOTOBOOTH DENEYİMİNİ İNCELE ↗</Link></div>
        </section>
        <section className="ms-section"><MsSectionHead title="Teklifin kapsamını neler belirler?" meta="KİRALAMA" /><div className="ms-cards">{factors.map(([heading, body]) => <section className="ms-card" key={heading}><h3 className="ms-card__title">{heading}</h3><p className="ms-card__body">{body}</p></section>)}</div></section>
        <section className="ms-section"><MsSectionHead title="Teklifleri aynı kapsamla karşılaştırın" meta="PLANLAMA" /><p className="ms-lede">Ekipman türü, çalışma süresi, baskı, markaya özel tasarım, nakliye, kurulum ve personel kalemlerini birlikte kontrol edin. Eksik bilgileri etkinlik öncesinde netleştirmek, sahada beklenmeyen ihtiyaçları azaltır.</p><div className="ms-actions"><Link href="/sunum" className="ms-pill ms-pill--line">DENEYİMLERİ SEÇ · PDF SUNUM HAZIRLA ↗</Link><Link href="/hizmetler/magaza-ici-kalici-photobooth" className="ms-pill ms-pill--line">SÜREKLİ KULLANIM İÇİN KALICI KURULUM ↗</Link></div></section>
        <section className="ms-section"><MsSectionHead title="Sık sorulan sorular" meta="TEKLİF" /><MsFaq items={faq} /><Link href="/iletisim?urun=Photobooth" className="ms-pill ms-pill--acc">İHTİYACIMI PAYLAŞMAK İSTİYORUM ↗</Link></section>
    </article>;
}
