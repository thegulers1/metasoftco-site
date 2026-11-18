import { NewYearProductPage, newYearProductMetadata } from "../_new-year-product/NewYearProductPage";

const SLUG = "yilbasi-mirror-booth-kiralama";

export const metadata = newYearProductMetadata(SLUG);

export default function Page() {
    return <NewYearProductPage slug={SLUG} />;
}
