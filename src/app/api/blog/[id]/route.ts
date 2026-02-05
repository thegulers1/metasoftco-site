import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/blog/[id]
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const post = await prisma.blogPost.findUnique({
            where: { id },
        });

        if (!post) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 }
        );
    }
}

// PUT /api/blog/[id]
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
            excerpt,
            content,
            image,
            category,
            author,
            published,
            metaTitle,
            metaDescription,
            metaKeywords,
            ogImage,
            // English
            title_en,
            excerpt_en,
            content_en,
            metaTitle_en,
            metaDescription_en,
            metaKeywords_en,
        } = body;

        // publishedAt güncelle
        const existingPost = await prisma.blogPost.findUnique({ where: { id } });
        let publishedAt = existingPost?.publishedAt;
        if (published && !existingPost?.published) {
            publishedAt = new Date();
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                category,
                author,
                published,
                publishedAt,
                metaTitle,
                metaDescription,
                metaKeywords,
                ogImage,
                // English
                title_en,
                excerpt_en,
                content_en,
                metaTitle_en,
                metaDescription_en,
                metaKeywords_en,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating blog post:", error);
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/[id]
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        );
    }
}
