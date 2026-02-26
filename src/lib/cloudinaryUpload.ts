export async function uploadToCloudinary(file: File, folder: string) {
    // 1. Sunucudan imza al
    const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
    });

    if (!signRes.ok) throw new Error("Failed to get upload signature");

    const { signature, timestamp, cloudName, apiKey } = await signRes.json();

    // 2. Doğrudan Cloudinary'ye yükle (Vercel'i bypass eder)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", String(timestamp));
    formData.append("api_key", apiKey);
    formData.append("folder", folder);

    const resourceType = file.type.startsWith("video/") ? "video" : "image";

    const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        { method: "POST", body: formData }
    );

    if (!uploadRes.ok) throw new Error("Cloudinary upload failed");

    const data = await uploadRes.json();

    // 3. Metadata'yı DB'ye kaydet
    await fetch("/api/upload/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            url: data.secure_url,
            publicId: data.public_id,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            folder,
        }),
    });

    return {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format,
    };
}
