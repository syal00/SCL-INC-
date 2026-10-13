import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/BeforeAfter";
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
    <article className="section detail-hero">
      <div className="container">
        <p className="eyebrow">{project.category}</p>
        <h1 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          {project.title}
        </h1>
        <p className="sample-note">
          <strong>Sample imagery.</strong> {project.sourceLabel}. This page is a layout for a real project. It is not a record of work completed by Sandhu Construction and Landscaping Inc.
        </p>
        <div className="detail-media">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </div>
        <div className="detail-grid">
          <div className="prose">
            <p>{project.summary}</p>
            <p>{project.body}</p>
            <p>
              <Link href="/projects">All sample projects</Link>
            </p>
          </div>
          <div>
            {project.before && project.after ? (
              <>
                <h2>Before and after</h2>
                <p className="muted">Drag the control, or use the arrow keys when it is focused.</p>
                <BeforeAfter before={project.before} after={project.after} />
              </>
            ) : (
              <div className="compare-pending">
                <h2>Before and after</h2>
                <p>
                  The comparison slider is ready for a matched pair: two photographs of the same place. Add them to this project and the control appears here. Unrelated pictures are not shown as a before-and-after.
                </p>
                <div className="compare-frames" aria-hidden="true">
                  <div>Before</div>
                  <div>After</div>
                </div>
              </div>
            )}
            <p className="hint">Location, year, and scope: <span className="placeholder">[Add when this is a real project]</span></p>
          </div>
        </div>
      </div>
    </article>
  );
}
