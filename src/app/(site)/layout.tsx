import { AdminBarProvider } from "@/components/site/AdminBar";
import AttributionCapture from "@/components/site/AttributionCapture";
import { homeFontClassName } from "@/components/home/fonts";
import { MsBehaviour, MsClosing, MsNav } from "@/components/site-ms/MsChrome";
import "@/components/site-ms/ms.css";

/**
 * Every public page sits inside the October 2026 design system (.ms): one
 * navigation, one closing block that doubles as the footer, and the floating
 * actions. The homepage draws its own versions and these step aside there.
 */
export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminBarProvider>
            <div className={`ms ${homeFontClassName}`}>
                <MsNav />
                <main id="main-content">{children}</main>
                <MsClosing />
                <MsBehaviour />
            </div>
            <AttributionCapture />
        </AdminBarProvider>
    );
}
