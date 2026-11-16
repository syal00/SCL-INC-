import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Project Gallery",
  description:
    "Framing, drywall, renovation and outdoor work by Sandhu Construction and Landscape Inc. Current gallery photos are samples, not completed company projects.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />
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
