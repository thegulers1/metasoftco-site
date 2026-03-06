import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: List all media items directly from Cloudinary
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type") === "video" ? "video" : "image";

        const result = await cloudinary.api.resources({
            type: "upload",
            prefix: "metasoftco/",
            resource_type: type,
            max_results: 500,
            direction: "desc",
        });

        const media = result.resources.map((r: any) => ({
            id: r.public_id,
            url: r.secure_url,
            fileName: r.public_id.split("/").pop() || r.public_id,
            fileType: type === "video" ? `video/${r.format}` : `image/${r.format}`,
            folder: r.public_id.includes("/")
                ? r.public_id.split("/").slice(0, -1).join("/")
                : "",
            createdAt: r.created_at,
        }));

        console.log(`📊 API /media - Cloudinary'den ${media.length} medya döndürülüyor (type: ${type})`);

        return NextResponse.json(media);
    } catch (error) {
        console.error("Media list error:", error);
        return NextResponse.json(
            { error: "Failed to fetch media" },
            { status: 500 }
        );
    }
}

// DELETE: Remove media from Cloudinary (and DB if exists)
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); // id = Cloudinary publicId

        if (!id) {
            return NextResponse.json(
                { error: "Media ID is required" },
                { status: 400 }
            );
        }

        // Cloudinary'den sil
        await cloudinary.uploader.destroy(id);

        // DB'de kayıt varsa onu da sil (hata olursa görmezden gel)
        try {
            await prisma.media.deleteMany({ where: { publicId: id } });
        } catch {}

        return NextResponse.json({ message: "Media deleted successfully" });
    } catch (error) {
        console.error("Media delete error:", error);
        return NextResponse.json(
            { error: "Failed to delete media" },
            { status: 500 }
        );
    }
}
