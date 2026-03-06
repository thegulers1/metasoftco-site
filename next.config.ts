import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

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
