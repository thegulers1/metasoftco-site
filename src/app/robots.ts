import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://metasoftco.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/editpanel", "/api", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
