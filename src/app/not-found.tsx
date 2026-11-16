import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not on the Sandhu Construction and Landscape Inc. website.",
  robots: { index: false, follow: false },
  // A missing page must not claim to be the home page.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      number="404"
      title={
        <>
          That page is <em>not on this site.</em>
        </>
      }
      lede="The address may be mistyped, or the page has not been added yet."
    >
      <div className="hero-actions">
        <Link className="btn btn-light" href="/">
          Back to the home page <span className="arrow" aria-hidden="true">↗</span>
        </Link>
        <Link className="text-link" href="/contact">
          Request an estimate <span className="arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </PageHero>
  );
}
