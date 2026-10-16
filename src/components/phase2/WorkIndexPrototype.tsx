import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { homeClientName, homeProjectTag } from "@/lib/home-content";
import { MsWords } from "@/components/site-ms/parts";
import { MsCatalog, MsClock } from "@/components/site-ms/interactive";

/** A work card already resolved to the active locale by the page. */
export interface P2WorkCard {
    id: string;
    slug: string;
    title: string;
    image: string;
    client?: string | null;
    category?: string | null;
}

const t = {
    tr: {
        kicker: (n: number) => `(PROJELER) — ${n} SEÇİLİ PROJE`,
        city: "İSTANBUL",
        all: "Tümü",
        count: "PROJE",
        view: { grid: "IZGARA", list: "LİSTE", view: "Görünüm", open: "İNCELE" },
        stats: [{ value: "1.000+", label: "ETKİNLİK" }, { value: "10", label: "ŞEHİR" }, { value: "5+", label: "YIL" }],
    },
    en: {
        kicker: (n: number) => `(WORK) — ${n} SELECTED PROJECTS`,
        city: "ISTANBUL",
        all: "All",
        count: "PROJECTS",
        view: { grid: "GRID", list: "LIST", view: "View", open: "VIEW" },
        stats: [{ value: "1,000+", label: "EVENTS" }, { value: "10", label: "CITIES" }, { value: "5+", label: "YEARS" }],
    },
};

/** /projeler and /en/projects — the "Projeler" design of October 2026. */
export default function WorkIndexPrototype({ projects, locale }: { projects: P2WorkCard[]; locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.work;
    const l = t[locale];

    return (
        <div className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{l.kicker(projects.length)}</span>
                    <MsClock label={l.city} />
                </div>
                <h1 className="ms-h1" aria-label={copy.heroLabel}>
                    <MsWords text={`${copy.heroSolid}\n${copy.heroOutline}`} accent={[copy.heroSolid.split(/\s+/).length]} />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 620 }}>{copy.heroCopy}</p>
                    <div className="ms-stats ms-mono">
                        {l.stats.map((stat) => <span key={stat.label}><b>{stat.value}</b> {stat.label}</span>)}
                    </div>
                </div>
            </section>

            <section aria-label={copy.catalogAria} style={{ marginTop: "-2vw" }}>
                <MsCatalog
                    items={projects.map((project) => ({
                        key: project.id,
                        href: `${dictionary.routes.work}/${project.slug}`,
                        name: homeClientName(project.client ?? null, project.title),
                        sub: project.title,
                        cat: homeProjectTag(project.category ?? null, locale),
                        image: project.image,
                    }))}
                    allLabel={l.all}
                    countLabel={l.count}
                    labels={l.view}
                    rowVariant="sub"
                    wide
                />
            </section>
        </div>
    );
}
