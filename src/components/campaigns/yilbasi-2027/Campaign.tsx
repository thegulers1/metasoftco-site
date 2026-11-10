"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "@/components/services/template/ServiceImage";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import type { loadCampaign, CampaignImage } from "./load";
import styles from "./campaign.module.css";
import {
  campaignHero,
  kioskExperience,
  holidayGiftWheel,
  holidayPhotobooth,
  holiday360Photo,
  campaignThemes,
  themeCollections,
  type CampaignTheme,
} from "./campaign-media";

type Props = NonNullable<Awaited<ReturnType<typeof loadCampaign>>> & {
  preview?: boolean;
};
const alternatives = [
  {
    slug: "strip-photo",
    name: "Yılbaşı Photobooth",
    why: "Birlikte poz verin.",
    body: "Yılbaşı temalı fotoğraf köşesinde ekipçe poz verin. Çerçeve tasarımı, baskı ve dijital teslim kapsamını birlikte planlayalım.",
    product: "Strip Photo",
  },
  {
    slug: "360-video-booth",
    name: "Yılbaşı 360 Photo",
    why: "Gecenin enerjisi harekete geçsin.",
    body: "Platforma çıkın, gecenin enerjisini 360 derece videoya taşıyın. Şirketinizin yılbaşı kutlamasına hareketli bir hatıra ekleyin.",
    product: "360 & GIF Video Booth",
  },
  {
    slug: "dijital-hediye-carki-aktivasyonu",
    name: "Yılbaşı Hediye Çarkı",
    why: "Kutlamaya bir sürpriz ekleyin.",
    body: "Yılbaşı temalı dijital çarkla kutlamaya sürpriz katın. Ödüller, katılım koşulları ve akış birlikte planlanır.",
    product: "Hediye Çarkı",
  },
];

function Photo({
  image,
  priority = false,
  sizes = "(max-width:700px) 90vw, 42vw",
}: {
  image: CampaignImage;
  priority?: boolean;
  sizes?: string;
}) {
  const modal = useRef<HTMLDialogElement>(null);
  const photoWidth = image.width || 800;
  const photoHeight = image.height || 1200;
  return (
    <>
      <button
        type="button"
        className={styles.photoButton}
        onClick={() => modal.current?.showModal()}
        aria-label={`Fotoğrafı büyüt: ${image.alt}`}
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={photoWidth}
          height={photoHeight}
          priority={priority}
          sizes={sizes}
        />
        <span aria-hidden="true">↗</span>
      </button>
      <dialog ref={modal} className={styles.dialog} aria-label={image.alt}>
        <form method="dialog">
          <button>Görseli kapat ×</button>
        </form>
        <Image
          src={image.url}
          alt={image.alt}
          width={photoWidth}
          height={photoHeight}
          sizes="95vw"
        />
      </dialog>
    </>
  );
}

function ThemeGallery({ theme }: { theme: CampaignTheme }) {
  const [index, setIndex] = useState(0);
  const selected = theme.frames[index];
  return (
    <figure className={styles.themeGallery}>
      <div className={styles.themeGalleryLabel}>
        <span>ÖRNEK AI ÇIKTISI</span>
        <span>0{index + 1} / 04</span>
      </div>
      <Photo key={selected.image.url} image={selected.image} />
      <div
        className={styles.themeThumbnails}
        aria-label={`${theme.title} örnekleri`}
      >
        {theme.frames.map((frame, i) => (
          <button
            type="button"
            key={frame.image.url}
            aria-label={frame.label}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            <Image
              src={frame.thumbnail.url}
              alt={frame.thumbnail.alt}
              width={frame.thumbnail.width}
              height={frame.thumbnail.height}
              sizes="90px"
            />
          </button>
        ))}
      </div>
      <figcaption>
        <h3>{theme.title}</h3>
        <p>{theme.description}</p>
      </figcaption>
    </figure>
  );
}

function Quote({
  products,
  onProducts,
}: {
  products: string[];
  onProducts: (products: string[]) => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const choices = [
    "AI Photo",
    "Strip Photo",
    "360 & GIF Video Booth",
    "Hediye Çarkı",
    "İnteraktif Oyun",
  ];
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) || "").trim();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          company: value("company"),
          eventDate: value("eventDate"),
          city: value("city"),
          guests: value("guests"),
          product: products.join(", "),
          message: `[Talep türü: Etkinlik için kiralama · Etkinlik: Yılbaşı partisi]\n\n${value("brief") || "Yılbaşı etkinliği için teklif ve müsaitlik bilgisi talep ediyorum."}`,
          attribution: getAttribution(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error("Request not accepted");
      setStatus("sent");
      trackEvent("generate_lead", {
        form_name: "yilbasi_campaign",
        occasion: "yilbasi-partisi-aktiviteleri",
        product: products.join(", "),
        intent: "rent",
      });
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  if (status === "sent")
    return (
      <div role="status" className={styles.success}>
        <span>TEKLİF TALEBİ</span>
        <h3>Detaylar bize ulaştı.</h3>
        <p>
          İhtiyacınızı ve müsaitliği incelemek üzere ekibimiz sizinle iletişime
          geçecek.
        </p>
        <button
          type="button"
          className={styles.primary}
          onClick={() => setStatus("idle")}
        >
          Yeni talep oluştur ↗
        </button>
      </div>
    );
  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.formTop}>
        <span>İLGİLENDİĞİNİZ DENEYİMLER</span>
        <div className={styles.choices}>
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              aria-pressed={products.includes(choice)}
              onClick={() =>
                onProducts(
                  products.includes(choice)
                    ? products.filter((product) => product !== choice)
                    : [...products, choice],
                )
              }
            >
              {choice}
              {products.includes(choice) ? " ✓" : " +"}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.fields}>
        <label>
          Ad soyad *
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Adınız ve soyadınız"
          />
        </label>
        <label>
          İş e-postanız *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="siz@sirketiniz.com"
          />
        </label>
        <label>
          Şirket
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Şirketinizin adı"
          />
        </label>
        <label>
          <span>
            Telefon <small>isteğe bağlı</small>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder="05xx xxx xx xx"
          />
        </label>
      </div>
      <details className={styles.optional}>
        <summary>
          Tarih, şehir ve kişi sayısını ekleyin <span>+</span>
        </summary>
        <div className={styles.fields}>
          <label>
            Etkinlik tarihi
            <input type="date" name="eventDate" />
          </label>
          <label>
            Şehir / mekân
            <input name="city" maxLength={200} />
          </label>
          <label>
            Katılımcı sayısı
            <select name="guests" defaultValue="">
              <option value="">Henüz net değil</option>
              <option>50–150</option>
              <option>150–500</option>
              <option>500+</option>
            </select>
          </label>
          <label>
            Eklemek istedikleriniz
            <textarea name="brief" maxLength={2000} rows={2} />
          </label>
        </div>
      </details>
      <p className={styles.privacy}>
        Bilgileriniz teklif talebinize dönüş yapmak için kullanılır.{" "}
        <Link href="/gizlilik" target="_blank">
          Gizlilik politikası ↗
        </Link>
      </p>
      {status === "error" && (
        <p role="alert">
          Talebiniz gönderilemedi. Yeniden deneyebilir veya +90 534 233 40 51
          üzerinden ulaşabilirsiniz.
        </p>
      )}
      <button
        type="submit"
        className={styles.primary}
        disabled={status === "sending"}
      >
        {status === "sending"
          ? "Talebiniz iletiliyor…"
          : "Etkinliğim için teklif iste ↗"}
      </button>
    </form>
  );
}

export default function Campaign({
  occasion,
  services,
  references,
  preview = false,
}: Props) {
  const [products, setProducts] = useState<string[]>(["AI Photo"]);
  const [theme, setTheme] = useState("one");
  const collection =
    themeCollections.find((item) => item.key === theme) ?? themeCollections[0];
  const whatsapp =
    "https://wa.me/905342334051?text=" +
    encodeURIComponent(
      "Merhaba, şirketimizin yılbaşı partisi için AI Photo ve etkinlik deneyimleri hakkında bilgi almak istiyorum.",
    );
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="MetasoftCo ana sayfa"
        >
          <Image
            src="/blackLogo.png"
            alt="MetasoftCo"
            width={155}
            height={50}
            priority
          />
        </Link>
        <span className={styles.edition}>ŞİRKET PARTİLERİ / 2027</span>
        <a href="#teklif" className={styles.navCta}>
          Etkinliği konuşalım ↗
        </a>
      </header>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="campaign-title">
          <div className={styles.heroCopy}>
            <h1 id="campaign-title" className={styles.kicker}>
              <span /> Kurumsal Yılbaşı Partisi Aktiviteleri
            </h1>
            <p className={styles.heroSlogan}>
              Bu yılbaşı,
              <br />
              <em>başrol sizsiniz.</em>
            </p>
            <p className={styles.heroLede}>
              Şirket yılbaşı partileri için <strong>AI Photobooth kiralama</strong>.
              Çalışanlarınızın fotoğraflarını şirketinize özel yılbaşı sahnelerine dönüştürüyoruz.
            </p>
            <div className={styles.actions}>
              <a href="#teklif" className={styles.primary}>
                Yılbaşı etkinliğim için teklif al ↗
              </a>
              <a href="#ornekler" className={styles.textLink}>
                Örnekleri keşfet ↓
              </a>
            </div>
            <div className={styles.heroNote}>
              <span>01 / FOTOĞRAF</span>
              <span>02 / AI DÖNÜŞÜMÜ</span>
              <span>03 / DİJİTAL HATIRA</span>
            </div>
          </div>
          <figure className={styles.heroVisual}>
            <div className={styles.photoLabel}>
              <span>METASOFTCO AI PHOTO</span>
              <span>YILBAŞI KONSEPTİ</span>
            </div>
            <Photo
              image={campaignHero}
              priority
              sizes="(max-width:700px) 100vw, 60vw"
            />
            <figcaption>
              Kiosk. Katılımcı. Yılbaşı hikâyesi.
              <span>
                Etkinlik alanı ve AI sonucu için örnek deneyim kurgusu.
              </span>
            </figcaption>
          </figure>
        </section>
        <div className={styles.promise}>
          <p>
            Sizin markanız.
            <br />
            <strong>Size özel bir dünya.</strong>
          </p>
          <p>
            Çalışanlar için bir deneyim.
            <br />
            <strong>Organizasyon için birlikte planlanan süreç.</strong>
          </p>
          {preview && <span>TASARIM ÖNİZLEMESİ / YAYINDA DEĞİL</span>}
        </div>

        <section
          id="ornekler"
          className={styles.examples}
          aria-labelledby="examples-title"
        >
          <div className={styles.sectionIntro}>
            <span className={styles.kicker}>
              EKİBİNİZ HANGİ HİKÂYEDE OLSUN?
            </span>
            <h2 id="examples-title">
              Aynı kutlama.
              <br />
              <em>Farklı dünyalar.</em>
            </h2>
            <p>
              İster karlı bir yılbaşı gecesi, ister neon ışıklı bir 80’ler
              partisi. Şirketinizin konseptine uyarlanabilecek örnek AI fotoğraf
              serilerini keşfedin.
            </p>
            <a href="#teklif" className={styles.textLink}>
              Bu temaları etkinliğim için konuşalım ↗
            </a>
          </div>
          <div className={styles.examplePhotos}>
            {campaignThemes.map((item) => (
              <ThemeGallery key={item.key} theme={item} />
            ))}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div>
            <span className={styles.kicker}>MİSAFİRLERİNİZ NE YAŞAYACAK?</span>
            <h2 id="process-title">
              Gel. Fotoğrafını çektir.
              <br />
              <em>Hikâyeye katıl.</em>
            </h2>
          </div>
          <ol>
            {[
              [
                "Fotoğraf anı",
                "Katılımcının fotoğrafı etkinlikte çekilir. Uzun bir açıklama veya teknik bilgi gerektirmeyen bir başlangıç.",
              ],
              [
                "Markanıza özel dönüşüm",
                "Fotoğraf, önceden birlikte hazırlanan AI senaryosuna göre yeni bir görsele dönüşür. Tema ve arayüz akışı projeye göre belirlenir.",
              ],
              [
                "Paylaşılabilir bir hatıra",
                "Dijital çıktı QR ile paylaşılabilir. Baskı isteniyorsa formatı, adedi ve kapsamı teklifte ayrıca netleştirilir.",
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.eventScene} aria-labelledby="kiosk-title">
          <div className={styles.sceneIntro}>
            <span className={styles.kicker}>
              FOTOĞRAFIN ARKASINDA BİR DENEYİM VAR
            </span>
            <h2 id="kiosk-title">
              Kioskta başlar.
              <br />
              <em>Markanızla hatırlanır.</em>
            </h2>
            <p>
              Yılbaşı temalı ekran, markanıza özel fotoğraf dünyası ve
              katılımcının etkileşimi aynı deneyimin parçaları. Etkinlik
              alanındaki kurgu ve tasarım kapsamını birlikte planlayalım.
            </p>
            <div className={styles.sceneFacts}>
              <span>EKRAN ARAYÜZÜ</span>
              <span>MARKA TEMASI</span>
              <span>KATILIMCI DENEYİMİ</span>
            </div>
          </div>
          <figure>
            <Photo
              image={kioskExperience}
              sizes="(max-width:700px) 100vw, 75vw"
            />
            <figcaption>
              MetasoftCo AI Photo · Yılbaşı arayüzü ve sonuç fotoğrafları için
              konsept görseli.
            </figcaption>
          </figure>
        </section>
        <section className={styles.brand} aria-labelledby="brand-title">
          <div>
            <span className={styles.kicker}>
              TEK BİR TEMAYLA SINIRLI KALMAYIN
            </span>
            <h2 id="brand-title">
              Geçmişe, geleceğe.
              <br />
              <em>Ya da Noel Baba’nın yanına.</em>
            </h2>
            <p>
              Retro parti, uzay, kış pazarı ve kar küresi gibi farklı dünyalar;
              logo, renkler ve fotoğraf çerçevesiyle şirketinizin hikâyesine
              uyarlanabilir.
            </p>
            <a href="#teklif" className={styles.textLink}>
              Şirketimize özel bir konsept isteyelim ↗
            </a>
          </div>
          <div className={styles.themeStudio}>
            <span className={styles.studioLabel}>
              YILBAŞI İÇİN ÖRNEK AI TEMALARI
            </span>
            <div className={styles.themeOptions}>
              {themeCollections.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={theme === item.key}
                  onClick={() => setTheme(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className={styles.collectionPhoto}>
              <Photo
                key={collection.key}
                image={collection.image}
                sizes="(max-width:700px) 100vw, 65vw"
              />
            </div>
            <p className={styles.themeDisclaimer}>
              AI konsept örnekleridir. Etkinliğinizin teması ve uygulanacak
              tasarımlar birlikte değerlendirilip onaylanır.
            </p>
          </div>
        </section>

        <section className={styles.operations} aria-labelledby="ops-title">
          <span className={styles.kicker}>ORGANİZASYON TARAFINDA</span>
          <h2 id="ops-title">
            Siz kutlamayı düşünün.
            <br />
            <em>Detayları birlikte planlayalım.</em>
          </h2>
          <div>
            {[
              [
                "Önce ihtiyacınız",
                "Tarih, şehir, alan ve kişi sayısıyla başlarız. Deneyimlerin müsaitliğini ve kapsamını kontrol ederiz.",
              ],
              [
                "Sonra tasarım onayı",
                "Şirketinize özel tema ve uygulama tasarımları, etkinlik öncesi onayınıza sunulur.",
              ],
              [
                "Ardından saha planı",
                "Kurulum, teknik gereksinimler, personel ve çalışma saatleri teklif kapsamında netleştirilir.",
              ],
            ].map(([title, body], i) => (
              <article key={title}>
                <span>/{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.alternatives}
          aria-labelledby="alternatives-title"
        >
          <div className={styles.sectionIntro}>
            <span className={styles.kicker}>GECEYE BİR ŞEY DAHA EKLEYİN</span>
            <h2 id="alternatives-title">
              Fotoğraf mı, video mu,
              <br />
              <em>biraz da heyecan mı?</em>
            </h2>
          </div>
          <div className={styles.alternativeRows}>
            {alternatives.map((item, i) => {
              const service = services.find((row) => row.slug === item.slug);
              const displayImage =
                item.slug === "dijital-hediye-carki-aktivasyonu"
                  ? holidayGiftWheel
                  : item.slug === "strip-photo"
                    ? holidayPhotobooth
                    : holiday360Photo;
              return service ? (
                <article key={item.slug}>
                  {displayImage && (
                    <Link
                      className={styles.alternativeImage}
                      href={service.href}
                    >
                      <Image
                        src={displayImage.url}
                        alt={displayImage.alt}
                        width={displayImage.width || 500}
                        height={displayImage.height || 375}
                        sizes="(max-width:700px) 90vw, 30vw"
                      />
                    </Link>
                  )}
                  <div>
                    <span className={styles.kicker}>
                      0{i + 1} / {item.why}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.body}</p>
                    {
                      <small className={styles.conceptNote}>
                        Görsel: örnek yılbaşı konsepti.
                      </small>
                    }
                    <a
                      href="#teklif"
                      onClick={() =>
                        setProducts([...new Set(["AI Photo", item.product])])
                      }
                    >
                      AI Photo ile birlikte planla ↗
                    </a>
                  </div>
                  <Link href={service.href} className={styles.detailLink}>
                    Detay ↗
                  </Link>
                </article>
              ) : null;
            })}
          </div>
        </section>

        <section className={styles.tiers} aria-labelledby="tiers-title">
          <div>
            <span className={styles.kicker}>
              NEREDEN BAŞLAYACAĞINIZI BİLMİYORSANIZ
            </span>
            <h2 id="tiers-title">Ekibiniz kaç kişi?</h2>
            <p>
              Bu kombinasyonlar bir başlangıç önerisi. Kapasite ve istasyon
              planı; süreye, alana ve katılımcı akışına göre netleşir.
            </p>
          </div>
          <div className={styles.tierRows}>
            {occasion.tiers.map((tier) => (
              <article key={tier.range}>
                <span>{tier.range}</span>
                <div>
                  <h3>{tier.title}</h3>
                  <p>{tier.products.join(" + ")}</p>
                </div>
                <a
                  href="#teklif"
                  onClick={() => setProducts([...tier.products])}
                  aria-label={`${tier.title} kombinasyonuyla teklif al`}
                >
                  Bunu konuşalım ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        {references.length > 0 && (
          <section className={styles.references} aria-labelledby="refs-title">
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>
                EKRANDA KALAN BİR FİKİR DEĞİL
              </span>
              <h2 id="refs-title">
                Gerçek uygulamalardan
                <br />
                <em>iki örnek.</em>
              </h2>
            </div>
            <div>
              {references.map((project) => (
                <article key={project.href}>
                  <Link href={project.href}>
                    <Image
                      src={project.image.url}
                      alt={project.image.alt}
                      width={900}
                      height={600}
                      sizes="(max-width:700px) 90vw, 45vw"
                    />
                  </Link>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Link href={project.href}>Projeyi incele ↗</Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <section
          id="teklif"
          className={styles.quote}
          aria-labelledby="quote-title"
        >
          <div className={styles.quoteIntro}>
            <span className={styles.kicker}>YILBAŞI PLANINIZI KONUŞALIM</span>
            <h2 id="quote-title">
              Tarihi siz söyleyin.
              <br />
              <em>Birlikte şekillendirelim.</em>
            </h2>
            <p>
              Her şeyin netleşmiş olması gerekmiyor. İlk bilgileri paylaşın;
              deneyim, müsaitlik ve operasyon kapsamını birlikte
              değerlendirelim.
            </p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", {
                  source: "yilbasi_campaign",
                  product: products.join(", "),
                })
              }
            >
              WhatsApp’tan konuşalım ↗
            </a>
            <a href="tel:+905342334051">+90 534 233 40 51</a>
          </div>
          <Quote products={products} onProducts={setProducts} />
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div>
            <span className={styles.kicker}>AKLINIZDA KALMASIN</span>
            <h2 id="faq-title">Kısa cevaplar.</h2>
            {occasion.faqAside && <p>{occasion.faqAside}</p>}
          </div>
          <div>
            {occasion.faqs.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span>+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerWordmark}>
          MetasoftCo
        </Link>
        <p>Yılbaşı 2027 / şirketinize özel deneyimler</p>
        <div>
          <Link href="/hizmetler">Tüm deneyimler ↗</Link>
          <Link href="/gizlilik">Gizlilik</Link>
          <a href="mailto:info@metasoftco.com">info@metasoftco.com</a>
        </div>
      </footer>
    </div>
  );
}
