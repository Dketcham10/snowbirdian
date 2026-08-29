# SnowBirdian AI

Marketing site for SnowBirdian AI — boutique workflow automation and AI agents for real estate, construction, investment, insurance, and mortgage firms.

This repo **is** www.snowbirdian.com. The former SnowBirdian Holdings page has been replaced.

React + Vite + TypeScript + Tailwind. Content is static and prerendered so hero, services, and FAQ copy are in the initial HTML for search and AI crawlers. Inquiries go through the HubSpot form in the contact section; `dillon@snowbirdian.com` is the public email fallback.

## Edit copy

All visitor-facing wording lives in [`src/content.ts`](src/content.ts). HubSpot portal and form IDs are there too.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

`npm run build` typechecks, bundles, prerenders `dist/index.html`, and writes `sitemap.xml`.

## Deploy

**Vercel (recommended):** import this repo, framework Vite, output `dist`, then point `snowbirdian.com` / `www.snowbirdian.com` at the project.

**GitHub Pages:** the workflow in `.github/workflows/pages.yml` builds and publishes `dist/`. In the repo, set Pages source to **GitHub Actions**.

## Design tokens

Palette, type scale, and breakpoints are in [`tailwind.config.ts`](tailwind.config.ts):

- Ink `#14110E`, cream `#F6F1E8`, bronze `#8A6F4E`
- Display: Cormorant Garamond. Body: Source Sans 3
- Breakpoints: 768 / 1024 / 1440 (mobile-first from 375)
