import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProposal } from "@/lib/teklifler";
import { ProposalDeck } from "@/components/teklif/ProposalDeck";

// Teklifler kişiye özel: arama motorlarına kapalı, site haritasında yok.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const proposal = getProposal(slug);
    if (!proposal) return { robots: { index: false, follow: false } };
    return {
        title: `${proposal.title} — ${proposal.client} için | MetasoftCo`,
        description: `${proposal.client} için hazırlanmış deneyim önerisi. ${proposal.subtitle}`,
        robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
        alternates: { canonical: null },
        openGraph: {
            title: `${proposal.title} — ${proposal.client} için`,
            description: proposal.subtitle,
            images: [`/teklif/${proposal.slug}/kapak.webp`],
        },
    };
}

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const proposal = getProposal(slug);
    if (!proposal) notFound();
    return <ProposalDeck proposal={proposal} />;
}
