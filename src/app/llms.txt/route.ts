import { unstable_cache } from "next/cache";
import { buildLlmsTxt } from "@/lib/llms";

// Defer database reads until runtime and retain the hourly catalogue cache.
export const dynamic = "force-dynamic";
const getLlmsTxt = unstable_cache(buildLlmsTxt, ["llms-txt"], { revalidate: 3600 });

export async function GET() {
    return new Response(await getLlmsTxt(), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
