"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/lib/projects";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );
  const count = (category: "All" | ProjectCategory) =>
    category === "All" ? projects.length : projects.filter((project) => project.category === category).length;

  return (
    <div>
      <div className="gallery-toolbar">
        <div className="filters" role="toolbar" aria-label="Filter projects">
          {(["All", ...projectCategories] as const).map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category} <span aria-hidden="true">{count(category)}</span>
            </button>
          ))}
        </div>
        <p className="hint" aria-live="polite">
          Showing {visible.length} sample {visible.length === 1 ? "project" : "projects"}.
        </p>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="project-card">
              <div className="card-media">
                <span className="source-pill">Sample</span>
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
              </div>
              <div className="card-body">
                <div>
                  <p>{project.category}</p>
                  <h2>{project.title}</h2>
                </div>
                <span className="card-arrow" aria-hidden="true">→</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
