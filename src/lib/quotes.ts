/**
 * Teklif (quote) shapes, money maths and settings shared by the editpanel
 * form, the API routes and the PDF. Amounts are always KDV hariç TL; KDV is
 * derived from the quote's vatRate and never stored.
 */

export const QUOTE_STATUSES = [
    { value: "DRAFT", label: "Taslak" },
    { value: "SENT", label: "Gönderildi" },
    { value: "ACCEPTED", label: "Kabul edildi" },
    { value: "REJECTED", label: "Reddedildi" },
] as const;

export type QuoteStatus = (typeof QUOTE_STATUSES)[number]["value"];

export const DEFAULT_VAT_RATE = 20;

export type OutputType = "none" | "digital" | "print";

export const OUTPUT_TYPE_LABELS: Record<OutputType, string> = {
    none: "Oyunlar (çıktısız)",
    digital: "Dijital paylaşımlı",
    print: "Baskılı",
};

export interface QuoteItem {
    id: string;
    /** The product this line came from; null for a free-text line. */
    serviceId: string | null;
    title: string;
    description: string;
    image: string | null;
    quantity: number;
    days: number;
    /** Line total, KDV hariç. */
    amount: number;
    inclusions: string[];
    note: string;
}

export interface QuoteExtra {
    id: string;
    label: string;
    amount: number;
}

export interface QuoteOption {
    id: string;
    title: string;
    items: QuoteItem[];
    extras: QuoteExtra[];
    discount: number;
}

export interface QuoteDefaults {
    validityDays: number;
    /** Printed under every quote, one note per line. */
    notes: string;
}

export const DEFAULT_QUOTE_DEFAULTS: QuoteDefaults = {
    validityDays: 15,
    notes: [
        "Kurulum etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yapılır.",
        "Mekândan yalnızca standart 220V elektrik bağlantısı talep edilir; internet kendi 5G altyapımızla sağlanır.",
        "Ödeme koşulları sipariş onayında birlikte belirlenir.",
    ].join("\n"),
};

export const QUOTE_DEFAULTS_KEY = "quote.defaults";

/** Seed for an empty settings table; mirrors the rental scope in rental-ops.ts. */
export const DEFAULT_INCLUSIONS: { label: string; outputTypes: OutputType[] }[] = [
    { label: "Kurulum ve söküm", outputTypes: [] },
    { label: "Etkinlik boyunca 2 teknik saha personeli", outputTypes: [] },
    { label: "5G mobil internet bağlantısı", outputTypes: [] },
    { label: "Kiosk dış giydirmesi (marka kaplaması)", outputTypes: [] },
    { label: "Markaya özel arayüz ve çıktı tasarımı", outputTypes: ["digital", "print"] },
    { label: "Markaya özel oyun ve ekran arayüzü", outputTypes: ["none"] },
    { label: "QR ile anında dijital paylaşım", outputTypes: ["digital", "print"] },
    { label: "750 adet fiziksel baskı", outputTypes: ["print"] },
];

export function parseQuoteDefaults(value: string | null | undefined): QuoteDefaults {
    if (!value) return DEFAULT_QUOTE_DEFAULTS;
    try {
        const parsed = JSON.parse(value);
        return {
            validityDays: Number.isFinite(parsed.validityDays) ? parsed.validityDays : DEFAULT_QUOTE_DEFAULTS.validityDays,
            notes: typeof parsed.notes === "string" ? parsed.notes : DEFAULT_QUOTE_DEFAULTS.notes,
        };
    } catch {
        return DEFAULT_QUOTE_DEFAULTS;
    }
}

export function newId() {
    return Math.random().toString(36).slice(2, 10);
}

function num(value: unknown) {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
}

function str(value: unknown) {
    return typeof value === "string" ? value : "";
}

/** Coerces whatever the client or the JSON column holds into QuoteOption[]. */
export function normalizeOptions(value: unknown): QuoteOption[] {
    if (!Array.isArray(value)) return [];
    return value.map((raw) => {
        const o = (raw ?? {}) as Record<string, unknown>;
        const items = Array.isArray(o.items) ? o.items : [];
        const extras = Array.isArray(o.extras) ? o.extras : [];
        return {
            id: str(o.id) || newId(),
            title: str(o.title),
            discount: Math.max(0, num(o.discount)),
            items: items.map((rawItem) => {
                const i = (rawItem ?? {}) as Record<string, unknown>;
                return {
                    id: str(i.id) || newId(),
                    serviceId: str(i.serviceId) || null,
                    title: str(i.title),
                    description: str(i.description),
                    image: str(i.image) || null,
                    quantity: Math.max(1, Math.round(num(i.quantity) || 1)),
                    days: Math.max(1, Math.round(num(i.days) || 1)),
                    amount: Math.max(0, num(i.amount)),
                    inclusions: Array.isArray(i.inclusions) ? i.inclusions.map(str).filter(Boolean) : [],
                    note: str(i.note),
                };
            }),
            extras: extras.map((rawExtra) => {
                const e = (rawExtra ?? {}) as Record<string, unknown>;
                return { id: str(e.id) || newId(), label: str(e.label), amount: num(e.amount) };
            }),
        };
    });
}

export interface PriceRow {
    label: string;
    net: number;
    vat: number;
    gross: number;
}

export interface OptionTotals {
    rows: PriceRow[];
    net: number;
    vat: number;
    gross: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

function row(label: string, net: number, vatRate: number): PriceRow {
    const vat = round2((net * vatRate) / 100);
    return { label, net: round2(net), vat, gross: round2(net + vat) };
}

/**
 * Every priced line of one option, in PDF order: products, shipping, extras,
 * then the discount as a negative row.
 */
export function optionTotals(
    option: QuoteOption,
    { vatRate, city, shippingAmount }: { vatRate: number; city: string | null; shippingAmount: number | null },
): OptionTotals {
    const rows: PriceRow[] = option.items.map((item) => row(item.title || "Ürün", item.amount, vatRate));
    if (shippingAmount !== null) rows.push(row(city ? `Nakliye (${city})` : "Nakliye", shippingAmount, vatRate));
    for (const extra of option.extras) {
        if (extra.label || extra.amount) rows.push(row(extra.label || "Ek kalem", extra.amount, vatRate));
    }
    if (option.discount > 0) rows.push(row("İndirim", -option.discount, vatRate));
    const net = round2(rows.reduce((sum, r) => sum + r.net, 0));
    const vat = round2(rows.reduce((sum, r) => sum + r.vat, 0));
    return { rows, net, vat, gross: round2(net + vat) };
}

const tl = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export function formatTL(amount: number) {
    return `${tl.format(amount)} TL`;
}

export function optionLetter(index: number) {
    return String.fromCharCode(65 + index);
}

/** Which inclusion labels start ticked for a product with this outputType. */
export function defaultInclusionsFor(
    inclusions: { label: string; outputTypes: string[]; defaultOn: boolean }[],
    outputType: string | null,
) {
    return inclusions
        .filter((inc) => inc.defaultOn && (inc.outputTypes.length === 0 || (outputType !== null && inc.outputTypes.includes(outputType))))
        .map((inc) => inc.label);
}
