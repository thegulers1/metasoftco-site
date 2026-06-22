interface PrismaLikeError {
    code?: string;
    meta?: { target?: string[] | string; field_name?: string };
}

export function prismaErrorMessage(error: unknown, fallback: string): { message: string; status: number } {
    const err = error as PrismaLikeError;

    if (err?.code === "P2002") {
        const target = err.meta?.target;
        const field = Array.isArray(target) ? target.join(", ") : target;
        return {
            message: field
                ? `Bu ${field} zaten kullanılıyor, başka bir değer girin`
                : "Bu kayıt zaten mevcut (benzersizlik kuralı ihlali)",
            status: 409,
        };
    }

    if (err?.code === "P2003") {
        return { message: "Seçilen kategori/ilişkili kayıt bulunamadı", status: 400 };
    }

    if (err?.code === "P2025") {
        return { message: "Kayıt bulunamadı", status: 404 };
    }

    return { message: fallback, status: 500 };
}
