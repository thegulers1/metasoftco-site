export type Phase2Locale = "tr" | "en";

/**
 * Canonical route map for the phase 2 surface. Turkish is the default locale
 * and lives at the root; English is prefixed with /en. Slugs are not
 * translatable by string replacement, so every path is listed explicitly.
 */
export const phase2Routes = {
    tr: {
        home: "/",
        work: "/projeler",
        capabilities: "/hizmetler",
        about: "/hakkimizda",
        insights: "/blog",
        contact: "/iletisim",
    },
    en: {
        home: "/en",
        work: "/en/projects",
        capabilities: "/en/services",
        about: "/en/hakkimizda",
        insights: "/en/blog",
        contact: "/en/contact",
    },
} as const satisfies Record<Phase2Locale, Record<string, string>>;

/** Service category slugs referenced from hardcoded phase 2 copy. */
export const phase2CategorySlugs = {
    tr: {
        ai: "yapay-zeka-etkinlik-cozumleri",
        photo: "photobooth-ve-fotograf-aktivasyonlari",
        interactive: "interaktif-etkinlik-aktiviteleri",
    },
    en: {
        ai: "ai-event-solutions",
        photo: "photobooth-and-photo-activations",
        interactive: "interactive-event-activities",
    },
} as const satisfies Record<Phase2Locale, Record<string, string>>;

/** The AI photo booth service that renders the phase 2 capability detail screen. */
export const phase2CapabilityDetailSlugs = {
    tr: { category: "yapay-zeka-etkinlik-cozumleri", service: "ai-photobooth-kirala" },
    en: { category: "ai-event-solutions", service: "ai-photobooth" },
} as const satisfies Record<Phase2Locale, { category: string; service: string }>;

/**
 * Project slugs that render a bespoke phase 2 screen. Both projects happen to
 * share the same slug in either locale, but the mapping stays explicit so a
 * future slug rename in one locale cannot silently break the other.
 */
export const phase2ProjectSlugs = {
    caseStudy: { tr: "tavuk-dunyasi-x-ai-photo", en: "tavuk-dunyasi-x-ai-photo" },
    workDetail: { tr: "ray-ban-x-strip-photo", en: "ray-ban-x-strip-photo" },
    nextProject: {
        tr: "pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu",
        en: "pegasus-airlines-digital-gift-wheel-activation",
    },
} as const satisfies Record<string, Record<Phase2Locale, string>>;

/**
 * Splits a database-authored title into the two halves a signal heading needs:
 * a solid lead-in and an outlined tail. The tail is the last word — or the last
 * two on longer titles — so the break reads as a deliberate typographic accent
 * rather than a truncation. Single-word titles are outlined whole.
 */
export function splitSignalTitle(title: string): { solid: string; outline: string } {
    const words = title.trim().split(/\s+/).filter(Boolean);
    if (words.length < 2) return { solid: "", outline: words.join(" ") };
    const outlineWords = words.length >= 5 ? 2 : 1;
    return {
        solid: words.slice(0, -outlineWords).join(" "),
        outline: words.slice(-outlineWords).join(" "),
    };
}

function normalizePath(pathname: string) {
    return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

const englishExactPaths = new Set<string>(["/en", phase2Routes.en.about, phase2Routes.en.contact]);
const englishPrefixes = [phase2Routes.en.work, phase2Routes.en.capabilities];

const turkishExactPaths = new Set<string>(["/", phase2Routes.tr.about, phase2Routes.tr.contact]);
const turkishPrefixes = [phase2Routes.tr.work, phase2Routes.tr.capabilities];

export function isPhase2PrototypePath(pathname: string | null) {
    if (!pathname) return false;
    const normalized = normalizePath(pathname);

    if (englishExactPaths.has(normalized)) return true;
    if (englishPrefixes.some((prefix) => normalized.startsWith(prefix))) return true;
    if (normalized.startsWith("/en")) return false;

    if (turkishExactPaths.has(normalized)) return true;
    return turkishPrefixes.some((prefix) => normalized.startsWith(prefix));
}

/**
 * Sibling path for the screens that map one-to-one between locales. Detail
 * pages are absent on purpose: their slugs differ per locale and are only
 * known from the rendered page's hreflang alternates.
 */
const staticSiblings: Record<string, string> = Object.fromEntries(
    (Object.keys(phase2Routes.tr) as (keyof typeof phase2Routes.tr)[]).flatMap((key) => [
        [phase2Routes.tr[key], phase2Routes.en[key]],
        [phase2Routes.en[key], phase2Routes.tr[key]],
    ]),
);

/** The other locale's equivalent path, falling back to its home page. */
export function phase2SiblingPath(pathname: string | null, locale: Phase2Locale) {
    const fallback = locale === "tr" ? phase2Routes.en.home : phase2Routes.tr.home;
    if (!pathname) return fallback;
    return staticSiblings[normalizePath(pathname)] ?? fallback;
}

/** Derives the active locale from the URL. Everything outside /en is Turkish. */
export function phase2LocaleFromPath(pathname: string | null): Phase2Locale {
    if (!pathname) return "tr";
    const normalized = normalizePath(pathname);
    return normalized === "/en" || normalized.startsWith("/en/") ? "en" : "tr";
}
