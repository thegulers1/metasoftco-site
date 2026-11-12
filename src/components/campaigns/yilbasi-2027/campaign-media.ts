import type { StaticImageData } from "next/image";
import type { CampaignImage } from "./load";
import video360 from "./assets/holiday-360-photo.webp";
import photobooth from "./assets/holiday-photobooth.webp";
import giftWheel from "./assets/holiday-gift-wheel.webp";
import hero from "./assets/kiosk-event-hero.webp";
import kiosk from "./assets/kiosk-experience.webp";
import retro1 from "./assets/retro-01.webp";
import retro2 from "./assets/retro-02.webp";
import retro3 from "./assets/retro-03.webp";
import retro4 from "./assets/retro-04.webp";
import winter1 from "./assets/winter-01.webp";
import winter2 from "./assets/winter-02.webp";
import winter3 from "./assets/winter-03.webp";
import winter4 from "./assets/winter-04.webp";
import retroThumb1 from "./assets/retro-01-thumb.webp";
import retroThumb2 from "./assets/retro-02-thumb.webp";
import retroThumb3 from "./assets/retro-03-thumb.webp";
import retroThumb4 from "./assets/retro-04-thumb.webp";
import winterThumb1 from "./assets/winter-01-thumb.webp";
import winterThumb2 from "./assets/winter-02-thumb.webp";
import winterThumb3 from "./assets/winter-03-thumb.webp";
import winterThumb4 from "./assets/winter-04-thumb.webp";
import worlds1 from "./assets/theme-worlds-01.webp";
import worlds2 from "./assets/theme-worlds-02.webp";

// Tam boy dosyayı her cihaza göndermemek için büyük görseller
// public/images/yilbasi/v/ altındaki boyutlu sürümlerden servis edilir
// (scripts/make-campaign-variants.mjs). Küçük resimler olduğu gibi kalır.
function image(file: StaticImageData, alt: string): CampaignImage {
  const name = file.src.match(/\/([^/]+?)\.[0-9a-f]{6,}\.webp$/)?.[1];
  const url =
    name && !name.endsWith("-thumb") ? `/images/yilbasi/v/${name}.webp` : file.src;
  return { url, width: file.width, height: file.height, alt };
}
export interface ThemeFrame {
  image: CampaignImage;
  thumbnail: CampaignImage;
  label: string;
}
export interface CampaignTheme {
  key: string;
  title: string;
  description: string;
  frames: ThemeFrame[];
}

function themeFrame(
  file: StaticImageData,
  thumbnail: StaticImageData,
  label: string,
  alt: string,
): ThemeFrame {
  return { image: image(file, alt), thumbnail: image(thumbnail, label), label };
}

export const campaignHero = image(
  hero,
  "MetasoftCo kioskunun yanında poz veren kadın, yılbaşı temalı ekran arayüzü ve örnek AI fotoğraf çıktısı",
);
export const kioskExperience = image(
  kiosk,
  "Etkinlik alanındaki MetasoftCo AI Photo kiosku, katılımcı ve yılbaşı temalı fotoğraf sonuçlarını gösteren konsept kompozisyonu",
);

export const campaignThemes: CampaignTheme[] = [
  {
    key: "winter",
    title: "Karlı bir yılbaşı hikâyesi.",
    description:
      "Karla kaplı dağ evi, ışıklı yılbaşı pazarı, kuzey ışıkları ve havai fişeklerle aydınlanan buz pisti.",
    frames: [
      themeFrame(
        winter1,
        winterThumb1,
        "Karlı dağ evi",
        "Karla kaplı dağ evinin önünde, kırmızı atkısı ve hediyesiyle yılbaşı portresi",
      ),
      themeFrame(
        winter2,
        winterThumb2,
        "Yılbaşı pazarı",
        "Yıldız fenerleriyle süslenmiş karlı yılbaşı pazarında sıcak içeceğiyle poz veren katılımcı",
      ),
      themeFrame(
        winter3,
        winterThumb3,
        "Kuzey ışıkları",
        "Donmuş göl kıyısında, kuzey ışıkları ve ışıklı bir çam ağacıyla yılbaşı portresi",
      ),
      themeFrame(
        winter4,
        winterThumb4,
        "Yılbaşı buz pisti",
        "Havai fişekler altında açık hava buz pistinde paten kayan katılımcı",
      ),
    ],
  },
  {
    key: "retro",
    title: "80’lerden 2050’ye yılbaşı.",
    description:
      "2000’lerin milenyum partisi, neon ışıklı 80’ler, 1990’ın atari salonu ve 2050’nin şehir terası.",
    frames: [
      themeFrame(
        retro1,
        retroThumb1,
        "2000 milenyum partisi",
        "Pembe kapaklı telefon ve 2000 yazan folyo balonlarla milenyum yılbaşı portresi",
      ),
      themeFrame(
        retro2,
        retroThumb2,
        "80’ler neon partisi",
        "Neon ışıkları altında, omzunda kasetçalarla 80’ler yılbaşı portresi",
      ),
      themeFrame(
        retro3,
        retroThumb3,
        "1990 atari partisi",
        "Atari salonunda, filmli fotoğraf makinesiyle 1990 yılbaşı portresi",
      ),
      themeFrame(
        retro4,
        retroThumb4,
        "2050 teras partisi",
        "Holografik tabela ve havai fişekler eşliğinde 2050 yılbaşı portresi",
      ),
    ],
  },
];
export const themeCollections = [
  {
    key: "one",
    label: "Tema seçkisi 1",
    image: image(
      worlds1,
      "Retro 80’ler, gelecek 2050, uzay, Noel Baba, kızak ve yılbaşı pazarı içeren altı örnek AI tema portresi",
    ),
  },
  {
    key: "two",
    label: "Tema seçkisi 2",
    image: image(
      worlds2,
      "Altı farklı örnek yılbaşı AI teması: retro parti, gelecek, astronot, Noel Baba, kuzey ışıkları ve kış pazarı",
    ),
  },
];

export const holidayGiftWheel = image(
  giftWheel,
  "Yılbaşı temalı dijital hediye çarkı kiosku ve katılımcı — örnek konsept görseli",
);

export const holidayPhotobooth = image(
  photobooth,
  "Yılbaşı temalı photobooth kiosku önünde poz veren iki katılımcı ve fotoğraf şeridi — örnek konsept görseli",
);

export const holiday360Photo = image(
  video360,
  "Yılbaşı backdrop önünde platformda poz veren katılımcı ve döner kamera kollu 360 video aktivitesi — örnek konsept görseli",
);
