import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, siteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const verificationOther: Record<string, string> = {};
if (site.verification.bing) verificationOther["msvalidate.01"] = site.verification.bing;

export const metadata: Metadata = {
  // Site-wide defaults; every page also sets its own complete set via pageMetadata().
  ...pageMetadata({ absoluteTitle: site.name, description: site.description, path: "/" }),
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | Sandhu Construction`,
  },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: site.indexing
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false },
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(Object.keys(verificationOther).length ? { other: verificationOther } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-CA" className={`${outfit.variable} ${fraunces.variable}`}>
      <body>
        {/* Without JavaScript the scroll animations never run; show their content anyway. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <div className="noise" aria-hidden="true" />
        <SmoothScroll />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
