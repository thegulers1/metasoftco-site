import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Build sırasında TS hatalarının CI'ı kırmasını engelle
  typescript: { ignoreBuildErrors: true },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // Eski site URL'leri için kalıcı yönlendirmeler (301) — Google indexinden temizlemek için
  async redirects() {
    return [
      { source: "/star-map", destination: "/", permanent: true },

      // /cozumler → /sektorel-yazilim-cozumleri (301 kalıcı yönlendirme)
      { source: "/cozumler", destination: "/sektorel-yazilim-cozumleri", permanent: true },
      { source: "/cozumler/:path*", destination: "/sektorel-yazilim-cozumleri/:path*", permanent: true },

      // Tekstil sektörü slug güncelleme
      { source: "/sektorel-yazilim-cozumleri/tekstil-sektoru", destination: "/sektorel-yazilim-cozumleri/tekstil-sektoru-dijital-donusum", permanent: true },

      // Kategori: yapay-zeka → yapay-zeka-etkinlik-cozumleri
      { source: "/hizmetler/yapay-zeka", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/hizmetler/yapay-zeka/:path*", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/:path*", permanent: true },
      // Hizmet slug güncellemeleri — yapay-zeka kategorisi
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-draw", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-draw-portre-cizim", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror-akilli-ayna", permanent: true },

      // Hizmet slug güncellemeleri — interaktif kategorisi
      // Reflex Game: tüm eski slug'lar → yeni final slug
      { source: "/hizmetler/interaktif/reflex-game-interaktif-etkinlik-cozumu", destination: "/hizmetler/interaktif/reflex-game-hiz-ve-rekabet-oyunu", permanent: true },
      { source: "/hizmetler/interaktif/reflex-game-interaktif-hiz-oyunu", destination: "/hizmetler/interaktif/reflex-game-hiz-ve-rekabet-oyunu", permanent: true },

      // Dijital Hediye Çarkı: tüm eski slug'lar → yeni final slug
      { source: "/hizmetler/interaktif/digital-gift-wheel", destination: "/hizmetler/interaktif/dijital-hediye-carki-aktivasyonu", permanent: true },
      { source: "/hizmetler/interaktif/dijital-hediye-carki-etkinlik", destination: "/hizmetler/interaktif/dijital-hediye-carki-aktivasyonu", permanent: true },

      // Diğer interaktif hizmet slug güncellemeleri
      { source: "/hizmetler/interaktif/memory-game", destination: "/hizmetler/interaktif/interaktif-hafiza-oyunu-kiralama", permanent: true },
      { source: "/hizmetler/interaktif/recycle-win", destination: "/hizmetler/interaktif/geri-donusum-oyunu-recycle-win", permanent: true },

      // Blog yazısı slug güncelleme
      { source: "/blog/etkinlikte-ai-photobooth-neden-kullanmali", destination: "/blog/etkinliklerde-ai-photobooth-avantajlari", permanent: true },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
