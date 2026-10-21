import { Geist, Geist_Mono, Inter_Tight, Unbounded } from "next/font/google";

// Homepage-only families, loaded from the server pages: next/font calls
// inside the client component trip Turbopack's font loader transform.
const homeDisplay = Unbounded({ subsets: ["latin", "latin-ext"], weight: ["500", "700", "800", "900"], variable: "--mh-display" });
const homeSans = Geist({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--mh-sans" });
// Page and section headings: Inter Tight Bold, tight tracking. latin-ext
// carries Turkish letters (ş, ğ, İ), which the root layout's copy lacks.
const homeHeading = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: ["700"], variable: "--mh-heading" });
const homeMono = Geist_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--mh-mono", preload: false });

/** Class names that expose the homepage font variables; applied by the server pages. */
export const homeFontClassName = `${homeDisplay.variable} ${homeHeading.variable} ${homeSans.variable} ${homeMono.variable}`;
