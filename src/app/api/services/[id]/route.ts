import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";

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
            { error: "Hizmet getirilemedi" },
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
            homeTitle,
            homeTitle_en,
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
            // Accent / tag
            accentText,
            accentText_en,
            accentColor,
            // English fields
            slug_en,
            title_en,
            description_en,
            content_en,
            metaTitle_en,
            metaDescription_en,
            metaKeywords_en,
            // FAQ & Specs
            faq,
            faq_en,
            specs,
            specs_en,
        } = body;

        const service = await prisma.service.update({
            where: { id },
            data: {
                title,
                    // Accent / tag
                    accentText: accentText || null,
                    accentText_en: accentText_en || null,
                    accentColor: accentColor || null,
                homeTitle: homeTitle || null,
                homeTitle_en: homeTitle_en || null,
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
                slug_en: slug_en || null,
                title_en,
                description_en,
                content_en,
                metaTitle_en,
                metaDescription_en,
                metaKeywords_en,
                faq: faq || null,
                faq_en: faq_en || null,
                specs: specs || null,
                specs_en: specs_en || null,
            },
        });

        // Cache'i temizle
        const category = await prisma.serviceCategory.findUnique({ where: { id: service.categoryId } });
        if (category) {
            revalidatePath(`/hizmetler/${category.slug}/${service.slug}`);
            revalidatePath(`/hizmetler/${category.slug}`);
            if (service.slug_en && category.slug_en) {
                revalidatePath(`/en/services/${category.slug_en}/${service.slug_en}`);
                revalidatePath(`/en/services/${category.slug_en}`);
            }
        }
        revalidatePath('/hizmetler');
        revalidatePath('/en/services');
        revalidatePath('/');

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error updating service:", error);
        const { message, status } = prismaErrorMessage(error, "Hizmet güncellenemedi");
        return NextResponse.json({ error: message }, { status });
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

        revalidatePath('/hizmetler');
        revalidatePath('/en/services');
        revalidatePath('/');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting service:", error);
        const { message, status } = prismaErrorMessage(error, "Hizmet silinemedi");
        return NextResponse.json({ error: message }, { status });
    }
}
