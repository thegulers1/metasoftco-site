/**
 * Cloudinary URL'sine otomatik format (WebP/AVIF) ve kalite optimizasyonu ekler.
 * Örn: /upload/v123/photo.jpg → /upload/f_auto,q_auto,w_1200/v123/photo.jpg
 */
export function cloudinaryOptimize(url: string | null | undefined, width?: number): string {
    if (!url) return "";
    if (!url.includes("res.cloudinary.com")) return url;
    // Zaten transform uygulanmışsa dokunma
    if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto")) return url;

    const transform = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
    return url.replace("/upload/", `/upload/${transform}/`);
}
