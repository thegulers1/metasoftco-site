import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  siteConfig,
} from "@/lib/site";
import {
  combinations,
  description,
  faqs,
  games,
  hero,
  memories,
  path,
  steps,
  title,
} from "./content";
import {
  AddActivity,
  ChooseCombination,
  Comparison,
  GalleryImage,
  QuoteForm,
  SelectionProvider,
  WhatsApp,
} from "./interactions";
import styles from "./ramazan.module.css";

const url = siteConfig.url + path;
const social = {
  title: `${title} | ${siteConfig.name}`,
  description,
  images: [siteConfig.url + hero.src],
};

export const metadata: Metadata = {
  title: { absolute: social.title },
  description,
  alternates: { canonical: url },
  openGraph: {
    ...social,
    url,
    locale: "tr_TR",
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: { ...social, card: "summary_large_image" },
};

const schemas = [
  generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: siteConfig.url },
    { name: "Hizmetler", url: siteConfig.url + "/hizmetler" },
    { name: title, url },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url,
    image: siteConfig.url + hero.src,
    serviceType: "Ramazan etkinlikleri için interaktif aktivite kiralama",
    provider: { "@id": siteConfig.url + "/#organization" },
  },
  generateFaqSchema(faqs),
];

const branded = "Sultangazi için hazırlanan konsept tasarım";

export default function RamazanPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas).replace(/</g, "\\u003c"),
        }}
      />
      <section className={styles.hero} aria-labelledby="ramazan-title">
        <div>
          <p className={styles.crumb}>
            <Link href="/hizmetler" prefetch={false}>Hizmetler</Link> / Ramazan
          </p>
          <p className={styles.kicker}>Belediyeler için Ramazan deneyimleri</p>
          <h1 id="ramazan-title">
            Ramazan Etkinlikleri <em>ve İnteraktif Aktiviteler</em>
          </h1>
          <p className={styles.lede}>
            Ramazan çadırları, meydanlar ve etkinlik alanları için ailece
            katılınan fotoğraf deneyimleri, çocuk oyunları ve interaktif
            aktiviteler. Kurumunuza özel tasarım ve saha hizmetleriyle
            etkinliğinize uygun bir kurgu hazırlayalım.
          </p>
          <div className={styles.actions}>
            <a className="ms-pill ms-pill--acc" href="#teklif">
              Etkinliğiniz İçin Teklif Alın ↗
            </a>
            <a className="ms-pill ms-pill--line" href="#aktiviteler">
              Aktiviteleri İnceleyin ↓
            </a>
          </div>
        </div>
        <figure className={styles.heroMedia}>
          <Image {...hero} alt={hero.alt} preload sizes="(max-width: 760px) 92vw, 40vw" />
          <figcaption>
            <span>01 / 360 Video Booth</span>
            <span>Örnek konsept görseli</span>
          </figcaption>
        </figure>
      </section>
      <nav className={styles.jump} aria-label="Ramazan sayfası bölümleri">
        <a href="#hatiralar">Hatıra Deneyimleri</a>
        <a href="#oyunlar">Oyunlar</a>
        <a href="#kurulum">Kurulum</a>
        <a href="#teklif">Teklif Al ↗</a>
      </nav>
      <section className={styles.section} id="aktiviteler">
        <p className={styles.kicker}>Etkinlik alanınız için iki deneyim</p>
        <h2>Ailece hatıra biriktirin, birlikte oynayın.</h2>
        <div className={styles.zones}>
          <a href="#hatiralar">
            <span>01 / Fotoğraf ve video ↘</span>
            <h3>Hatıra deneyimleri</h3>
            <p>
              Ailece çekilen, basılan veya dijital olarak paylaşılan fotoğraflar
              ve kısa videolar.
            </p>
          </a>
          <a href="#oyunlar">
            <span>02 / Dokun, düşün, hareket et ↘</span>
            <h3>İnteraktif oyunlar</h3>
            <p>
              Ramazan motiflerinden ilham alan, çocukların ve ailelerin birlikte
              katılabileceği kısa oyunlar.
            </p>
          </a>
        </div>
      </section>
      <SelectionProvider>
        <section className={styles.section} id="hatiralar">
          <p className={styles.kicker}>01 / Fotoğraf ve video</p>
          <h2>Hatıra Deneyimleri</h2>
          <p className={styles.note}>
            Örnek konsept görselleri. Çerçeve ve sahneler kurumunuza
            uyarlanabilir.
          </p>
          <div className={styles.memoryGrid}>
            {memories.map((item, i) => (
              <article
                className={i === 0 ? styles.feature : styles.memory}
                key={item.id}
              >
                <div className={styles.memoryCopy}>
                  <p className={styles.kicker}>0{i + 1} / Hatıra</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <AddActivity id={item.id} name={item.title} />
                </div>
                {item.id === "ai" ? (
                  <Comparison />
                ) : (
                  <figure>
                    <div
                      className={
                        item.images.length === 2
                          ? styles.prints
                          : styles.memoryImage
                      }
                    >
                      {item.images.map((image) => (
                        <GalleryImage
                          key={image.src}
                          media={image}
                          sizes="(max-width: 760px) 90vw, 32vw"
                        />
                      ))}
                    </div>
                    {item.branded && (
                      <figcaption className={styles.note}>{branded}</figcaption>
                    )}
                  </figure>
                )}
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section} id="oyunlar">
          <p className={styles.kicker}>02 / Dokunmatik oyunlar ve hareket</p>
          <h2>Ramazan İnteraktif Oyunları</h2>
          <p className={styles.lede}>
            Ramazan etkinliğinize özel hazırlanabilecek dokuz oyun. Kurgu,
            ziyaretçi profiline ve etkinlik alanına göre şekillenir.
          </p>
          <p className={styles.note}>
            Örnek konsept görselleri. Oyun ekranlarını büyütmek için görseli
            seçin.
          </p>
          <div className={styles.gameGrid}>
            {games.map((item, i) => (
              <article key={item.id} className={styles.game}>
                <div className={styles.gameImage}>
                  <GalleryImage
                    media={item.image}
                    sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 30vw"
                  />
                </div>
                <div className={styles.gameCopy}>
                  <p className={styles.kicker}>
                    {String(i + 1).padStart(2, "0")} / Oyun
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.branded && <p className={styles.note}>{branded}</p>}
                  <AddActivity id={item.id} name={item.title} />
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section} aria-labelledby="kurgu-title">
          <p className={styles.kicker}>Etkinliğinize göre seçin</p>
          <h2 id="kurgu-title">Üç örnek etkinlik kurgusu</h2>
          <p className={styles.lede}>
            Alanınıza, etkinlik sürenize ve ziyaretçi yoğunluğuna göre bu
            seçimleri birlikte şekillendirebiliriz.
          </p>
          <div className={styles.combinations}>
            {combinations.map((item, i) => (
              <article key={item.id}>
                <p className={styles.kicker}>0{i + 1} / Örnek kurgu</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ChooseCombination id={item.id} ids={item.activities} />
              </article>
            ))}
          </div>
        </section>
        <section className={styles.section} id="kurulum">
          <p className={styles.kicker}>Saha planı</p>
          <h2>Kurulum ve Operasyon</h2>
          <p className={styles.lede}>
            Tek günlük etkinlikleri ve Ramazan boyunca süren programları ayrı
            planlayabiliriz. Elektrik, internet, açık veya kapalı alan
            uygunluğu, ekipman sayısı, baskı adedi ve personel kapsamı teklifte
            netleşir.
          </p>
          <ol className={styles.steps}>
            {steps.map(([heading, body], i) => (
              <li key={heading}>
                <span className={styles.kicker}>0{i + 1}</span>
                <h3>{heading}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className={`${styles.section} ${styles.faq}`}>
          <div>
            <p className={styles.kicker}>Planlama hakkında</p>
            <h2>Sık Sorulan Sorular</h2>
          </div>
          <div>
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.quote}`}
          id="teklif"
          tabIndex={-1}
        >
          <div>
            <p className={styles.kicker}>Etkinliğe özel teklif</p>
            <h2>Ramazan Etkinliğinizi Birlikte Planlayalım</h2>
            <p className={styles.lede}>
              Şehrinizi, etkinlik tarihlerinizi ve düşündüğünüz aktiviteleri
              paylaşın; alanınıza uygun bir kurgu hazırlayalım.
            </p>
            <WhatsApp phone={siteConfig.contact.phone} />
          </div>
          <QuoteForm />
        </section>
      </SelectionProvider>
    </div>
  );
}
