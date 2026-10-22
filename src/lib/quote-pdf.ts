import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Quote } from "@prisma/client";
import { siteConfig } from "@/lib/site";
import {
    formatTL,
    normalizeOptions,
    optionLetter,
    optionTotals,
    parseQuoteDefaults,
    type QuoteDefaults,
} from "@/lib/quotes";

/**
 * The quote as a self-contained A4 HTML page for headless Chrome. Logo and
 * fonts are inlined from /public so the only outside requests are product
 * photos on Cloudinary.
 */

const BRAND_RED = "#E94B35";

const esc = (value: string | null | undefined) =>
    (value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const lines = (value: string | null | undefined) =>
    (value ?? "").split("\n").map((l) => l.replace(/^[-•*\s]+/, "").trim()).filter(Boolean);

const longDate = (date: Date) => date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

/** JPEG at print size: f_auto would hand Chrome WebP/AVIF, which bloats the PDF. */
function printImage(url: string) {
    if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) return url;
    return url.replace("/image/upload/", "/image/upload/f_jpg,q_80,w_520/");
}

let assetsPromise: Promise<{ logo: string; fonts: string }> | null = null;

function loadAssets() {
    assetsPromise ??= (async () => {
        const pub = path.join(process.cwd(), "public");
        const b64 = async (file: string) => (await readFile(path.join(pub, file))).toString("base64");
        const [logo, latin, latinExt] = await Promise.all([
            b64("blackLogo.png"),
            b64("fonts/inter-tight-300-900-normal-latin.woff2"),
            b64("fonts/inter-tight-300-900-normal-latin-ext.woff2"),
        ]);
        const face = (data: string, range: string) =>
            `@font-face{font-family:'Inter Tight';font-weight:300 900;src:url(data:font/woff2;base64,${data}) format("woff2");unicode-range:${range}}`;
        return {
            logo: `data:image/png;base64,${logo}`,
            fonts:
                face(latin, "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212") +
                face(latinExt, "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF,U+20A0-20C0"),
        };
    })().catch((error) => {
        assetsPromise = null;
        throw error;
    });
    return assetsPromise;
}

const CHECK = `<svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true"><path d="M2 6.4 4.8 9 10 3" fill="none" stroke="${BRAND_RED}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export async function buildQuoteHtml(quote: Quote, defaultsValue: string | null | undefined) {
    const { logo, fonts } = await loadAssets();
    const defaults: QuoteDefaults = parseQuoteDefaults(defaultsValue);
    const options = normalizeOptions(quote.options);
    const multi = options.length > 1;
    const ctx = { vatRate: quote.vatRate, city: quote.city, shippingAmount: quote.shippingAmount };

    const eventMeta = [quote.eventDate, quote.city, quote.venue].filter(Boolean).map(esc).join(" · ");
    const contactMeta = [quote.contactEmail, quote.contactPhone].filter(Boolean).map(esc).join(" · ");

    const optionBlocks = options
        .map((option, index) => {
            const totals = optionTotals(option, ctx);
            const items = option.items
                .map((item) => {
                    const meta = [`${item.quantity} adet`, `${item.days} gün`].join(" · ");
                    const inclusions = item.inclusions.length
                        ? `<ul class="inc">${item.inclusions.map((inc) => `<li>${CHECK}<span>${esc(inc)}</span></li>`).join("")}</ul>`
                        : "";
                    return `
                <article class="item">
                    ${item.image ? `<div class="item-img"><img src="${esc(printImage(item.image))}" alt=""></div>` : ""}
                    <div class="item-body">
                        <div class="item-head">
                            <div>
                                <h3>${esc(item.title)}</h3>
                                <p class="meta">${meta}</p>
                            </div>
                            <div class="item-price">${formatTL(item.amount)}<small>+ KDV</small></div>
                        </div>
                        ${item.description ? `<p class="desc">${esc(item.description)}</p>` : ""}
                        ${inclusions ? `<p class="inc-title">Bütçeye dahil olanlar</p>${inclusions}` : ""}
                        ${item.note ? `<p class="note">${esc(item.note)}</p>` : ""}
                    </div>
                </article>`;
                })
                .join("");

            const rows = totals.rows
                .map(
                    (r) => `<tr><td>${esc(r.label)}</td><td>${formatTL(r.net)}</td><td>${formatTL(r.vat)}</td><td>${formatTL(r.gross)}</td></tr>`,
                )
                .join("");

            return `
            <section class="option">
                ${
                    multi
                        ? `<header class="opt-head"><span class="badge">${optionLetter(index)}</span><h2>Seçenek ${optionLetter(index)}${option.title ? ` · ${esc(option.title)}` : ""}</h2></header>`
                        : `<header class="opt-head"><h2>${esc(option.title) || "Teklif detayı"}</h2></header>`
                }
                ${items}
                <table class="prices">
                    <thead><tr><th>Kalem</th><th>Tutar (KDV hariç)</th><th>KDV (%${quote.vatRate})</th><th>Toplam (KDV dahil)</th></tr></thead>
                    <tbody>${rows}</tbody>
                    <tfoot>
                        <tr class="sum"><td>Ara toplam</td><td>${formatTL(totals.net)}</td><td>${formatTL(totals.vat)}</td><td>${formatTL(totals.gross)}</td></tr>
                        <tr class="grand"><td colspan="4"><div><p>Genel toplam${multi ? ` · Seçenek ${optionLetter(index)}` : ""} <span>(KDV hariç ${formatTL(totals.net)})</span></p><p>${formatTL(totals.gross)}</p></div></td></tr>
                    </tfoot>
                </table>
            </section>`;
        })
        .join("");

    const summary = multi
        ? `
        <section class="summary">
            <h2>Seçenek özeti</h2>
            <table class="prices">
                <thead><tr><th>Seçenek</th><th>KDV hariç</th><th>KDV (%${quote.vatRate})</th><th>KDV dahil</th></tr></thead>
                <tbody>${options
                    .map((option, index) => {
                        const t = optionTotals(option, ctx);
                        return `<tr><td><strong>${optionLetter(index)}</strong>${option.title ? ` · ${esc(option.title)}` : ""}</td><td>${formatTL(t.net)}</td><td>${formatTL(t.vat)}</td><td>${formatTL(t.gross)}</td></tr>`;
                    })
                    .join("")}</tbody>
            </table>
        </section>`
        : "";

    const notes = [
        `Tutarlar KDV hariçtir; %${quote.vatRate} KDV ayrıca eklenir.`,
        ...lines(quote.notes),
        ...lines(defaults.notes),
    ];

    return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Teklif ${esc(quote.number)}</title>
<style>
${fonts}
@page { size: A4; margin: 14mm 15mm 20mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Inter Tight', Arial, sans-serif; color: #111; font-size: 9.5pt; line-height: 1.45; }
.top { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 7mm; border-bottom: 1.5px solid #111; }
.top img { width: 46mm; height: auto; margin: -3mm 0 0 -2mm; }
.doc { text-align: right; }
.doc .label { color: ${BRAND_RED}; font-weight: 800; letter-spacing: .14em; font-size: 8pt; }
.doc .no { font-size: 17pt; font-weight: 800; letter-spacing: -.01em; margin: 1mm 0 2mm; }
.doc dl { display: grid; grid-template-columns: auto auto; gap: .6mm 4mm; font-size: 8.5pt; color: #555; justify-content: end; }
.doc dt { text-align: right; }
.doc dd { color: #111; font-weight: 600; text-align: right; }
.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; padding: 6mm 0 7mm; }
.parties .k { font-size: 7.5pt; font-weight: 800; letter-spacing: .14em; color: #888; margin-bottom: 1.5mm; }
.parties .big { font-size: 13pt; font-weight: 750; line-height: 1.2; }
.parties p { color: #444; }
.option { margin-top: 2mm; }
.option + .option { break-before: page; }
.opt-head { display: flex; align-items: center; gap: 3mm; margin-bottom: 4mm; }
.opt-head h2 { font-size: 13pt; font-weight: 800; letter-spacing: -.01em; }
.badge { display: inline-flex; align-items: center; justify-content: center; width: 7.5mm; height: 7.5mm; border-radius: 2mm; background: ${BRAND_RED}; color: #fff; font-weight: 800; font-size: 11pt; }
.item { display: flex; gap: 5mm; padding: 4.5mm 0; border-top: 1px solid #e3e3e3; break-inside: avoid; }
.item-img { flex: 0 0 44mm; }
.item-img img { display: block; max-width: 44mm; max-height: 40mm; width: auto; height: auto; border-radius: 1.5mm; }
.item-body { flex: 1; min-width: 0; }
.item-head { display: flex; justify-content: space-between; gap: 6mm; align-items: flex-start; }
.item h3 { font-size: 11.5pt; font-weight: 750; line-height: 1.25; }
.meta { font-size: 8.5pt; color: #777; margin-top: .5mm; }
.item-price { font-size: 12pt; font-weight: 800; white-space: nowrap; text-align: right; }
.item-price small { display: block; font-size: 7.5pt; font-weight: 600; color: #888; }
.desc { margin-top: 2mm; color: #444; }
.inc-title { margin-top: 2.5mm; font-size: 7.5pt; font-weight: 800; letter-spacing: .12em; color: #888; }
.inc { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: .8mm 5mm; margin-top: 1.2mm; }
.inc li { display: flex; gap: 1.8mm; align-items: baseline; }
.inc svg { flex: none; position: relative; top: .3mm; }
.note { margin-top: 2mm; font-size: 8.5pt; color: #555; font-style: italic; }
.prices { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 4mm; break-inside: avoid; font-size: 9pt; }
.prices th { text-align: right; font-size: 7.5pt; font-weight: 800; letter-spacing: .06em; color: #777; padding: 2mm 0 2mm 3mm; border-bottom: 1.5px solid #111; }
.prices td { text-align: right; padding: 1.8mm 0 1.8mm 3mm; border-bottom: 1px solid #ececec; white-space: nowrap; }
.prices th:first-child, .prices td:first-child { text-align: left; padding-left: 0; white-space: normal; }
.prices .sum td { font-weight: 700; border-bottom: none; }
.prices .grand td { padding: 0; border: none; }
.prices .grand div { display: flex; justify-content: space-between; align-items: baseline; background: #111; color: #fff; font-weight: 800; font-size: 11pt; padding: 3mm 5.5mm 3mm 3mm; box-shadow: inset -2.5mm 0 0 ${BRAND_RED}; }
.prices .grand span { font-weight: 500; font-size: 8.5pt; color: #bbb; }
.summary { margin-top: 9mm; break-inside: avoid; }
.summary h2, .notes h2 { font-size: 11pt; font-weight: 800; }
.notes { margin-top: 8mm; break-inside: avoid; }
.notes ul { margin-top: 2mm; padding-left: 4mm; color: #444; font-size: 8.5pt; }
.notes li { margin-top: .8mm; }
.notes li:first-child { color: #111; font-weight: 700; }
.sign { margin-top: 9mm; break-inside: avoid; font-size: 9pt; color: #444; }
.sign strong { display: block; color: #111; font-size: 10pt; margin-top: 1mm; }
</style>
</head>
<body>
    <header class="top">
        <img src="${logo}" alt="MetasoftCo">
        <div class="doc">
            <p class="label">FİYAT TEKLİFİ</p>
            <p class="no">${esc(quote.number)}</p>
            <dl>
                <dt>Tarih</dt><dd>${longDate(quote.createdAt)}</dd>
                ${quote.validUntil ? `<dt>Geçerlilik</dt><dd>${longDate(quote.validUntil)}</dd>` : ""}
            </dl>
        </div>
    </header>

    <section class="parties">
        <div>
            <p class="k">SAYIN</p>
            <p class="big">${esc(quote.company)}</p>
            ${quote.contactName ? `<p>${esc(quote.contactName)}</p>` : ""}
            ${contactMeta ? `<p>${contactMeta}</p>` : ""}
        </div>
        ${
            quote.eventName || eventMeta
                ? `<div>
            <p class="k">ETKİNLİK</p>
            ${quote.eventName ? `<p class="big">${esc(quote.eventName)}</p>` : ""}
            ${eventMeta ? `<p>${eventMeta}</p>` : ""}
        </div>`
                : ""
        }
    </section>

    ${optionBlocks}
    ${summary}

    <section class="notes">
        <h2>Notlar</h2>
        <ul>${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
    </section>

    <section class="sign">
        Teklifimizle ilgili sorularınız için bize her zaman ulaşabilirsiniz.
        <strong>Saygılarımızla, MetasoftCo</strong>
    </section>
</body>
</html>`;
}

/** Puppeteer footer: printed on every page, outside the page body. */
export function quoteFooterTemplate() {
    const { company, contact, url } = siteConfig;
    const host = url.replace(/^https?:\/\//, "");
    return `<div style="width:100%;padding:0 15mm;font-family:Arial,sans-serif;font-size:6.5pt;color:#888;display:flex;justify-content:space-between;gap:6mm;">
        <span>${esc(company.legalName)} · ${esc(contact.address)}</span>
        <span style="white-space:nowrap;">${esc(contact.phone)} · ${esc(contact.email)} · ${esc(host)} · <span class="pageNumber"></span>/<span class="totalPages"></span></span>
    </div>`;
}
