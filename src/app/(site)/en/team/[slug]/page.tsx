import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamMemberProfile from "@/components/phase2/TeamMemberProfile";
import { findMemberBySlug, teamMemberMetadata, teamMemberPosts, teamMemberSchemas } from "@/lib/team-pages";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const member = findMemberBySlug((await params).slug);
    return member ? teamMemberMetadata(member, "en") : {};
}

export default async function EnglishTeamMemberPage({ params }: Props) {
    const member = findMemberBySlug((await params).slug);
    if (!member) notFound();

    const posts = await teamMemberPosts(member, "en");
    return (
        <>
            {teamMemberSchemas(member, "en").map((schema, index) => (
                <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <TeamMemberProfile member={member} posts={posts} locale="en" />
        </>
    );
}
