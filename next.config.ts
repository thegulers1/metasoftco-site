import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,

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
      // HTML dokümanları asla "taze" varsayılmamalı. Bir sayfa tarayıcıda
      // önbellekte kalıp deploy'u atlattığında, artık var olmayan hash'li
      // /_next/static chunk'larını isteyen eski bir doküman servis edilir:
      // stiller ve JS yüklenmez, React hydration uyuşmazlığı verir ve site
      // ancak "empty cache and hard reload" ile düzelir.
      // must-revalidate + ETag ile doküman her istekte doğrulanır (çoğu zaman
      // ucuz bir 304), hash'li asset'ler ise aşağıdaki kuralla uzun süre cache'lenir.
      // /_next dışlanır: Next kendi immutable başlığını verir, buradan ezersek
      // hash'li asset'ler gereksiz yere yeniden indirilir. api/editpanel de
      // dışlanır; onlar aşağıda kendi no-store başlığını alıyor ve eşleşen her
      // kural uygulandığı için aksi halde Cache-Control iki kez yazılırdı.
      {
        source: "/((?!_next/|api/|editpanel).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      // Editpanel ve API: yönetim panelinde her zaman güncel veri görünmeli,
      // bu yüzden doğrulamaya değil, tamamen önbelleksiz servise ihtiyaç var.
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
        destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/dr-jart-reflex-game-aktivitesi/:path*",
        destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/reflex-game-hiz-ve-rekabet-oyunu",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/photobooth/:path*",
        destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/360-video/:path*",
        destination: "/hizmetler/video/360-video-booth",
        permanent: true,
      },

      // ---------------------------------------------------------
      // 2. ESKİ İNGİLİZCE VE EKSİK KATEGORİ KLASÖRLERİNİ TOPLU YAKALAMA (Wildcard)
      // ---------------------------------------------------------
      // Bu wildcard'lardan önce, hâlâ karşılığı olan servisler için spesifik
      // hedefler tanımlanır — aksi halde herkes kategori hub'ına düşer ve asıl
      // sayfa kaybolur (Semrush/GSC "404" denetiminde bulunan durum).
      { source: "/hizmetler/ai-event-solutions/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama", permanent: true },
      { source: "/hizmetler/ai-event-solutions/ai-photo", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", permanent: true },
      { source: "/hizmetler/ai-event-solutions/sesli-asistan", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/hizmetler/photobooth-and-photo-activations/momento-ball", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/momento-ball", permanent: true },
      { source: "/hizmetler/interactive-event-activities/catch-collect-game", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/catch-collect-game", permanent: true },
      { source: "/hizmetler/interactive-event-activities/charge-bike", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/charge-bike", permanent: true },
      { source: "/neler-yapiyoruz/interaktif-makinalar/digital-gift-wheel", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },
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

      { source: "/serdar-bostanci-50-yil-ai-fotograf-deneyimi", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", permanent: true },
      { source: "/serdar-bostanci-50-yil-ai-fotograf-deneyimi/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", permanent: true },

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
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-greenbox/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-player-card", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-football-card", permanent: true },
      { source: "/neler-yapiyoruz/yapay-zeka-aktiviteleri/ai-player-card/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-football-card", permanent: true },

      { source: "/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama", permanent: true },
      { source: "/ai-greenbox/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama", permanent: true },
      { source: "/ai-photo", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", permanent: true },
      { source: "/ai-photo/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", permanent: true },
      { source: "/ar-photo", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/ar-photo", permanent: true },
      { source: "/ar-photo/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/ar-photo", permanent: true },
      { source: "/ai-art-bookmark", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-bookmark", permanent: true },
      { source: "/ai-art-bookmark/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-bookmark", permanent: true },
      { source: "/maze-game", destination: "/hizmetler", permanent: true },
      { source: "/maze-game/", destination: "/hizmetler", permanent: true },
      { source: "/ai-photo-child", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo-child", permanent: true },
      { source: "/ai-photo-child/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo-child", permanent: true },
      { source: "/photobooth", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala", permanent: true },
      { source: "/photobooth/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala", permanent: true },
      { source: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala", permanent: true },
      { source: "/ai-player-card-yapay-zeka-ile-kisisellestirilmis-futbolcu-kart", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-football-card", permanent: true },
      { source: "/ai-player-card-yapay-zeka-ile-kisisellestirilmis-futbolcu-kart/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-football-card", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/wordportre", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/wordportre-kirala", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/cizim-robotu", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/cizim-robotu-kiralama", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photo", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala", permanent: true },
      { source: "/hizmetler/yapay-zeka-etkinlik-cozumleri/sesli-asistan", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri", permanent: true },
      { source: "/en/services/ai-event-solutions/ai-photo", destination: "/en/services/ai-event-solutions/ai-photobooth", permanent: true },

      // ---------------------------------------------------------
      // 4. GSC/SEMRUSH 404 DENETİMİNDE BULUNAN TEKİL ESKİ LİNKLER
      // ---------------------------------------------------------
      { source: "/strip-photo", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/strip-photo", permanent: true },
      { source: "/strip-photo/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/strip-photo", permanent: true },
      { source: "/ai-star-talk", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-star-talk", permanent: true },
      { source: "/ai-star-talk/", destination: "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-star-talk", permanent: true },
      { source: "/cabin-photo", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/cabin-photo", permanent: true },
      { source: "/cabin-photo/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/cabin-photo", permanent: true },
      { source: "/gift-wheel", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },
      { source: "/gift-wheel/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu", permanent: true },
      { source: "/referanslarimiz", destination: "/projeler", permanent: true },
      { source: "/referanslarimiz/", destination: "/projeler", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
      { source: "/contact/", destination: "/en/contact", permanent: true },
      { source: "/interactive-quiz", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi", permanent: true },
      { source: "/interactive-quiz/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi", permanent: true },
      { source: "/digital-quiz", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi", permanent: true },
      { source: "/digital-quiz/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi", permanent: true },
      { source: "/projeler/undefined", destination: "/projeler", permanent: true },

      // Artık karşılığı olmayan, tamamen kaldırılmış aktiviteler — en yakın
      // kategori sayfasına yönlendirilir.
      { source: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari/aqua-booth", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/instawall", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/instawall/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/information-wall", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/information-wall/", destination: "/hizmetler/interaktif-etkinlik-aktiviteleri", permanent: true },
      { source: "/photobooth-poster", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
      { source: "/photobooth-poster/", destination: "/hizmetler/photobooth-ve-fotograf-aktivasyonlari", permanent: true },
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
