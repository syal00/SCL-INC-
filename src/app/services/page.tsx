import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { serviceCategories, servicesIn } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Proposed residential and commercial construction, landscaping, and property services from Sandhu Construction and Landscaping Inc., including renovations, decks, fences, interlocking, patios, retaining walls, sod, grading, security systems, and cleaning.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        number="02"
        crumbs={[{ label: "Services" }]}
        title={
          <>
            Grounded in craft. <em>Open to possibility.</em>
          </>
        }
      >
        <Reveal delay={0.2}>
          <p className="sample-note">
            <strong>Proposed services.</strong> Confirm each one before it is advertised as something the company offers. Remove any service you do not provide.
          </p>
        </Reveal>
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
                <p className="kicker">
                  <span className="num">0{index + 1}</span>
                  <span className="line" aria-hidden="true" />
                </p>
                <h2 id={`${category.id}-title`} className="h-section h-sm">
                  {category.title}
                </h2>
                <p>{category.lede}</p>
              </header>
              <div className="service-list">
                {servicesIn(category.id).map((service, serviceIndex) => (
                  <Reveal key={service.slug} as="article" id={service.slug} className="service-row">
                    <div className="service-number">
                      {index + 1}.{serviceIndex + 1}
                    </div>
                    {service.image ? (
                      <div className="service-photo">
                        <Image src={service.image} alt={service.alt ?? ""} fill sizes="(max-width: 720px) 90vw, 260px" />
                      </div>
                    ) : (
                      <div className="service-photo service-photo-blank" aria-hidden="true">
                        <span>{category.title}</span>
                      </div>
                    )}
                    <div className="service-info">
                      <span className="proposed">Proposed</span>
                      <h3>{service.name}</h3>
                      <p>{service.details}</p>
                      <Link className="service-cta" href="/contact">
                        Ask about {service.name.toLowerCase()} ↗
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section section-panel">
        <div className="container cta-band">
          <div>
            <Reveal>
              <h2 className="h-section">
                Not sure which service <em>fits the job?</em>
              </h2>
            </Reveal>
            <p>Describe the property and what you want done. The estimate sorts out the scope.</p>
          </div>
          <Link className="btn btn-light" href="/contact">
            Request a Free Estimate <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
