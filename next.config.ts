import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Editpanel ve API: yönetim panelinde her zaman güncel veri görünmeli,
      // yukarıdaki genel 1 saatlik tarayıcı önbelleği burada geçersiz kılınır.
      {
        source: "/editpanel/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },

  // Eski site URL'leri için kalıcı yönlendirmeler (301)
  async redirects() {
    return [
      // Intent-preserving public migrations.
      { source: "/isler", destination: "/projeler", permanent: true },
      {
        source: "/sektorel-cozumler/istanbul-ai-photobooth",
        destination: "/hizmetler/istanbul-ai-photobooth",
        permanent: true,
      },
      {
        source: "/en/sector-solutions/istanbul-ai-photobooth",
        destination: "/en/services/ai-event-solutions/ai-photobooth",
        permanent: true,
      },
      // ---------------------------------------------------------
      // 1. SPESİFİK TARİHLİ LİNKLER (En üstte olmalı - Özel Kural)
      // ---------------------------------------------------------
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/pegasus-dijital-carkifelek-aktivitesi/:path*",
        destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/serdar-bostanci-50-yil-ai-fotograf-deneyimi/:path*",
        destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo",
        permanent: true,
      },

      // ---------------------------------------------------------
      // 2. ESKİ İNGİLİZCE VE EKSİK KATEGORİ KLASÖRLERİNİ TOPLU YAKALAMA (Wildcard)
      // ---------------------------------------------------------
      {
        source: "/hizmetler/ai-event-solutions/:path*",
        destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri",
        permanent: true,
      },
      {
        source: "/hizmetler/photobooth-and-photo-activations/:path*",
        destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari",
        permanent: true,
      },
      {
        source: "/hizmetler/interactive-event-activities/:path*",
        destination: "/hizmetler/interaktif-etkinlik-aktiviteleri",
        permanent: true,
      },
      {
        source: "/neler-yapiyoruz/interaktif-makinalar/:path*",
        destination: "/hizmetler/interaktif-etkinlik-aktiviteleri",
        permanent: true,
      },

      // ---------------------------------------------------------
      // 3. TEKİL ESKİ SAYFA VE HİZMET YÖNLENDİRMELERİ
      // ---------------------------------------------------------
      { source: "/cozumler", destination: "/sektorel-yazilim-cozumleri", permanent: true },
      { source: "/cozumler/:path*", destination: "/sektorel-yazilim-cozumleri/:path*", permanent: true },
      { source: "/sektorel-yazilim-cozumleri/tekstil-sektoru", destination: "/sektorel-yazilim-cozumleri/tekstil-sektoru-dijital-donusum", permanent: true },

      { source: "/hizmetler/yapay-zeka", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/hizmetler/yapay-zeka/:path*", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/:path*", permanent: true },
      { source: "/hizmetler/interaktif", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/hizmetler/interaktif/:path*", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/:path*", permanent: true },
      { source: "/hizmetler/fotograf-video", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/hizmetler/fotograf-video/:path*", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/:path*", permanent: true },

      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-draw", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-draw-portre-cizim", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror-akilli-ayna", permanent: true },

      { source: "/hizmetler/interaktif-etkinlik-aktiviteleri/memory-game", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/interaktif-hafiza-oyunu-kiralama", permanent: true },
      { source: "/hizmetler/interaktif-etkinlik-aktiviteleri/recycle-win", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/geri-donusum-oyunu-recycle-win", permanent: true },
      { source: "/hizmetler/interaktif-etkinlik-aktiviteleri/digital-gift-wheel", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },

      { source: "/blog/etkinlikte-ai-photobooth-neden-kullanmali", destination: "/blog/etkinliklerde-ai-photobooth-avantajlari", permanent: true },

      { source: "/serdar-bostanci-50-yil-ai-fotograf-deneyimi", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo", permanent: true },
      { source: "/serdar-bostanci-50-yil-ai-fotograf-deneyimi/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo", permanent: true },

      { source: "/video-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/fotograf-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/interaktif-aktiviteler", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/yapay-zeka-aktiviteleri", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/reflex-wall", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/reflex-game-hiz-ve-rekabet-oyunu", permanent: true },
      { source: "/pegasus-dijital-carkifelek-aktivitesi", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },
      { source: "/pegasus-dijital-carkifelek-aktivitesi/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },

      { source: "/neler-yapiyoruz/video-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/video-aktiviteleri/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/fotograf-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/fotograf-aktiviteleri/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-greenbox/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", permanent: true },

      { source: "/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", permanent: true },
      { source: "/ai-greenbox/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", permanent: true },
      { source: "/ar-photo", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/ar-photo", permanent: true },
      { source: "/ar-photo/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/ar-photo", permanent: true },
      { source: "/ai-art-bookmark", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-bookmark", permanent: true },
      { source: "/ai-art-bookmark/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-bookmark", permanent: true },
      { source: "/maze-game", destination: "/hizmetler", permanent: true },
      { source: "/maze-game/", destination: "/hizmetler", permanent: true },
      { source: "/ai-photo-child", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo-child", permanent: true },
      { source: "/ai-photo-child/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo-child", permanent: true },
      { source: "/photobooth", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth", permanent: true },
      { source: "/photobooth/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth", permanent: true },
      { source: "/ai-player-card-yapay-zeka-ile-kisisellestirilmis-futbolcu-kart", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/ai-player-card-yapay-zeka-ile-kisisellestirilmis-futbolcu-kart/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
    ];
  },

  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinaryLoader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "*.cdninstagram.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "assets.aceternity.com", pathname: "/**" },
      { protocol: "https", hostname: "*.fbcdn.net", pathname: "/**" },
    ],
  },
};

export default nextConfig;
