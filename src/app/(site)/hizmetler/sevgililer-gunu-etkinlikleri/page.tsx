import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, generateFaqSchema, siteConfig } from "@/lib/site";
import { description, experiences, faqs, path, settings, title } from "./content";
import { AlternateUrl } from "../data-capture-crm/AlternateUrl";
import styles from "./valentine.module.css";

const url = siteConfig.url + path;
const socialImage = siteConfig.url + "/images/sevgililer-gunu/paylasim.jpg";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title, description, url, siteName: siteConfig.name, locale: "tr_TR", type: "website", images: [{ url: socialImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
};
const quote = (products = "") => `/iletisim?durum=sevgililer-gunu-etkinlikleri${products ? `&urun=${encodeURIComponent(products)}` : ""}`;
const schemas = [
  generateBreadcrumbSchema([{ name: "Ana Sayfa", url: siteConfig.url }, { name: "Hizmetler", url: siteConfig.url + "/hizmetler" }, { name: "Sevgililer Günü Etkinlikleri", url }]),
  { "@context": "https://schema.org", "@type": "Service", "@id": url + "#service", name: "AVM ve Markalar için Sevgililer Günü Etkinlikleri", description, url, image: socialImage, serviceType: "Sevgililer Günü fotoğraf, video ve interaktif etkinlik aktivasyonları", provider: { "@id": siteConfig.url + "/#organization" }, areaServed: { "@type": "Country", name: "Türkiye" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "14 Şubat deneyimleri", itemListElement: experiences.map(item => ({ "@type": "OfferCatalog", name: item.product, url: url + "#" + item.id })) } },
  generateFaqSchema(faqs),
];

function Photo({ name, alt, hero = false }: { name: string; alt: string; hero?: boolean }) {
  // Static variants are pre-sized: the site's custom image loader does not resize local files.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/images/sevgililer-gunu/${name}-800.webp`} srcSet={[480, 800, 1200].map(w => `/images/sevgililer-gunu/${name}-${w}.webp ${w}w`).join(", ")} sizes="(max-width: 760px) 100vw, 50vw" alt={alt} width={1200} height={name === "avm-photo" ? 1500 : 900} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} decoding="async" />;
}

export default function ValentinesPage() {
  return <article className={styles.page}>
    <AlternateUrl trUrl={path} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
    <section className={styles.hero} aria-labelledby="valentine-title">
      <div className={styles.heroCopy}>
        <nav className={styles.crumb} aria-label="İçerik yolu"><Link href="/hizmetler">Hizmetler</Link><span>/</span><span aria-current="page">Sevgililer Günü</span></nav>
        <p className={styles.kicker}>14 ŞUBAT 2027 · AVM & MARKA DENEYİMLERİ</p>
        <p className={styles.script}>Birlikte olunca,</p>
        <h1 id="valentine-title">her an<br /><em>hatıra.</em><span>Sevgililer Günü Etkinlikleri</span></h1>
        <p className={styles.lede}>AVM’nizde, mağazanızda ya da marka etkinliğinizde; birlikte poz verilen, oynanan ve eve bir hatırayla dönülen bir 14 Şubat tasarlayalım.</p>
        <div className={styles.actions}><Link className={styles.button} href={quote()}>14 Şubat’ı planlayalım <span aria-hidden="true">↗</span></Link><a href="#deneyimler" className={styles.textLink}>Deneyimleri keşfet ↓</a></div>
        <p className={styles.micro}>Çiftler, arkadaşlar, sevdikleriyle gelen herkes için.</p>
        <div className={styles.dateStamp} aria-hidden="true"><span>14</span><small>ŞUBAT</small><i>with love.</i></div>
      </div>
      <figure className={styles.heroPhoto}><Photo name="avm-photo" hero alt="AVM içinde vişne rengi photobooth ve kalp dekoru önünde birlikte poz veren çift — örnek Sevgililer Günü konsepti" /><figcaption>Birlikte, aynı karede. <span>Örnek konsept görseli</span></figcaption><span className={styles.photoSeal} aria-hidden="true">LOVE<br />THIS<br /><i>MOMENT.</i></span></figure>
    </section>
    <div className={styles.band}><span>FOTOĞRAF</span><b aria-hidden="true">♡</b><span>BİRLİKTE OYUN</span><b aria-hidden="true">♡</b><span>KÜÇÜK SÜRPRİZLER</span><b aria-hidden="true">♡</b><span>MARKANIZA ÖZEL</span></div>
    <section className={styles.intro} aria-labelledby="intro-title"><p className={styles.kicker}>14 ŞUBAT İÇİN GÜZEL BİR FİKİR</p><h2 id="intro-title">Sadece bir gün.<br /><em>Hatırası çok daha uzun.</em></h2><p>Sevgililer Günü etkinlikleri; AVM, mağaza ve marka davetlerinde ziyaretçilerin fotoğraf, video veya oyunla katılabildiği deneyimlerdir. MetasoftCo olarak AI Photo, photobooth, 360 video ve interaktif oyunları 14 Şubat konseptinize uyarlıyoruz. Tasarım, ekipman ve saha akışını mekânınıza göre birlikte planlıyoruz.</p></section>
    <section className={styles.experiences} id="deneyimler" aria-labelledby="experiences-title">
      <div className={styles.sectionHead}><div><p className={styles.kicker}>BİR POZ, BİR OYUN, BİR SÜRPRİZ</p><h2 id="experiences-title">Sevilecek <em>deneyimler.</em></h2></div><p>Birini seçin ya da birlikte kurgulayalım.<br />Her deneyim markanızın dünyasına uyarlanabilir.</p></div>
      <div className={styles.cards}>{experiences.map((item, i) => <section className={styles.card} key={item.id} id={item.id} aria-labelledby={item.id + "-title"}><div className={styles.cardTop}><span>0{i + 1}</span><span aria-hidden="true">{["♡", "✳", "↻", "♡", "✳", "✧"][i]}</span></div><p className={styles.kicker}>{item.label}</p><h3 id={item.id + "-title"}>{item.name}</h3><p>{item.copy}</p><small>{item.output}</small><div className={styles.cardLinks}><Link href={quote(item.product)}>Bu deneyim için teklif ↗</Link><Link href={item.href}>Ürün detayları</Link></div></section>)}</div>
    </section>
    <section className={styles.keepsake} aria-labelledby="keepsake-title"><figure><Photo name="fotograf-hatirasi" alt="Pembe zeminde çift ve arkadaş fotoğrafları, Sevgililer Günü fotoğraf şeritleri ve kırmızı kurdele — örnek konsept" /><figcaption>Örnek fotoğraf ve baskı konsepti</figcaption></figure><div><p className={styles.kicker}>YANINDA GÖTÜRDÜĞÜ BİR AN</p><h2 id="keepsake-title">Güzel bir günün<br /><em>küçük bir kanıtı.</em></h2><p>Markanızın rengi, bir tarih, birlikte atılan bir kahkaha. Fotoğraf çerçevesi ve baskı tasarımı, katılımcının elinde kalan hatırayı etkinliğinizin bir parçası yapar.</p><ul><li>Konsepte özel çerçeve ve görsel dil</li><li>Çift, arkadaş veya bireysel çekim akışı</li><li>Seçilen deneyime göre dijital teslim veya baskı</li></ul><Link className={styles.textLink} href={quote("Photobooth")}>Fotoğraf deneyimini konuşalım ↗</Link></div></section>
    <section className={styles.settings} aria-labelledby="settings-title"><p className={styles.kicker}>AYNI GÜN, FARKLI BULUŞMALAR</p><h2 id="settings-title">Sizin mekânınız.<br /><em>Sizin 14 Şubat’ınız.</em></h2><div className={styles.settingGrid}>{settings.map(item => <section key={item.label}><p className={styles.kicker}>{item.label}</p><h3>{item.title}</h3><p>{item.copy}</p><Link className={styles.textLink} href={quote(item.products)}>Bu kurguyu planlayalım ↗</Link></section>)}</div></section>
    <section className={styles.plan} aria-labelledby="plan-title"><div><p className={styles.kicker}>İLK FİKİRDEN SON KAREYE</p><h2 id="plan-title">Kalbini koy.<br /><em>Detayları birlikte çözelim.</em></h2><p>14 Şubat 2027 için hazırlığa şimdiden başlayabiliriz. Tek günlük kurulum ve Sevgililer Günü haftasına yayılan programlar için ayrı plan çıkaralım.</p></div><ol>{[["Mekânı ve hedefi tanıyalım", "Şehir, alan, tarih, çalışma saatleri ve beklenen katılımı paylaşın. AVM geçişi, çekim mesafesi ve kuyruk akışını değerlendirelim."],["Konsepti markanıza uyarlayalım", "Fotoğraf, oyun ve hediye akışını seçelim. Görsel örnekleri, ekipman ve varsa özel yazılım kapsamını onaya sunalım."],["Sahayı birlikte planlayalım", "Elektrik, internet, kurulum ve söküm saatleri, personel ve baskı ihtiyacını teklifte netleştirelim."]].map(([heading, copy], i) => <li key={heading}><span>0{i + 1}</span><div><h3>{heading}</h3><p>{copy}</p></div></li>)}</ol></section>
    <section className={styles.faq} aria-labelledby="faq-title"><div><p className={styles.kicker}>AKLINIZDAKİLER</p><h2 id="faq-title">Birlikte<br /><em>netleştirelim.</em></h2></div><div>{faqs.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>
    <section className={styles.closing} aria-labelledby="closing-title"><p className={styles.kicker}>14 ŞUBAT · SEVGİLİLER GÜNÜ</p><span className={styles.heart} aria-hidden="true">♡</span><h2 id="closing-title">Markanızla başlayan,<br /><em>birlikte hatırlanan.</em></h2><p>Şehrinizi, mekânınızı ve düşündüğünüz etkinliği paylaşın.<br />Sevgililer Günü deneyiminizi birlikte hazırlayalım.</p><Link className={styles.button} href={quote()}>Etkinliğim için teklif al ↗</Link><p className={styles.related}>Diğer özel günler: <Link href="/hizmetler/yilbasi-partisi-aktiviteleri">Yılbaşı</Link> · <Link href="/hizmetler/ramazan-etkinlikleri">Ramazan</Link></p></section>
  </article>;
}
