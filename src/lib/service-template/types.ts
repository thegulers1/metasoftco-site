/**
 * Shared shape of a service product page (the AI Photobooth layout: gallery,
 * copy and quote card on top, then content sections). A service profile holds
 * the copy that is not stored in the database; the loader adds the database
 * records. Every section hides itself when its data is missing.
 */

export interface TemplateTitled {
    title: string;
    body: string;
}

export interface TemplateSectionCopy {
    eyebrow: string;
    title: string;
    lede: string;
}

export interface TemplateCaseProfile {
    projectSlug: string;
    heading: string;
    kicker: string;
    summary: string;
    /** Gallery index of the real result image used on the project card. */
    cardGalleryIndex: number;
}

export interface TemplateGalleryFrame {
    projectSlug: string;
    /** Index into the project's gallery. */
    galleryIndex: number;
}

export interface ServiceTemplateProfile {
    categorySlug: string;
    serviceSlug: string;
    /** Product name used for the gallery labels and the quote request. */
    productName: string;
    product: {
        eyebrow: string;
        titleLines: [string, string];
        intro: string;
        description: string;
        badges: string[];
        specs: { term: string; value: string }[];
        galleryFrames: TemplateGalleryFrame[];
        /** Project whose own video plays in the gallery. */
        videoProjectSlug?: string;
        /** Set when every gallery photo is a 2:3 portrait that must not be cropped. */
        portraitGallery?: boolean;
    };
    quoteCard: { eyebrow: string; title: string; lede: string; message: string };
    steps: TemplateSectionCopy & { items: TemplateTitled[] };
    blocks: (TemplateSectionCopy & { id: string; items: TemplateTitled[] })[];
    scope: { eyebrow: string; title: string; lede: string; cta: string; includedTitle: string; included: string[]; optionalTitle: string; optional: string[]; note: string };
    operations: TemplateSectionCopy & { id: string };
    cases: { eyebrow: string; title: string; items: TemplateCaseProfile[] };
    /** The visible FAQ; also the single list a future FAQPage JSON-LD must be built from. */
    faq: { eyebrow: string; title: string; lede: string; items: { q: string; a: string }[] };
    closing: { title: string; lede: string };
}

export interface TemplateImage {
    url: string;
    alt: string;
}

export interface TemplateProject {
    slug: string;
    title: string;
    video: string | null;
    cover: TemplateImage | null;
    gallery: TemplateImage[];
}
