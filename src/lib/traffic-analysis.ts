/**
 * AI reading of the traffic report: what happened, why visitors left without
 * contacting us, and what to do about it. Only reasons the numbers support.
 */

import OpenAI from "openai";
import type { TrafficReport } from "./traffic-report";

const MODEL = process.env.OPENAI_CONTENT_MODEL || "gpt-5.5";

export interface TrafficAnalysis {
    summary: string;
    whyTheyLeft: { page: string; evidence: string; likelyReason: string }[];
    actions: { priority: "yüksek" | "orta" | "düşük"; title: string; detail: string; where: string }[];
    dataCaveats: string[];
}

const SYSTEM = `Sen MetasoftCo'nun (Türkiye'de etkinlik teknolojisi kiralama: AI photobooth, interaktif aktiviteler, yılbaşı kampanyaları) web analistisin. Sana GA4 ve Search Console verisi verilir. Türkçe, sade ve somut yaz.

Kurallar:
- Sadece verideki rakamlara dayan. Örneklem çok küçükse (günde birkaç ziyaret) bunu açıkça söyle ve kesin hüküm verme.
- "Neden aramadan gitti" kısmında her sayfa için kanıt (oturum sayısı, etkileşim oranı, süre, tıklama/form olayları) göster; sebep tahminini "muhtemel" diye işaretle.
- Aksiyonlar bu sitede yapılabilecek şeyler olsun: sayfa metni, CTA/WhatsApp butonunun yeri, form, hız, aranan ama sayfası zayıf kelimeler, reklam hedeflemesi. Uydurma rakam, uydurma referans yok.
- Ziyaretçi sayıları küçükse tek kişinin davranışına aşırı anlam yükleme.
- Admin (/editpanel) trafiği zaten çıkarıldı.`;

const SCHEMA = {
    type: "object",
    additionalProperties: false,
    required: ["summary", "whyTheyLeft", "actions", "dataCaveats"],
    properties: {
        summary: { type: "string" },
        whyTheyLeft: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                required: ["page", "evidence", "likelyReason"],
                properties: { page: { type: "string" }, evidence: { type: "string" }, likelyReason: { type: "string" } },
            },
        },
        actions: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                required: ["priority", "title", "detail", "where"],
                properties: {
                    priority: { type: "string", enum: ["yüksek", "orta", "düşük"] },
                    title: { type: "string" },
                    detail: { type: "string" },
                    where: { type: "string" },
                },
            },
        },
        dataCaveats: { type: "array", items: { type: "string" } },
    },
} as const;

export async function analyzeTraffic(report: TrafficReport): Promise<TrafficAnalysis> {
    const { warnings: _warnings, ...data } = report;
    void _warnings;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: `Son ${report.days} günün verisi (JSON):\n${JSON.stringify(data)}` },
        ],
        response_format: { type: "json_schema", json_schema: { name: "traffic_analysis", strict: true, schema: SCHEMA } },
    });
    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Model boş yanıt döndürdü");
    return JSON.parse(raw) as TrafficAnalysis;
}
