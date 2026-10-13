import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sandhu Construction and Landscaping Inc.: the approach, the craft, and the customer commitment the company site is ready to publish. Unknown history is left as a placeholder.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>A practice for homes, commercial buildings, and the ground.</h1>
          <p>
            This page is the place for the company story. The approach below is written so you can keep it, edit it, or replace it. The owner name and credentials are not filled in.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container about-layout">
          <div className="prose">
            <h2>The story</h2>
            <p>
              {site.name} takes on residential and commercial construction and landscaping: the building, and the ground that has to work with it. The company was established in {site.founded} and is based in {site.locality}, {site.region}. Who leads the work still needs to be added.
            </p>
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

      <section className="section section-sand">
        <div className="container split">
          <blockquote className="quote">Clear scope, careful work, and a property left tidy.</blockquote>
          <div className="prose">
            <h2>Approach</h2>
            <p>
              An estimate starts with the site. Water, access, the condition of what is already there, and how the space will be used all change the work. The useful conversation is specific: what is included, what is not, and what has to be decided before anyone builds.
            </p>
            <h2>Craftsmanship</h2>
            <p>
              Interior work shows its quality in the frame, the drywall, and the coats of mud over the tape. Outdoor work shows it in the parts people touch and the parts they never see: the deck frame and the flashing, the patio base and the slope, the grade under a lawn. The standard to write into your own jobs is work that still makes sense after the first season.
            </p>
            <h2>Commitment to customers</h2>
            <p>
              People should know who is coming, what the day is for, and how to reach the company if something needs attention. Protect the parts of the property that are not part of the job. Leave the site clean enough to walk. If a detail is unknown — insurance, a licence, a warranty — say so only when it is true, and add it here when you are ready.
            </p>
            <p>
              <Link className="btn btn-primary" href="/contact">
                Request a Free Estimate
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
