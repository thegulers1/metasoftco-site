import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";
import { QuoteInputError, quoteDataFromBody } from "@/lib/quotes-server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const quote = await prisma.quote.update({ where: { id }, data: quoteDataFromBody(await req.json()) });
        return NextResponse.json({ id: quote.id, number: quote.number });
    } catch (error) {
        if (error instanceof QuoteInputError) return NextResponse.json({ error: error.message }, { status: 400 });
        const { message, status } = prismaErrorMessage(error, "Teklif güncellenemedi");
        return NextResponse.json({ error: message }, { status });
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.quote.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        const { message, status } = prismaErrorMessage(error, "Teklif silinemedi");
        return NextResponse.json({ error: message }, { status });
    }
}
