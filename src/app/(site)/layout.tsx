import Navbar from "@/components/site/Navbar";
import TopTicker from "@/components/site/TopTicker";
import Footer from "@/components/site/Footer";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <TopTicker />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
