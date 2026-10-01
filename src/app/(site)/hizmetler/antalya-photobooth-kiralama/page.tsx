import { Metadata } from "next";
import { CityPage, cityMetadata } from "../_city/CityPage";

export const revalidate = 3600;

const SLUG = "antalya-photobooth-kiralama";

export function generateMetadata(): Promise<Metadata> {
    return cityMetadata(SLUG);
}

export default function AntalyaPhotoboothPage() {
    return <CityPage slug={SLUG} />;
}
