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
      "Sıcak ışıklar, karla kaplı bir kulübe, hediye ve yılbaşı portresi. Markanızın konseptine uyarlanabilecek örnek AI çıktıları.",
    frames: [winter1, winter2, winter3, winter4].map((file, i) => ({
      image: image(
        file,
        `Karlı kulübede yılbaşı portresi — örnek AI tema görseli ${i + 1}`,
      ),
      thumbnail: image(
        [winterThumb1, winterThumb2, winterThumb3, winterThumb4][i],
        `Kış portresi ${i + 1}`,
      ),
      label: `Kış portresi ${i + 1}`,
    })),
  },
  {
    key: "retro",
    title: "Kutlama 80’lere dönsün.",
    description:
      "Neon ışıkları, disko topu ve retro bir parti atmosferi. Daha renkli bir şirket kutlaması için örnek AI tema serisi.",
    frames: [retro1, retro2, retro3, retro4].map((file, i) => ({
      image: image(
        file,
        `Neon ışıklı 1980’ler yılbaşı partisi — örnek AI tema görseli ${i + 1}`,
      ),
      thumbnail: image(
        [retroThumb1, retroThumb2, retroThumb3, retroThumb4][i],
        `Retro portre ${i + 1}`,
      ),
      label: `Retro portre ${i + 1}`,
    })),
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
