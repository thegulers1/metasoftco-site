import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";
import { nextQuoteNumber } from "@/lib/quotes-server";

/** Copies a quote as a new draft with a fresh number and validity date. */
export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const source = await prisma.quote.findUnique({ where: { id } });
        if (!source) return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });
        const validDays = source.validUntil ? Math.max(1, Math.round((source.validUntil.getTime() - source.createdAt.getTime()) / 86_400_000)) : null;
        const quote = await prisma.quote.create({
            data: {
                company: source.company,
                contactName: source.contactName,
                contactEmail: source.contactEmail,
                contactPhone: source.contactPhone,
                eventName: source.eventName,
                eventDate: source.eventDate,
                city: source.city,
                venue: source.venue,
                shippingAmount: source.shippingAmount,
                vatRate: source.vatRate,
                notes: source.notes,
                options: source.options ?? [],
                status: "DRAFT",
                number: await nextQuoteNumber(),
                validUntil: validDays ? new Date(Date.now() + validDays * 86_400_000) : null,
            },
        });
        return NextResponse.json({ id: quote.id, number: quote.number }, { status: 201 });
    } catch (error) {
        const { message, status } = prismaErrorMessage(error, "Teklif kopyalanamadı");
        return NextResponse.json({ error: message }, { status });
    }
}
