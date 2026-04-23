"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface QuoteService {
    id: string;
    title: string;
    title_en: string | null;
    image: string | null;
    slug: string;
    categorySlug: string;
    slug_en: string | null;
    categorySlugEn: string | null;
}

interface QuoteStore {
    selected: QuoteService[];
    panelOpen: boolean;
    add: (service: QuoteService) => void;
    remove: (id: string) => void;
    toggle: (service: QuoteService) => void;
    isSelected: (id: string) => boolean;
    openPanel: () => void;
    closePanel: () => void;
    clear: () => void;
}

const STORAGE_KEY = "msco_quote_services";

import React from "react";

const QuoteContext = createContext<QuoteStore | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
    const [selected, setSelected] = useState<QuoteService[]>([]);
    const [panelOpen, setPanelOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setSelected(JSON.parse(stored));
        } catch {}
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
        } catch {}
    }, [selected, hydrated]);

    const add = useCallback((service: QuoteService) => {
        setSelected(prev => prev.find(s => s.id === service.id) ? prev : [...prev, service]);
    }, []);

    const remove = useCallback((id: string) => {
        setSelected(prev => prev.filter(s => s.id !== id));
    }, []);

    const toggle = useCallback((service: QuoteService) => {
        setSelected(prev =>
            prev.find(s => s.id === service.id)
                ? prev.filter(s => s.id !== service.id)
                : [...prev, service]
        );
    }, []);

    const isSelected = useCallback((id: string) => selected.some(s => s.id === id), [selected]);

    const openPanel = useCallback(() => setPanelOpen(true), []);
    const closePanel = useCallback(() => setPanelOpen(false), []);
    const clear = useCallback(() => {
        setSelected([]);
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }, []);

    return React.createElement(
        QuoteContext.Provider,
        { value: { selected, panelOpen, add, remove, toggle, isSelected, openPanel, closePanel, clear } },
        children
    );
}

export function useQuoteStore(): QuoteStore {
    const ctx = useContext(QuoteContext);
    if (!ctx) throw new Error("useQuoteStore must be used within QuoteProvider");
    return ctx;
}
