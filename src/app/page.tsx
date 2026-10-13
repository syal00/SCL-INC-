import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateForm } from "@/components/EstimateForm";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ServiceCard } from "@/components/ServiceCard";
import { featuredProjects } from "@/lib/projects";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
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
      <section className="section section-sand" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2 id="services-heading">Work the company can confirm and offer.</h2>
            <p className="muted">
              These are proposed services. Keep the ones you actually provide, and remove the rest before launch.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                href={`/services#${service.slug}`}
                title={service.name}
                text={service.summary}
                image={service.image}
                alt=""
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="intro-heading">
        <div className="container split">
          <div>
            <p className="eyebrow">The company</p>
            <h2 id="intro-heading">Framing, drywall, and the work around the building.</h2>
          </div>
          <div className="prose">
            <p>
              {site.name} is a construction and landscaping practice based in Ottawa, Ontario, established in 2023. The company takes on residential and commercial work. Finished jobs are added only when they are real company work.
            </p>
            <p>
              Add the facts that are still yours — who leads the work, and which of the proposed services you want to keep.
            </p>
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
            <p>
              <Link href="/about">Read about the company</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-sand" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Projects</p>
            <h2 id="projects-heading">A gallery ready for real work.</h2>
            <p className="sample-note">
              <strong>Sample imagery.</strong> Framing, drywall, tape, and mud are shown here as examples of construction work. They are not completed Sandhu projects.
            </p>
          </div>
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
                  <span className="source-pill">Sample</span>
                  <strong>{project.title}</strong>
                </span>
              </Link>
            ))}
          </div>
          <p>
            <Link className="btn btn-secondary" href="/projects" style={{ marginTop: "1.2rem" }}>
              View the project gallery
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Process</p>
            <h2 id="process-heading">From the first note to a finished site.</h2>
          </div>
          <Process />
        </div>
      </section>

      <section className="section" aria-labelledby="estimate-heading">
        <div className="container contact-layout">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="estimate-heading">Request a free estimate.</h2>
            <p className="lede">
              Share your name, how to reach you, the service you need, where the project is, and what you want done. The form sends a message only after email delivery is connected. Until then, it will say so plainly.
            </p>
          </div>
          <EstimateForm />
        </div>
      </section>
    </>
  );
}
