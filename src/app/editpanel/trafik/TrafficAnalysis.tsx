"use client";

import { useState } from "react";
import type { TrafficAnalysis as Analysis } from "@/lib/traffic-analysis";

const PRIORITY_STYLE: Record<string, string> = {
    yüksek: "bg-red-50 text-red-600",
    orta: "bg-amber-50 text-amber-700",
    düşük: "bg-black/5 text-black/50",
};

export default function TrafficAnalysis({ days }: { days: number }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<Analysis | null>(null);

    async function run() {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/traffic/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ days }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Analiz yapılamadı.");
            setResult(data as Analysis);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Analiz yapılamadı.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="bg-white rounded-xl border border-black/10 p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-black">Yapay zeka yorumu</h2>
                    <p className="text-xs text-black/50 mt-1">Son {days} günün verisini okur: neden aramadan gittiler, ne yapmalı.</p>
                </div>
                <button
                    onClick={run}
                    disabled={loading}
                    className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                >
                    {loading ? "Analiz ediliyor…" : result ? "Yeniden analiz et" : "Analiz et"}
                </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            {result && (
                <div className="mt-6 space-y-6">
                    <p className="text-sm text-black/80 leading-relaxed whitespace-pre-line">{result.summary}</p>

                    {result.whyTheyLeft.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-black mb-2">Neden aramadan gittiler?</h3>
                            <ul className="space-y-3">
                                {result.whyTheyLeft.map((item, index) => (
                                    <li key={index} className="rounded-lg bg-black/[0.03] p-4">
                                        <p className="text-sm font-medium text-black break-all">{item.page}</p>
                                        <p className="text-xs text-black/60 mt-1">{item.evidence}</p>
                                        <p className="text-sm text-black/80 mt-2">{item.likelyReason}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {result.actions.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-black mb-2">Önerilen işler</h3>
                            <ul className="space-y-3">
                                {result.actions.map((item, index) => (
                                    <li key={index} className="rounded-lg border border-black/10 p-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${PRIORITY_STYLE[item.priority] ?? ""}`}>{item.priority}</span>
                                            <p className="text-sm font-medium text-black">{item.title}</p>
                                        </div>
                                        <p className="text-sm text-black/70 mt-2">{item.detail}</p>
                                        <p className="text-xs text-black/40 mt-2">Nerede: {item.where}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {result.dataCaveats.length > 0 && (
                        <ul className="list-disc pl-5 text-xs text-black/50 space-y-1">
                            {result.dataCaveats.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    )}
                </div>
            )}
        </section>
    );
}
