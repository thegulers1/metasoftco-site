import { prisma } from "@/lib/db";
import { SERVICE_CITIES } from "@/lib/rental-ops";
import {
    DEFAULT_INCLUSIONS,
    DEFAULT_VAT_RATE,
    QUOTE_DEFAULTS_KEY,
    QUOTE_STATUSES,
    normalizeOptions,
    parseQuoteDefaults,
    type QuoteDefaults,
} from "@/lib/quotes";

export interface InclusionSetting {
    id: string;
    label: string;
    outputTypes: string[];
    defaultOn: boolean;
}

export interface ShippingSetting {
    id: string;
    city: string;
    amount: number | null;
}

export interface QuoteSettings {
    inclusions: InclusionSetting[];
    shipping: ShippingSetting[];
    defaults: QuoteDefaults;
}

/**
 * Settings as saved in the panel. Until the settings page is saved once, the
 * built-in lists are returned (nothing is written on read).
 */
export async function getQuoteSettings(): Promise<QuoteSettings> {
    const [inclusions, shipping, defaults] = await Promise.all([
        prisma.quoteInclusion.findMany({ orderBy: { order: "asc" } }),
        prisma.quoteShippingRate.findMany({ orderBy: { order: "asc" } }),
        prisma.siteSetting.findUnique({ where: { key: QUOTE_DEFAULTS_KEY } }),
    ]);
    return {
        inclusions: inclusions.length
            ? inclusions.map(({ id, label, outputTypes, defaultOn }) => ({ id, label, outputTypes, defaultOn }))
            : DEFAULT_INCLUSIONS.map((inc, i) => ({ id: `default-${i}`, label: inc.label, outputTypes: inc.outputTypes, defaultOn: true })),
        shipping: shipping.length
            ? shipping.map(({ id, city, amount }) => ({ id, city, amount }))
            : SERVICE_CITIES.map((city, i) => ({ id: `default-${i}`, city, amount: city === "İstanbul" ? 0 : null })),
        defaults: parseQuoteDefaults(defaults?.value),
    };
}

/** Products a quote line can be picked from: published rental services (drafts would crowd the list). */
export async function getQuoteProducts() {
    const services = await prisma.service.findMany({
        where: { type: "RENTAL", published: true },
        orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
        select: {
            id: true,
            title: true,
            description: true,
            image: true,
            gallery: true,
            outputType: true,
            published: true,
            category: { select: { name: true } },
        },
    });
    return services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description ?? "",
        image: s.image || firstGalleryImage(s.gallery),
        outputType: s.outputType,
        published: s.published,
        category: s.category.name,
    }));
}

export type QuoteProduct = Awaited<ReturnType<typeof getQuoteProducts>>[number];

function firstGalleryImage(gallery: string | null) {
    if (!gallery) return null;
    try {
        const items = JSON.parse(gallery) as (string | { url?: string })[];
        const urls = items.map((item) => (typeof item === "string" ? item : item.url)).filter(Boolean) as string[];
        return urls.find((url) => !url.includes("/video/upload/")) ?? null;
    } catch {
        return null;
    }
}

/** yyyy-mm-dd, `days` from today (the date input's format). */
export function validUntilFromToday(days: number) {
    return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

/** MS-2026-001, MS-2026-002 … per calendar year. */
export async function nextQuoteNumber() {
    const prefix = `MS-${new Date().getFullYear()}-`;
    const last = await prisma.quote.findFirst({
        where: { number: { startsWith: prefix } },
        orderBy: { number: "desc" },
        select: { number: true },
    });
    const seq = last ? Number(last.number.slice(prefix.length)) + 1 : 1;
    return `${prefix}${String(seq).padStart(3, "0")}`;
}

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : null);

/** Request body → Prisma data for create/update; the number is set by the caller. */
export function quoteDataFromBody(body: Record<string, unknown>) {
    const company = text(body.company);
    if (!company) throw new QuoteInputError("Firma adı zorunludur");
    const status = QUOTE_STATUSES.some((s) => s.value === body.status) ? (body.status as string) : "DRAFT";
    const shipping = body.shippingAmount === null || body.shippingAmount === "" || body.shippingAmount === undefined
        ? null
        : Number(body.shippingAmount);
    const validUntil = text(body.validUntil);
    return {
        company,
        status,
        contactName: text(body.contactName),
        contactEmail: text(body.contactEmail),
        contactPhone: text(body.contactPhone),
        eventName: text(body.eventName),
        eventDate: text(body.eventDate),
        city: text(body.city),
        venue: text(body.venue),
        shippingAmount: shipping !== null && Number.isFinite(shipping) ? shipping : null,
        vatRate: Number.isFinite(Number(body.vatRate)) ? Number(body.vatRate) : DEFAULT_VAT_RATE,
        validUntil: validUntil ? new Date(validUntil) : null,
        notes: text(body.notes),
        options: normalizeOptions(body.options) as unknown as object,
    };
}

export class QuoteInputError extends Error {}
