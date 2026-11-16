"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-hero on-dark">
      <div className="container">
        <p className="eyebrow">Something went wrong</p>
        <h1>This page could not be displayed.</h1>
        <p className="lede">The rest of the site is still available. You can try this page again.</p>
        <div className="cluster">
          <button className="btn btn-light" type="button" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
