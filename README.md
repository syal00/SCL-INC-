# Sandhu Construction and Landscaping Inc.

Website, logo, and letterhead for Sandhu Construction and Landscaping Inc. The site is a first version with editable placeholders where company facts are not known yet.

## Run the site

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Before launch

Copy `.env.example` to `.env.local` and fill in what you know. Restart the dev server after changing it.

The site stays out of search indexes until you set `NEXT_PUBLIC_ALLOW_INDEXING=true`. Do that only after the placeholders below are replaced with real information.

### Information still needed

- Email address (`NEXT_PUBLIC_EMAIL`)
- Street address and postal code
- Business hours
- Owner or principal name
- Public website URL (`NEXT_PUBLIC_SITE_URL`), for example `https://example.com`
- Which proposed services are actually offered
- Real project photos, with permission, plus location, year, and a short description of the work
- Any licence, insurance, or warranty wording — only if it is accurate

Items shown in [brackets] on the site are those placeholders.

### Estimate form

The form checks the fields in the browser and again on the server. It uses a hidden field and a short delay as basic spam protection, and it limits repeated submissions from the same network.

It does **not** show a success message unless an email was actually accepted by [Resend](https://resend.com). Until that is connected, the form explains that nothing was sent.

To turn delivery on:

1. Create a Resend account and verify the domain you will send from.
2. Create an API key.
3. Set these in `.env.local`:
   - `RESEND_API_KEY`
   - `ESTIMATE_FROM_EMAIL` — an address on the verified domain
   - `ESTIMATE_TO_EMAIL` — where estimate requests should arrive
4. Restart the server.

Optional photos (up to 4 JPG, PNG, or WebP files, 4 MB each) are attached to that email. They are not saved on the website.

### Project photos and the before-and-after slider

Gallery images are samples. Stock photos are credited in `brand/IMAGE-SOURCES.md`. Some service pictures were generated for this project and are labeled as illustrative samples. None of them are completed Sandhu projects.

A before-and-after slider appears on a project page when that project in `src/lib/projects.ts` has both a `before` and an `after` image of the **same place**. Do not pair unrelated photos.

### Search and sharing

Page titles, descriptions, and a social preview image are included. Business structured data includes the company name, phone number, founding year, Ottawa address region, and service area. Add a street address when you have one to publish. The preview image is `src/app/opengraph-image.png`.

## Brand files

| File | Use |
| --- | --- |
| `brand/logo/scl-icon.svg` | Symbol only |
| `brand/logo/scl-logo-horizontal.svg` | Icon and wordmark, side by side |
| `brand/logo/scl-logo-primary.svg` | Icon stacked above the wordmark |
| `brand/logo/scl-logo-mono.svg` | One-colour version |
| `brand/logo/scl-logo-reversed.svg` | Light version for dark backgrounds |
| `brand/logo/png/` | Transparent PNG exports |
| `brand/letterhead/Sandhu-Letterhead-US-Letter.docx` | Editable Word letterhead |
| `brand/letterhead/Sandhu-Letterhead-US-Letter.pdf` | Print-ready US Letter |
| `brand/letterhead/Sandhu-Letterhead-A4.docx` | Editable Word letterhead |
| `brand/letterhead/Sandhu-Letterhead-A4.pdf` | Print-ready A4 |
| `brand/BRAND-GUIDE.md` | Colours, type, and logo rules |

The same SVG logos are copied to `public/brand/` for the website. Regenerate everything with:

```bash
npm run brand
```

Re-download and recompress the photographs with:

```bash
npm run images
```

Illustrative source files for the generated pictures live in `brand/source-photos/`.

## Project layout

- `src/app` — pages, form endpoint, favicon, and social image
- `src/components` — header, footer, hero, form, and gallery
- `src/lib` — company details, proposed services, and sample projects
- `src/app/api/estimate/route.ts` — validation and email delivery
- `brand` — logo, letterhead, image credits, and this guide’s companion

Company facts that visitors see are read from `src/lib/site.ts`, which uses the environment variables above. Proposed services are listed in `src/lib/services.ts`.
