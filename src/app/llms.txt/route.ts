import { absoluteUrl, confirmedServices } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

// Built once at build time and served as a plain file.
export const dynamic = "force-static";

/**
 * llms.txt: a short, plain-language summary of the business for AI assistants
 * and language models (see https://llmstxt.org). It is not used for crawling
 * rules (that is robots.txt) or page discovery (that is sitemap.xml).
 */
export function GET() {
  const phone = site.phone ? `- Phone: ${site.phone} (${telHref(site.phone).replace("tel:", "")})` : null;

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.abbreviation}) is a construction company based in ${site.locality}, ${site.region}, Canada, established in ${site.founded}. It takes on residential and commercial construction: wood framing, drywall installation, drywall taping and mudding, and complete home renovations, with outdoor improvements when a property needs them. Estimates are free.`,
    "",
    "## Company",
    "",
    `- Name: ${site.name}`,
    `- Also known as: ${site.alternateNames.join(", ")}`,
    `- Website: ${absoluteUrl("/")}`,
    `- Based in: ${site.locality}, ${site.region}, Canada`,
    `- Service area: ${site.serviceArea}`,
    `- Established: ${site.founded}`,
    "- Work: residential and commercial",
    "",
    "## Services",
    "",
    ...confirmedServices.map((service) => `- ${service.name}: ${service.description}`),
    "",
    `Other construction, hardscaping, landscaping and property services are listed on the services page as proposed; see ${absoluteUrl("/services")} for the current list.`,
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    ...(phone ? [phone] : []),
    `- Request a free estimate: ${absoluteUrl("/contact")}`,
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): overview of the company and its work`,
    `- [Services](${absoluteUrl("/services")}): construction, renovation, hardscaping, landscaping and property services`,
    `- [About](${absoluteUrl("/about")}): the company, its approach and its commitment to customers`,
    `- [Projects](${absoluteUrl("/projects")}): project gallery (current photos are samples, not completed company projects)`,
    `- [Contact](${absoluteUrl("/contact")}): estimate request form, email and phone`,
    "",
    "## Notes",
    "",
    "- Project gallery photographs are sample images and do not show completed Sandhu projects.",
    "- The company has not published a street address, business hours, licences, certifications, reviews or ratings on this website.",
    "",
  ]
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
