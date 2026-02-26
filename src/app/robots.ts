import { MetadataRoute } from "next";

const disallow = ["/editpanel", "/api", "/login"];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://metasoftco.com";

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
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
