import { NewYearProductPage, newYearProductMetadata } from "../_new-year-product/NewYearProductPage";

const SLUG = "yilbasi-momento-ball-kiralama";

export const metadata = newYearProductMetadata(SLUG);

export default function Page() {
    return <NewYearProductPage slug={SLUG} />;
}
