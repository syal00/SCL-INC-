# Search engine setup

Live site: **https://scl-inc.vercel.app**

## How it works

| What | Where | Notes |
| --- | --- | --- |
| Canonical domain | `src/lib/site.ts` (`PRODUCTION_URL`) | Override with `NEXT_PUBLIC_SITE_URL` when a custom domain is connected. Local addresses are never used. |
| Indexing switch | `src/lib/site.ts` (`indexingAllowed`) | On for the Vercel **production** deployment only. Previews and local copies send `noindex` and a blocking robots.txt. `NEXT_PUBLIC_ALLOW_INDEXING=true/false` forces it either way. |
| Page titles, descriptions, canonical, Open Graph, X | `src/lib/seo.ts` (`pageMetadata`) | Every page calls it, so each gets a complete set of absolute HTTPS tags. |
| Share image | `public/og-image.png` (1200×630) | Rebuilt by `npm run brand`. |
| robots.txt | `src/app/robots.ts` | Allows everything except `/api/`; lists the sitemap. |
| sitemap.xml | `src/app/sitemap.ts` | Home, Services, Contact, About, Projects. Update `CONTENT_UPDATED` in `src/lib/seo.ts` when content changes. |
| llms.txt | `src/app/llms.txt/route.ts` | Plain-language company summary for AI assistants, built from the site's own data. |
| Structured data | `src/lib/seo.ts` | GeneralContractor + WebSite on every page, Service on /services, BreadcrumbList on inner pages. No street address, hours, reviews, ratings or licences. |
| Verification | `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | Paste the code only, then redeploy. |
| IndexNow | `public/97215fb101b54fa5e2a3ee0b4d12ebde.txt`, `scripts/indexnow.mjs` | `npm run indexnow` after a deploy. |

The 20 `/projects/<name>` pages show sample photos, so they are `noindex, follow` and left out of the sitemap. When they become real company projects, remove `noindex: true` in `src/app/projects/[slug]/page.tsx` and add them to `src/app/sitemap.ts`.

## Vercel settings to check first

In Vercel > Project > Settings > Environment Variables (Production):

- `NEXT_PUBLIC_ALLOW_INDEXING`: delete it, or set it to `true`. If it is `false` (the old default), search engines stay blocked.
- `NEXT_PUBLIC_SITE_URL`: delete it, or set it to `https://scl-inc.vercel.app`.

Redeploy after changing variables.

## Google Search Console

1. Go to https://search.google.com/search-console and choose **Add property**.
2. Choose **URL prefix** and enter `https://scl-inc.vercel.app/`. (A *Domain* property needs DNS access, which a vercel.app address does not give you.)
3. Choose the **HTML tag** method. Copy only the `content` value from the tag, for example `abc123...`.
4. In Vercel, add the Production variable `GOOGLE_SITE_VERIFICATION` with that value and redeploy.
5. Open https://scl-inc.vercel.app/ and confirm the page source contains `<meta name="google-site-verification" ...>`.
6. Back in Search Console, click **Verify**.
7. Open **Sitemaps**, enter `sitemap.xml` and click **Submit**.
8. Use **URL Inspection** on the home page and click **Request indexing**.

## Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters and sign in.
2. Easiest: **Import from Google Search Console** once Google is verified; it copies the site and sitemap.
3. Or add `https://scl-inc.vercel.app/` manually and choose **HTML Meta Tag**. Copy only the `content` value of the `msvalidate.01` tag.
4. In Vercel, add the Production variable `BING_SITE_VERIFICATION` with that value, redeploy, then click **Verify**.
5. Open **Sitemaps** and submit `https://scl-inc.vercel.app/sitemap.xml`.
6. After the deploy is live, run `npm run indexnow` to notify Bing (and other IndexNow engines) of the pages.

## After a custom domain is connected

Set `NEXT_PUBLIC_SITE_URL` to the new domain, redeploy, add the new domain as a property in both tools, submit its sitemap again, and set up a permanent redirect from `scl-inc.vercel.app` to the new domain in Vercel.
