import { ImageLoaderProps } from "next/image";

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
    if (!src.includes("res.cloudinary.com")) {
        return src;
    }

    // Insert transformation params into Cloudinary URL
    // From: https://res.cloudinary.com/xxx/image/upload/v123/file.jpg
    // To:   https://res.cloudinary.com/xxx/image/upload/f_auto,q_auto,w_800/v123/file.jpg
    const q = quality ?? 75;
    const transforms = `f_auto,q_${q},w_${width}`;
    return src.replace("/image/upload/", `/image/upload/${transforms}/`);
}
