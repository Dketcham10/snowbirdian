# SnowBirdian.com

Website for SnowBirdian — a business acquisition company based in Scottsdale, AZ. SnowBirdian acquires and operates great small businesses for the long term.

## Structure

- `index.html` — the full site (HTML, CSS, and JS in one file)

Sections: Hero · Approach · Acquisition Criteria · Process · Why SnowBirdian · Founder · Contact

## Local preview

```bash
python3 -m http.server 8766
```

Then open http://localhost:8766

## Deploying

The site is a single static file. Options:

- **GitHub Pages** — push to a repo and enable Pages
- Any static host (Netlify, Vercel, Cloudflare Pages)
- Point the `snowbirdian.com` domain at the host once live

## Editing notes

- Brand colors are defined as CSS variables at the top of `index.html` (`--navy`, `--frost`, etc.)
- Acquisition criteria values (earnings range, industries, geography) are placeholders — update as the thesis sharpens
- The founder photo is a placeholder box — replace `.founder-photo` contents with an `<img>` when ready
