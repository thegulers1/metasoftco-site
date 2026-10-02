/**
 * Where a lead came from. Captured once per browser on the first page view
 * (first touch) and again for the current session (last touch), then sent
 * along with every form so the notification e-mail shows the source.
 */

import { getStoredConsent } from "@/lib/analytics";

const FIRST_TOUCH_KEY = "metasoft_first_touch";
const LAST_TOUCH_KEY = "metasoft_last_touch";

const CAMPAIGN_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

export interface Touch {
    landingPage: string;
    referrer: string;
    at: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    gclid?: string;
}

export interface Attribution {
    firstTouch?: Touch;
    lastTouch?: Touch;
    submittedFrom?: string;
}

function readTouch(storage: Storage, key: string): Touch | undefined {
    try {
        const raw = storage.getItem(key);
        return raw ? (JSON.parse(raw) as Touch) : undefined;
    } catch {
        return undefined;
    }
}

function currentTouch(): Touch {
    const params = new URLSearchParams(window.location.search);
    const touch: Touch = {
        landingPage: window.location.pathname,
        referrer: document.referrer,
        at: new Date().toISOString(),
    };
    for (const key of CAMPAIGN_PARAMS) {
        const value = params.get(key);
        if (value) touch[key] = value.slice(0, 200);
    }
    return touch;
}

/**
 * Records the landing page and campaign of this visit. Safe to call on every page view.
 * The session entry lives in sessionStorage; the cross-visit first touch is only
 * persisted once the visitor has accepted cookies, and nothing is kept after a refusal.
 */
export function captureAttribution() {
    if (typeof window === "undefined") return;
    try {
        const consent = getStoredConsent();
        if (consent === "denied") {
            window.localStorage.removeItem(FIRST_TOUCH_KEY);
            window.sessionStorage.removeItem(LAST_TOUCH_KEY);
            return;
        }
        const touch = currentTouch();
        // A new session, or a page view arriving with campaign parameters, starts a new last touch.
        const hasCampaign = CAMPAIGN_PARAMS.some((key) => touch[key]);
        if (hasCampaign || !window.sessionStorage.getItem(LAST_TOUCH_KEY)) {
            window.sessionStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(touch));
        }
        if (consent === "granted" && !window.localStorage.getItem(FIRST_TOUCH_KEY)) {
            // Consent often arrives a few pages in; the session's landing is the true first touch.
            window.localStorage.setItem(FIRST_TOUCH_KEY, window.sessionStorage.getItem(LAST_TOUCH_KEY) || JSON.stringify(touch));
        }
    } catch {
        // Storage can be blocked (private mode); the form still works without a source.
    }
}

/** The attribution to attach to a form submission. */
export function getAttribution(): Attribution {
    if (typeof window === "undefined") return {};
    try {
        captureAttribution();
        const lastTouch = readTouch(window.sessionStorage, LAST_TOUCH_KEY);
        return {
            firstTouch: readTouch(window.localStorage, FIRST_TOUCH_KEY) ?? lastTouch,
            lastTouch,
            submittedFrom: window.location.pathname,
        };
    } catch {
        return { submittedFrom: window.location.pathname };
    }
}

function text(value: unknown, max = 200): string {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function describeTouch(value: unknown): string {
    if (!value || typeof value !== "object") return "";
    const touch = value as Record<string, unknown>;
    const referrer = text(touch.referrer);
    const campaign = CAMPAIGN_PARAMS
        .map((key) => (text(touch[key]) ? `${key}=${text(touch[key])}` : ""))
        .filter(Boolean)
        .join(", ");
    return [
        text(touch.landingPage) || "—",
        referrer ? `kaynak: ${referrer}` : "kaynak: doğrudan",
        campaign,
        text(touch.at, 40),
    ].filter(Boolean).join(" · ");
}

/** Server side: turns the untrusted attribution payload into labelled rows for the lead e-mail. */
export function attributionRows(value: unknown): { label: string; value: string }[] {
    if (!value || typeof value !== "object") return [];
    const attribution = value as Record<string, unknown>;
    return [
        { label: "İlk giriş", value: describeTouch(attribution.firstTouch) },
        { label: "Son giriş", value: describeTouch(attribution.lastTouch) },
        { label: "Formun gönderildiği sayfa", value: text(attribution.submittedFrom) },
    ].filter((row) => row.value);
}
