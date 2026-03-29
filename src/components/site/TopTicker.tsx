"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function TopTicker() {
  const { t } = useLanguage();
  const text = t(
    "İnteraktif Aktiviteler, Yapay Zeka, Fotoğraf & Video,  Bizimle iletişime geçin!",
    "Interactive Activities, Artificial Intelligence, Photo & Video,  Get in touch with us!"
  );

  return (
    <div className="ticker">
      <div className="ticker__inner">
        <span>{text} {text}</span>
        <span>{text} {text}</span>
        <span>{text} {text}</span>
        <span>{text} {text}</span>
      </div>
    </div>
  );
}
