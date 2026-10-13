import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1>Residential and commercial work, set out clearly.</h1>
          <p className="sample-note">
            <strong>Proposed services.</strong> Confirm each one before it is advertised as something the company offers. Remove any service you do not provide.
          </p>
          <nav className="category-nav" aria-label="Service categories">
            {serviceCategories.map((category) => (
              <a key={category.id} href={`#${category.id}`}>
                {category.title}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="container" style={{ paddingBottom: "4rem" }}>
        {serviceCategories.map((category, index) => (
          <section key={category.id} id={category.id} className="service-block" aria-labelledby={`${category.id}-title`}>
            <header>
              <p className="service-index">0{index + 1}</p>
              <h2 id={`${category.id}-title`}>{category.title}</h2>
              <p className="muted">{category.lede}</p>
            </header>
            {servicesIn(category.id).map((service) => (
              <article key={service.slug} id={service.slug} className="service-article">
                <div className="card-media">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 720px) 100vw, 40vw" />
                </div>
                <div>
                  <span className="proposed">Proposed</span>
                  <h3>{service.name}</h3>
                  <p>{service.details}</p>
                </div>
              </article>
            ))}
          </section>
        ))}
        <p>
          <Link className="btn btn-primary" href="/contact">
            Request a Free Estimate <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </>
  );
}
