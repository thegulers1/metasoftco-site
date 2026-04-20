import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://metasoftco.com";

// IndexNow destekleyen arama motorları
const INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://search.seznam.cz/indexnow",
];

export async function POST(req: NextRequest) {
    if (!INDEXNOW_KEY) {
        return NextResponse.json({ error: "INDEXNOW_KEY env var not set" }, { status: 500 });
    }

    const { urls }: { urls?: string[] } = await req.json().catch(() => ({}));

    const urlList = urls && urls.length > 0
        ? urls
        : [`${BASE_URL}/`]; // Default: ana sayfa

    const body = {
        host: new URL(BASE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
    };

    const results = await Promise.allSettled(
        INDEXNOW_ENDPOINTS.map((endpoint) =>
            fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(body),
            })
        )
    );

    const summary = results.map((r, i) => ({
        endpoint: INDEXNOW_ENDPOINTS[i],
        status: r.status === "fulfilled" ? r.value.status : "error",
    }));

    return NextResponse.json({ submitted: urlList.length, results: summary });
}
