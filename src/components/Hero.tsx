import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  const stats = [
    { label: "Established", value: site.founded || "—" },
    { label: "Based in", value: [site.locality, site.region].filter(Boolean).join(", ") || "—" },
    { label: "Work", value: "Residential & commercial" },
    { label: "Estimates", value: "Free, after a site visit" },
  ];

  return (
    <section className="hero on-dark" aria-labelledby="hero-heading">
      <div className="hero-media">
        <Image
          src="/images/big-house-frame.webp"
          alt="Sample photograph of a two-storey house in wood framing, before the walls are closed in. Not a Sandhu project."
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="container hero-content">
        <p className="eyebrow">Construction &amp; landscaping · {site.locality || "Ontario"}</p>
        <h1 id="hero-heading" className="display">
          From the frame <em>to the finish.</em>
        </h1>
        <p className="lede">
          Residential and commercial construction — framing, drywall, tape and mud, and renovations — with outdoor work when the property needs it. Tell us about the job and request a free estimate.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-light" href="/contact">
            Request a Free Estimate <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn-on-dark" href="/services">
            Explore Our Services
          </Link>
        </div>
        <p className="hero-credit">Background: sample photograph, not a Sandhu project.</p>
      </div>
      <div className="hero-stats">
        <div className="container">
          <dl>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
