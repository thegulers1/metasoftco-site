"use client";

import { useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AlternateUrls({ tr, en }: { tr: string; en: string }) {
  const { setAlternateUrl } = useLanguage();
  useEffect(() => setAlternateUrl(tr, en), [tr, en, setAlternateUrl]);
  return null;
}
