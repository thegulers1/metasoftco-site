import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";

export const dynamic = 'force-dynamic';

// GET /api/projects/[id] - Proje detayı getir
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json(
            { error: "Proje getirilemedi" },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Proje güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const {
            title,
            slug,
            description,
            content,
            image,
            gallery,
            category,
            client,
            projectDate,
            technologies,
            projectUrl,
            githubUrl,
            featured,
            published,
            order,
            metaTitle,
            metaDescription,
            metaKeywords,
            ogImage,
            // English fields
            slug_en,
            title_en,
            description_en,
            content_en,
            metaTitle_en,
            metaDescription_en,
            metaKeywords_en,
            video,
        } = body;

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                image,
                gallery,
                category,
                client,
                projectDate: projectDate ? new Date(projectDate) : null,
                technologies,
                projectUrl,
                githubUrl,
                featured,
                published,
                order,
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
                video: video || null,
            },
        });

        // Cache'i temizle
        revalidatePath(`/projeler/${project.slug}`);
        revalidatePath('/projeler');
        revalidatePath('/');
        if (project.slug_en) {
            revalidatePath(`/en/projects/${project.slug_en}`);
            revalidatePath('/en/projects');
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error updating project:", error);
        const { message, status } = prismaErrorMessage(error, "Proje güncellenemedi");
        return NextResponse.json({ error: message }, { status });
    }
}

// DELETE /api/projects/[id] - Proje sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.project.delete({
            where: { id },
        });

        revalidatePath('/projeler');
        revalidatePath('/en/projects');
        revalidatePath('/');

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        const { message, status } = prismaErrorMessage(error, "Proje silinemedi");
        return NextResponse.json({ error: message }, { status });
    }
}
