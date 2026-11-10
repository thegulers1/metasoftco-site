/**
 * Minimal Google API client for the traffic report in the editpanel.
 * Signs a service-account JWT with node:crypto and exchanges it for an access
 * token, so no extra dependency is needed.
 *
 * Env:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  service-account key (raw JSON or base64 of it)
 *   GA4_PROPERTY_ID              e.g. 413240077
 *   GSC_SITE_URL                 e.g. sc-domain:metasoftco.com
 * The service-account e-mail must be added as a viewer in GA4 and as a user in Search Console.
 */

import { createSign } from "node:crypto";

interface ServiceAccountKey {
    client_email: string;
    private_key: string;
}

const SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
].join(" ");

let cachedToken: { value: string; expiresAt: number } | null = null;

function loadKey(): ServiceAccountKey | null {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
    if (!raw) return null;
    try {
        const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
        const key = JSON.parse(json) as ServiceAccountKey;
        if (!key.client_email || !key.private_key) return null;
        return { client_email: key.client_email, private_key: key.private_key.replace(/\\n/g, "\n") };
    } catch {
        return null;
    }
}

export function googleConfigStatus() {
    const key = loadKey();
    return {
        hasKey: !!key,
        serviceAccountEmail: key?.client_email ?? null,
        ga4PropertyId: process.env.GA4_PROPERTY_ID?.trim() || null,
        gscSiteUrl: process.env.GSC_SITE_URL?.trim() || null,
    };
}

function base64url(input: string | Buffer) {
    return Buffer.from(input).toString("base64url");
}

async function getAccessToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
    const key = loadKey();
    if (!key) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON tanımlı değil.");

    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claim = base64url(
        JSON.stringify({
            iss: key.client_email,
            scope: SCOPES,
            aud: "https://oauth2.googleapis.com/token",
            iat: now,
            exp: now + 3600,
        }),
    );
    const signature = createSign("RSA-SHA256").update(`${header}.${claim}`).sign(key.private_key);
    const assertion = `${header}.${claim}.${base64url(signature)}`;

    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
        cache: "no-store",
    });
    const data = (await response.json()) as { access_token?: string; expires_in?: number; error_description?: string };
    if (!response.ok || !data.access_token) {
        throw new Error(`Google yetkilendirme hatası: ${data.error_description || response.status}`);
    }
    cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
    return data.access_token;
}

async function googlePost<T>(url: string, body: unknown): Promise<T> {
    const token = await getAccessToken();
    const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
        const message = (data as { error?: { message?: string } }).error?.message || String(response.status);
        throw new Error(message);
    }
    return data as T;
}

export interface GaRow {
    dimensionValues?: { value: string }[];
    metricValues?: { value: string }[];
}

/** GA4 Data API runReport; returns each row as { dims, mets } of plain strings/numbers. */
export async function ga4Report(params: {
    propertyId: string;
    startDate: string;
    endDate: string;
    dimensions: string[];
    metrics: string[];
    limit?: number;
    dimensionFilter?: unknown;
    orderBys?: unknown;
}) {
    const data = await googlePost<{ rows?: GaRow[] }>(
        `https://analyticsdata.googleapis.com/v1beta/properties/${params.propertyId}:runReport`,
        {
            dateRanges: [{ startDate: params.startDate, endDate: params.endDate }],
            dimensions: params.dimensions.map((name) => ({ name })),
            metrics: params.metrics.map((name) => ({ name })),
            limit: params.limit ?? 50,
            dimensionFilter: params.dimensionFilter,
            orderBys: params.orderBys,
        },
    );
    return (data.rows ?? []).map((row) => ({
        dims: (row.dimensionValues ?? []).map((d) => d.value),
        mets: (row.metricValues ?? []).map((m) => Number(m.value)),
    }));
}

export interface GscRow {
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

export async function gscQuery(params: {
    siteUrl: string;
    startDate: string;
    endDate: string;
    dimensions: string[];
    rowLimit?: number;
}) {
    const data = await googlePost<{ rows?: GscRow[] }>(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(params.siteUrl)}/searchAnalytics/query`,
        {
            startDate: params.startDate,
            endDate: params.endDate,
            dimensions: params.dimensions,
            rowLimit: params.rowLimit ?? 25,
        },
    );
    return data.rows ?? [];
}
