import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { profile } from "@/lib/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexjohnson.dev"),
  title: {
    default: "Alex Johnson — Full-Stack Developer",
    template: "%s | Alex Johnson",
  },
  description: profile.tagline,
  authors: [{ name: profile.name }],
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "Lagos",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexjohnson.dev",
    siteName: "Alex Johnson Portfolio",
    title: "Alex Johnson — Full-Stack Developer",
    description: profile.tagline,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Alex Johnson — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Johnson — Full-Stack Developer",
    description: profile.tagline,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
