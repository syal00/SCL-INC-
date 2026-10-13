function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

function siteUrl() {
  const raw = clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export const site = {
  name: "Sandhu Construction and Landscaping Inc.",
  shortName: "Sandhu",
  tagline: "Construction and landscaping",
  description:
    "Sandhu Construction and Landscaping Inc. takes on residential and commercial construction, including framing, drywall, and renovations, plus outdoor improvements. Request a free estimate.",
  url: siteUrl(),
  indexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  phone: clean(process.env.NEXT_PUBLIC_PHONE) || "(226) 927-3959",
  email: clean(process.env.NEXT_PUBLIC_EMAIL),
  street: clean(process.env.NEXT_PUBLIC_STREET_ADDRESS),
  locality: clean(process.env.NEXT_PUBLIC_CITY) || "Ottawa",
  region: clean(process.env.NEXT_PUBLIC_REGION) || "Ontario",
  postalCode: clean(process.env.NEXT_PUBLIC_POSTAL_CODE),
  country: clean(process.env.NEXT_PUBLIC_COUNTRY) || "Canada",
  hours: clean(process.env.NEXT_PUBLIC_HOURS),
  serviceArea: clean(process.env.NEXT_PUBLIC_SERVICE_AREA) || "Ottawa, Cornwall, and the surrounding area",
  founded: clean(process.env.NEXT_PUBLIC_FOUNDED) || "2023",
  owner: clean(process.env.NEXT_PUBLIC_OWNER_NAME),
};

export function telHref(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (!cleaned) return "";
  if (/^\d{10}$/.test(cleaned)) return `tel:+1${cleaned}`;
  return `tel:${cleaned}`;
}

export function businessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    description: site.description,
  };

  if (site.phone) data.telephone = site.phone;
  if (site.email) data.email = site.email;
  if (site.founded) data.foundingDate = site.founded;
  if (site.locality) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.street || undefined,
      addressLocality: site.locality,
      addressRegion: site.region || undefined,
      postalCode: site.postalCode || undefined,
      addressCountry: site.country || undefined,
    };
  }
  if (site.serviceArea) data.areaServed = site.serviceArea;

  return data;
}
