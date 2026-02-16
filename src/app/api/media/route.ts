import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: List all media items
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get("folder");
        const type = searchParams.get("type");
        const search = searchParams.get("search");

        const where: any = {};
        if (folder) where.folder = folder;
        if (type) where.fileType = { contains: type };
        if (search) {
            where.OR = [
                { fileName: { contains: search, mode: 'insensitive' } },
                { folder: { contains: search, mode: 'insensitive' } },
            ];
        }

        const media = await prisma.media.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        console.log(`📊 API /media - Toplam ${media.length} medya döndürülüyor`);

        return NextResponse.json(media);
    } catch (error) {
        console.error("Media list error:", error);
        return NextResponse.json(
            { error: "Failed to fetch media" },
            { status: 500 }
        );
    }
}

// DELETE: Remove media from DB and Cloudinary
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Media ID is required" },
                { status: 400 }
            );
        }

        const media = await prisma.media.findUnique({
            where: { id },
        });

        if (!media) {
            return NextResponse.json(
                { error: "Media not found" },
                { status: 404 }
            );
        }

        // Cloudinary'den sil
        await cloudinary.uploader.destroy(media.publicId);

        // Veritabanından sil
        await prisma.media.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Media deleted successfully" });
    } catch (error) {
        console.error("Media delete error:", error);
        return NextResponse.json(
            { error: "Failed to delete media" },
            { status: 500 }
        );
    }
}
