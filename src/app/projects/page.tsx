import type { Metadata } from "next";
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
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1>Work worth showing, once it is yours.</h1>
          <p className="sample-note">
            <strong>Sample imagery.</strong> Every picture in this gallery is a stand-in. Stock photographs and original illustrations are labeled so they are not read as finished Sandhu projects. Replace them with jobs you have permission to publish.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ProjectGallery projects={projects} />
        </div>
      </section>
    </>
  );
}
