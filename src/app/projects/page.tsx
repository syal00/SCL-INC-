import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
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
        eyebrow="Selected work"
        number="03"
        crumbs={[{ label: "Projects" }]}
        title={
          <>
            Spaces with <em>purpose.</em>
          </>
        }
      >
        <Reveal delay={0.2}>
          <p className="sample-note">
            <strong>Sample imagery.</strong> Every picture in this gallery is a stand-in. Stock photographs and original illustrations are labeled so they are not read as finished Sandhu projects. Replace them with jobs you have permission to publish.
          </p>
        </Reveal>
      </PageHero>
      <section className="section section-tight-top">
        <div className="container">
          <ProjectGallery projects={projects} />
          <p className="image-note">
            Project photography shown for design direction only — update with Sandhu projects before launch.
          </p>
        </div>
      </section>
    </>
  );
}
