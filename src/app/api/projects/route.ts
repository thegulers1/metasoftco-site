import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";

export const dynamic = 'force-dynamic';

// GET /api/projects - Tüm projeleri getir
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const publishedOnly = searchParams.get("published") === "true";

        const projects = await prisma.project.findMany({
            where: publishedOnly ? { published: true } : undefined,
            orderBy: [
                { featured: "desc" },
                { order: "asc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Projeler getirilemedi" },
            { status: 500 }
        );
    }
}

// POST /api/projects - Yeni proje ekle
export async function POST(request: Request) {
    try {
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
            title_en,
            description_en,
            content_en,
            metaTitle_en,
            metaDescription_en,
            metaKeywords_en,
        } = body;

        const project = await prisma.project.create({
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
                featured: featured ?? false,
                published: published ?? true,
                order: order ?? 0,
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

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        const { message, status } = prismaErrorMessage(error, "Proje oluşturulamadı");
        return NextResponse.json({ error: message }, { status });
    }
}
