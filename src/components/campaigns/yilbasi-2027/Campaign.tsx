"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "@/components/services/template/ServiceImage";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { brands } from "@/lib/brands";
import { MsBehaviour, MsClosing, MsNav } from "@/components/site-ms/MsChrome";
import "@/components/site-ms/ms.css";
import type { loadCampaign, CampaignImage } from "./load";
import styles from "./campaign.module.css";
import {
  holidayGiftWheel,
  campaignThemes,
  themeCollections,
  type CampaignTheme,
} from "./campaign-media";

type Props = NonNullable<Awaited<ReturnType<typeof loadCampaign>>> & {
  preview?: boolean;
};

// Boyutlu sürümler: scripts/make-campaign-variants.mjs → public/images/yilbasi/v/
const V = "/images/yilbasi/v/";
const img = (
  name: string,
  width: number,
  height: number,
  alt: string,
): CampaignImage => ({ url: `${V}${name}.webp`, width, height, alt });

const media = {
  hero: img(
    "kapak",
    1600,
    900,
    "AI Photo kioskunun yanında katılımcı ve yılbaşı temalı örnek portresi",
  ),
  kiosk: img(
    "ai-photo-kiosk",
    1536,
    1024,
    "Yılbaşı etkinliği için AI Photo kiosk konsepti",
  ),
  portrait: img(
    "ai-portre",
    1086,
    1448,
    "Yılbaşı küresi önünde kırmızı elbiseli örnek AI portre",
  ),
  robo: img(
    "robophoto",
    1086,
    1448,
    "Yılbaşı temasıyla giydirilmiş RoboPhoto cihazı",
  ),
  photobooth: img("photobooth", 1200, 800, "Yılbaşı photobooth konsepti"),
  video360: img(
    "360-video",
    1200,
    800,
    "Yılbaşı etkinliği için 360 video platformu konsepti",
  ),
  momento: img(
    "momento-ball",
    1126,
    1540,
    "Yılbaşı ağacında asılı, içinde Instax fotoğraf olan şeffaf Momento Ball küresi",
  ),
  bag: img(
    "hediye-cantasi",
    1672,
    941,
    "Hediye Çantası oyununun ekranı: gökten yağan hediyeler ve kırmızı kadife çanta",
  ),
  timer: img(
    "20-27-saniye",
    1448,
    1086,
    "Gözleri kapalı butona basan katılımcı ve 20,27 saniye hedefli sıralama ekranı",
  ),
  before1: img("once-1", 1086, 1448, "Fuayede çekilen kare, dönüşümden önce"),
  after1: img(
    "sonra-kis-masali",
    900,
    1200,
    "Aynı karenin kış masalı temalı AI çıktısı",
  ),
  before2: img("once-2", 1086, 1448, "Fuayede çekilen kare, dönüşümden önce"),
  after2: img(
    "sonra-retro-gala",
    900,
    1350,
    "Aynı karenin retro gala temalı AI çıktısı",
  ),
};

const videos = {
  aiFilm: {
    src: "/videos/yilbasi/ai-photo-video.mp4",
    poster: `${V}ai-video-kapak.webp`,
    label: "AI portreden üretilen kısa yılbaşı filmi",
  },
  caricature: {
    src: "/videos/yilbasi/karikatur-video.mp4",
    poster: `${V}karikatur-kapak.webp`,
    label: "Karikatürün çizilişini gösteren örnek video",
  },
};

interface Feature {
  id: string;
  name: string;
  /** Teklif formuna giden ürün adı. */
  product: string;
  note: string;
  title: string;
  body: string;
  chips: string[];
  slug?: string;
}

const photoFeatures: Feature[] = [
  {
    id: "ai-photo",
    name: "AI Photo",
    product: "AI Photo",
    note: "Yılbaşı temalı portre",
    title: "Herkes yılın kapağında.",
    body: "Katılımcı kioskta poz verir; yapay zekâ fotoğrafını saniyeler içinde kurumsal kimliğinize uygun bir yılbaşı sahnesine taşır.",
    chips: ["MARKANIZA ÖZEL TEMA", "QR İLE DİJİTAL KOPYA", "BASKI SEÇENEĞİ"],
    slug: "ai-photobooth-kirala",
  },
  {
    id: "ai-photo-video",
    name: "AI Photo + Video",
    product: "AI Photo + Video",
    note: "Fotoğraf filme dönüşür",
    title: "AI fotoğrafınız yılbaşı filmine dönüşür.",
    body: "Kioskta tek bir poz verilir. Önce yılbaşı temalı AI portre hazırlanır; ardından aynı fotoğraf kısa bir filme dönüşür: kar yağar, ışıklar yanar, karakter hareketlenir. Katılımcı videosunu QR kod ile teslim alır.",
    chips: ["1 POZ", "2 ÇIKTI", "FOTOĞRAF + VİDEO"],
  },
  {
    id: "robophoto",
    name: "RoboPhoto",
    product: "RoboPhoto",
    note: "Dolaşan robot fotoğrafçı",
    title: "Fotoğrafçı misafirlerinizin yanına gelsin.",
    body: "Fuaye ve kokteyl alanında dolaşan robot fotoğrafçı misafirlere yaklaşır, ekranından poz verdirir ve çeker. Misafirler sabit bir fotoğraf noktasına gitmeden, bulundukları yerde katılır.",
    chips: ["FUAYEDE DOLAŞIR", "QR VE BASKI"],
  },
  {
    id: "photobooth",
    name: "Photobooth ve Strip",
    product: "Strip Photo",
    note: "Ekipçe şerit kareler",
    title: "Ekipçe sığılan şerit kareler.",
    body: "Yılbaşı temalı fotoğraf köşesinde ekipçe poz verin; şerit kareler logolu çerçevenizle hazırlanır.",
    chips: ["LOGOLU ÇERÇEVE", "EKİP FOTOĞRAFI"],
    slug: "strip-photo",
  },
  {
    id: "video-360",
    name: "360 ve GIF Video",
    product: "360 & GIF Video Booth",
    note: "Ağır çekim video",
    title: "Gecenin enerjisi, ağır çekimde.",
    body: "Katılımcının etrafında dönen kamera kolu ağır çekim video çeker; video QR ile telefona gelir.",
    chips: ["DÖNEN KAMERA", "QR İLE TELEFONA"],
    slug: "360-video-booth",
  },
  {
    id: "momento-ball",
    name: "Momento Ball",
    product: "Momento Ball",
    note: "Fotoğraflı yılbaşı küresi",
    title: "Fotoğrafınız yılbaşı küresinde.",
    body: "Misafirin anı Instax ile çekilir, fotoğraf saniyeler içinde basılır ve şeffaf bir yılbaşı küresinin içine yerleştirilir. Küre ofis masasında ya da yılbaşı ağacında yıl boyu durur.",
    chips: ["INSTAX ÇEKİM", "KÜREDE TESLİM"],
  },
  {
    id: "ai-karikatur",
    name: "AI Karikatür Video",
    product: "AI Karikatür Video",
    note: "Çizilen karikatür videosu",
    title: "Karikatürünüz gözünüzün önünde çizilir.",
    body: "Katılımcının fotoğrafı çekilir, yapay zekâ onu karikatüre dönüştürür. Karikatür, ilk kalem çizgisinden son rengine kadar elle çiziliyormuş gibi kısa bir videoya dönüşür; logonuz ve yılbaşı çerçevenizle QR üzerinden telefona gelir.",
    chips: ["1 POZ", "ÇİZİM VİDEOSU", "9:16", "LOGOLU ÇERÇEVE"],
  },
];

const gameFeatures: Feature[] = [
  {
    id: "hediye-cantasi",
    name: "Hediye Çantası",
    product: "Hediye Çantası",
    note: "Hareketle yakalama",
    title: "Yağan hediyeleri kap, çantayı doldur.",
    body: "Dev ekranın karşısındaki oyuncu, kollarını hareket ettirerek gökten yağan hediyeleri Noel Baba’nın çantasına toplar. Kamera hareketi algılar; kumanda gerekmez.",
    chips: ["45 SN TUR", "1–2 OYUNCU", "HAREKET ALGILAMA"],
  },
  {
    id: "saniye-20-27",
    name: "20.27 Saniye",
    product: "20.27 Saniye",
    note: "Gözler kapalı zamanlama",
    title: "Gözler kapalı, tam 20,27’de durdur.",
    body: "Oyuncu sayacı başlatır, ekran kararır ve süre gizlenir. İçinden sayar, tam 20,27 saniyede butona basar. Hedefe en yakın duran sıralamanın başına geçer; izleyenler de sayarak oyuna katılır.",
    chips: ["30 SN TUR", "1 OYUNCU", "CANLI SIRALAMA"],
  },
  {
    id: "hediye-carki",
    name: "Hediye Çarkı",
    product: "Hediye Çarkı",
    note: "Sahnede çekiliş",
    title: "Kutlamaya bir sürpriz ekleyin.",
    body: "Yılbaşı temalı dijital çarkla hediyeler herkesin gözü önünde dağıtılır. Ödüller, katılım koşulları ve akış birlikte planlanır.",
    chips: ["DİJİTAL ÇARK", "SAHNEDE ÇEKİLİŞ"],
    slug: "dijital-hediye-carki-aktivasyonu",
  },
];

const gameCards: (Feature & { players: string })[] = [
  {
    id: "kartopu-duellosu",
    name: "Kartopu Düellosu",
    product: "Kartopu Düellosu",
    note: "İkili kapışma",
    title: "",
    body: "İki oyuncu ekranın iki yanında; hareketle kartopu atar, gelenden kaçar.",
    chips: [],
    players: "2 OYUNCU",
  },
  {
    id: "agaci-susle",
    name: "Ağacı Birlikte Süsle",
    product: "Ağacı Birlikte Süsle",
    note: "Takım oyunu",
    title: "",
    body: "Takım, dokunmatik ekranda süsleri doğru yerlere yerleştirir; hız kadar iletişim de kazandırır.",
    chips: [],
    players: "4 OYUNCU",
  },
  {
    id: "yilin-quizi",
    name: "Yılın Quiz’i",
    product: "Yılın Quiz’i",
    note: "Tüm salon yarışır",
    title: "",
    body: "Salondaki herkes telefonundan QR ile katılır; sıralama canlı akar.",
    chips: [],
    players: "TÜM SALON",
    slug: "quiz-bilgi-yarismasi",
  },
  {
    id: "reflex-wall-vr",
    name: "Reflex Wall ve VR",
    product: "Reflex Wall ve VR",
    note: "Hız ve ritim",
    title: "",
    body: "Işıklı panelde hız rekoru; sanal gerçeklikte müziğin ritminde blok kesme.",
    chips: [],
    players: "1 OYUNCU",
  },
];

const extras = [
  {
    name: "Mirror Booth",
    body: "Boy aynası ekranında animasyonlu poz rehberi; baskı, GIF ya da boomerang.",
  },
  {
    name: "AI Draw Portre",
    body: "Yapay zekâ ile çizim tarzında portre; dijital kopya ve baskı seçeneği.",
  },
  {
    name: "Karaoke",
    body: "Ekipçe söylenen yılbaşı şarkıları; performans videosu QR ile telefonda.",
    slug: "karaoke",
  },
  {
    name: "Dans Düellosu",
    body: "Hareket algılayan dev ekranda koreografi yarışı; dans pistini açan oyun.",
  },
];

// Büyük harfler elle yazıldı: CSS uppercase Türkçe sayfada İngilizce adları bozar.
const marquee = [
  "AI PHOTO",
  "ROBOPHOTO",
  "360 VİDEO",
  "MOMENTO BALL",
  "AI KARİKATÜR",
  "HEDİYE ÇANTASI",
  "20.27 SANİYE",
  "KARTOPU DÜELLOSU",
  "YILIN QUIZ’İ",
  "HEDİYE ÇARKI",
];

const baseChoices = [
  "AI Photo",
  "AI Photo + Video",
  "RoboPhoto",
  "Strip Photo",
  "360 & GIF Video Booth",
  "Momento Ball",
  "AI Karikatür Video",
  "Hediye Çarkı",
  "İnteraktif Oyun",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Görünür olduğunda sessizce oynar; hareket azaltma tercihinde kontrolle bekler. */
function AutoVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Poster, görünüme yaklaşana kadar indirilmez (ilk ekranda 145 KB boşa gitmesin).
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefetch = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          prefetch.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    prefetch.observe(node);
    return () => prefetch.disconnect();
  }, []);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          node.play().catch(() => {
            node.controls = true;
          });
        else node.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={styles.video}
      src={src}
      poster={near ? poster : undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}

const Selection = createContext<{
  products: string[];
  toggle: (product: string) => void;
  hrefOf: (slug?: string) => string | undefined;
}>({ products: [], toggle: () => {}, hrefOf: () => undefined });

function Actions({ item }: { item: { product: string; slug?: string } }) {
  const { products, toggle, hrefOf } = useContext(Selection);
  const on = products.includes(item.product);
  const href = hrefOf(item.slug);
  return (
    <div className={styles.itemActions}>
      <button
        type="button"
        className={styles.add}
        aria-pressed={on}
        onClick={() => toggle(item.product)}
      >
        {on ? "Teklifte ✓" : "Teklife ekle +"}
      </button>
      {href && (
        <Link href={href} className={styles.detail}>
          Detay ↗
        </Link>
      )}
    </div>
  );
}

function Copy({ item, no }: { item: Feature; no: number }) {
  return (
    <div className={styles.featureCopy}>
      <span className={styles.no} aria-hidden="true">
        {pad(no)}
      </span>
      <span className={styles.kicker}>{item.name}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <ul className={styles.chips}>
        {item.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
      <Actions item={item} />
    </div>
  );
}

function Frame({
  children,
  caption,
  shape = "portrait",
}: {
  children: ReactNode;
  caption?: string;
  shape?: "portrait" | "wide";
}) {
  return (
    <figure className={styles.frame} data-shape={shape}>
      <div className={styles.frameMedia}>{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

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
  const [showFullImage, setShowFullImage] = useState(false);
  const photoWidth = image.width || 800;
  const photoHeight = image.height || 1200;
  return (
    <>
      <button
        type="button"
        className={styles.photoButton}
        onClick={() => {
          modal.current?.showModal();
          setShowFullImage(true);
        }}
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
        {showFullImage && (
          <Image
            src={image.url}
            alt={image.alt}
            width={photoWidth}
            height={photoHeight}
            sizes="95vw"
          />
        )}
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
    ...baseChoices,
    ...products.filter((product) => !baseChoices.includes(product)),
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
  const [touched, setTouched] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [theme, setTheme] = useState("one");
  const quote = useRef<HTMLElement>(null);
  const collection =
    themeCollections.find((item) => item.key === theme) ?? themeCollections[0];
  const whatsapp =
    "https://wa.me/905342334051?text=" +
    encodeURIComponent(
      "Merhaba, şirketimizin yılbaşı partisi için AI Photo ve etkinlik deneyimleri hakkında bilgi almak istiyorum.",
    );

  useEffect(() => {
    const form = new IntersectionObserver(
      ([entry]) => setQuoteVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (quote.current) form.observe(quote.current);
    return () => form.disconnect();
  }, []);

  const toggle = (product: string) => {
    setTouched(true);
    setProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product],
    );
  };
  const hrefOf = (slug?: string) =>
    slug ? services.find((row) => row.slug === slug)?.href : undefined;

  const [aiPhoto, aiVideo, robo, booth, video360, momento, caricature] =
    photoFeatures;
  const [bag, timer, wheel] = gameFeatures;
  const index = [...photoFeatures, ...gameFeatures, ...gameCards];
  const photoCount = photoFeatures.length;
  const total = index.length;

  return (
    <Selection.Provider value={{ products, toggle, hrefOf }}>
      <div className={`ms ${styles.page}`}>
        <MsNav />
        <main id="main-content">
          <section className={styles.hero} aria-labelledby="campaign-title">
            <div className={styles.heroMedia}>
              <Image
                src={media.hero.url}
                alt={media.hero.alt}
                width={1600}
                height={900}
                priority
                sizes="100vw"
              />
            </div>
            <div className={styles.heroShade} aria-hidden="true" />
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}>
                <span aria-hidden="true" />
                YILBAŞI 2027 — ŞİRKET PARTİLERİ İÇİN
              </p>
              <h1 id="campaign-title" className={styles.heroSlogan}>
                Kurumsal yılbaşı <em>aktiviteleri.</em>
              </h1>
              <p className={styles.heroLede}>
                Markanıza özel AI Photo, fuayede gezen RoboPhoto, 360 video ve
                interaktif oyunlarla şirketinizin yılbaşı gecesini planlayın.
              </p>
              <div className={styles.actions}>
                <a href="#teklif" className={styles.primary}>
                  Yılbaşı etkinliğim için teklif al ↗
                </a>
                <a href="#deneyimler" className={styles.ghost}>
                  {total} deneyimi keşfet ↓
                </a>
              </div>
            </div>
            <ul className={styles.heroFacts}>
              <li>
                <strong>{total}</strong> deneyim
              </li>
              <li>Fotoğraf, video ve oyun</li>
              <li>Markanıza özel tasarım</li>
              <li>Kurulum ve saha ekibi</li>
            </ul>
            {preview && (
              <span className={styles.previewTag}>
                TASARIM ÖNİZLEMESİ / YAYINDA DEĞİL
              </span>
            )}
          </section>

          <div className={styles.marquee} aria-hidden="true">
            <div>
              {[...marquee, ...marquee].map((word, i) => (
                <span key={i}>
                  {word}
                  <i>✦</i>
                </span>
              ))}
            </div>
          </div>

          <section
            id="deneyimler"
            className={styles.index}
            aria-labelledby="index-title"
          >
            <div className={styles.sectionIntro} data-reveal>
              <span className={styles.kicker}>DENEYİMLER</span>
              <h2 id="index-title">
                Gecenizi <em>{total} deneyimden</em> kurun.
              </h2>
              <p>
                Dilediklerinizi programınıza yerleştirelim. Hangisinin ne zaman
                ve nerede yer alacağına, sizin akışınıza göre birlikte karar
                veririz.
              </p>
            </div>
            <div className={styles.indexCols} data-reveal>
              {[
                ["FOTOĞRAF VE VİDEO", index.slice(0, photoCount), 0] as const,
                [
                  "OYUN VE ETKİLEŞİM",
                  index.slice(photoCount),
                  photoCount,
                ] as const,
              ].map(([title, rows, offset]) => (
                <div key={title}>
                  <span className={styles.kicker}>{title}</span>
                  <ol>
                    {rows.map((item, i) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>
                          <span>{pad(offset + i + 1)}</span>
                          <strong>{item.name}</strong>
                          <small>{item.note}</small>
                          <i aria-hidden="true">↘</i>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.features} aria-labelledby="photo-title">
            <div className={styles.sectionIntro} data-reveal>
              <span className={styles.kicker}>01 — 07 / FOTOĞRAF VE VİDEO</span>
              <h2 id="photo-title">
                Paylaşmaya değer <em>yüzlerce an.</em>
              </h2>
            </div>

            <article id={aiPhoto.id} className={styles.feature} data-reveal>
              <Frame shape="wide" caption="AI PHOTO · ÖRNEK YILBAŞI KONSEPTİ">
                <Photo
                  image={media.kiosk}
                  sizes="(max-width:800px) 100vw, 58vw"
                />
              </Frame>
              <Copy item={aiPhoto} no={1} />
            </article>

            <article
              id={aiVideo.id}
              className={styles.feature}
              data-flip
              data-reveal
            >
              <div className={styles.duo}>
                <Frame caption="01 · FOTOĞRAF">
                  <Photo
                    image={media.portrait}
                    sizes="(max-width:800px) 45vw, 24vw"
                  />
                </Frame>
                <span className={styles.duoArrow} aria-hidden="true">
                  →
                </span>
                <Frame caption="02 · VİDEO">
                  <AutoVideo {...videos.aiFilm} />
                </Frame>
              </div>
              <Copy item={aiVideo} no={2} />
            </article>

            <article id={robo.id} className={styles.feature} data-reveal>
              <Frame caption="ROBOPHOTO · ÖRNEK YILBAŞI KONSEPTİ">
                <Photo
                  image={media.robo}
                  sizes="(max-width:800px) 90vw, 36vw"
                />
              </Frame>
              <Copy item={robo} no={3} />
            </article>

            <div className={styles.pair} data-reveal>
              <h3 className={styles.pairTitle}>
                Gecenin klasikleri, <em>yeni yorumla.</em>
              </h3>
              {(
                [
                  [booth, media.photobooth, 4],
                  [video360, media.video360, 5],
                ] as const
              ).map(([item, image, no]) => (
                <article key={item.id} id={item.id} className={styles.pairCard}>
                  <Frame shape="wide">
                    <Photo
                      image={image}
                      sizes="(max-width:800px) 100vw, 45vw"
                    />
                  </Frame>
                  <div>
                    <span className={styles.kicker}>
                      {pad(no)} / {item.name}
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                    <Actions item={item} />
                  </div>
                </article>
              ))}
            </div>

            <article
              id={momento.id}
              className={styles.feature}
              data-flip
              data-reveal
            >
              <Frame caption="MOMENTO BALL">
                <Photo
                  image={media.momento}
                  sizes="(max-width:800px) 90vw, 36vw"
                />
              </Frame>
              <Copy item={momento} no={6} />
            </article>

            <article id={caricature.id} className={styles.feature} data-reveal>
              <Frame caption="ÇİZİM VİDEOSU · ÖRNEK">
                <AutoVideo {...videos.caricature} />
              </Frame>
              <Copy item={caricature} no={7} />
            </article>
          </section>

          <section
            id="oyunlar"
            className={styles.games}
            aria-labelledby="games-title"
          >
            <div className={styles.sectionIntro} data-reveal>
              <span className={styles.kicker}>
                08 — {pad(total)} / OYUN VE ETKİLEŞİM
              </span>
              <h2 id="games-title">
                Kısa turlu, izleyeni de içine çeken <em>oyunlar.</em>
              </h2>
              <p>
                Tüm oyunların görselleri, logosu ve renkleri şirketinize göre
                hazırlanır.
              </p>
            </div>

            <article id={bag.id} className={styles.feature} data-reveal>
              <Frame shape="wide" caption="OYUN EKRANI · ÖRNEK TASARIM">
                <Photo
                  image={media.bag}
                  sizes="(max-width:800px) 100vw, 58vw"
                />
              </Frame>
              <Copy item={bag} no={8} />
            </article>

            <article
              id={timer.id}
              className={styles.feature}
              data-flip
              data-reveal
            >
              <Frame shape="wide" caption="20.27 SANİYE · YILBAŞI KONSEPTİ">
                <Photo
                  image={media.timer}
                  sizes="(max-width:800px) 100vw, 58vw"
                />
              </Frame>
              <Copy item={timer} no={9} />
            </article>

            <article id={wheel.id} className={styles.feature} data-reveal>
              <Frame
                shape="wide"
                caption="HEDİYE ÇARKI · ÖRNEK YILBAŞI KONSEPTİ"
              >
                <Photo
                  image={holidayGiftWheel}
                  sizes="(max-width:800px) 100vw, 58vw"
                />
              </Frame>
              <Copy item={wheel} no={10} />
            </article>

            <div className={styles.gameGrid} data-reveal>
              {gameCards.map((item, i) => (
                <article key={item.id} id={item.id}>
                  <div>
                    <span className={styles.gameNo}>{pad(11 + i)}</span>
                    <span className={styles.players}>{item.players}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                  <Actions item={item} />
                </article>
              ))}
            </div>

            <div className={styles.extras} data-reveal>
              <div>
                <span className={styles.kicker}>+ DAHA FAZLASI</span>
                <h3>Gecenin temposuna göre eklenebilecekler.</h3>
              </div>
              <ul>
                {extras.map((item) => (
                  <li key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.body}</p>
                    </div>
                    <Actions item={{ product: item.name, slug: item.slug }} />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            id="temalar"
            className={styles.themes}
            aria-labelledby="examples-title"
          >
            <div className={styles.sectionIntro} data-reveal>
              <span className={styles.kicker}>AI PHOTO · TEMALAR</span>
              <h2 id="examples-title">
                Aynı kutlama. <em>Farklı dünyalar.</em>
              </h2>
              <p>
                Solda etkinlikte çekilen kare, sağda saniyeler sonra hazır olan
                çıktı. İster karlı bir yılbaşı gecesi, ister neon ışıklı bir
                80’ler partisi; tema markanıza göre tasarlanır.
              </p>
            </div>
            <div className={styles.beforeAfter} data-reveal>
              {(
                [
                  [media.before1, media.after1, "KIŞ MASALI"],
                  [media.before2, media.after2, "RETRO GALA"],
                ] as const
              ).map(([before, after, label]) => (
                <figure key={label}>
                  <div>
                    <Photo
                      image={before}
                      sizes="(max-width:800px) 40vw, 18vw"
                    />
                    <span aria-hidden="true">→</span>
                    <Photo image={after} sizes="(max-width:800px) 55vw, 26vw" />
                  </div>
                  <figcaption>ÖNCE → SONRA · {label}</figcaption>
                </figure>
              ))}
            </div>
            <div className={styles.examplePhotos} data-reveal>
              {campaignThemes.map((item) => (
                <ThemeGallery key={item.key} theme={item} />
              ))}
            </div>
            <div className={styles.themeStudio} data-reveal>
              <div>
                <span className={styles.kicker}>
                  TEK BİR TEMAYLA SINIRLI KALMAYIN
                </span>
                <h3>
                  Geçmişe, geleceğe. <em>Ya da Noel Baba’nın yanına.</em>
                </h3>
                <p>
                  Retro parti, uzay, kış pazarı ve kar küresi gibi farklı
                  dünyalar; logo, renkler ve fotoğraf çerçevesiyle şirketinizin
                  hikâyesine uyarlanabilir.
                </p>
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
                <p className={styles.themeDisclaimer}>
                  AI konsept örnekleridir. Etkinliğinizin teması ve uygulanacak
                  tasarımlar birlikte değerlendirilip onaylanır.
                </p>
              </div>
              <div className={styles.collectionPhoto}>
                <Photo
                  key={collection.key}
                  image={collection.image}
                  sizes="(max-width:800px) 100vw, 60vw"
                />
              </div>
            </div>
          </section>

          <section className={styles.process} aria-labelledby="process-title">
            <div className={styles.sectionIntro} data-reveal>
              <span className={styles.kicker}>SÜREÇ</span>
              <h2 id="process-title">
                Üç adımda <em>sahnede.</em>
              </h2>
            </div>
            <ol data-reveal>
              {[
                [
                  "Seçin",
                  "Tarih, şehir, alan ve kişi sayısıyla başlarız. Deneyimleri seçin; müsaitliği ve kapsamı birlikte kontrol edelim.",
                ],
                [
                  "Tasarlayalım",
                  "Şirketinize özel tema ve uygulama tasarımlarını hazırlar, etkinlik öncesi onayınıza sunarız.",
                ],
                [
                  "Sahadayız",
                  "Kurulum, teknik gereksinimler, saha ekibi ve çalışma saatleri teklif kapsamında netleştirilir.",
                ],
              ].map(([title, body], i) => (
                <li key={title}>
                  <span>{pad(i + 1)}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.why} aria-labelledby="why-title">
            <span className={styles.kicker}>NEDEN METASOFTCO</span>
            <h2 id="why-title" data-reveal>
              Yazılımı, tasarımı, donanımı ve saha operasyonunu{" "}
              <em>kendi ekibimizle</em> yürütüyoruz. Oyunları ve temaları size
              özel tasarlıyoruz.
            </h2>
            <span className={styles.kicker}>
              BİRLİKTE ÇALIŞTIĞIMIZ MARKALARDAN BAZILARI
            </span>
            <div className={styles.logos}>
              <ul>
                {[...brands, ...brands].map((brand, i) => (
                  <li
                    key={`${brand.name}-${i}`}
                    aria-hidden={i >= brands.length ? true : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/PNG logos */}
                    <img
                      src={brand.src}
                      alt={i < brands.length ? brand.name : ""}
                      width={brand.width}
                      height={32}
                      loading="lazy"
                      data-variant={brand.variant}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.tiers} aria-labelledby="tiers-title">
            <div className={styles.sectionIntro} data-reveal>
              <span className={styles.kicker}>
                NEREDEN BAŞLAYACAĞINIZI BİLMİYORSANIZ
              </span>
              <h2 id="tiers-title">
                Ekibiniz <em>kaç kişi?</em>
              </h2>
              <p>
                Bu kombinasyonlar bir başlangıç önerisi. Kapasite ve istasyon
                planı; süreye, alana ve katılımcı akışına göre netleşir.
              </p>
            </div>
            <div className={styles.tierRows} data-reveal>
              {occasion.tiers.map((tier) => (
                <article key={tier.range}>
                  <span>{tier.range}</span>
                  <h3>{tier.title}</h3>
                  <p>{tier.products.join(" + ")}</p>
                  <a
                    href="#teklif"
                    onClick={() => {
                      setTouched(true);
                      setProducts([...tier.products]);
                    }}
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
              <div className={styles.sectionIntro} data-reveal>
                <span className={styles.kicker}>
                  EKRANDA KALAN BİR FİKİR DEĞİL
                </span>
                <h2 id="refs-title">
                  Gerçek uygulamalardan <em>iki örnek.</em>
                </h2>
              </div>
              <div data-reveal>
                {references.map((project) => (
                  <article key={project.href}>
                    <Link href={project.href}>
                      <Image
                        src={project.image.url}
                        alt={project.image.alt}
                        width={900}
                        height={600}
                        sizes="(max-width:800px) 90vw, 45vw"
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
            ref={quote}
            className={styles.quote}
            aria-labelledby="quote-title"
          >
            <div className={styles.quoteIntro}>
              <span className={styles.kicker}>YILBAŞI PLANINIZI KONUŞALIM</span>
              <h2 id="quote-title">
                Hangi deneyimler <em>sizinle olsun?</em>
              </h2>
              <p>
                Her şeyin netleşmiş olması gerekmiyor. Seçtiklerinizi ve ilk
                bilgileri paylaşın; deneyim, müsaitlik ve operasyon kapsamını
                birlikte değerlendirelim.
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
              <a
                href="tel:+905342334051"
                onClick={() =>
                  trackEvent("phone_click", { source: "yilbasi_campaign" })
                }
              >
                +90 534 233 40 51
              </a>
            </div>
            <Quote products={products} onProducts={setProducts} />
          </section>

          <section id="sss" className={styles.faq} aria-labelledby="faq-title">
            <div>
              <span className={styles.kicker}>AKLINIZDA KALMASIN</span>
              <h2 id="faq-title">
                Kısa <em>cevaplar.</em>
              </h2>
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
        <MsClosing />
        <MsBehaviour />

        <div
          className={styles.tray}
          data-open={touched && products.length > 0 && !quoteVisible}
          aria-live="polite"
        >
          <p>
            <strong>{products.length} deneyim</strong>
            <span>{products.join(" · ")}</span>
          </p>
          <a
            href="#teklif"
            className={styles.primary}
            tabIndex={touched && products.length > 0 && !quoteVisible ? 0 : -1}
          >
            Teklif iste ↗
          </a>
        </div>
      </div>
    </Selection.Provider>
  );
}
