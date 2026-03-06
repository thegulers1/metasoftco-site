import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { url, publicId, fileName, fileType, fileSize, folder } = await request.json();

        const { prisma } = await import("@/lib/db");
        await prisma.media.create({
            data: {
                url,
                publicId,
                fileName,
                fileType,
                fileSize,
                folder,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Save error:", error);
        return NextResponse.json({ error: "Failed to save media" }, { status: 500 });
    }
}
