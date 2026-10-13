import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexing) return [];
  const paths = ["", "/about", "/services", "/projects", "/contact", ...projects.map((project) => `/projects/${project.slug}`)];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
