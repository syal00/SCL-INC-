import type { Metadata } from "next";
import { EstimateForm } from "@/components/EstimateForm";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request an Estimate",
  description:
    "Request a free estimate from Sandhu Construction and Landscaping Inc. Share your name, email, phone, service, project location, and a description.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const locality = [site.locality, site.region, site.postalCode].filter(Boolean).join(", ");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: "Contact" }]}
        titleId="estimate-heading"
        title={
          <>
            Request a <em>free estimate.</em>
          </>
        }
        lede="Tell us what you want done and where the property is. A useful note includes access, roughly how large the area is, and whether you have photos."
      />
      <section className="section">
        <div className="container contact-layout">
          <div>
            <EstimateForm />
          </div>
          <aside className="contact-aside">
            <div className="contact-card on-dark">
              <h2>Reach the company</h2>
              {site.phone ? (
                <a className="contact-phone" href={telHref(site.phone)}>
                  <span className="icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                  </span>
                  <span>
                    <small>Phone</small>
                    <strong>Call {site.phone}</strong>
                  </span>
                </a>
              ) : null}
              <div className="facts">
                {site.phone ? null : (
                  <div className="fact">
                    <span>Phone</span>
                    <strong>
                      <Placeholder>[Phone number]</Placeholder>
                    </strong>
                  </div>
                )}
                <div className="fact">
                  <span>Email</span>
                  <strong>
                    {site.email ? (
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    ) : (
                      <Placeholder>[Email address]</Placeholder>
                    )}
                  </strong>
                </div>
                <div className="fact">
                  <span>Address</span>
                  <strong>
                    {site.street || <Placeholder>[Street address]</Placeholder>}
                    <br />
                    {locality || <Placeholder>[City, region, postal code]</Placeholder>}
                  </strong>
                </div>
                <div className="fact">
                  <span>Service area</span>
                  <strong>{site.serviceArea || <Placeholder>[Cities or regions you serve]</Placeholder>}</strong>
                </div>
                <div className="fact">
                  <span>Hours</span>
                  <strong>{site.hours || <Placeholder>[Business hours]</Placeholder>}</strong>
                </div>
              </div>
              <p className="hint">A map will appear here when a business address is added.</p>
            </div>
            <ol className="steps-mini">
              <li><b>01</b> Send the form with the service and location.</li>
              <li><b>02</b> We walk the site and look at the work.</li>
              <li><b>03</b> You get a scope to read before deciding.</li>
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
