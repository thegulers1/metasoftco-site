import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const disallow = [
  "/editpanel",
  "/api",
  "/login",
  // WordPress döneminden kalma, artık var olmayan yollar — bot taramalarının
  // Search Console'da 403/404 gürültüsü üretmemesi için açıkça engellenir.
  // Vercel'in edge güvenlik duvarı bunları zaten kalıcı olarak reddediyor.
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/wp-json",
  "/wp-login.php",
  "/xmlrpc.php",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Tüm botlar
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // OpenAI GPTBot
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow,
      },
      // Anthropic ClaudeBot
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow,
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow,
      },
      // Google Gemini / AI Overviews
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow,
      },
      // Meta AI
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow,
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
