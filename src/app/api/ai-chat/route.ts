import { OpenAI } from "openai";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { message, conversationHistory = [] } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Fetch all services from database with categories
        const services = await prisma.service.findMany({
            include: {
                category: true,
            },
        });

        // Build service context for ChatGPT
        const servicesContext = services
            .map(
                (s) =>
                    `- ${s.title} (${s.category.name}): ${s.description || "Detaylı hizmet bilgisi"}`,
            )
            .join("\n");

        // Build conversation messages
        const messages: any[] = [
            {
                role: "system",
                content: `Sen Metasoft şirketinin yapay zeka destekli müşteri asistanısın. Adın "Meta AI". 
Görevin müşterilere samimi, profesyonel ve yardımsever bir şekilde hizmet önerileri yapmak.

Metasoft'un sunduğu hizmetler:
${servicesContext}

KURALLAR:
1. Her zaman Türkçe konuş
2. Samimi ve dostane ol ama profesyonelliği koru
3. Müşteri ihtiyacına göre en uygun hizmetleri öner
4. Sadece yukarıdaki hizmetleri öner, başka hizmet uydurma
5. Kısa ve öz cevaplar ver (max 2-3 paragraf)
6. Emoji kullan ama abartma (✨🎨📸 gibi)
7. Müşteriye hizmet hakkında detaylı bilgi vermek istersen web sitesine yönlendir

Örnek yanıt tarzı:
"Merhaba! 🎉 Yılbaşı etkinliği için AI Photo hizmetimiz tam size göre! Yapay zeka destekli fotoğraf çekimi ile misafirlerinize unutulmaz anılar yaşatabilirsiniz. Detaylı bilgi için hizmetler sayfamızı ziyaret edebilirsiniz."`,
            },
            ...conversationHistory,
            {
                role: "user",
                content: message,
            },
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.8,
            max_tokens: 500,
        });

        const reply = response.choices[0].message.content;

        return NextResponse.json({
            reply,
            success: true,
        });
    } catch (error: any) {
        console.error("AI Chat error:", error);
        return NextResponse.json(
            {
                error: "Üzgünüm, şu anda bir hata oluştu. Lütfen tekrar deneyin.",
                details: error.message,
            },
            { status: 500 },
        );
    }
}
