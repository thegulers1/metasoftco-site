import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        if (typeof body.published !== "boolean") {
            return NextResponse.json({ error: "published alanı boolean olmalı" }, { status: 400 });
        }

        const service = await prisma.service.update({
            where: { id },
            data: { published: body.published },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error updating published:", error);
        return NextResponse.json(
            { error: "Güncellenemedi" },
            { status: 500 }
        );
    }
}
