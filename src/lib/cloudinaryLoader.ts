import { ImageLoaderProps } from "next/image";

const MAX_WIDTH = 1920;

// /_next/image bu yapılandırmada kapalı (loader: "custom"), yerel görseller küçülmez.
// scripts/make-campaign-variants.mjs bu klasöre -480 / -800 / -1200 / tam boy sürümler üretir.
const VARIANT_DIR = "/images/yilbasi/v/";
// -1200 sürümü yalnızca 1200 pikselden geniş kaynaklarda vardır (betik çıktısındaki *-1200.webp
// dosyaları). 3x ekranlı telefonlar ~1100-1300 px ister; bu liste olmadan tam boy dosyayı alıyorlardı.
// Yeni geniş görsel eklenince betiği çalıştırıp adını buraya ekleyin.
const WIDE = new Set([
    "20-27-saniye",
    "ai-photo-kiosk",
    "hediye-cantasi",
    "kapak",
    "kiosk-event-hero",
    "kiosk-experience",
    "theme-worlds-01",
    "theme-worlds-02",
]);

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
    if (src.startsWith(VARIANT_DIR) && src.endsWith(".webp")) {
        const base = src.slice(0, -".webp".length);
        if (width <= 480) return `${base}-480.webp`;
        if (width <= 800) return `${base}-800.webp`;
        if (width <= 1200 && WIDE.has(base.slice(VARIANT_DIR.length))) return `${base}-1200.webp`;
        return src;
    }
    if (!src.includes("res.cloudinary.com")) {
        return src;
    }

    // Cap width to avoid oversized Cloudinary requests (e.g. w_3840 causes 400s from bots)
    const clampedWidth = Math.min(width, MAX_WIDTH);
    const q = quality ? `q_${quality}` : "q_auto";
    // Animated GIFs need fl_animated or f_auto/width transforms flatten them to a static frame.
    const isGif = /\.gif($|\?)/i.test(src);
    const transforms = isGif ? `f_auto,${q},fl_animated,w_${clampedWidth}` : `f_auto,${q},w_${clampedWidth}`;
    return src.replace("/image/upload/", `/image/upload/${transforms}/`);
}
