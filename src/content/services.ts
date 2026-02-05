export type ServiceCategory = {
  title: string;
  description: string;
  href: string;
  tags: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    title: "AI Photo & Face Swap",
    description: "Katılımcıyı konsept karaktere dönüştürün, anında çıktı/QR.",
    href: "/hizmetler/ai-photo",
    tags: ["AI", "Face Swap", "QR"],
  },
  {
    title: "Photobooth & Video Booth",
    description: "Fotoğraf / 360 video / green screen ile premium hatıra üretimi.",
    href: "/hizmetler/photobooth",
    tags: ["Photo", "Video", "Print"],
  },
  {
    title: "Interactive Games",
    description: "Reflex wall, dance game, dokunmatik oyunlar, ödüllü kurgular.",
    href: "/hizmetler/interactive-games",
    tags: ["Kiosk", "Game", "Prize"],
  },
  {
    title: "AR Filters & Social",
    description: "Instagram filtreleri, instawall, UGC akışları ve etkileşim.",
    href: "/hizmetler/ar-social",
    tags: ["AR", "IG", "UGC"],
  },
  {
    title: "Experience Design",
    description: "Konsept, akış, alan tasarımı ve uçtan uca etkinlik deneyimi.",
    href: "/hizmetler/experience-design",
    tags: ["Concept", "Flow", "On-site"],
  },
  {
    title: "Custom Software",
    description: "Markaya özel web/kiosk uygulamaları, veri toplama ve raporlama.",
    href: "/hizmetler/custom-software",
    tags: ["Web", "API", "Analytics"],
  },
];
