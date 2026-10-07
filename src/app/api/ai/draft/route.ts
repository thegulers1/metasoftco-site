import { NextRequest, NextResponse } from "next/server";
import { generateDrafts, reviseService } from "@/lib/ai-draft";
import type { DraftKind } from "@/lib/ai-draft-shared";

export const dynamic = "force-dynamic";
// Writing several bilingual drafts takes a while.
export const maxDuration = 300;

const KINDS: DraftKind[] = ["project", "service", "blog"];

// POST /api/ai/draft - Serbest nottan proje / hizmet / blog taslağı üret, ya da serviceId ile mevcut hizmeti yeniden yaz (kaydetmez)
export async function POST(request: NextRequest) {
    try {
        const { kind, brief, serviceId } = await request.json();
        if (!KINDS.includes(kind)) {
            return NextResponse.json({ error: "Geçersiz içerik türü." }, { status: 400 });
        }
        if (typeof brief !== "string" || brief.trim().length < 20) {
            return NextResponse.json({ error: "Birkaç cümleyle anlatın." }, { status: 400 });
        }
        // With a serviceId the note rewrites that existing service page instead of drafting a new one.
        if (kind === "service" && typeof serviceId === "string" && serviceId) {
            return NextResponse.json(await reviseService(serviceId, brief.trim().slice(0, 6000)));
        }
        return NextResponse.json(await generateDrafts(kind, brief.trim().slice(0, 6000)));
    } catch (error) {
        console.error("AI draft error:", error);
        const details = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ error: `Taslak oluşturulamadı: ${details}` }, { status: 500 });
    }
}
