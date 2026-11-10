import { NextRequest, NextResponse } from "next/server";
import { buildTrafficReport } from "@/lib/traffic-report";
import { analyzeTraffic } from "@/lib/traffic-analysis";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

// POST /api/traffic/analyze - Trafik verisini çekip yapay zekaya yorumlatır (middleware: oturum gerekir)
export async function POST(request: NextRequest) {
    try {
        const { days } = await request.json().catch(() => ({ days: 14 }));
        const range = [7, 14, 30].includes(days) ? days : 14;
        const report = await buildTrafficReport(range);
        if (!report.totals.sessions && !report.searchQueries.length) {
            return NextResponse.json({ error: "Analiz edilecek veri yok. Google bağlantısını kontrol edin." }, { status: 400 });
        }
        return NextResponse.json(await analyzeTraffic(report));
    } catch (error) {
        console.error("Traffic analysis error:", error);
        const details = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ error: `Analiz yapılamadı: ${details}` }, { status: 500 });
    }
}
