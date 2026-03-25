import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const pages = await prisma.sectorPage.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(pages);
    } catch (error) {
        return NextResponse.json({ error: "Sayfalar getirilemedi" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const page = await prisma.sectorPage.create({
            data: {
                title: body.title,
                slug: body.slug,
                h1: body.h1 || null,
                excerpt: body.excerpt || null,
                content: body.content || null,
                images: body.images || null,
                published: body.published ?? false,
                order: body.order ?? 0,
                metaTitle: body.metaTitle || null,
                metaDescription: body.metaDescription || null,
                metaKeywords: body.metaKeywords || null,
                ogImage: body.ogImage || null,
                customSchema: body.customSchema || null,
                serviceIds: body.serviceIds || null,
                slug_en: body.slug_en || null,
                h1_en: body.h1_en || null,
                excerpt_en: body.excerpt_en || null,
                content_en: body.content_en || null,
                metaTitle_en: body.metaTitle_en || null,
                metaDescription_en: body.metaDescription_en || null,
                metaKeywords_en: body.metaKeywords_en || null,
            },
        });
        return NextResponse.json(page, { status: 201 });
    } catch (error: any) {
        if (error?.code === "P2002") {
            return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
        }
        return NextResponse.json({ error: "Sayfa oluşturulamadı" }, { status: 500 });
    }
}
