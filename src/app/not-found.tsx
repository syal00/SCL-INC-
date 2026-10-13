import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>That page is not on this site.</h1>
        <p>The address may be mistyped, or the page has not been added yet.</p>
        <p>
          <Link className="btn btn-primary" href="/">
            Back to the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
