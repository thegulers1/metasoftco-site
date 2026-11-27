import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
const files = new Set(["ai-photo-video.mp4", "karikatur-video.mp4"]);

// Safari requests byte ranges before starting playback. Explicit lengths also
// keep proxies from turning these small MP4 responses into chunked transfers.
export async function GET(request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  if (!files.has(name)) return new Response(null, { status: 404 });
  const data = await readFile(path.join(process.cwd(), "public/videos/yilbasi", name));
  const size = data.length;
  const headers = new Headers({
    "Content-Type": "video/mp4",
    "Content-Encoding": "identity",
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store, no-transform",
  });
  const range = request.headers.get("range");
  let start = 0;
  let end = size - 1;
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match || (!match[1] && !match[2])) {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
    end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  }
  headers.set("Content-Length", String(end - start + 1));
  return new Response(new Uint8Array(data.subarray(start, end + 1)), { status: range ? 206 : 200, headers });
}
