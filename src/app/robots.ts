import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments and local copies: keep every crawler out.
  if (!site.indexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Only the form endpoint is private. CSS, JavaScript, images and video
      // (/_next/, /images/, /video/, /brand/) stay crawlable so pages render fully.
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
