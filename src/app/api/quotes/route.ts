import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";
import { QuoteInputError, nextQuoteNumber, quoteDataFromBody } from "@/lib/quotes-server";

// Writes here are admin-only through src/middleware.ts; there is no GET on
// purpose (middleware lets reads through and quotes hold customer data).
export async function POST(req: Request) {
    try {
        const data = quoteDataFromBody(await req.json());
        // Two quotes saved at the same moment can race for a number; retry once.
        for (let attempt = 0; ; attempt++) {
            try {
                const quote = await prisma.quote.create({ data: { ...data, number: await nextQuoteNumber() } });
                return NextResponse.json({ id: quote.id, number: quote.number }, { status: 201 });
            } catch (error) {
                if ((error as { code?: string }).code !== "P2002" || attempt > 0) throw error;
            }
        }
    } catch (error) {
        if (error instanceof QuoteInputError) return NextResponse.json({ error: error.message }, { status: 400 });
        const { message, status } = prismaErrorMessage(error, "Teklif kaydedilemedi");
        return NextResponse.json({ error: message }, { status });
    }
}
