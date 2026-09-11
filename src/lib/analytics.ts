declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
}

export type ConsentState = "granted" | "denied";

const CONSENT_STORAGE_KEY = "metasoft_consent";

export function getStoredConsent(): ConsentState | null {
    if (typeof window === "undefined") return null;
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
}

export function setStoredConsent(state: ConsentState) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
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
