"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">Something went wrong</p>
        <h1>This page could not be displayed.</h1>
        <p>The rest of the site is still available. You can try this page again.</p>
        <button className="btn btn-primary" type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  );
}
