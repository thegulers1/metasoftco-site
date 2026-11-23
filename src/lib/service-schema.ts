import { generateServiceSchema } from "./site";

/** Editor schemas may be an object, array or @graph. Never duplicate a Service. */
export function containsServiceSchema(raw: string | null | undefined): boolean {
    if (!raw) return false;
    function visit(value: unknown): boolean {
        if (Array.isArray(value)) return value.some(visit);
        if (!value || typeof value !== "object") return false;
        const object = value as Record<string, unknown>;
        const types = Array.isArray(object["@type"]) ? object["@type"] : [object["@type"]];
        return types.includes("Service") || visit(object["@graph"]);
    }
    try { return visit(JSON.parse(raw)); } catch { return false; }
}

export function landingServiceSchema(input: Parameters<typeof generateServiceSchema>[0], custom?: string | null) {
    return containsServiceSchema(custom) ? null : generateServiceSchema(input);
}
