/**
 * Müşteriye özel teklif sunumları: /teklif/<slug>.
 *
 * Her teklif tahmin edilemeyen bir slug ile yayınlanır, menüde ve site
 * haritasında yer almaz, arama motorlarına kapalıdır (noindex + robots).
 * Yeni teklif: src/content/teklif/<slug>.ts dosyasını ekleyip aşağıdaki
 * listeye kaydedin; görseller public/teklif/<slug>/ altına.
 */
import pfizerAntalya2026 from "@/content/teklif/antalya-yilbasi-2026-82mdl";

export type ProposalSlide = {
    id: string;
    /** 1920×1080 tuval için satır içi stilli HTML (<section> kökü). */
    html: string;
};

export type Proposal = {
    slug: string;
    client: string;
    title: string;
    subtitle: string;
    contact: { name: string; phone: string; email: string };
    slides: ProposalSlide[];
};

const proposals: Proposal[] = [pfizerAntalya2026];

export function getProposal(slug: string): Proposal | undefined {
    return proposals.find((proposal) => proposal.slug === slug);
}
