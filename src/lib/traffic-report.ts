/**
 * Builds the data behind the editpanel "Trafik" screen: daily visits, where
 * they came from, where they went, what they did, and what they searched for.
 * Admin pages (/editpanel) are excluded so our own work does not look like visitors.
 */

import snapshot from "@/data/traffic-snapshot.json";
import { ga4Report, gscQuery, googleConfigStatus, type GscRow } from "./google-api";

export interface DailyPoint { date: string; sessions: number; users: number; pageViews: number; keyEvents: number }
export interface ChannelRow { source: string; sessions: number; users: number; engagementRate: number; keyEvents: number }
export interface LandingRow { page: string; sessions: number; engagementRate: number; avgDuration: number; keyEvents: number }
export interface PageRow { page: string; views: number; users: number; avgDuration: number }
export interface EventRow { name: string; count: number }
export interface SearchRow { query: string; clicks: number; impressions: number; ctr: number; position: number }
export interface SearchPageRow { page: string; clicks: number; impressions: number; position: number }

export interface TrafficReport {
    days: number;
    source?: "live" | "snapshot";
    generatedAt: string;
    totals: { sessions: number; users: number; pageViews: number; keyEvents: number; engagementRate: number };
    previous: { sessions: number; users: number; keyEvents: number } | null;
    daily: DailyPoint[];
    channels: ChannelRow[];
    landing: LandingRow[];
    pages: PageRow[];
    events: EventRow[];
    searchQueries: SearchRow[];
    searchPages: SearchPageRow[];
    warnings: string[];
}

const NOT_ADMIN = (field: string) => ({
    notExpression: {
        filter: { fieldName: field, stringFilter: { matchType: "BEGINS_WITH", value: "/editpanel" } },
    },
});

function isoDaysAgo(n: number) {
    const date = new Date(Date.now() - n * 86_400_000);
    return date.toISOString().slice(0, 10);
}

function prettyDate(raw: string) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

/** Runs one block and records a warning instead of failing the whole report. */
async function safe<T>(label: string, warnings: string[], run: () => Promise<T>, fallback: T): Promise<T> {
    try {
        return await run();
    } catch (error) {
        warnings.push(`${label}: ${error instanceof Error ? error.message : "bilinmeyen hata"}`);
        return fallback;
    }
}

export async function buildTrafficReport(days: number): Promise<TrafficReport> {
    const config = googleConfigStatus();
    // Without a Google service account the screen shows the saved copy instead of staying empty.
    if (!config.hasKey || !config.ga4PropertyId) return snapshot as TrafficReport;
    const warnings: string[] = [];
    const propertyId = config.ga4PropertyId;
    const siteUrl = config.gscSiteUrl;
    const startDate = `${days}daysAgo`;
    const endDate = "today";
    const pageFilter = NOT_ADMIN("pagePath");
    const landingFilter = NOT_ADMIN("landingPage");

    const report: TrafficReport = {
        days,
        source: "live",
        generatedAt: new Date().toISOString(),
        totals: { sessions: 0, users: 0, pageViews: 0, keyEvents: 0, engagementRate: 0 },
        previous: null,
        daily: [], channels: [], landing: [], pages: [], events: [],
        searchQueries: [], searchPages: [], warnings,
    };

    if (propertyId) {
        const [daily, channels, landing, pages, events, previous] = await Promise.all([
            safe("Günlük trafik", warnings, () => ga4Report({
                propertyId, startDate, endDate, dimensions: ["date"],
                metrics: ["sessions", "totalUsers", "screenPageViews", "keyEvents"], limit: 100,
                orderBys: [{ dimension: { dimensionName: "date" } }],
            }), []),
            safe("Kaynaklar", warnings, () => ga4Report({
                propertyId, startDate, endDate, dimensions: ["sessionSourceMedium"],
                metrics: ["sessions", "totalUsers", "engagementRate", "keyEvents"], limit: 25,
                orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            }), []),
            safe("Giriş sayfaları", warnings, () => ga4Report({
                propertyId, startDate, endDate, dimensions: ["landingPage"],
                metrics: ["sessions", "engagementRate", "averageSessionDuration", "keyEvents"], limit: 25,
                dimensionFilter: landingFilter,
                orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            }), []),
            safe("Sayfalar", warnings, () => ga4Report({
                propertyId, startDate, endDate, dimensions: ["pagePath"],
                metrics: ["screenPageViews", "totalUsers", "averageSessionDuration"], limit: 25,
                dimensionFilter: pageFilter,
                orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
            }), []),
            safe("Olaylar", warnings, () => ga4Report({
                propertyId, startDate, endDate, dimensions: ["eventName"],
                metrics: ["eventCount"], limit: 30,
                orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
            }), []),
            safe("Önceki dönem", warnings, () => ga4Report({
                propertyId, startDate: `${days * 2}daysAgo`, endDate: `${days + 1}daysAgo`, dimensions: [],
                metrics: ["sessions", "totalUsers", "keyEvents"], limit: 1,
            }), []),
        ]);

        report.daily = daily.map((row) => ({
            date: prettyDate(row.dims[0]), sessions: row.mets[0], users: row.mets[1],
            pageViews: row.mets[2], keyEvents: row.mets[3],
        }));
        report.channels = channels.map((row) => ({
            source: row.dims[0], sessions: row.mets[0], users: row.mets[1],
            engagementRate: row.mets[2], keyEvents: row.mets[3],
        }));
        report.landing = landing.map((row) => ({
            page: row.dims[0], sessions: row.mets[0], engagementRate: row.mets[1],
            avgDuration: row.mets[2], keyEvents: row.mets[3],
        }));
        report.pages = pages.map((row) => ({ page: row.dims[0], views: row.mets[0], users: row.mets[1], avgDuration: row.mets[2] }));
        report.events = events.map((row) => ({ name: row.dims[0], count: row.mets[0] }));
        if (previous[0]) {
            report.previous = { sessions: previous[0].mets[0], users: previous[0].mets[1], keyEvents: previous[0].mets[2] };
        }

        const sessions = report.channels.reduce((sum, row) => sum + row.sessions, 0);
        const weighted = report.channels.reduce((sum, row) => sum + row.engagementRate * row.sessions, 0);
        report.totals = {
            sessions,
            users: report.daily.reduce((sum, row) => sum + row.users, 0),
            pageViews: report.daily.reduce((sum, row) => sum + row.pageViews, 0),
            keyEvents: report.daily.reduce((sum, row) => sum + row.keyEvents, 0),
            engagementRate: sessions ? weighted / sessions : 0,
        };
    } else {
        warnings.push("GA4_PROPERTY_ID tanımlı değil.");
    }

    if (siteUrl) {
        // Search Console runs 2-3 days behind.
        const gscStart = isoDaysAgo(days + 3);
        const gscEnd = isoDaysAgo(3);
        const [queries, pages] = await Promise.all([
            safe("Aramalar", warnings, () => gscQuery({ siteUrl, startDate: gscStart, endDate: gscEnd, dimensions: ["query"], rowLimit: 25 }), [] as GscRow[]),
            safe("Arama sayfaları", warnings, () => gscQuery({ siteUrl, startDate: gscStart, endDate: gscEnd, dimensions: ["page"], rowLimit: 15 }), [] as GscRow[]),
        ]);
        report.searchQueries = queries.map((row) => ({
            query: row.keys[0], clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position,
        }));
        report.searchPages = pages.map((row) => ({
            page: row.keys[0].replace(/^https?:\/\/[^/]+/, "") || "/", clicks: row.clicks,
            impressions: row.impressions, position: row.position,
        }));
    } else {
        warnings.push("GSC_SITE_URL tanımlı değil.");
    }

    return report;
}
