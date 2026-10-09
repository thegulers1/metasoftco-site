import { unstable_cache } from "next/cache";
import { buildLlmsFullTxt } from "@/lib/llms";

// Defer database reads until runtime and retain the hourly catalogue cache.
export const dynamic = "force-dynamic";
const getLlmsFullTxt = unstable_cache(buildLlmsFullTxt, ["llms-full-txt"], { revalidate: 3600 });

export async function GET() {
    return new Response(await getLlmsFullTxt(), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
