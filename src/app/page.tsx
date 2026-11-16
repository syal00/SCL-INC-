import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateForm } from "@/components/EstimateForm";
import { Hero } from "@/components/Hero";
import { Placeholder } from "@/components/Placeholder";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { featuredProjects } from "@/lib/projects";
import { serviceCategories, servicesIn } from "@/lib/services";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  alternates: { canonical: "/" },
};

const principles = [
  {
    title: "Thoughtful planning",
    text: "Good work begins with understanding the site, the scope and the people behind the project.",
  },
  {
    title: "Honest craft",
    text: "Practical solutions, careful execution and an eye for the details that make a difference.",
  },
  {
    title: "Lasting value",
    text: "Spaces made to work well today and to keep serving you over time.",
  },
];

export default function HomePage() {
  const featured = featuredProjects.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="section section-light on-light" aria-labelledby="intro-heading">
        <div className="container">
          <Reveal as="p" className="kicker">
            <span className="num">01</span>
            <span>The Sandhu approach</span>
          </Reveal>
          <div className="intro-grid">
            <Reveal>
              <h2 id="intro-heading" className="h-section">
                Framing, drywall, and <em>the work around the building.</em>
              </h2>
            </Reveal>
            <Reveal className="intro-copy" delay={0.1}>
              <p className="large-copy">
                {site.name} is a construction and landscaping practice based in {site.locality}, {site.region}, established in {site.founded}. The company takes on residential and commercial work.
              </p>
              <p className="muted">
                Finished jobs are added only when they are real company work. Add the facts that are still yours — who leads the work, and which of the proposed services you want to keep.
              </p>
              <Link className="under-link" href="/about">
                Read about the company <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
          <hr className="rule" />
          <div className="principles">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} className="principle" delay={index * 0.08}>
                <span className="num">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="facts facts-row" style={{ marginBottom: 0, marginTop: "3.5rem" }}>
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
                {[site.locality, site.region].filter(Boolean).join(", ") || <Placeholder>[City, region]</Placeholder>}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-panel" aria-labelledby="services-heading">
        <div className="container">
          <Reveal as="p" className="kicker">
            <span className="num">02</span>
            <span>What we do</span>
          </Reveal>
          <div className="section-heading">
            <Reveal>
              <h2 id="services-heading" className="h-section">
                Grounded in craft. <em>Open to possibility.</em>
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Proposed services across the spaces where life happens — indoors and out. Keep the ones you provide before launch.
            </Reveal>
          </div>
          <div className="service-list">
            {serviceCategories.map((category, index) => {
              const items = servicesIn(category.id);
              const lead = items.find((service) => service.image);
              return (
                <Reveal key={category.id} as="article" className="service-row">
                  <div className="service-number">{String(index + 1).padStart(2, "0")}</div>
                  {lead?.image ? (
                    <div className="service-photo">
                      <Image src={lead.image} alt="" fill sizes="(max-width: 720px) 90vw, 280px" />
                    </div>
                  ) : (
                    <div className="service-photo service-photo-blank" aria-hidden="true">
                      <span>{category.title}</span>
                    </div>
                  )}
                  <div className="service-info">
                    <h3>{category.title}</h3>
                    <p>{category.lede}</p>
                    <ul className="service-tags" aria-label={`${category.title} services`}>
                      {items.map((service) => (
                        <li key={service.slug}>{service.name}</li>
                      ))}
                    </ul>
                    <Link className="service-cta" href={`/services#${category.id}`}>
                      See {category.title.toLowerCase()} ↗
                    </Link>
                  </div>
                  <div className="service-arrow" aria-hidden="true">↗</div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="statement" aria-labelledby="statement-heading">
        <div className="statement-media">
          <Image src="/images/finished-yard.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="container">
          <div className="statement-content">
            <Reveal as="p" className="kicker" >
              <span className="line" aria-hidden="true" />
              <span>The details make the difference</span>
            </Reveal>
            <Reveal>
              <h2 id="statement-heading" className="h-section">
                Make room for <em>what matters.</em>
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.1}>
              A considered space is more than what you see. It is how it works, how it feels and how it fits your life.
            </Reveal>
          </div>
        </div>
        <span className="statement-side" aria-hidden="true">Sandhu / Built with intention</span>
        <span className="statement-credit">Sample photograph. Not a Sandhu project.</span>
      </section>

      <section className="section section-light on-light" aria-labelledby="projects-heading">
        <div className="container">
          <Reveal as="p" className="kicker">
            <span className="num">03</span>
            <span>Selected work</span>
          </Reveal>
          <div className="section-heading">
            <Reveal>
              <h2 id="projects-heading" className="h-section">
                A gallery <em>ready for real work.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="sample-note">
                <strong>Sample imagery.</strong> Framing, drywall, tape, and mud are shown as examples of construction work. They are not completed Sandhu projects.
              </p>
            </Reveal>
          </div>
          <div className="work-grid">
            {featured.map((project, index) => (
              <Reveal key={project.slug} className={index === 0 ? "work-card work-large" : "work-card"} delay={index * 0.08}>
                <Link href={`/projects/${project.slug}`} style={{ display: "block" }}>
                  <div className="work-img">
                    <span className="work-open" aria-hidden="true">↗</span>
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 720px) 100vw, 55vw"
                    />
                  </div>
                  <div className="work-meta">
                    <span>
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </span>
                    <strong>{project.title}</strong>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: "3.5rem" }}>
            <Link className="btn btn-dark" href="/projects">
              View the project gallery <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-ink" aria-labelledby="process-heading">
        <div className="container">
          <Reveal as="p" className="kicker">
            <span className="num">04</span>
            <span>How it works</span>
          </Reveal>
          <div className="section-heading">
            <Reveal>
              <h2 id="process-heading" className="h-section">
                From the first note <em>to a finished site.</em>
              </h2>
            </Reveal>
          </div>
          <Process />
        </div>
      </section>

      <section className="section section-panel" aria-labelledby="estimate-heading">
        <div className="container contact-grid">
          <div>
            <Reveal as="p" className="kicker">
              <span className="num">05</span>
              <span>Let&apos;s build something</span>
            </Reveal>
            <Reveal>
              <h2 id="estimate-heading" className="h-section">
                Your next project starts <em>here.</em>
              </h2>
            </Reveal>
            <Reveal as="p" className="lede" delay={0.1}>
              Share your name, how to reach you, the service you need, where the project is, and what you want done. The form sends a message only after email delivery is connected. Until then, it will say so plainly.
            </Reveal>
            <div className="contact-details">
              <span className="label">Reach the company</span>
              {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : null}
              {[site.phone, ...site.otherPhones].filter(Boolean).map((phone) => (
                <a key={phone} href={telHref(phone)}>
                  {phone}
                </a>
              ))}
            </div>
            <div className="contact-note">
              <span className="contact-dot" aria-hidden="true" /> New project enquiries welcome
            </div>
          </div>
          <Reveal delay={0.1}>
            <EstimateForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
