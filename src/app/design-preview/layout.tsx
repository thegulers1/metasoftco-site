import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "MetasoftCo / Design Preview",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: null, languages: {} },
};

export default function DesignPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // A noindex tag alone is not access control: never render in a production build.
  if (process.env.NODE_ENV !== "development") notFound();
  return children;
}
