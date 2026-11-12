import type { SaleProduct } from "./types";

/** Prices from the November 2026 kiosk price list (USD, VAT excluded). */
export const AI_PHOTO_KIOSK: SaleProduct = {
  slug: "ai-photobooth-kurumsal-satis",
  name: { tr: "AI Photo Kiosk", en: "AI Photo Kiosk" },
  tagline: {
    tr: "Mağaza, showroom ve deneyim alanları için anahtar teslim yapay zekâ fotoğraf kiosku. Donanım, yazılım, markalı arayüz, kurulum ve eğitim tek pakette.",
    en: "A turnkey AI photo kiosk for stores, showrooms and experience spaces. Hardware, software, branded interface, installation and training in one package.",
  },
  images: [
    {
      url: "/images/ai-photo-kiosk/uc-ceyrek.webp",
      alt: {
        tr: "Siyah AI Photo Kiosk, sağ çapraz görünüm ve yan LED şeridi",
        en: "Black AI Photo Kiosk, front-right view with side LED strip",
      },
    },
    {
      url: "/images/ai-photo-kiosk/on.webp",
      alt: {
        tr: "Siyah AI Photo Kiosk, tam ön görünüm ve fotoğraf çıkış tepsisi",
        en: "Black AI Photo Kiosk, front view with photo output tray",
      },
    },
  ],
  imageNote: {
    tr: "Mat siyah gövde · Temsili ürün renderları",
    en: "Matte black housing · Illustrative product renders",
  },
  sizeLabel: { tr: "Ekran boyutu", en: "Screen size" },
  sizes: [
    {
      id: "32",
      name: { tr: '32" kiosk', en: '32" kiosk' },
      detail: { tr: "Kompakt alanlar için", en: "For compact spaces" },
      price: 6250,
      campaignPrice: 5950,
    },
    {
      id: "43",
      name: { tr: '43" kiosk', en: '43" kiosk' },
      detail: { tr: "Mağaza ve showroom için", en: "For stores and showrooms" },
      price: 7950,
      campaignPrice: 7550,
    },
    {
      id: "49",
      name: { tr: '49" kiosk', en: '49" kiosk' },
      detail: { tr: "Uzaktan fark edilen büyük ekran", en: "A large screen seen from afar" },
      price: 9200,
      campaignPrice: 8750,
    },
  ],
  modules: [
    {
      id: "ai-photo",
      name: { tr: "AI Photo", en: "AI Photo" },
      summary: { tr: "Markalı yapay zekâ portresi", en: "Branded AI portraits" },
      body: {
        tr: "Katılımcı ekranın karşısında poz verir; yapay zekâ fotoğrafı saniyeler içinde markanıza özel bir sahneye taşır. Fotoğraf QR ile telefona gider; yazıcı eklenirse anında basılır. Tema, çerçeve ve arayüz kurumsal kimliğinize göre tasarlanır.",
        en: "Guests pose in front of the screen and AI places them in a scene built for your brand within seconds. The photo reaches their phone by QR code and prints instantly if you add the printer. Theme, frame and interface follow your corporate identity.",
      },
      projects: [
        "castrol-edge-x-ai-photo-kiosk-yapay-zek-fotograf-deneyimi",
        "tavuk-dunyasi-x-ai-photo",
      ],
    },
    {
      id: "try-on",
      name: { tr: "Virtual Try-On", en: "Virtual Try-On" },
      summary: { tr: "Markanızın kıyafetleriyle sanal deneme", en: "Virtual try-on with your brand’s apparel" },
      body: {
        tr: "Katılımcılara markanızın kıyafetlerini kendi üzerlerinde görme imkânı sağlar. Yapay zekâ seçilen ürünü kişinin üzerine gerçekçi biçimde giydirir; sonuç QR ile telefona gelir, yazıcı eklenirse basılır.",
        en: "Lets guests see your brand’s apparel on themselves. AI dresses them in the selected item realistically; the result reaches their phone by QR code and prints if you add the printer.",
      },
      projects: [
        "adidas-evo-sl-x-ai-try-on-photo",
        "defacto-x-afra-saracoglu-ai-fashion-experience",
      ],
    },
  ],
  extraModulePrice: 2000,
  campaign: {
    endsAt: "2027-01-01T00:00:00+03:00",
    label: { tr: "31 Aralık 2026’ya kadar", en: "Until 31 December 2026" },
  },
  fullKit: ["camera", "printer"],
  fullKitLabel: { tr: "Kamera ve yazıcı dahil tam donanım", en: "Fully equipped with camera and printer" },
  addons: [
    {
      id: "camera",
      name: { tr: "Canon EOS 1300D kamera", en: "Canon EOS 1300D camera" },
      detail: {
        tr: "AI Photo ve Virtual Try-On için gerekli · montaj dahil",
        en: "Required for AI Photo and Virtual Try-On · mounting included",
      },
      price: 790,
      preselected: true,
      removeNote: {
        tr: "Kamera olmadan yapay zekâ modülleri çalışmaz. Uyumlu bir kameranız varsa teklif formunda belirtin.",
        en: "The AI modules need a camera. If you already have a compatible one, mention it in the quote form.",
      },
    },
    {
      id: "printer",
      name: { tr: "Citizen CY-02 fotoğraf yazıcısı", en: "Citizen CY-02 photo printer" },
      detail: {
        tr: "Anında fiziksel baskı · 700 baskılık kâğıt ve şerit dahil",
        en: "Instant prints · paper and ribbon for 700 prints included",
      },
      price: 795,
    },
    {
      id: "case",
      name: { tr: "Taşıma case", en: "Transport case" },
      detail: {
        tr: "Kioskun güvenle taşınması için sert taşıma case",
        en: "Hard case to move the kiosk safely",
      },
      price: 730,
    },
    {
      id: "wrap",
      name: { tr: "Kiosk dış giydirme", en: "Kiosk exterior wrap" },
      detail: {
        tr: "Gövdenin kurumsal kimliğinizle kaplanması",
        en: "The housing wrapped in your corporate identity",
      },
      price: 400,
    },
  ],
  credits: { free: 1000, unitPrice: 0.4, packs: [500, 1000] },
  included: [
    { tr: "Dokunmatik ekran, bilgisayar ve LED aydınlatmalı kiosk gövdesi", en: "Touchscreen, computer and LED-lit kiosk housing" },
    { tr: "QR ile anında dijital paylaşım", en: "Instant digital sharing by QR code" },
    { tr: "Seçtiğiniz yazılım modülü, kurulu ve markalı arayüzle", en: "Your chosen software module, installed with a branded interface" },
    { tr: "İlk 1.000 görsel üretimi hediye", en: "First 1,000 image generations free" },
    { tr: "Yerinde kurulum ve ekibinize kullanım eğitimi", en: "On-site installation and training for your team" },
  ],
  specs: [
    { label: { tr: "Ekran", en: "Screen" }, value: { tr: '32" · 43" · 49" dokunmatik', en: '32" · 43" · 49" touchscreen' } },
    { label: { tr: "Kamera", en: "Camera" }, value: { tr: "Canon EOS 1300D (ayrı fiyatlandırılır, +790 $)", en: "Canon EOS 1300D (priced separately, +$790)" } },
    { label: { tr: "Yazıcı", en: "Printer" }, value: { tr: "Citizen CY-02 (isteğe bağlı, +795 $)", en: "Citizen CY-02 (optional, +$795)" } },
    { label: { tr: "Sarf malzeme", en: "Supplies" }, value: { tr: "Yazıcıyla 700 baskılık kâğıt ve şerit", en: "Paper and ribbon for 700 prints with the printer" } },
    { label: { tr: "Yazılım", en: "Software" }, value: { tr: "AI Photo veya Virtual Try-On; ikisi aynı kioskta çalışabilir", en: "AI Photo or Virtual Try-On; both can run on one kiosk" } },
    { label: { tr: "Paylaşım", en: "Sharing" }, value: { tr: "QR ile dijital paylaşım; yazıcıyla anında baskı", en: "Digital sharing by QR code; instant prints with the printer" } },
    { label: { tr: "Elektrik", en: "Power" }, value: { tr: "Standart 220 V priz", en: "Standard 220 V socket" } },
    { label: { tr: "Garanti", en: "Warranty" }, value: { tr: "12 ay donanım garantisi", en: "12-month hardware warranty" } },
  ],
  process: [
    {
      title: { tr: "Seçim", en: "Selection" },
      body: {
        tr: "Ekran boyutuna ve ilk modüle kullanım senaryonuza göre birlikte karar veririz.",
        en: "We choose the screen size and first module together, based on how you will use it.",
      },
    },
    {
      title: { tr: "Tasarım", en: "Design" },
      body: {
        tr: "Ekran arayüzü, tema ve baskı çerçevesi kurumsal kimliğinizle hazırlanır, onayınıza sunulur.",
        en: "Interface, theme and print frame are designed in your corporate identity and sent for your approval.",
      },
    },
    {
      title: { tr: "Kurulum", en: "Installation" },
      body: {
        tr: "Belirlediğiniz noktada kurar, uçtan uca test eder ve ekibinize kullanımı öğretiriz.",
        en: "We install it where you choose, test it end to end and train your team.",
      },
    },
  ],
  terms: [
    {
      title: { tr: "Ödeme", en: "Payment" },
      body: {
        tr: "Siparişte %50 ön ödeme, kalan %50 teslimattan sonra faturalandırılır.",
        en: "50% on order; the remaining 50% is invoiced after delivery.",
      },
    },
    {
      title: { tr: "Neden dolar?", en: "Why US dollars?" },
      body: {
        tr: "Donanımı üreticiden dolarla tedarik ediyoruz. Fatura, fatura tarihindeki TCMB döviz satış kuruyla TL kesilir.",
        en: "We source the hardware in US dollars. Invoices are issued in TRY at the Central Bank of Türkiye selling rate on the invoice date.",
      },
    },
    {
      title: { tr: "Görsel kredisi", en: "Image credits" },
      body: {
        tr: "İlk 1.000 görsel hediye. Sonrası görsel başına 0,40 $; 500 veya 1.000’lik paketler, kullanılmayan kredi devreder.",
        en: "First 1,000 images free. After that $0.40 per image in packs of 500 or 1,000; unused credits carry over.",
      },
    },
    {
      title: { tr: "Garanti", en: "Warranty" },
      body: {
        tr: "Her kiosk için 12 ay donanım garantisi. Yazılım güncellemeleri ve uzaktan destek pakete dahildir.",
        en: "12-month hardware warranty on every kiosk. Software updates and remote support are included.",
      },
    },
  ],
  faq: [
    {
      q: { tr: "Kiralamak yerine neden satın almalıyım?", en: "Why buy instead of renting?" },
      a: {
        tr: "Kiosku mağaza, showroom veya deneyim merkezi gibi sabit bir noktada sürekli kullanacaksanız satın almak mantıklıdır; ortalama 5–6 kiralama bedeli bir satış bedeline denk gelir. Yılda birkaç etkinlik için kiralama daha pratiktir: her seferinde farklı bir aktivasyon seçersiniz, operasyonu ekibimiz yürütür.",
        en: "If the kiosk will run continuously at a fixed location such as a store, showroom or experience centre, buying makes sense; on average 5–6 rentals cost as much as one purchase. For a few events a year, renting is more practical: you can pick a different activation each time and our team runs it.",
      },
    },
    {
      q: { tr: "Fiyata neler dahil?", en: "What does the price include?" },
      a: {
        tr: "Kiosk fiyatına dokunmatik ekran, bilgisayar, LED aydınlatmalı gövde, seçtiğiniz bir yazılım modülü, markalı arayüz, QR paylaşım, ilk 1.000 görsel, yerinde kurulum ve eğitim dahildir. Donanım ayrı fiyatlandırılır: Canon EOS 1300D kamera 790 $ (yapay zekâ modülleri için gerekli), Citizen CY-02 yazıcı 700 baskılık sarf malzemeyle 795 $. Taşıma case ve kiosk dış giydirme isteğe bağlıdır.",
        en: "The kiosk price covers the touchscreen, computer, LED-lit housing, one software module of your choice, a branded interface, QR sharing, the first 1,000 images, on-site installation and training. Hardware is priced separately: the Canon EOS 1300D camera is $790 (required for the AI modules) and the Citizen CY-02 printer with supplies for 700 prints is $795. The transport case and exterior wrap are optional.",
      },
    },
    {
      q: { tr: "Görsel kredisi nasıl çalışıyor?", en: "How do image credits work?" },
      a: {
        tr: "Her yapay zekâ görseli bir kredi kullanır. İlk 1.000 görsel kiosk ile birlikte hediyedir. Sonrası görsel başına 0,40 $ + KDV’dir ve 500 ya da 1.000 adetlik paketlerle alınır; kullanılmayan kredi sonraki etkinliklere devreder.",
        en: "Each AI image uses one credit. The first 1,000 come free with the kiosk. After that it is $0.40 + VAT per image, bought in packs of 500 or 1,000; unused credits carry over to later events.",
      },
    },
    {
      q: { tr: "İkinci modülü sonradan ekleyebilir miyiz?", en: "Can we add the second module later?" },
      a: {
        tr: "Evet. AI Photo ve Virtual Try-On aynı donanımda çalışır; ikinci modül 2.000 $ + KDV yazılım lisansıyla eklenir, ek cihaz gerekmez.",
        en: "Yes. AI Photo and Virtual Try-On run on the same hardware; the second module is added with a $2,000 + VAT software licence and needs no extra device.",
      },
    },
    {
      q: { tr: "Fiyatlar neden dolar, fatura nasıl kesiliyor?", en: "Why are prices in US dollars, and how are we invoiced?" },
      a: {
        tr: "Kiosk donanımını ve bileşenlerini üreticiden dolarla tedarik ediyoruz. Fatura, fatura tarihindeki TCMB döviz satış kuru üzerinden TL olarak kesilir. Fiyatlara KDV dahil değildir.",
        en: "We source the kiosk hardware and components in US dollars. Invoices are issued in TRY at the Central Bank of Türkiye selling rate on the invoice date. Prices exclude VAT.",
      },
    },
    {
      q: { tr: "Ödeme nasıl yapılıyor?", en: "How does payment work?" },
      a: {
        tr: "Siparişle birlikte %50 ön ödeme alınır, kalan %50 teslimattan sonra faturalandırılır. Kiosk üzerindeki tüm görsel ve arayüzler kurumsal onayınızdan sonra üretime alınır.",
        en: "50% is paid with the order and the remaining 50% is invoiced after delivery. All visuals and interfaces on the kiosk go into production only after your approval.",
      },
    },
    {
      q: { tr: "Garanti ne kadar?", en: "What is the warranty?" },
      a: {
        tr: "Her kiosk için 12 ay donanım garantisi vardır. Yazılım güncellemeleri ve uzaktan destek pakete dahildir.",
        en: "Every kiosk has a 12-month hardware warranty. Software updates and remote support are included.",
      },
    },
    {
      q: { tr: "Fotoğraflar KVKK’ya uygun mu?", en: "Is photo handling GDPR/KVKK compliant?" },
      a: {
        tr: "Fotoğraflar KVKK’ya uygun bir bilgilendirme ekranıyla çekilir; saklama süresini sizinle birlikte belirleriz.",
        en: "Photos are taken after a KVKK-compliant information screen, and we set the retention period together with you.",
      },
    },
  ],
  showcase: [
    "castrol-edge-x-ai-photo-kiosk-yapay-zek-fotograf-deneyimi",
    "adidas-evo-sl-x-ai-try-on-photo",
    "defacto-x-afra-saracoglu-ai-fashion-experience",
    "tavuk-dunyasi-x-ai-photo",
  ],
  rental: {
    tr: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala",
    en: "/en/services/ai-event-solutions/ai-photobooth",
  },
};
