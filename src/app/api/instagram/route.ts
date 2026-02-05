import { NextResponse } from "next/server";
import { getInstagramFeed } from "@/lib/instagram";

export async function GET() {
    try {
        const posts = await getInstagramFeed();

        if (posts.length === 0) {
            // Check if it's because of missing token or actual empty feed
            if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
                return NextResponse.json({ error: "Instagram token not configured" }, { status: 400 });
            }
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error in instagram api route:", error);
        return NextResponse.json(
            { error: "Failed to fetch Instagram feed" },
            { status: 500 }
        );
    }
}
