import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateForm } from "@/components/EstimateForm";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ServiceCard } from "@/components/ServiceCard";
import { featuredProjects } from "@/lib/projects";
import { services } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="intro-heading">
        <div className="container split split-intro">
          <figure className="intro-media" style={{ margin: 0 }}>
            <Image
              src="/images/framing.webp"
              alt="Original illustrative image of a residential interior framed in wood studs. Not a Sandhu project."
              fill
              sizes="(max-width: 980px) 100vw, 45vw"
            />
            <div className="intro-badge" aria-hidden="true">
              <span>Since</span>
              <strong>{site.founded || "—"}</strong>
            </div>
            <figcaption>
              <span className="source-pill">Sample image</span>
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow">The company</p>
            <h2 id="intro-heading" className="h-section">
              Framing, drywall, and <em>the work around the building.</em>
            </h2>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p className="lede" style={{ maxWidth: "none" }}>
                {site.name} is a construction and landscaping practice based in Ottawa, Ontario, established in 2023. The company takes on residential and commercial work. Finished jobs are added only when they are real company work.
              </p>
              <p className="muted">
                Add the facts that are still yours — who leads the work, and which of the proposed services you want to keep.
              </p>
            </div>
            <div className="facts">
              <div className="fact">
                <span>Service area</span>
                <strong>{site.serviceArea || <Placeholder>[Service area]</Placeholder>}</strong>
              </div>
              <div className="fact">
                <span>Established</span>
                <strong>{site.founded || <Placeholder>[Year established]</Placeholder>}</strong>
              </div>
              <div className="fact">
                <span>Based in</span>
                <strong>
                  {site.locality || site.region ? (
                    <>
                      {site.locality}
                      {site.locality && site.region ? ", " : ""}
                      {site.region}
                    </>
                  ) : (
                    <Placeholder>[City, region]</Placeholder>
                  )}
                </strong>
              </div>
            </div>
            <Link className="text-link" href="/about">
              Read about the company <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-sand" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-head-row" style={{ marginBottom: "clamp(2rem, 4vw, 3.25rem)" }}>
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2 id="services-heading" className="h-section">
                Work the company can <em>confirm and offer.</em>
              </h2>
              <p className="muted">
                These are proposed services. Keep the ones you actually provide, and remove the rest before launch.
              </p>
            </div>
            <Link className="btn btn-secondary" href="/services">
              All services <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                href={`/services#${service.slug}`}
                title={service.name}
                text={service.summary}
                image={service.image}
                alt=""
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-head-row" style={{ marginBottom: "1.5rem" }}>
            <div className="section-head">
              <p className="eyebrow">Projects</p>
              <h2 id="projects-heading" className="h-section">
                A gallery <em>ready for real work.</em>
              </h2>
            </div>
            <Link className="btn btn-secondary" href="/projects">
              View the project gallery <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="sample-note" style={{ marginBottom: "2rem" }}>
            <span>
              <strong>Sample imagery.</strong> Framing, drywall, tape, and mud are shown here as examples of construction work. They are not completed Sandhu projects.
            </span>
          </p>
          <div className="bento">
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
                <span className="bento-caption">
                  <span>
                    <span className="source-pill">Sample</span>
                    <strong>{project.title}</strong>
                  </span>
                  <span className="card-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark on-dark" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head" style={{ maxWidth: "44rem" }}>
            <p className="eyebrow">Process</p>
            <h2 id="process-heading" className="h-section">
              From the first note <em>to a finished site.</em>
            </h2>
          </div>
          <Process />
        </div>
      </section>

      <section className="section" aria-labelledby="estimate-heading">
        <div className="container contact-layout contact-layout-home">
          <div className="contact-aside">
            <p className="eyebrow">Contact</p>
            <h2 id="estimate-heading" className="h-section">
              Request a <em>free estimate.</em>
            </h2>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              Share your name, how to reach you, the service you need, where the project is, and what you want done. The form sends a message only after email delivery is connected. Until then, it will say so plainly.
            </p>
            {site.phone ? (
              <a className="contact-phone" href={telHref(site.phone)} style={{ maxWidth: "24rem" }}>
                <span className="icon" aria-hidden="true">
                  <PhoneIcon />
                </span>
                <span>
                  <small>Prefer to talk?</small>
                  <strong>{site.phone}</strong>
                </span>
              </a>
            ) : null}
          </div>
          <EstimateForm />
        </div>
      </section>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
