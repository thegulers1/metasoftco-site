import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET /api/services/[id] - Tek hizmet getir
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const service = await prisma.service.findUnique({
            where: { id },
        });

        if (!service) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        return NextResponse.json(
            { error: "Failed to fetch service" },
            { status: 500 }
        );
    }
}

// PUT /api/services/[id] - Hizmeti güncelle
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const {
            title,
            slug,
            description,
            content,
            image,
            gallery,
            video,
            videoThumbnailTime,
            size,
            bgColor,
            textColor,
            order,
            categoryId,
            // SEO fields
            metaTitle,
            metaDescription,
            metaKeywords,
            ogImage,
            // Featured
            featured,
            featuredOrder,
            // English fields
            title_en,
            description_en,
            content_en,
            metaTitle_en,
            metaDescription_en,
            metaKeywords_en,
        } = body;

        const service = await prisma.service.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                image,
                gallery,
                video,
                videoThumbnailTime,
                size,
                bgColor,
                textColor,
                order,
                featured,
                featuredOrder,
                categoryId,
                metaTitle,
                metaDescription,
                metaKeywords,
                ogImage,
                // English fields
                title_en,
                description_en,
                content_en,
                metaTitle_en,
                metaDescription_en,
                metaKeywords_en,
            },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json(
            { error: "Failed to update service" },
            { status: 500 }
        );
    }
}

// DELETE /api/services/[id] - Hizmeti sil
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await prisma.service.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json(
            { error: "Failed to delete service" },
            { status: 500 }
        );
    }
}
