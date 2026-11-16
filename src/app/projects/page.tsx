import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Sample project gallery for Sandhu Construction and Landscaping Inc. Filter by renovations, decks and fences, hardscaping, and landscaping. These images are not completed company projects.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        crumbs={[{ label: "Projects" }]}
        title={
          <>
            Work worth showing, <em>once it is yours.</em>
          </>
        }
      >
        <p className="sample-note">
          <span>
            <strong>Sample imagery.</strong> Every picture in this gallery is a stand-in. Stock photographs and original illustrations are labeled so they are not read as finished Sandhu projects. Replace them with jobs you have permission to publish.
          </span>
        </p>
      </PageHero>
      <section className="section">
        <div className="container">
          <ProjectGallery projects={projects} />
        </div>
      </section>
    </>
  );
}
