"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function TopTicker() {
  const { t } = useLanguage();
  const text = t(
    "İnteraktif Aktiviteler · Yapay Zeka Etkinlik Çözümleri · Fotoğraf & Video Aktivasyonları · Bizimle İletişime Geçin ·",
    "Interactive Activities · AI Event Solutions · Photo & Video Activations · Get in Touch ·"
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__inner">
        <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
      </div>
    </div>
  );
}
