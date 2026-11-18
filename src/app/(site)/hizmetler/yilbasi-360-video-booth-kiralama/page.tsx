import { NewYearProductPage, newYearProductMetadata } from "../_new-year-product/NewYearProductPage";

const SLUG = "yilbasi-360-video-booth-kiralama";

export const metadata = newYearProductMetadata(SLUG);

export default function Page() {
    return <NewYearProductPage slug={SLUG} />;
}
