import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { AdminBarProvider } from "@/components/site/AdminBar";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminBarProvider>
            <Navbar />
            <main className="pb-24 sm:pb-0">{children}</main>
            <Footer />
            <WhatsAppButton />
        </AdminBarProvider>
    );
}
