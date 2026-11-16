import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { Placeholder } from "@/components/Placeholder";

export function Footer() {
  const year = new Date().getFullYear();
  const place = [site.locality, site.region].filter(Boolean).join(", ");

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-statement">
            Have a project <em>in mind?</em>
          </p>
          <Link className="btn btn-light" href="/contact">
            Request a Free Estimate <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand">
              <img src="/brand/scl-logo-reversed.png" alt={site.name} width={111} height={120} />
            </Link>
            <p className="footer-tagline">Built with intention. Made for living.</p>
          </div>
          <div>
            <p className="footer-heading">Explore</p>
            <nav className="footer-nav" aria-label="Footer">
              <Link href="/about">Our approach</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Request an estimate</Link>
            </nav>
          </div>
          <div className="footer-contact">
            <p className="footer-heading">Contact</p>
            {site.email ? (
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            ) : (
              <p>
                <Placeholder>[Email address]</Placeholder>
              </p>
            )}
            {[site.phone, ...site.otherPhones].filter(Boolean).map((phone) => (
              <p key={phone}>
                <a href={telHref(phone)}>{phone}</a>
              </p>
            ))}
            {site.phone ? null : (
              <p>
                <Placeholder>[Phone number]</Placeholder>
              </p>
            )}
            <p className="muted">
              {site.street || <Placeholder>[Street address]</Placeholder>}
              <br />
              {place ? `${place} ${site.postalCode}`.trim() : <Placeholder>[City, region, postal code]</Placeholder>}
            </p>
            {site.serviceArea ? <p className="muted">Serving {site.serviceArea}</p> : null}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {site.name}</span>
          <a href="#main">Back to top ↑</a>
          <span>{place || "Ontario, Canada"}</span>
        </div>
        <p className="footer-legal">
          Gallery photographs are samples, not completed company projects. Proposed services should be confirmed before they are advertised. Items in [brackets] are placeholders to replace before launch.
        </p>
      </div>
    </footer>
  );
}
