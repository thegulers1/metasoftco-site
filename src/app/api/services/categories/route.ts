import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET /api/services/categories - Sadece kategorileri getir
export async function GET() {
    try {
        const categories = await prisma.serviceCategory.findMany({
            orderBy: { order: "asc" },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

// POST /api/services/categories - Yeni kategori ekle
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name, slug, order,
            // SEO
            metaTitle, metaDescription, metaKeywords,
            // English
            name_en, metaTitle_en, metaDescription_en
        } = body;

        const category = await prisma.serviceCategory.create({
            data: {
                name,
                slug,
                order: order || 0,
                // SEO
                metaTitle,
                metaDescription,
                metaKeywords,
                // English
                name_en,
                metaTitle_en,
                metaDescription_en,
            },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}
