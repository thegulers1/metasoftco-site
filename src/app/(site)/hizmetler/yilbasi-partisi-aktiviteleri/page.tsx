import { OccasionPage, occasionMetadata } from "../_occasion/OccasionPage";

// Read database content at request time; Docker builds have no database access.
export const dynamic = "force-dynamic";

const SLUG = "yilbasi-partisi-aktiviteleri";

export const metadata = occasionMetadata(SLUG);

export default function YilbasiPartisiPage() {
    return <OccasionPage slug={SLUG} />;
}
