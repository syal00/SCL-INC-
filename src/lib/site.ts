function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

/** The live website. Canonical URLs, the sitemap and social previews always point here. */
const PRODUCTION_URL = "https://scl-inc.vercel.app";

function siteUrl() {
  const raw = clean(process.env.NEXT_PUBLIC_SITE_URL) || PRODUCTION_URL;
  try {
    const url = new URL(raw);
    // Never advertise a local address to search engines.
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return PRODUCTION_URL;
    return url.origin;
  } catch {
    return PRODUCTION_URL;
  }
}

/**
 * Search engines may index the site only on the live production deployment.
 * Vercel preview deployments and local copies stay blocked so they never
 * compete with the real site. NEXT_PUBLIC_ALLOW_INDEXING=true or false
 * overrides this either way.
 */
function indexingAllowed() {
  const override = clean(process.env.NEXT_PUBLIC_ALLOW_INDEXING).toLowerCase();
  if (override === "true") return true;
  if (override === "false") return false;
  return process.env.VERCEL_ENV === "production";
}

export const site = {
  name: "Sandhu Construction and Landscape Inc.",
  shortName: "Sandhu",
  // The short name customers use. Shown on the site and in search data.
  abbreviation: "SCL",
  alternateNames: ["SCL", "SCL Construction", "SCL Inc.", "Sandhu Construction"],
  tagline: "Construction and landscaping",
  description:
    "Sandhu Construction and Landscape Inc. takes on residential and commercial construction, including framing, drywall, and renovations, plus outdoor improvements. Request a free estimate.",
  url: siteUrl(),
  indexing: indexingAllowed(),
  // Ownership verification codes from Google Search Console and Bing Webmaster Tools.
  verification: {
    google: clean(process.env.GOOGLE_SITE_VERIFICATION),
    bing: clean(process.env.BING_SITE_VERIFICATION),
  },
  phone: clean(process.env.NEXT_PUBLIC_PHONE) || "(226) 927-3959",
  // Other numbers listed on the earlier SCL website. Verify before launch.
  otherPhones: (clean(process.env.NEXT_PUBLIC_OTHER_PHONES) || "(613) 698-6086")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  // Email addresses are shown and linked in lowercase.
  email: (clean(process.env.NEXT_PUBLIC_EMAIL) || "scl.sales13@gmail.com").toLowerCase(),
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
