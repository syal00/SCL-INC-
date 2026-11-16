import type { Metadata } from "next";
import { EstimateForm } from "@/components/EstimateForm";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request an Estimate",
  description:
    "Request a free estimate from Sandhu Construction and Landscaping Inc. Share your name, email, phone, service, project location, and a description.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const locality = [site.locality, site.region, site.postalCode].filter(Boolean).join(", ");
  const phones = [site.phone, ...site.otherPhones].filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Let's build something"
        number="04"
        crumbs={[{ label: "Contact" }]}
        titleId="estimate-heading"
        title={
          <>
            Your next project starts <em>here.</em>
          </>
        }
        lede="Tell us what you want done and where the property is. A useful note includes access, roughly how large the area is, and whether you have photos."
      />
      <section className="section section-light">
        <div className="container contact-grid contact-grid-page">
          <Reveal>
            <EstimateForm />
          </Reveal>
          <aside className="contact-aside">
            <p className="kicker" style={{ marginBottom: "1.5rem" }}>
              <span className="line" aria-hidden="true" />
              <span>Reach the company</span>
            </p>
            <div className="facts">
              <div className="fact">
                <span>{phones.length > 1 ? "Phone numbers" : "Phone"}</span>
                <strong>
                  {phones.length > 0 ? (
                    phones.map((phone) => (
                      <a key={phone} href={telHref(phone)} style={{ display: "block" }}>
                        {phone}
                      </a>
                    ))
                  ) : (
                    <Placeholder>[Phone number]</Placeholder>
                  )}
                </strong>
              </div>
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
            <div className="contact-note">
              <span className="contact-dot" aria-hidden="true" /> New project enquiries welcome
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
