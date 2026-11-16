import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { serviceCategories, servicesIn } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Proposed residential and commercial construction and landscaping services from Sandhu Construction and Landscaping Inc., including renovations, decks, fences, interlocking, patios, retaining walls, sod, and grading.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        crumbs={[{ label: "Services" }]}
        title={
          <>
            Residential and commercial work, <em>set out clearly.</em>
          </>
        }
      >
        <p className="sample-note">
          <span>
            <strong>Proposed services.</strong> Confirm each one before it is advertised as something the company offers. Remove any service you do not provide.
          </span>
        </p>
      </PageHero>

      <div className="category-nav-wrap">
        <div className="container">
          <nav className="category-nav" aria-label="Service categories">
            {serviceCategories.map((category, index) => (
              <a key={category.id} href={`#${category.id}`}>
                <span aria-hidden="true">0{index + 1}</span>
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container">
        {serviceCategories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className="service-block"
            aria-labelledby={`${category.id}-title`}
          >
            <div className="service-block-wrap">
              <header className="service-block-head">
                <p className="service-index" aria-hidden="true">0{index + 1}</p>
                <h2 id={`${category.id}-title`} className="h-section" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)" }}>
                  {category.title}
                </h2>
                <p className="muted">{category.lede}</p>
              </header>
              <div className="service-list">
                {servicesIn(category.id).map((service) => (
                  <article key={service.slug} id={service.slug} className="service-article">
                    <div className="card-media">
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 720px) 100vw, 35vw" />
                    </div>
                    <div>
                      <span className="proposed">Proposed</span>
                      <h3>{service.name}</h3>
                      <p>{service.details}</p>
                      <Link className="text-link" href="/contact">
                        Ask about {service.name.toLowerCase()} <span className="arrow" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section section-tight">
        <div className="container">
          <div className="cta-band on-dark">
            <div>
              <h2 className="h-section">
                Not sure which service <em>fits the job?</em>
              </h2>
              <p>Describe the property and what you want done. The estimate sorts out the scope.</p>
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
