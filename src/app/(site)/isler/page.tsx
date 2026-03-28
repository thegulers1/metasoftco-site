import { Metadata } from "next";
import Container from "@/components/site/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "İşler",
    alternates: {
        canonical: `${siteConfig.url}/isler`,
    },
};

export default function WorksPage() {
    return (
        <section className="py-14">
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight">İşler</h1>
                <p className="mt-2 text-black/70 max-w-2xl">
                    Yakında filtrelenebilir portfolio burada olacak.
                </p>
            </Container>
        </section>
    );
}
