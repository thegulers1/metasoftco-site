import "./globals.css";
import type { Metadata } from "next";
import { Inter_Tight, DM_Sans, Lato } from "next/font/google";
import { siteConfig, generateMetaTags, generateOrganizationSchema } from "@/lib/site";
import { Providers } from "@/providers/Providers";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter-tight",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  ...generateMetaTags(),
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "tr-TR": siteConfig.url,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="tr" className={`${interTight.variable} ${dmSans.variable} ${lato.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-white text-black">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
