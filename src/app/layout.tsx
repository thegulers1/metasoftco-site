import "./globals.css";
import type { Metadata } from "next";
import { Inter_Tight, Lato, Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import { siteConfig, generateMetaTags, generateOrganizationSchema } from "@/lib/site";
import { Providers } from "@/providers/Providers";

// next/font varsayılan olarak her aileyi <link rel="preload"> ile yükler.
// Yalnızca birkaç eski `site/` bileşeninde geçen aileler preload edilmez:
// aksi halde her sayfada indirilip kullanılmadıkları için tarayıcı
// "preloaded but not used" uyarısı veriyor ve boşuna bant genişliği harcanıyordu.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter-tight",
  preload: false,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  ...generateMetaTags(),
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "x-default": siteConfig.url,
      "tr": siteConfig.url,
      "en": `${siteConfig.url}/en`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = generateOrganizationSchema();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "tr";

  return (
    <html lang={lang} className={`${interTight.variable} ${lato.variable} ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-862345276" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-862345276');`,
          }}
        />
        {/* Ahrefs Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="SpzZeI8Md0aVoUvjEnlePA"
          async
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4ML39X7');`,
          }}
        />
        {/* JSON-LD Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-white text-black">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4ML39X7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
