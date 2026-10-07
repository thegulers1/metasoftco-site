// Client-safe half of the AI draft feature: the draft shapes and the mapping
// from a draft to the body each create endpoint expects.

export type DraftKind = "project" | "service" | "blog";

const BLOG_AUTHOR = "MetasoftCo Ekibi";

export interface FaqItem {
    q: string;
    a: string;
}

/** One draft page. `summary` is the description (project, service) or the excerpt (blog). */
export interface Draft {
    title: string;
    slug: string;
    summary: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    faq: FaqItem[];
    title_en: string;
    slug_en: string;
    summary_en: string;
    content_en: string;
    metaTitle_en: string;
    metaDescription_en: string;
    metaKeywords_en: string;
    faq_en: FaqItem[];
    /** Project: the showcased services. Blog: services recommended under the post. */
    serviceIds?: string[];
    // Project
    client?: string;
    projectDate?: string | null;
    tags?: string[];
    // Project and blog
    category?: string;
    // Service
    categoryId?: string;
    /** Display only; filled in by the server from `categoryId`. */
    categoryName?: string;
    homeTitle?: string;
    homeTitle_en?: string;
    outputType?: "none" | "digital" | "print";
}

export interface DraftResult {
    kind: DraftKind;
    drafts: Draft[];
    /** Ready-to-post caption for the whole note; not stored anywhere. */
    instagramCaption: string;
    /** Things the note leaves open, phrased as questions for the editor. */
    missing: string[];
    /** Activities in the note that match no service on the site (projects only). */
    unmatchedActivities: string[];
}

/** A rewrite of an existing service page, for review in the edit form. */
export interface ServiceRevision {
    draft: Draft;
    missing: string[];
}

/** Shapes a draft into the body its create endpoint expects. Always unpublished. */
export function draftToPayload(kind: DraftKind, draft: Draft): Record<string, unknown> {
    const json = <T,>(items: T[] | undefined) => (items && items.length > 0 ? JSON.stringify(items) : null);
    const common = {
        title: draft.title,
        slug: draft.slug,
        content: draft.content,
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        metaKeywords: draft.metaKeywords,
        faq: json(draft.faq),
        title_en: draft.title_en,
        slug_en: draft.slug_en,
        content_en: draft.content_en,
        metaTitle_en: draft.metaTitle_en,
        metaDescription_en: draft.metaDescription_en,
        metaKeywords_en: draft.metaKeywords_en,
        faq_en: json(draft.faq_en),
        published: false,
    };
    if (kind === "project") {
        return {
            ...common,
            description: draft.summary,
            description_en: draft.summary_en,
            client: draft.client,
            category: draft.category,
            projectDate: draft.projectDate,
            technologies: json(draft.tags),
            serviceIds: json(draft.serviceIds),
            featured: false,
        };
    }
    if (kind === "service") {
        return {
            ...common,
            description: draft.summary,
            description_en: draft.summary_en,
            categoryId: draft.categoryId,
            homeTitle: draft.homeTitle,
            homeTitle_en: draft.homeTitle_en,
            outputType: draft.outputType,
            type: "RENTAL",
        };
    }
    return {
        ...common,
        excerpt: draft.summary,
        excerpt_en: draft.summary_en,
        category: draft.category,
        author: BLOG_AUTHOR,
        serviceIds: json(draft.serviceIds),
    };
}
