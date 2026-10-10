# Snowbirdian

This repository holds two sites.

**www.snowbirdian.com** is Snowbirdian Hospitality. GitHub Pages publishes the [`second-serve`](second-serve) folder. See [second-serve/README.md](second-serve/README.md).

**SnowBirdian AI** is the React app at the root of this repo. The code, copy, and assets are kept here for a separate website. This app is not what snowbirdian.com serves.

## SnowBirdian AI

Marketing site for boutique workflow automation and AI agents. React + Vite + TypeScript + Tailwind. Content is static and prerendered. Inquiries go through the HubSpot form in the contact section.

### Edit copy

All visitor-facing wording lives in [`src/content.ts`](src/content.ts). HubSpot portal and form IDs are there too.

### Local development

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

`npm run build` typechecks, bundles, prerenders `dist/index.html`, and writes `sitemap.xml`.

### Deploy on its own domain

Point a **different** domain at this app. Do not attach `snowbirdian.com` or `www.snowbirdian.com` to it. Those names already publish the hospitality page through GitHub Pages.

**Vercel:** import this repo, framework Vite, output `dist` (see `vercel.json`), and assign the consulting domain only.

## Design tokens

Palette, type scale, and breakpoints for the AI site are in [`tailwind.config.ts`](tailwind.config.ts):

- Ink `#14110E`, cream `#F6F1E8`, bronze `#8A6F4E`
- Display: Cormorant Garamond. Body: Source Sans 3
- Breakpoints: 768 / 1024 / 1440 (mobile-first from 375)
