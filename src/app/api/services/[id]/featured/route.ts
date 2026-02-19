import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const data: { featured?: boolean; featuredOrder?: number } = {};

        if (typeof body.featured === "boolean") {
            data.featured = body.featured;
        }
        if (typeof body.featuredOrder === "number") {
            data.featuredOrder = body.featuredOrder;
        }

        const service = await prisma.service.update({
            where: { id },
            data,
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error updating featured:", error);
        return NextResponse.json(
            { error: "Failed to update" },
            { status: 500 }
        );
    }
}
