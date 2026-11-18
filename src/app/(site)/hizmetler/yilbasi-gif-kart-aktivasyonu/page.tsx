import { NewYearProductPage, newYearProductMetadata } from "../_new-year-product/NewYearProductPage";

const SLUG = "yilbasi-gif-kart-aktivasyonu";

export const metadata = newYearProductMetadata(SLUG);

export default function Page() {
    return <NewYearProductPage slug={SLUG} />;
}
