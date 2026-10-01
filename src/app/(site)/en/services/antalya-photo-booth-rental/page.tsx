import { Metadata } from "next";
import { CityPage, cityMetadata } from "../../../hizmetler/_city/CityPage";

export const revalidate = 3600;

// English version of /hizmetler/antalya-photobooth-kiralama; the folder name is the row's slug_en.
const SLUG = "antalya-photobooth-kiralama";

export function generateMetadata(): Promise<Metadata> {
    return cityMetadata(SLUG, "en");
}

export default function AntalyaPhotoBoothRentalPage() {
    return <CityPage slug={SLUG} lang="en" />;
}
