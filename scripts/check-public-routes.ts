import "dotenv/config";

const baseUrl = (process.env.ROUTE_CHECK_BASE_URL ?? "http://127.0.0.1:3001").replace(/\/$/, "");
const expectedCanonicalHost = "https://www.metasoftco.com";

async function fetchWithTimeout(path: string) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
        return await fetch(`${baseUrl}${path}`, { signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
}

async function main() {
    const sitemapResponse = await fetchWithTimeout("/sitemap.xml");
    if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
    const sitemap = await sitemapResponse.text();
    const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
    if (paths.length === 0) throw new Error("Sitemap contains no URLs");
    if (paths.some((path) => /\/isler$|\/test$|\/null(?:$|\/)/.test(path))) {
        throw new Error("Sitemap contains an excluded path");
    }

    const failures: string[] = [];
    let next = 0;
    await Promise.all(Array.from({ length: 5 }, async () => {
        while (next < paths.length) {
            const path = paths[next++];
            const response = await fetchWithTimeout(path);
            const html = await response.text();
            const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
            const alternateUrls = [...html.matchAll(/<link rel="alternate"[^>]*hreflang="[^"]+"[^>]*href="([^"]+)"/ig)].map((match) => match[1]);
            if (response.status !== 200) failures.push(`${path}: ${response.status}`);
            if (!canonical?.startsWith(expectedCanonicalHost)) failures.push(`${path}: invalid canonical ${canonical ?? "missing"}`);
            if (alternateUrls.some((url) => !url.startsWith(expectedCanonicalHost))) failures.push(`${path}: invalid hreflang host`);
        }
    }));

    if (failures.length > 0) throw new Error(`Route check failed:\n${failures.join("\n")}`);
    console.log(`Route check passed: ${paths.length} sitemap URLs have 200 final-host canonicals.`);
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
