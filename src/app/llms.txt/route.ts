import { buildLlmsTxt } from "@/lib/llms";

// Regenerated hourly from the database, so new or edited services show up
// for AI assistants without anyone touching a static file.
export const revalidate = 3600;

export async function GET() {
    return new Response(await buildLlmsTxt(), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
