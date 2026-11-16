import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { Placeholder } from "@/components/Placeholder";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <h2>
            Have a project <em>in mind?</em>
          </h2>
          <div className="cluster" style={{ marginTop: 0 }}>
            <Link className="btn btn-light" href="/contact">
              Request a Free Estimate <span className="arrow" aria-hidden="true">→</span>
            </Link>
            {site.phone ? (
              <a className="btn btn-on-dark" href={telHref(site.phone)}>
                Call {site.phone}
              </a>
            ) : null}
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand">
              <img src="/brand/scl-logo-reversed.png" alt={site.name} width={111} height={120} />
            </Link>
            <hr className="gold-rule" />
            <p className="muted" style={{ maxWidth: "26rem" }}>
              Residential and commercial construction, plus outdoor improvements. Items in [brackets] are placeholders to replace before launch.
            </p>
          </div>
          <div>
            <p className="footer-heading">Explore</p>
            <nav className="footer-nav" aria-label="Footer">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Request an estimate</Link>
            </nav>
          </div>
          <div>
            <p className="footer-heading">Contact</p>
            <p>
              {site.phone ? (
                <a href={telHref(site.phone)}>{site.phone}</a>
              ) : (
                <Placeholder>[Phone number]</Placeholder>
              )}
            </p>
            <p>
              {site.email ? (
                <a href={`mailto:${site.email}`}>{site.email}</a>
              ) : (
                <Placeholder>[Email address]</Placeholder>
              )}
            </p>
            <p className="muted">
              {site.street || <Placeholder>[Street address]</Placeholder>}
              <br />
              {site.locality || site.region ? (
                <>
                  {site.locality}
                  {site.locality && site.region ? ", " : ""}
                  {site.region} {site.postalCode}
                </>
              ) : (
                <Placeholder>[City, region, postal code]</Placeholder>
              )}
            </p>
            {site.serviceArea ? <p className="muted">Serving {site.serviceArea}</p> : null}
          </div>
        </div>

        <div className="legal">
          <p>© {year} {site.name}</p>
          <p>
            Gallery photographs are samples, not completed company projects. Proposed services should be confirmed before they are advertised.
          </p>
        </div>
      </div>
    </footer>
  );
}
