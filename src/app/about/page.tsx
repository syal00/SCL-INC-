import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sandhu Construction and Landscaping Inc.: the approach, the craft, and the customer commitment the company site is ready to publish. Unknown history is left as a placeholder.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Approach",
    text: "An estimate starts with the site. Water, access, the condition of what is already there, and how the space will be used all change the work. The useful conversation is specific: what is included, what is not, and what has to be decided before anyone builds.",
  },
  {
    title: "Craftsmanship",
    text: "Interior work shows its quality in the frame, the drywall, and the coats of mud over the tape. Outdoor work shows it in the parts people touch and the parts they never see: the deck frame and the flashing, the patio base and the slope, the grade under a lawn. The standard to write into your own jobs is work that still makes sense after the first season.",
  },
  {
    title: "Commitment to customers",
    text: "People should know who is coming, what the day is for, and how to reach the company if something needs attention. Protect the parts of the property that are not part of the job. Leave the site clean enough to walk. If a detail is unknown — insurance, a licence, a warranty — say so only when it is true, and add it here when you are ready.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        crumbs={[{ label: "About" }]}
        title={
          <>
            A practice for homes, commercial buildings, <em>and the ground.</em>
          </>
        }
        lede="This page is the place for the company story. The approach below is written so you can keep it, edit it, or replace it. The owner name and credentials are not filled in."
      />

      <section className="section">
        <div className="container about-layout">
          <div>
            <p className="eyebrow">The story</p>
            <h2 className="h-section">
              The building, <em>and the ground that works with it.</em>
            </h2>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p className="lede" style={{ maxWidth: "none" }}>
                {site.name} takes on residential and commercial construction and landscaping: the building, and the ground that has to work with it. The company was established in {site.founded} and is based in {site.locality}, {site.region}. Who leads the work still needs to be added.
              </p>
            </div>
            <div className="facts">
              <div className="fact">
                <span>Owner</span>
                <strong>{site.owner || <Placeholder>[Owner name]</Placeholder>}</strong>
              </div>
              <div className="fact">
                <span>Established</span>
                <strong>{site.founded || <Placeholder>[Year established]</Placeholder>}</strong>
              </div>
              <div className="fact">
                <span>Service area</span>
                <strong>{site.serviceArea || <Placeholder>[Cities or regions you serve]</Placeholder>}</strong>
              </div>
            </div>
          </div>
          <figure className="craft-figure">
            <div className="card-media">
              <Image
                src="/images/drywall-hang.webp"
                alt="Illustrative image of drywall hung on wood studs, with tape and joint compound in the room. Not a Sandhu project."
                fill
                sizes="(max-width: 980px) 100vw, 45vw"
              />
            </div>
            <figcaption>Sample image of drywall, tape, and mud. Not company work.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section-dark on-dark" aria-labelledby="values-heading">
        <div className="container">
          <div className="split" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)", alignItems: "end" }}>
            <div>
              <p className="eyebrow">How we work</p>
              <h2 id="values-heading" className="h-section">
                Three things <em>every job should show.</em>
              </h2>
            </div>
            <blockquote className="quote">Clear scope, careful work, and a property left tidy.</blockquote>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <article key={value.title} className="value-card">
                <span className="value-num">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band on-dark">
            <div>
              <h2 className="h-section">
                Ready to talk <em>about your project?</em>
              </h2>
              <p>Tell us what you want done and where the property is. Estimates are free.</p>
            </div>
            <div className="cluster">
              <Link className="btn btn-light" href="/contact">
                Request a Free Estimate <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
