/**
 * The public-site publishing gate. These checks intentionally do not fall
 * back to Turkish fields: a missing English field means that the English
 * record is not ready to publish, link, or include in the sitemap.
 */
const present = (value: string | null | undefined) => Boolean(value?.trim());

export function isEnglishCategoryPublishable(category: {
    slug_en: string | null;
    name_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
}) {
    return [category.slug_en, category.name_en, category.metaTitle_en, category.metaDescription_en].every(present);
}

export function isEnglishServicePublishable(
    service: {
        slug_en: string | null;
        title_en: string | null;
        description_en: string | null;
        content_en: string | null;
        metaTitle_en: string | null;
        metaDescription_en: string | null;
    },
    category: Parameters<typeof isEnglishCategoryPublishable>[0],
) {
    return isEnglishCategoryPublishable(category) && [
        service.slug_en,
        service.title_en,
        service.description_en,
        service.content_en,
        service.metaTitle_en,
        service.metaDescription_en,
    ].every(present);
}

export function isEnglishProjectPublishable(project: {
    slug_en: string | null;
    title_en: string | null;
    description_en: string | null;
    content_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
}) {
    return [
        project.slug_en,
        project.title_en,
        project.description_en,
        project.content_en,
        project.metaTitle_en,
        project.metaDescription_en,
    ].every(present);
}

export function isEnglishBlogPostPublishable(post: {
    slug_en: string | null;
    title_en: string | null;
    excerpt_en: string | null;
    content_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
}) {
    return [post.slug_en, post.title_en, post.excerpt_en, post.content_en, post.metaTitle_en, post.metaDescription_en].every(present);
}

export function isEnglishSectorPagePublishable(page: {
    slug_en: string | null;
    h1_en: string | null;
    excerpt_en: string | null;
    content_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
}) {
    return [page.slug_en, page.h1_en, page.excerpt_en, page.content_en, page.metaTitle_en, page.metaDescription_en].every(present);
}

export const excludedSectorPageSlugs = new Set(["test", "istanbul-ai-photobooth"]);
