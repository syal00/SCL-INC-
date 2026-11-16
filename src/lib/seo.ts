import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Date the public content last changed in a meaningful way. Used as the
 * sitemap's last-modified date; update it when page content changes.
 */
export const CONTENT_UPDATED = "2026-11-16";

/** Social sharing image (1200×630), built by `npm run brand`. */
export const OG_IMAGE = {
  path: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Sandhu Construction and Landscape Inc. logo: a roof over a small house on a row of pavers.",
};

export const absoluteUrl = (path = "/") => new URL(path, `${site.url}/`).toString();

type PageSeo = {
  /** Page title without the brand suffix (the layout template adds it). Omit on the home page. */
  title?: string;
  /** Full title for the home page or when the template should not apply. */
  absoluteTitle?: string;
  description: string;
  path: string;
  /** Keep the page out of search results (it is still crawlable and its links are followed). */
  noindex?: boolean;
};

/**
 * Complete metadata for one page. Next.js replaces (does not merge) nested
 * objects such as openGraph between the layout and a page, so every page
 * gets the full set here: canonical URL, Open Graph and X (Twitter) tags.
 */
export function pageMetadata({ title, absoluteTitle, description, path, noindex }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const shareTitle = absoluteTitle ?? `${title} | ${site.name}`;
  const image = { url: absoluteUrl(OG_IMAGE.path), width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt };

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: site.name,
      url,
      title: shareTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ---------------------------------------------------------------------------
// Structured data (JSON-LD). Only verified facts: no street address, opening
// hours, reviews, ratings, licences or certifications.
// ---------------------------------------------------------------------------

export const BUSINESS_ID = `${site.url}/#business`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Core services the company states on the site (hero and home page copy). */
export const confirmedServices = [
  {
    name: "Wood framing",
    description: "Framing for residential and commercial construction and renovations.",
  },
  {
    name: "Drywall installation",
    description: "Hanging drywall on new framing and in renovated rooms.",
  },
  {
    name: "Drywall taping and mudding",
    description: "Taping and mudding drywall joints so walls are ready for finishing and paint.",
  },
  {
    name: "Home renovations",
    description: "Complete home renovations, from framing and drywall to the finishing work that follows.",
  },
];

export function siteJsonLd() {
  const business: Record<string, unknown> = {
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/scl-logo-primary.svg"),
    image: absoluteUrl(OG_IMAGE.path),
    description: site.description,
    email: site.email,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Ottawa" },
      { "@type": "City", name: "Cornwall" },
    ],
  };
  if (site.phone) business.telephone = site.phone;

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    inLanguage: "en-CA",
    publisher: { "@id": BUSINESS_ID },
  };

  return { "@context": "https://schema.org", "@graph": [business, website] };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": confirmedServices.map((service) => ({
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.description,
      provider: { "@id": BUSINESS_ID },
      areaServed: [
        { "@type": "City", name: "Ottawa" },
        { "@type": "City", name: "Cornwall" },
      ],
      url: absoluteUrl("/services"),
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
