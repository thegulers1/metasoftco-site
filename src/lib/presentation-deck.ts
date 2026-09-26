/**
 * Presentation deck shape and pure helpers, safe to import from client
 * components. Loading the deck from the database lives in presentation.ts.
 */

export type DeckSpec = { label: string; value: string };

export type DeckService = {
    id: string;
    title: string;
    lead: string;
    points: string[];
    specs: DeckSpec[];
    image: string | null;
    thumbs: string[];
    href: string;
    isRental: boolean;
    newSince: string | null;
};

export type DeckCategory = {
    id: string;
    no: string;
    name: string;
    lead: string;
    cover: string | null;
    services: DeckService[];
};

export type Deck = {
    version: string;
    coverImage: string | null;
    categories: DeckCategory[];
    serviceCount: number;
};

/** Pages every PDF carries besides chapters and services: cover, about, references, index, contact. */
export const FIXED_PAGE_COUNT = 5;

/**
 * Narrows the deck to the chosen services. Categories keep their original
 * chapter numbers so a partial PDF still matches the full presentation.
 */
export function selectFromDeck(deck: Deck, serviceIds: Iterable<string> | null): Deck {
    if (!serviceIds) return deck;
    const wanted = new Set(serviceIds);
    const categories = deck.categories
        .map((category) => ({ ...category, services: category.services.filter((s) => wanted.has(s.id)) }))
        .filter((category) => category.services.length > 0);
    return {
        ...deck,
        categories,
        serviceCount: categories.reduce((sum, c) => sum + c.services.length, 0),
    };
}

export function deckPageCount(deck: Deck) {
    return FIXED_PAGE_COUNT + deck.categories.length + deck.serviceCount;
}
