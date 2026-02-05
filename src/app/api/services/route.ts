import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/services - Tüm kategoriler ve hizmetleri getir
export async function GET() {
    try {
        const categories = await prisma.serviceCategory.findMany({
            orderBy: { order: "asc" },
            include: {
                services: {
                    orderBy: { order: "asc" },
                },
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

// POST /api/services - Yeni hizmet ekle
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            categoryId,
            title,
            slug,
            description,
            content,
            image,
            gallery,
            video,
            size,
            bgColor,
            textColor,
            order,
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
        } = body;

        const service = await prisma.service.create({
            data: {
                categoryId,
                title,
                slug,
                description,
                content,
                image,
                gallery,
                video,
                size: size || "medium",
                bgColor,
                textColor: textColor || "light",
                order: order || 0,
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

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json(
            { error: "Failed to create service" },
            { status: 500 }
        );
    }
}
