import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/BeforeAfter";
import { PageHero } from "@/components/PageHero";
import { getProject, projects } from "@/lib/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: `${project.summary} Sample imagery for Sandhu Construction and Landscaping Inc. This is not a completed company project.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <PageHero
        eyebrow={project.category}
        crumbs={[{ href: "/projects", label: "Projects" }, { label: project.title }]}
        title={project.title}
        lede={project.summary}
        className="detail-hero-pad"
      />
      <div className="container">
        <div className="detail-media">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
        <div className="detail-grid section" style={{ paddingBottom: "clamp(3.5rem, 8vw, 6rem)" }}>
          <div className="prose">
            <p className="sample-note" style={{ marginBottom: "1.75rem" }}>
              <span>
                <strong>Sample imagery.</strong> {project.sourceLabel}. This page is a layout for a real project. It is not a record of work completed by Sandhu Construction and Landscaping Inc.
              </span>
            </p>
            <h2>About this project</h2>
            <p>{project.summary}</p>
            <p>{project.body}</p>
            <p>
              <Link className="text-link" href="/projects">
                <span aria-hidden="true">←</span> All sample projects
              </Link>
            </p>
          </div>
          <aside className="detail-aside">
            <div className="detail-meta">
              <div className="facts">
                <div className="fact">
                  <span>Category</span>
                  <strong>{project.category}</strong>
                </div>
                <div className="fact">
                  <span>Location, year, and scope</span>
                  <strong>
                    <span className="placeholder">[Add when this is a real project]</span>
                  </strong>
                </div>
              </div>
            </div>
            {project.before && project.after ? (
              <div>
                <h2>Before and after</h2>
                <p className="muted">Drag the control, or use the arrow keys when it is focused.</p>
                <BeforeAfter before={project.before} after={project.after} />
              </div>
            ) : (
              <div className="compare-pending">
                <h2>Before and after</h2>
                <p className="muted">
                  The comparison slider is ready for a matched pair: two photographs of the same place. Add them to this project and the control appears here. Unrelated pictures are not shown as a before-and-after.
                </p>
                <div className="compare-frames" aria-hidden="true">
                  <div>Before</div>
                  <div>After</div>
                </div>
              </div>
            )}
            <Link className="btn btn-primary" href="/contact">
              Request a Free Estimate <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
