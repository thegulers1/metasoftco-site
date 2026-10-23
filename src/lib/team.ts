import { siteConfig } from "./site";

/**
 * People who sign MetasoftCo content. A blog post whose `author` matches a
 * name here gets a Person author (with a profile page) in its schema instead
 * of the generic Organization byline.
 *
 * `sameAs` holds the person's own public profiles; empty strings are skipped,
 * so a profile can be added later without touching the pages.
 */
export interface TeamMember {
    slug: string;
    name: string;
    role: { tr: string; en: string };
    bio: { tr: string[]; en: string[] };
    /** Two-line author box under blog posts. */
    shortBio: { tr: string; en: string };
    knowsAbout: string[];
    sameAs: string[];
}

export const team: TeamMember[] = [
    {
        slug: "selami-guler",
        name: "Selami Güler",
        role: { tr: "Kurucu Ortak", en: "Co-founder" },
        bio: {
            tr: [
                "Selami Güler, MetasoftCo'yu 2020'de kardeşi Selçuk Güler ile birlikte bir yazılım şirketi olarak kurdu. Şirket kısa sürede yazılım birikimini etkinlik teknolojilerine taşıdı; bugün yapay zeka fotoğraf aktivasyonları, photobooth sistemleri ve interaktif oyunlarla Türkiye genelinde 1.000'i aşkın etkinliğe kurulum yaptı.",
                "MetasoftCo'da ürünlerin kurgusundan sahaya çıkışına kadar olan süreci yönetiyor: hangi deneyimin hangi etkinliğe uyduğu, yapay zeka iş akışlarının etkinlik koşullarında nasıl hızlı ve güvenilir çalışacağı ve katılımcı verisinin KVKK'ya uygun nasıl işleneceği.",
                "Blogda yapay zeka ile yüz değiştirme (face swap), AI photobooth ve etkinlik teknolojileri üzerine sahada edindiğimiz deneyimi paylaşıyor.",
            ],
            en: [
                "Selami Güler co-founded MetasoftCo in 2020 with his brother Selçuk Güler as a software company. The company soon took its software background into event technology and has since delivered more than 1,000 events across Türkiye with AI photo activations, photo booth systems and interactive games.",
                "At MetasoftCo he leads products from concept to the event floor: which experience fits which event, how AI workflows stay fast and reliable on site, and how guest data is handled in line with KVKK and GDPR.",
                "On the blog he writes about AI face swap, AI photo booths and event technology, drawing on what the team has learned on site.",
            ],
        },
        shortBio: {
            tr: "MetasoftCo kurucu ortağı. Marka aktivasyonları için yapay zekâ tabanlı fotoğraf, sanal deneme ve veri toplama sistemleri kuruyor.",
            en: "Co-founder of MetasoftCo. Builds AI photo, virtual try-on and data capture systems for brand activations.",
        },
        knowsAbout: [
            "Etkinlik teknolojileri",
            "Yapay zeka fotoğraf aktivasyonu",
            "Face swap",
            "AI photobooth",
            "Stable Diffusion",
            "Interaktif etkinlik oyunları",
            "KVKK uyumlu veri toplama",
        ],
        sameAs: ["https://www.linkedin.com/in/selami-g%C3%BCler-919356109/"],
    },
];

export function findTeamMember(name: string | null | undefined): TeamMember | undefined {
    if (!name) return undefined;
    const key = name.trim().toLocaleLowerCase("tr-TR");
    return team.find((member) => member.name.toLocaleLowerCase("tr-TR") === key);
}

/** The person's LinkedIn profile, once one is listed in sameAs. */
export function teamMemberLinkedIn(member: TeamMember) {
    return member.sameAs.find((url) => url.includes("linkedin.com"));
}

export function teamMemberPath(member: TeamMember, locale: "tr" | "en") {
    return locale === "en" ? `/en/team/${member.slug}` : `/ekip/${member.slug}`;
}

/** schema.org Person for a team member, as an author or as a page's subject. */
export function teamMemberSchema(member: TeamMember, locale: "tr" | "en") {
    const url = `${siteConfig.url}${teamMemberPath(member, locale)}`;
    const sameAs = member.sameAs.filter(Boolean);
    return {
        "@type": "Person",
        "@id": `${siteConfig.url}/ekip/${member.slug}#person`,
        name: member.name,
        jobTitle: member.role[locale],
        url,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
        knowsAbout: member.knowsAbout,
        ...(sameAs.length > 0 && { sameAs }),
    };
}

/** Blog `author` value as schema: a Person when we know them, else the company. */
export function blogAuthorSchema(author: string | null | undefined, locale: "tr" | "en") {
    const member = findTeamMember(author);
    if (member) return teamMemberSchema(member, locale);
    return {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
    };
}
