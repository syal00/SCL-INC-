import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { Placeholder } from "@/components/Placeholder";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            <img src="/brand/scl-logo-reversed.png" alt={site.name} width={111} height={120} />
          </Link>
          <hr className="gold-rule" />
          <p className="muted">
            Residential and commercial construction, plus outdoor improvements. Items in [brackets] are placeholders to replace before launch.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Request an estimate</Link>
        </nav>
        <div>
          <p>
            {site.phone ? (
              <a href={telHref(site.phone)}>{site.phone}</a>
            ) : (
              <Placeholder>[Phone number]</Placeholder>
            )}
          </p>
          {site.serviceArea ? <p className="muted">{site.serviceArea}</p> : null}
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
        </div>
      </div>
      <div className="container legal">
        <p>
          © {year} {site.name}. Gallery photographs are samples, not completed company projects. Proposed services should be confirmed before they are advertised.
        </p>
      </div>
    </footer>
  );
}
