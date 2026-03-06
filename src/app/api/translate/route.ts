import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { text, field } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        const systemPrompt = `You are a professional translator. Translate the following Turkish text to English. 
Keep the tone and style appropriate for a ${field || 'general'} field on a professional website.
Only return the translation, nothing else.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ],
            temperature: 0.3,
        });

        const translation = completion.choices[0]?.message?.content || "";

        return NextResponse.json({ translation });
    } catch (error: any) {
        console.error("Translation error:", error);
        return NextResponse.json(
            { error: "Translation failed", details: error?.message || "Unknown error" },
            { status: 500 }
        );
    }
}
