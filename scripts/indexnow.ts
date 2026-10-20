/**
 * Notifies IndexNow (Bing, Yandex, Seznam…) about changed URLs.
 *
 *   pnpm tsx scripts/indexnow.ts                 # every URL in the live sitemap
 *   pnpm tsx scripts/indexnow.ts /blog/a /hizmetler   # only these paths
 *
 * The key file lives at public/e0ea538c8770c6bca51dac8e506c49bb.txt; IndexNow fetches it to verify
 * that the submitter controls the host.
 */
const HOST = "www.metasoftco.com";
const ORIGIN = `https://${HOST}`;
const KEY = "e0ea538c8770c6bca51dac8e506c49bb";

async function sitemapUrls(): Promise<string[]> {
    const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function main() {
    const paths = process.argv.slice(2);
    const urlList = paths.length > 0 ? paths.map((path) => `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`) : await sitemapUrls();
    if (urlList.length === 0) throw new Error("No URLs to submit");

    const response = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
    });
    // 200 = accepted, 202 = accepted while the key is being verified.
    console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URL(s)`);
    if (response.status >= 300) {
        console.error(await response.text());
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
