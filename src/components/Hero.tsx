import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Sandhu Construction and Landscaping Inc.</p>
          <h1 className="display">From the frame to the finish.</h1>
          <p className="lede">
            Residential and commercial construction — framing, drywall, tape and mud, and renovations — with outdoor work when the property needs it. Tell us about the job and request a free estimate.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">
              Request a Free Estimate <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn-secondary" href="/services">
              Explore Our Services
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/images/big-house-frame.webp"
              alt="Sample photograph of a two-storey house in wood framing, before the walls are closed in. Not a Sandhu project."
              fill
              priority
              sizes="(max-width: 980px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
