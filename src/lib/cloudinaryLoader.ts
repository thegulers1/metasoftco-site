import { ImageLoaderProps } from "next/image";

const MAX_WIDTH = 1920;

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
    if (!src.includes("res.cloudinary.com")) {
        return src;
    }

    // Cap width to avoid oversized Cloudinary requests (e.g. w_3840 causes 400s from bots)
    const clampedWidth = Math.min(width, MAX_WIDTH);
    const q = quality ? `q_${quality}` : "q_auto";
    // Animated GIFs need fl_animated or f_auto/width transforms flatten them to a static frame.
    const isGif = /\.gif($|\?)/i.test(src);
    const transforms = isGif ? `f_auto,${q},fl_animated,w_${clampedWidth}` : `f_auto,${q},w_${clampedWidth}`;
    return src.replace("/image/upload/", `/image/upload/${transforms}/`);
}
