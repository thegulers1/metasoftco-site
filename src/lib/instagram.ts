export interface InstagramPost {
    id: string;
    permalink: string;
    mediaUrl: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    caption?: string;
    timestamp: string;
}

export async function getInstagramFeed(): Promise<InstagramPost[]> {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        console.warn("Instagram token not configured");
        return [];
    }

    try {
        const res = await fetch(
            `https://graph.instagram.com/me/media?fields=id,permalink,media_url,media_type,caption,timestamp&access_token=${token}&limit=6`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        const data = await res.json();

        if (data.error) {
            console.error("Instagram API error:", data.error);
            return [];
        }

        return data.data.map((post: any) => ({
            id: post.id,
            permalink: post.permalink,
            mediaUrl: post.media_url,
            mediaType: post.media_type,
            caption: post.caption,
            timestamp: post.timestamp,
        }));
    } catch (error) {
        console.error("Error fetching Instagram feed:", error);
        return [];
    }
}
