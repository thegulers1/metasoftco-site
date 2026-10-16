import { Geist, Geist_Mono, Unbounded } from "next/font/google";

// Homepage-only families, loaded from the server pages: next/font calls
// inside the client component trip Turbopack's font loader transform.
const homeDisplay = Unbounded({ subsets: ["latin", "latin-ext"], weight: ["500", "700", "800", "900"], variable: "--mh-display" });
const homeSans = Geist({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--mh-sans" });
const homeMono = Geist_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--mh-mono", preload: false });

/** Class names that expose the homepage font variables; applied by the server pages. */
export const homeFontClassName = `${homeDisplay.variable} ${homeSans.variable} ${homeMono.variable}`;
