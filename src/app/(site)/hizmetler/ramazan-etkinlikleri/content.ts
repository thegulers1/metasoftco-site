export const title = "Ramazan Etkinlikleri ve İnteraktif Aktiviteler";
export const description =
  "Belediyeler için Ramazan çadırı aktiviteleri, AI Photo, photobooth, 360 video ve interaktif çocuk oyunları. Etkinliğinize özel teklif alın.";
export const path = "/hizmetler/ramazan-etkinlikleri";

export type Media = { src: string; alt: string; width: number; height: number };

export function ramadanSrcSet({ src, width }: Media) {
  const base = src.slice(0, -".webp".length);
  return [
    ...[480, 800].filter((size) => size < width).map((size) => `${base}-${size}.webp ${size}w`),
    `${src} ${width}w`,
  ].join(", ");
}

function media(file: string, alt: string, width = 1024, height = 1536): Media {
  return {
    src: `${path.replace("/hizmetler", "")}/${file}.webp`,
    alt,
    width,
    height,
  };
}

export const comparisons = [
  {
    label: "Başörtülü anne ve kızı",
    image: media(
      "08-oncesi-sonrasi-basortulu-anne-kiz",
      "Başörtülü anne ve kızının günlük fotoğrafı ve fenerli Ramazan sokağına uyarlanmış örneği",
      1536,
      1024,
    ),
  },
  {
    label: "Anne ve oğlu",
    image: media(
      "09-oncesi-sonrasi-anne-ogul",
      "Anne ve oğlunun günlük fotoğrafı ve eski İstanbul sahnesine uyarlanmış örneği",
      1536,
      1024,
    ),
  },
];

export const hero = media(
  "13-360-video-platform-aile",
  "Ramazan çadırında döner kamera kolunun yanındaki 360 video platformunda poz veren aile konsepti",
);

export const memories = [
  {
    id: "ai",
    title: "AI Photo — Ramazan Hatırası",
    description:
      "Günlük kıyafetlerle çekilen fotoğraf, önceden tasarlanan bir Ramazan sahnesine uyarlanır. Eski İstanbul sokakları, fenerler ve döneme uygun kıyafetler aileye özel bir hatıra oluşturur.",
    images: [],
  },
  {
    id: "karagoz",
    title: "Hacivat ve Karagöz ile Aile Fotoğrafı",
    description:
      "Anne, baba ve çocuk fotoğraf görünümünü korurken Hacivat ve Karagöz, geleneksel gölge oyunu dekorunun çizgisel karakterleri olarak çerçeveye katılır.",
    images: [
      media(
        "07-gercek-aile-karagoz-cerceve",
        "Hacivat ve Karagöz çizimleri arasında fotoğraf görünümündeki aile",
      ),
    ],
    branded: true,
  },
  {
    id: "photo",
    title: "Photobooth ve Şerit Fotoğraf",
    description:
      "Aileler günlük kıyafetleriyle poz verir. Kurum logosuna uyarlanabilen Ramazan çerçevesi, tek pozlu 10 × 15 veya üç kareli şerit baskıda kullanılabilir. Baskı adedi ve dijital teslim seçenekleri teklifte belirlenir.",
    images: [
      media(
        "12-ramazan-tek-poz-10x15",
        "Ramazan çerçeveli 10 × 15 oranında tek pozlu aile baskısı",
      ),
      media(
        "11-ramazan-fotograf-seridi",
        "Üç aile pozu içeren dikey Ramazan fotoğraf şeridi",
        724,
        2172,
      ),
    ],
    branded: true,
  },
  {
    id: "360",
    title: "360 Video Booth",
    description:
      "Aile platformda poz verirken döner kamera kolu etraflarında kısa bir video kaydeder. Videoya etkinlik çerçevesi ve kurum kimliği uygulanabilir. GIF de alternatif olarak değerlendirilebilir.",
    images: [hero],
  },
];

export const games = [
  {
    id: "fener",
    title: "Fener Yakma",
    description: "Ekranda yanan fenerlere dokunarak puan toplayın.",
    image: media(
      "14-fener-yakma",
      "Dokunmatik ekranda yanan bir fenere dokunan çocuk",
      1150,
      1150,
    ),
  },
  {
    id: "pide",
    title: "Pide Toplama",
    description:
      "Sepeti sağa sola hareket ettirip düşen pide ve hurmaları yakalayın.",
    image: media(
      "15-pide-toplama",
      "Pide ve hurmaları sepetle yakalama oyununun ekranı",
      1150,
      1150,
    ),
  },
  {
    id: "hafiza",
    title: "Hafıza Kartları",
    description:
      "Kartları açıp fener, davul ve diğer Ramazan motiflerinin eşlerini bulun.",
    image: media(
      "16-hafiza-kartlari",
      "Ramazan motifli eşleştirme kartlarının oyun ekranı",
      1150,
      1150,
    ),
  },
  {
    id: "mahya",
    title: "Mahya Yapbozu",
    description: "Parçaları birleştirip ışıklı mahyayı tamamlayın.",
    image: media(
      "17-mahya-yapbozu",
      "Işıklı mahya ve yerleştirilecek yapboz parçaları",
    ),
  },
  {
    id: "bilgi",
    title: "Aile Bilgi Yarışması",
    description: "Ramazan kültürü ve genel bilgi sorularını ailece yanıtlayın.",
    image: media(
      "18-aile-bilgi-yarismasi",
      "Dokunmatik bilgi yarışması ekranında seçenekleri inceleyen aile",
    ),
  },
  {
    id: "iyilik",
    title: "İyilik Çarkı",
    description:
      "Hediye seçenekleri ve küçük iyilik görevleri için dijital çarkı çevirin.",
    image: media(
      "19-iyilik-carki",
      "Hediye ve iyilik görevleri içeren dijital çark",
    ),
    branded: true,
  },
  {
    id: "gercek",
    title: "Gerçek mi, Yapay Zekâ mı?",
    description:
      "Görselleri karşılaştırın, ipuçlarını tartışın ve içeriğin kaynağını nasıl sorgulayabileceğinizi keşfedin.",
    image: media(
      "20-gercek-mi-yapay-zeka-mi",
      "İki sofra görselini karşılaştıran aile ve oyun ekranı",
    ),
  },
  {
    id: "sofra",
    title: "İsrafsız Sofra",
    description:
      "Ambalajları uygun geri dönüşüm kutularına ayırın. Sayaç, oyun içindeki sanal ayrıştırmaları gösterir.",
    image: media(
      "21-israfsiz-sofra",
      "Ambalajları sanal geri dönüşüm kutularına ayırma ekranı",
    ),
    branded: true,
  },
  {
    id: "pedal",
    title: "Pedalla Mahyayı Yak",
    description:
      "Sabit bisiklette pedal çevirdikçe ekrandaki mahyanın ışıklarını adım adım yakın.",
    image: media(
      "22-pedalla-mahyayi-yak",
      "Sabit bisikletle ekrandaki mahya animasyonunu ilerleten çocuk",
    ),
  },
];

export const combinations = [
  {
    id: "hatira",
    title: "Hatıra Alanı",
    description:
      "AI Photo ile kişiselleştirilmiş bir hatıra, Photobooth veya Şerit Fotoğraf ile basılı bir aile pozu.",
    activities: ["ai", "photo"],
  },
  {
    id: "aile",
    title: "Aile Oyun Alanı",
    description:
      "Fener Yakma ve Hafıza Kartları gibi dokunmatik oyunların yanında Aile Bilgi Yarışması.",
    activities: ["fener", "hafiza", "bilgi"],
  },
  {
    id: "kapsamli",
    title: "Kapsamlı Ramazan Deneyimi",
    description:
      "Hatıra deneyimleri, seçili oyunlar ve 360 Video Booth. Alana göre 360 yerine Pedalla Mahyayı Yak seçilebilir.",
    activities: ["ai", "photo", "fener", "bilgi", "360"],
  },
];

export const steps = [
  [
    "Alanı ve ihtiyacı belirleyelim",
    "Tarih, mekân, etkinlik süresi ve beklenen ziyaretçi akışını birlikte değerlendirelim.",
  ],
  [
    "Görselleri ve içeriği hazırlayalım",
    "Kurum kimliğinizi fotoğraf çerçevelerine, ekranlara ve seçilen oyunlara uyarlayalım.",
  ],
  [
    "Kurulum ve testi planlayalım",
    "Ekipman yerleşimini, saha testlerini ve operatör ihtiyacını netleştirelim.",
  ],
  [
    "Etkinlik boyunca destek",
    "Çalışma saatlerini, saha ekibini ve teknik destek kapsamını etkinlik takvimine göre belirleyelim.",
  ],
];

export const faqs = [
  {
    q: "Aktiviteler belediyemizin logosuyla hazırlanabilir mi?",
    a: "Evet. Logo, renkler ve etkinlik teması fotoğraf çerçevelerine ve uygun ekran tasarımlarına uygulanabilir.",
  },
  {
    q: "Ramazan çadırı dışında meydan veya kültür merkezinde kurulabilir mi?",
    a: "Meydan, kültür merkezi ve benzeri alanlar değerlendirilebilir. Açık alanda hava koşulları, korunak ve zemin uygunluğu planlamaya dahildir.",
  },
  {
    q: "Birden fazla aktiviteyi birlikte seçebilir miyiz?",
    a: "Evet. Fotoğraf deneyimlerini ve oyunları alanınıza ve ziyaretçi akışınıza göre birlikte planlayabiliriz.",
  },
  {
    q: "Kurulum ve operatör hizmeti nasıl planlanıyor?",
    a: "Kurulum ve test takvimi ile operatör sayısı, seçilen ekipmana ve çalışma saatlerine göre teklifte belirlenir.",
  },
  {
    q: "Etkinlik alanında hangi altyapı gerekir?",
    a: "Elektrik, internet, zemin ve kapalı ya da açık alan koşulları seçilen aktivitelere ve mekâna göre değerlendirilir.",
  },
  {
    q: "Fotoğraflar basılı ve dijital olarak verilebilir mi?",
    a: "Uygun fotoğraf deneyimlerinde basılı ve dijital teslim planlanabilir. Baskı adedi, format ve paylaşım yöntemi teklifte netleşir.",
  },
  {
    q: "Tek günlük veya uzun süreli kiralama mümkün mü?",
    a: "Tek günlük etkinlikler ve Ramazan boyunca süren programlar için ayrı ekipman ve personel planı hazırlanabilir.",
  },
  {
    q: "Fiyatı hangi bilgiler belirliyor?",
    a: "Şehir, tarih, süre, aktivite ve ekipman sayısı, baskı adedi ve personel kapsamı fiyatı belirler.",
  },
];
