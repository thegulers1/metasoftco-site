import { Metadata } from "next";
import { CityPage, cityMetadata } from "../../../hizmetler/_city/CityPage";

export const revalidate = 3600;

// English version of /hizmetler/istanbul-ai-photobooth; the folder name is the row's slug_en.
const SLUG = "istanbul-ai-photobooth";

export function generateMetadata(): Promise<Metadata> {
    return cityMetadata(SLUG, "en");
}

export default function IstanbulPhotoBoothRentalPage() {
    return <CityPage slug={SLUG} lang="en" />;
}
