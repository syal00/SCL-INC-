import type { Metadata } from "next";
import { EstimateForm } from "@/components/EstimateForm";
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
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 id="estimate-heading">Request a free estimate.</h1>
          <p>
            Tell us what you want done and where the property is. A useful note includes access, roughly how large the area is, and whether you have photos.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-layout">
          <div>
            <EstimateForm />
          </div>
          <aside>
            <h2>Reach the company</h2>
            <div className="facts">
              <div className="fact">
                <span>Phone</span>
                <strong>
                  {site.phone ? (
                    <a href={telHref(site.phone)}>Call {site.phone}</a>
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
          </aside>
        </div>
      </section>
    </>
  );
}
