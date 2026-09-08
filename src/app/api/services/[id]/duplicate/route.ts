import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";

export const dynamic = 'force-dynamic';

// POST /api/services/[id]/duplicate - Hizmeti kopyala (satış/kiralama varyantı oluşturmak için)
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const original = await prisma.service.findUnique({ where: { id } });

        if (!original) {
            return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });
        }

        const suffix = Date.now().toString(36);
        const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = original;

        const copy = await prisma.service.create({
            data: {
                ...rest,
                title: `${original.title} (Kopya)`,
                title_en: original.title_en ? `${original.title_en} (Copy)` : original.title_en,
                slug: `${original.slug}-kopya-${suffix}`,
                slug_en: original.slug_en ? `${original.slug_en}-copy-${suffix}` : original.slug_en,
                published: false,
                featured: false,
                featuredOrder: 0,
            },
        });

        return NextResponse.json(copy, { status: 201 });
    } catch (error) {
        console.error("Error duplicating service:", error);
        const { message, status } = prismaErrorMessage(error, "Hizmet kopyalanamadı");
        return NextResponse.json({ error: message }, { status });
    }
}
