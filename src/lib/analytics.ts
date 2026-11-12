declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    // The published GTM container forwards leads and WhatsApp clicks, but has no phone trigger.
    if (eventName === "phone_click" && window.gtag) {
        window.gtag("event", eventName, { ...params, send_to: "G-4XMT8HPLWJ" });
        return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
}

export type ConsentState = "granted" | "denied";

const CONSENT_STORAGE_KEY = "metasoft_consent";

const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

const isConsent = (value: unknown): value is ConsentState =>
    value === "granted" || value === "denied";

function readConsentCookie() {
    const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_STORAGE_KEY}=([^;]*)`));
    return match?.[1];
}

/**
 * The choice lives in a first-party cookie (shared by every port on localhost and by
 * www/apex in production) and in localStorage, so the banner asks once per browser.
 */
export function getStoredConsent(): ConsentState | null {
    if (typeof window === "undefined") return null;
    const cookie = readConsentCookie();
    if (isConsent(cookie)) return cookie;
    try {
        const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        if (isConsent(value)) {
            setStoredConsent(value);
            return value;
        }
    } catch {
        /* storage blocked */
    }
    return null;
}

export function setStoredConsent(state: ConsentState) {
    if (typeof window === "undefined") return;
    const domain = window.location.hostname.endsWith("metasoftco.com")
        ? "; domain=.metasoftco.com"
        : "";
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${CONSENT_STORAGE_KEY}=${state}; path=/; max-age=${CONSENT_MAX_AGE}; samesite=lax${domain}${secure}`;
    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
    } catch {
        /* storage blocked */
    }
}

export function applyConsent(state: ConsentState) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
        window.gtag = function gtag() {
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer.push(arguments);
        };
    }
    window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
    });
}
