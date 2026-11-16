# Sandhu Construction & Landscaping Inc. — Website

A luxury, dark editorial construction and landscaping website built with Vite, vanilla JavaScript, GSAP, Lenis and Three.js.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open Terminal and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Before publishing — important edits

Company contact details were populated from the current SCL website content found during research: SCL.Sales13@gmail.com and 613-698-6086, 226-927-3959, 236-866-6063. Verify these details before publishing.

Also review `index.html` and `src/main.js` and update:
- Company phone number / email / service area if you add them.
- Exact services offered and wording.
- Real project names, descriptions and completed-project photography.
- Social media links, business hours and any verified credentials.

The provided Vercel URL could not be fetched directly, but indexed SCL website content was available and used to carry over its listed services and Ottawa contact details. This is a new premium design, not a copy of the old layout. It does not invent testimonials, awards, years in business or completed project claims.

## Images

The demo uses remotely hosted Unsplash images as visual placeholders. Replace them with Sandhu's own licensed project photographs before launch. Search for `images.unsplash.com` in `index.html` and `src/style.css` to locate image URLs.

## Contact form

The form uses a `mailto:` handoff and does not store or transmit data to a server. For a production enquiry form, connect a secure form endpoint or CRM and add spam protection/privacy wording.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy, then connect your domain in Vercel project settings.

## Motion and accessibility

- GSAP + ScrollTrigger reveal and parallax effects.
- Lenis smooth scrolling.
- Three.js architectural sculpture in the hero.
- Reduced-motion preference disables continuous 3D and GSAP entrance motion.
- Responsive mobile navigation and layout.
