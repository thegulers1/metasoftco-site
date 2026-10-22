import puppeteer, { type Browser } from "puppeteer-core";

const LOCAL_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/**
 * Headless Chrome for the PDF routes (/sunum, teklifler).
 * - Vercel/Lambda: @sparticuz/chromium.
 * - Docker (Coolify): the image installs Alpine's chromium and sets
 *   CHROME_EXECUTABLE_PATH; a container has no user namespaces, so Chrome
 *   runs without its sandbox and with /tmp instead of the small /dev/shm.
 * - Local macOS: the installed Google Chrome.
 */
export async function launchPdfBrowser(viewport: { width: number; height: number; deviceScaleFactor?: number }): Promise<Browser> {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        const chromium = (await import("@sparticuz/chromium")).default;
        return puppeteer.launch({
            args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
            executablePath: await chromium.executablePath(),
            headless: "shell",
            defaultViewport: viewport,
        });
    }
    const inContainer = process.platform === "linux";
    return puppeteer.launch({
        executablePath: process.env.CHROME_EXECUTABLE_PATH || LOCAL_CHROME,
        headless: true,
        defaultViewport: viewport,
        args: inContainer ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] : [],
    });
}
