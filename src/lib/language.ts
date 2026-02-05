// Helper to get localized content
export function getLocalizedField<T>(
    obj: any,
    field: string,
    language: "tr" | "en"
): T {
    if (language === "en") {
        const enField = `${field}_en`;
        return (obj[enField] || obj[field]) as T;
    }
    return obj[field] as T;
}

// Usage:
// getLocalizedField<string>(service, "title", language)
// Returns service.title_en if language is "en" and it exists, otherwise service.title
