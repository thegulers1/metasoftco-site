"use client";

import { useQuoteStore, QuoteService } from "./useQuoteStore";

interface AddButtonProps {
    service: QuoteService;
}

export function AddButton({ service }: AddButtonProps) {
    const { toggle, isSelected, openPanel } = useQuoteStore();
    const selected = isSelected(service.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(service);
        if (!selected) openPanel();
    };

    return (
        <button
            onClick={handleClick}
            aria-label={selected ? "Seçimi kaldır" : "Teklif listesine ekle"}
            className={`absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 shadow-sm
                ${selected
                    ? "bg-[#FF3B3F] border-[#FF3B3F] text-black scale-110"
                    : "bg-white/90 border-white/60 text-black hover:bg-[#FF3B3F] hover:border-[#FF3B3F] hover:text-black hover:scale-110"
                }`}
        >
            {selected ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
            )}
        </button>
    );
}
