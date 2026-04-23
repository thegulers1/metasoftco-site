import { OpenAI } from "openai";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
        return false;
    }
    if (entry.count >= RATE_LIMIT) return true;
    entry.count++;
    return false;
}

export interface RecommendedService {
    id: string;
    title: string;
    title_en: string | null;
    image: string | null;
    slug: string;
    categorySlug: string;
    slug_en: string | null;
    categorySlugEn: string | null;
}

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Çok fazla istek gönderildi. Lütfen bir dakika bekleyin." },
            { status: 429 },
        );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const { message, conversationHistory = [], locale = "tr" } = await req.json();

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const services = await prisma.service.findMany({
            include: { category: true },
            orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
        });

        const isEn = locale === "en";
        const langInstruction = isEn ? "Respond in English." : "Türkçe yanıt ver.";

        // Compact service list with IDs for the AI
        const servicesContext = services
            .map((s) => {
                const name = isEn && s.title_en ? s.title_en : s.title;
                const desc = (isEn && s.description_en ? s.description_en : s.description) ?? "";
                return `ID:${s.id} | **${name}** — ${desc}`;
            })
            .join("\n");

        const systemPrompt = `You are MetasoftCo's event technology advisor. MetasoftCo is an Istanbul-based interactive event technology agency. Your job is to understand the visitor's event needs and recommend the most relevant 2-3 services.

RULES:
- Ask maximum 2-3 clarifying questions before making recommendations
- Never mention pricing
- Keep responses concise — max 4-5 sentences
- Be warm but professional
- Use 1-2 emojis max per message
- ${langInstruction}

OUR SERVICES (use the IDs when recommending):
${servicesContext}

IMPORTANT — Always respond with valid JSON in this exact format:
{
  "text": "your conversational message here",
  "recommendedServiceIds": ["id1", "id2"]
}

When recommending services, mention them by bold name in the "text" field with a 1-sentence description. Do NOT include URLs in the text — the frontend renders service cards automatically.
Only populate "recommendedServiceIds" when you are actively recommending specific services. Otherwise use [].
When the visitor shows interest in proceeding, mention they can use the quote form that will appear below.`;

        const cappedHistory = conversationHistory.slice(-6);

        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: systemPrompt },
            ...cappedHistory,
            { role: "user", content: message.trim() },
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.75,
            max_tokens: 600,
            response_format: { type: "json_object" },
        });

        const raw = response.choices[0].message.content ?? "{}";
        let parsed: { text?: string; recommendedServiceIds?: string[] } = {};
        try {
            parsed = JSON.parse(raw);
        } catch {
            parsed = { text: raw, recommendedServiceIds: [] };
        }

        const replyText = parsed.text ?? "";
        const recommendedIds: string[] = Array.isArray(parsed.recommendedServiceIds)
            ? parsed.recommendedServiceIds
            : [];

        // Map IDs to full service objects needed by QuoteStore
        const serviceMap = new Map(services.map((s) => [s.id, s]));
        const recommendedServices: RecommendedService[] = recommendedIds
            .map((id) => {
                const s = serviceMap.get(id);
                if (!s) return null;
                return {
                    id: s.id,
                    title: s.title,
                    title_en: s.title_en ?? null,
                    image: s.image ?? null,
                    slug: s.slug,
                    categorySlug: s.category.slug,
                    slug_en: s.slug_en ?? null,
                    categorySlugEn: s.category.slug_en ?? null,
                };
            })
            .filter((s): s is RecommendedService => s !== null);

        return NextResponse.json({ reply: replyText, recommendedServices, success: true });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        console.error("AI Chat error:", msg);
        return NextResponse.json(
            { error: "Üzgünüm, şu anda bir hata oluştu. Lütfen tekrar deneyin." },
            { status: 500 },
        );
    }
}
