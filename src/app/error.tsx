"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="kicker" style={{ marginBottom: "2rem" }}>
          <span className="line" aria-hidden="true" />
          <span>Something went wrong</span>
        </p>
        <h1>
          This page could not <em>be displayed.</em>
        </h1>
        <p className="lede">The rest of the site is still available. You can try this page again.</p>
        <div className="hero-actions">
          <button className="btn btn-light" type="button" onClick={() => reset()}>
            Try again <span className="arrow" aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </section>
  );
}
