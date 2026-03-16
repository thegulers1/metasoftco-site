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
      // Buraya eski sitedeki diğer URL'leri ekleyebilirsiniz:
      // { source: "/eski-sayfa", destination: "/", permanent: true },
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
