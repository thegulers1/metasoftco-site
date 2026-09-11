import { writeFile } from "node:fs/promises";

const origin = "https://www.metasoftco.com";
const sitemapUrl = `${origin}/sitemap.xml`;
const robotsUrl = `${origin}/robots.txt`;
const outputPath = new URL("./no-key-audit-data.json", import.meta.url);

const decode = (value = "") => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#x27;", "'")
  .replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");

const stripTags = (html = "") => decode(html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
  .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim());

const attrs = (tag = "") => {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
};

const firstMatch = (html, regex) => decode(html.match(regex)?.[1]?.trim() ?? "");
const allTags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>[\\s\\S]*?<\\/${name}>`, "gi"))].map((match) => match[0]);
const absoluteUrl = (value, base) => {
  if (!value || value.startsWith("data:")) return value;
  try { return new URL(value, base).href; } catch { return value; }
};

async function get(url, method = "GET") {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      headers: {
        "user-agent": "MetasoftCo-No-Key-SEO-Audit/1.0",
        ...(method === "HEAD" ? { accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" } : {}),
      },
      signal: AbortSignal.timeout(30000),
    });
    const body = method === "GET" ? await response.text() : "";
    return {
      ok: true,
      status: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type") ?? "",
      contentLength: Number(response.headers.get("content-length") || 0),
      cacheControl: response.headers.get("cache-control") ?? "",
      elapsedMs: Date.now() - started,
      body,
    };
  } catch (error) {
    return { ok: false, status: 0, finalUrl: url, elapsedMs: Date.now() - started, error: String(error), body: "" };
  }
}

async function mapLimit(items, limit, fn) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      output[index] = await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return output;
}

function parsePage(url, fetchResult) {
  const html = fetchResult.body;
  const visibleText = stripTags(html);
  const words = visibleText.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? [];
  const sentences = visibleText.split(/[.!?]+(?:\s|$)/).map((x) => x.trim()).filter(Boolean);
  const headingData = {};
  for (const level of [1, 2, 3]) {
    headingData[`h${level}`] = allTags(html, `h${level}`).map(stripTags).filter(Boolean);
  }

  const jsonLd = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decode(match[1]));
      const nodes = Array.isArray(parsed) ? parsed : parsed?.["@graph"] || [parsed];
      jsonLd.push({ valid: true, nodes });
    } catch (error) {
      jsonLd.push({ valid: false, error: String(error), raw: match[1].slice(0, 300) });
    }
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const images = imageTags.map((tag, index) => {
    const a = attrs(tag);
    const src = absoluteUrl(a.src || "", url);
    const ext = (src.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i)?.[1] || "unknown").toLowerCase();
    const cloudinaryAuto = /res\.cloudinary\.com/.test(src) && /\/f_auto(?:,|\/)/.test(src);
    const nextOptimized = /\/_next\/image\?/.test(src);
    return {
      index,
      src,
      altPresent: Object.hasOwn(a, "alt"),
      alt: a.alt ?? null,
      altLength: a.alt?.length ?? null,
      role: a.role ?? "",
      ariaHidden: a["aria-hidden"] ?? "",
      width: a.width ?? null,
      height: a.height ?? null,
      hasDimensions: Boolean((a.width && a.height) || /aspect-ratio\s*:/.test(a.style || "")),
      loading: a.loading ?? "",
      decoding: a.decoding ?? "",
      fetchpriority: a.fetchpriority ?? "",
      srcset: a.srcset ?? "",
      sizes: a.sizes ?? "",
      responsive: Boolean(a.srcset && a.sizes),
      ext,
      efficientDelivery: cloudinaryAuto || nextOptimized || ["webp", "avif", "svg"].includes(ext),
      decorative: a.role === "presentation" || a["aria-hidden"] === "true",
    };
  });

  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => absoluteUrl(decode(match[1]), url));
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = firstMatch(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || firstMatch(html, /<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const canonical = firstMatch(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || firstMatch(html, /<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const robots = firstMatch(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);

  return {
    url,
    status: fetchResult.status,
    finalUrl: fetchResult.finalUrl,
    contentType: fetchResult.contentType,
    elapsedMs: fetchResult.elapsedMs,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical,
    robots,
    lang: firstMatch(html, /<html\b[^>]*lang=["']([^"']+)["']/i),
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordsPerSentence: sentences.length ? Number((words.length / sentences.length).toFixed(1)) : null,
    headings: headingData,
    jsonLd,
    schemaTypes: [...new Set(jsonLd.flatMap((block) => block.valid ? block.nodes.flatMap((node) => Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]]).filter(Boolean) : []))],
    microdataSignals: (html.match(/\b(?:itemscope|itemprop|itemtype)\b/gi) || []).length,
    rdfaSignals: (html.match(/\b(?:typeof|vocab|prefix)=["']/gi) || []).length,
    images,
    links: {
      internal: links.filter((link) => link.startsWith(origin)).length,
      external: links.filter((link) => /^https?:/i.test(link) && !link.startsWith(origin)).length,
      mailto: links.filter((link) => link.startsWith("mailto:")).length,
      tel: links.filter((link) => link.startsWith("tel:")).length,
      hrefs: [...new Set(links)],
    },
    trustSignals: {
      privacyLink: /href=["'][^"']*(?:gizlilik|privacy)/i.test(html),
      termsLink: /href=["'][^"']*(?:kullanim-kosullari|terms)/i.test(html),
      contactLink: /href=["'][^"']*(?:iletisim|contact)/i.test(html),
      aboutLink: /href=["'][^"']*(?:hakkimizda|about)/i.test(html),
      testimonials: /(?:referans|testimonial|müşteri yorum|customer stor)/i.test(visibleText),
      firstPartyProof: /(?:case study|vaka çalış|proje|1\.000\+|100\+ marka)/i.test(visibleText),
      authorSignal: /(?:yazar|author|written by|reviewed by)/i.test(visibleText),
      dates: [...visibleText.matchAll(/\b(?:20\d{2})\b/g)].map((m) => m[0]).slice(0, 10),
    },
  };
}

const [sitemapResponse, robotsResponse] = await Promise.all([get(sitemapUrl), get(robotsUrl)]);
if (sitemapResponse.status !== 200) throw new Error(`Sitemap fetch failed: ${sitemapResponse.status}`);

const sitemapEntries = [...sitemapResponse.body.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => ({
  loc: firstMatch(match[1], /<loc>([\s\S]*?)<\/loc>/i),
  lastmod: firstMatch(match[1], /<lastmod>([\s\S]*?)<\/lastmod>/i),
  changefreq: firstMatch(match[1], /<changefreq>([\s\S]*?)<\/changefreq>/i),
  priority: firstMatch(match[1], /<priority>([\s\S]*?)<\/priority>/i),
})).filter((entry) => entry.loc);

const pageFetches = await mapLimit(sitemapEntries, 12, async (entry) => get(entry.loc));
const pages = sitemapEntries.map((entry, index) => ({ ...entry, ...parsePage(entry.loc, pageFetches[index]) }));

const uniqueImageUrls = [...new Set(pages.flatMap((page) => page.images.map((image) => image.src)).filter((src) => /^https?:/i.test(src)))];
const imageHeads = await mapLimit(uniqueImageUrls, 16, async (url) => ({ url, ...(await get(url, "HEAD")) }));
const imageNetwork = imageHeads.map(({ body, ...entry }) => entry);

const result = {
  generatedAt: new Date().toISOString(),
  scope: "No-API-key live crawl of sitemap URLs",
  origin,
  robots: {
    status: robotsResponse.status,
    sitemapReferenced: robotsResponse.body.includes(sitemapUrl),
    gptBotAllowed: /User-Agent:\s*GPTBot[\s\S]*?Allow:\s*\//i.test(robotsResponse.body),
    claudeBotAllowed: /User-Agent:\s*ClaudeBot[\s\S]*?Allow:\s*\//i.test(robotsResponse.body),
    body: robotsResponse.body,
  },
  sitemap: {
    url: sitemapUrl,
    status: sitemapResponse.status,
    contentType: sitemapResponse.contentType,
    entries: sitemapEntries,
  },
  pages,
  imageNetwork,
};

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  generatedAt: result.generatedAt,
  pages: pages.length,
  ok200: pages.filter((page) => page.status === 200).length,
  non200: pages.filter((page) => page.status !== 200).length,
  uniqueImages: uniqueImageUrls.length,
  outputPath: outputPath.pathname,
}, null, 2));
