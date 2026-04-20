import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const page = await prisma.sectorPage.findUnique({ where: { id } });
        if (!page) return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
        return NextResponse.json(page);
    } catch {
        return NextResponse.json({ error: "Sayfa getirilemedi" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const page = await prisma.sectorPage.update({
            where: { id },
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
        // Cache'i temizle
        revalidatePath(`/sektorel-cozumler/${page.slug}`);
        revalidatePath('/sektorel-cozumler');
        revalidatePath('/');
        if (page.slug_en) {
            revalidatePath(`/en/sector-solutions/${page.slug_en}`);
            revalidatePath('/en/sector-solutions');
        }

        return NextResponse.json(page);
    } catch (error: any) {
        if (error?.code === "P2002") {
            return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
        }
        return NextResponse.json({ error: "Sayfa güncellenemedi" }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.sectorPage.delete({ where: { id } });

        revalidatePath('/sektorel-cozumler');
        revalidatePath('/en/sector-solutions');
        revalidatePath('/');

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Sayfa silinemedi" }, { status: 500 });
    }
}
