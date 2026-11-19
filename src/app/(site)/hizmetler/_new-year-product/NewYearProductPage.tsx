import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./new-year-product.module.css";
import { WinterScene } from "./WinterScene";
import { siteConfig, generateBreadcrumbSchema, ogImageUrl } from "@/lib/site";
import { getNewYearProduct, newYearProducts } from "@/lib/new-year-products";
import { rentalAreaServed } from "@/lib/rental-ops";
import { AlternateUrl } from "../data-capture-crm/AlternateUrl";

// Yılbaşı ürün sayfaları (/hizmetler/yilbasi-<urun>-kiralama): içerik
// src/lib/new-year-products.ts dosyasında, her ürünün ince bir page.tsx'i var.

const STORIES: Record<string, { whisper: string; shout: string; note: string; promise: string }> = {
    "yilbasi-ai-photobooth-kiralama": { whisper: "Biraz sihir.", shout: "BOLCA YILBAŞI.", note: "Bir poz.\nBambaşka bir\nyılbaşı hikâyesi.", promise: "Bir fotoğrafla karlı bir masalın, bir yılbaşı filminin ya da yeni yıl afişinin başrolüne geçin." },
    "yilbasi-mirror-booth-kiralama": { whisper: "Ayna, ayna…", shout: "BU GECE BİZİM.", note: "En güzel hâliniz.\nEn güzel\nyılbaşı hatıranız.", promise: "Gala şıklığı, aynaya bırakılan bir not ve geceden yanınıza alacağınız bir fotoğraf." },
    "yilbasi-360-video-booth-kiralama": { whisper: "Dünya dönsün.", shout: "ANIN SENİN.", note: "Bir dönüş.\nKocaman bir\nkutlama.", promise: "Platforma çıkın, birlikte kutlayın. Gecenin enerjisi etrafınızda dönen kamerayla filme dönüşsün." },
    "yilbasi-photobooth-kiralama": { whisper: "Yan yana gel.", shout: "GÜLÜMSE, YILBAŞI.", note: "Bütün ekip.\nAynı kare.\nGüzel bir yıl.", promise: "Ekibinizle aynı kareye sığan kahkahalar, yılbaşı çerçevesiyle elinizde kalan fotoğraflar." },
    "yilbasi-gif-kart-aktivasyonu": { whisper: "Bir kart çevir.", shout: "YENİ YIL BAŞLASIN.", note: "İki küçük poz.\nHareket eden\nbir hatıra.", promise: "İki poz, tek kart. Elinizde çevirdikçe değişen, masanızda yıl boyu kalan bir yılbaşı hatırası." },
    "yilbasi-dijital-carkifelek-kiralama": { whisper: "Bir tur çevir.", shout: "SÜRPRİZ BAŞLASIN.", note: "Biraz heyecan.\nBiraz şans.\nBolca sürpriz.", promise: "Hediye çarkı döner, heyecan bütün salona yayılır. Yeni yıl sürprizini birlikte açın." },
    "yilbasi-momento-ball-kiralama": { whisper: "Bir anı sakla.", shout: "BÜYÜSÜ KALSIN.", note: "Bir fotoğraf.\nKüçük bir küre.\nKocaman bir anı.", promise: "O geceki fotoğrafınız yılbaşı ağacında bir süse, masanızda kişisel bir hatıraya dönüşsün." },
};

const NEW_YEAR_HUB = "/hizmetler/yilbasi-partisi-aktiviteleri";

export function newYearProductMetadata(slug: string): Metadata {
    const item = getNewYearProduct(slug);
    if (!item) return {};
    const url = `${siteConfig.url}/hizmetler/${slug}`;
    const image = ogImageUrl(item.h1, item.trName);
    return {
        title: { absolute: item.metaTitle },
        description: item.metaDescription,
        keywords: item.keywords,
        alternates: { canonical: url },
        openGraph: { title: item.metaTitle, description: item.metaDescription, url, siteName: siteConfig.name, locale: "tr_TR", type: "website", images: [{ url: image, width: 1200, height: 630 }] },
        twitter: { card: "summary_large_image", title: item.metaTitle, description: item.metaDescription, images: [image] },
    };
}

export function NewYearProductPage({ slug }: { slug: string }) {
    const item = getNewYearProduct(slug);
    if (!item) notFound();

    const path = `/hizmetler/${slug}`;
    const url = `${siteConfig.url}${path}`;
    const productName = item.h1.replace(/^Yılbaşı /, "").replace(/ Kiralama$/, "");
    const story = STORIES[slug];
    const collectionNumber = String(newYearProducts.findIndex(product => product.slug === slug) + 1).padStart(2, "0");
    const contactHref = `/iletisim?durum=yilbasi-partisi-aktiviteleri&urun=${encodeURIComponent(productName)}`;
    const detailImage = slug === "yilbasi-ai-photobooth-kiralama"
        ? { url: "/images/yilbasi/v/kiosk-experience.webp", alt: "Yılbaşı etkinliğinde AI Photo kiosku ve örnek portre çıktıları" }
        : item.image;
    const others = newYearProducts.filter((other) => other.slug !== slug);
    const schemas = [
        generateBreadcrumbSchema([
            { name: "Ana Sayfa", url: siteConfig.url },
            { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
            { name: "Yılbaşı Partisi Aktiviteleri", url: `${siteConfig.url}${NEW_YEAR_HUB}` },
            { name: item.h1, url },
        ]),
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: item.h1,
            alternateName: `Yılbaşı ${item.trName} Kiralama`,
            description: item.metaDescription,
            url,
            image: `${siteConfig.url}${item.image.url}`,
            serviceType: `${item.trName} kiralama`,
            provider: { "@id": `${siteConfig.url}/#organization` },
            areaServed: rentalAreaServed(),
            isRelatedTo: { "@type": "Service", url: `${siteConfig.url}${item.product.href}` },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: item.faq.map((entry) => ({ "@type": "Question", name: entry.q, acceptedAnswer: { "@type": "Answer", text: entry.a } })),
        },
    ];

    return (
        <article className={styles.page}>
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
            ))}
            <AlternateUrl trUrl={path} />
            <section className={styles.winterHero} aria-labelledby="ny-title">
                <picture className={styles.stageBackdrop}>
                    <source media="(max-width: 760px)" srcSet="/images/yilbasi/winter-stage-mobile.webp" />
                    <Image src="/images/yilbasi/winter-stage.webp" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" />
                </picture>
                <WinterScene />
                <nav className={styles.breadcrumb} aria-label="İçerik yolu">
                    <Link href={NEW_YEAR_HUB}>← Yılbaşı koleksiyonu</Link><span aria-hidden="true">/</span><span aria-current="page">{productName}</span>
                </nav>
                <div className={styles.heroHeading}>
                    <p className={styles.edition}>METASOFTCO · YILBAŞI DENEYİMLERİ · 2027</p>
                    <p className={styles.whisper}>{story.whisper}</p>
                    <p className={styles.shout}>{story.shout}</p>
                </div>
                <div className={styles.sceneComposition}>
                    <div className={styles.wishNote}>
                        <span className={styles.noteStar} aria-hidden="true">✳</span>
                        <p>{story.note}</p>
                        <span className={styles.noteSign}>Birlikte, hatırlamaya değer.</span>
                    </div>
                    <a className={styles.snowglobe} href="#ny-experience" aria-label={`${productName} deneyimini keşfedin`}>
                        <div className={styles.glassSphere}>
                            <Image src={item.image.url} alt={item.image.alt} fill priority sizes="(max-width: 760px) 85vw, 450px" />
                            <div className={styles.glassShine} />
                            <span className={styles.globeSnow} aria-hidden="true" />
                        </div>
                        <div className={styles.globeBase}><span>METASOFTCO</span><small>YILBAŞI KOLEKSİYONU · {collectionNumber} / 07</small></div>
                        <span className={styles.globeShadow} aria-hidden="true" />
                    </a>
                    <div className={styles.heroOffer}>
                        <p className={styles.eyebrow}>BU GECENİN DENEYİMİ / {collectionNumber}</p>
                        <h1 id="ny-title" aria-label={item.h1}>Yılbaşı <strong>{productName}</strong><span>{" "}Kiralama</span></h1>
                        <p className={styles.heroPromise}>{story.promise}</p>
                        <Link href={contactHref} className={styles.button}>Gecemizi planlayalım <span aria-hidden="true">↗</span></Link>
                        <a href="#ny-experience" className={styles.textLink}>Önce bir keşfedelim ↓</a>
                    </div>
                </div>
                <div className={styles.sceneFoot}><span>ŞİRKETİNİZE ÖZEL TASARIM · KURULUM · SAHA EKİBİ</span><span>Görsel: örnek yılbaşı konsepti</span></div>
            </section>

            <div className={styles.ribbon} aria-label="Kiralama kapsamı">
                <span>Markanıza özel yılbaşı tasarımı</span><span aria-hidden="true">✧</span>
                <span>Kurulum ve saha ekibi</span><span aria-hidden="true">✧</span>
                <span>Geceden kalan güzel bir hatıra</span>
            </div>

            <div className={styles.container}>
                <section className={styles.section} id="ny-experience" aria-labelledby="ny-angle">
                    <div className={styles.sectionHeading}><p className={styles.eyebrow}>PAKETİN İÇİNDE GÜZEL ŞEYLER VAR</p><h2 id="ny-angle">{item.angleTitle}</h2><p className={styles.sectionIntro}>{item.lede.split(". ")[0]}.</p></div>
                    <div className={styles.benefits}>
                        {item.angle.map((card, index) => (
                            <div key={card.title} className={styles.benefit}>
                                <span className={styles.number}>0{index + 1}<span aria-hidden="true">{["✧", "✳", "✶"][index]}</span></span><h3>{card.title}</h3><p>{card.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`${styles.section} ${styles.experience}`} aria-labelledby="ny-flow">
                    <figure className={styles.detailFigure}>
                        <Image src={detailImage.url} alt={detailImage.alt} width={1200} height={900} sizes="(max-width: 760px) 100vw, 45vw" />
                        <figcaption>Şirketinizin renkleriyle, sizin yılbaşı hikâyeniz.</figcaption>
                    </figure>
                    <div>
                        <p className={styles.eyebrow}>GECENİN İÇİNDEN</p><h2 id="ny-flow">{item.flowTitle}</h2>
                        <ol className={styles.steps}>
                            {item.flow.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}
                        </ol>
                    </div>
                </section>

                <section className={`${styles.section} ${styles.planning}`} aria-labelledby="ny-facts">
                    <div><p className={styles.eyebrow}>SİZ KUTLAMAYA ODAKLANIN</p><h2 id="ny-facts">Hazırlığı<br /><em>birlikte yapalım.</em></h2>
                        <p>Nakliye, kurulum, söküm, etkinlik boyunca teknik personel ve şirketinize özel yılbaşı tasarımı kiralamaya dahildir.</p>
                        <Link href={item.product.href} className={styles.textLink}>Ürünün teknik detayları <span aria-hidden="true">↗</span></Link>
                    </div>
                    <dl className={styles.facts}>{item.facts.map(fact => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.value}</dd></div>)}</dl>
                </section>

                {item.reference && <aside className={styles.reference} aria-label="Uygulama örneği">
                    <span className={styles.eyebrow}>BİRLİKTE HATIRLADIĞIMIZ</span>
                    <div><h3>{item.reference.title}</h3><p>{item.reference.body}</p></div>
                    <Link href={item.reference.href} className={styles.textLink}>Projeyi inceleyin ↗</Link>
                </aside>}

                <section className={`${styles.section} ${styles.faq}`} aria-labelledby="ny-faq">
                    <div><p className={styles.eyebrow}>AKLINIZDAKİLER</p><h2 id="ny-faq">Sık sorulan<br /><em>sorular.</em></h2></div>
                    <div>{item.faq.map(entry => <details key={entry.q}><summary>{entry.q}<span aria-hidden="true">+</span></summary><p>{entry.a}</p></details>)}</div>
                </section>
            </div>

            <section className={styles.more} aria-labelledby="ny-more">
                <div className={styles.container}>
                    <div className={styles.moreHeading}><div><p className={styles.eyebrow}>YILBAŞI SEÇKİSİ · 06 DENEYİM DAHA</p><h2 id="ny-more">Her kutuda<br /><em>başka bir heyecan.</em></h2></div><p>Bir fotoğraf, bir oyun, bir sürpriz.<br />Gecenizin diğer hediyesini seçin.</p><Image src="/images/yilbasi/christmas-bow.webp" alt="" width={220} height={330} className={styles.collectionBow} /></div>
                    <div className={styles.related}>
                        {others.map((other, index) => <Link key={other.slug} href={`/hizmetler/${other.slug}`} className={styles.relatedCard}>
                            <span className={styles.calendarNumber}>0{index + 1}</span><span className={styles.calendarStar} aria-hidden="true">✧</span>
                            <div className={styles.relatedImage}><Image src={other.image.url} alt={other.image.alt} fill sizes="(max-width: 540px) 85vw, (max-width: 900px) 45vw, 30vw" /></div>
                            <div><h3>{other.h1.replace(/^Yılbaşı /, "").replace(/ Kiralama$/, "")}</h3><span aria-hidden="true">↗</span></div><p>{other.trName}</p>
                        </Link>)}
                    </div>
                </div>
            </section>

            <section className={styles.closing} aria-labelledby="ny-contact">
                <Image src="/images/yilbasi/christmas-bow.webp" alt="" width={320} height={480} className={styles.closingBow} />
                <span className={styles.closingStar} aria-hidden="true">✧</span>
                <p className={styles.eyebrow}>YENİ YIL, BİRLİKTE GÜZEL.</p>
                <h2 id="ny-contact">Güzel bir yılın,<br /><em>muhteşem bir finali.</em></h2>
                <p>Tarih, şehir ve kişi sayısını paylaşın.<br />Yılbaşı gecenize uygun deneyimi birlikte planlayalım.</p>
                <Link href={contactHref} className={styles.button}>Yılbaşı için teklif alın <span aria-hidden="true">↗</span></Link>
                <Link href={NEW_YEAR_HUB} className={styles.closingLink}>Tüm yılbaşı deneyimlerine dönün</Link>
            </section>
        </article>
    );
}
