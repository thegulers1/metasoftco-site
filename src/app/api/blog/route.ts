import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

// GET /api/blog - Tüm blog yazılarını getir
export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}

// POST /api/blog - Yeni blog yazısı oluştur
export async function POST(request: Request) {
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

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                category,
                author,
                published: published || false,
                publishedAt: published ? new Date() : null,
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

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 }
        );
    }
}
