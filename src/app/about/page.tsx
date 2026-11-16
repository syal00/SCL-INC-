import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Sandhu Construction and Landscape Inc. is an Ottawa construction company, founded in 2023, doing residential and commercial framing, drywall and renovations.",
  path: "/about",
});

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
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="Our approach"
        number="01"
        crumbs={[{ label: "About" }]}
        title={
          <>
            A better space starts with <em>better thinking.</em>
          </>
        }
        lede="This page is the place for the company story. The approach below is written so you can keep it, edit it, or replace it. The owner name and credentials are not filled in."
      />

      <section className="section section-light on-light" aria-labelledby="story-heading">
        <div className="container about-grid">
          <div>
            <Reveal as="p" className="kicker">
              <span className="num">02</span>
              <span>The story</span>
            </Reveal>
            <Reveal>
              <h2 id="story-heading" className="h-section h-sm">
                The building, <em>and the ground that works with it.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="large-copy" style={{ marginTop: "2rem" }}>
                {site.name} takes on residential and commercial construction and landscaping: the building, and the ground that has to work with it. The company was established in {site.founded} and is based in {site.locality}, {site.region}.
              </p>
              <p className="muted">Who leads the work still needs to be added.</p>
            </Reveal>
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
          <Reveal delay={0.1}>
            <figure className="craft-figure">
              <div className="card-media">
                <Image
                  src="/images/drywall-hang.webp"
                  alt="Illustrative image of drywall hung on wood studs, with tape and joint compound in the room. Not a Sandhu project."
                  fill
                  sizes="(max-width: 980px) 100vw, 40vw"
                />
              </div>
              <figcaption>Sample image of drywall, tape, and mud. Not company work.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section-panel" aria-labelledby="values-heading">
        <div className="container">
          <Reveal as="p" className="kicker">
            <span className="num">03</span>
            <span>How we work</span>
          </Reveal>
          <div className="section-heading">
            <Reveal>
              <h2 id="values-heading" className="h-section">
                Three things <em>every job should show.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="quote">Clear scope, careful work, and a property left tidy.</blockquote>
            </Reveal>
          </div>
          <ol className="process-grid">
            {values.map((value, index) => (
              <Reveal key={value.title} as="li" className="process-step" delay={index * 0.08}>
                <em>0{index + 1}</em>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container cta-band">
          <div>
            <Reveal>
              <h2 className="h-section">
                Ready to talk <em>about your project?</em>
              </h2>
            </Reveal>
            <p>Tell us what you want done and where the property is. Estimates are free.</p>
          </div>
          <Link className="btn btn-light" href="/contact">
            Request a Free Estimate <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
