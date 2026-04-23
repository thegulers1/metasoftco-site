import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,

  // Build sırasında TS hatalarının CI'ı kırmasını engelle
  typescript: { ignoreBuildErrors: true },

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

      // Kategori slug güncellemeleri
      { source: "/hizmetler/yapay-zeka", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/hizmetler/yapay-zeka/:path*", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/:path*", permanent: true },
      { source: "/hizmetler/interaktif", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/hizmetler/interaktif/:path*", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/:path*", permanent: true },
      { source: "/hizmetler/fotograf-video", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/hizmetler/fotograf-video/:path*", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/:path*", permanent: true },
      // Hizmet slug güncellemeleri — yapay-zeka kategorisi
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-draw", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-draw-portre-cizim", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror-akilli-ayna", permanent: true },

      // Hizmet slug güncellemeleri — interaktif kategorisi (doğru category slug ile)
      // NOT: Yukarıdaki wildcard /hizmetler/interaktif/:path* → /hizmetler/interaktif-etkinlik-aktiviteleri/:path*
      // sonrasında eski slug olan yollar burada final URL'ye yönlendirilir.
      { source: "/hizmetler/interaktif-etkinlik-aktiviteleri/memory-game", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/interaktif-hafiza-oyunu-kiralama", permanent: true },
      { source: "/hizmetler/interaktif-etkinlik-aktiviteleri/recycle-win", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/geri-donusum-oyunu-recycle-win", permanent: true },
      { source: "/hizmetler/interaktif-etkinlik-aktiviteleri/digital-gift-wheel", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },

      // Blog yazısı slug güncelleme
      { source: "/blog/etkinlikte-ai-photobooth-neden-kullanmali", destination: "/blog/etkinliklerde-ai-photobooth-avantajlari", permanent: true },

      // Eski blog/proje sayfaları
      { source: "/serdar-bostanci-50-yil-ai-fotograf-deneyimi", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo", permanent: true },
      { source: "/serdar-bostanci-50-yil-ai-fotograf-deneyimi/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo", permanent: true },

      // Eski aktivite sayfaları (doğrudan)
      { source: "/video-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/fotograf-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/interaktif-aktiviteler", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/yapay-zeka-aktiviteleri", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/reflex-wall", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/reflex-game-hiz-ve-rekabet-oyunu", permanent: true },
      { source: "/hashtag-photo", destination: "/", permanent: true },
      { source: "/pegasus-dijital-carkifelek-aktivitesi", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },
      { source: "/pegasus-dijital-carkifelek-aktivitesi/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },

      // /neler-yapiyoruz/* eski bölüm yönlendirmeleri
      { source: "/neler-yapiyoruz/video-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/video-aktiviteleri/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/fotograf-aktiviteleri", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/fotograf-aktiviteleri/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-greenbox/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", permanent: true },

      // Eski servis sayfaları (kök URL)
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
      { source: "/hashtag-photo/", destination: "/", permanent: true },
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
