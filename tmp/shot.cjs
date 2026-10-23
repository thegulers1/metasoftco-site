const puppeteer = require("puppeteer-core");
(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, defaultViewport: { width: 1440, height: 900 } });
  const p = await b.newPage();
  for (const [name, path] of [["blog", "/blog"], ["post", "/blog/etkinliklerde-ai-face-swap-nasil-calisir"]]) {
    await p.goto("https://www.metasoftco.com" + path, { waitUntil: "networkidle2", timeout: 120000 });
    await p.evaluate(() => document.querySelectorAll('[class*="ookie"], [class*="consent"]').forEach(e => e.remove()));
    await new Promise(r => setTimeout(r, 3000));
    await p.screenshot({ path: `${process.argv[2]}/${name}.png`, fullPage: true });
  }
  await b.close();
})();
