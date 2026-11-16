import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title={
        <>
          That page is <em>not on this site.</em>
        </>
      }
      lede="The address may be mistyped, or the page has not been added yet."
    >
      <div className="cluster">
        <Link className="btn btn-light" href="/">
          Back to the home page
        </Link>
        <Link className="btn btn-on-dark" href="/contact">
          Request an estimate
        </Link>
      </div>
    </PageHero>
  );
}
