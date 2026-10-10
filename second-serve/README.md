# Snowbirdian Hospitality

The site for **www.snowbirdian.com**. It is plain HTML, CSS, and a small script. Open `index.html` in a browser. There is no install and no build.

GitHub Pages publishes this folder from `.github/workflows/pages.yml` when `main` updates. `CNAME` keeps the custom domain on this folder.

The SnowBirdian AI app stays at the repository root for a different website. It is not part of this deploy.

## Edit the words

Almost everything a visitor reads is in `index.html`. The brand name is already Snowbirdian Hospitality. The header says Snowbirdian. The title, about section, and footer say Snowbirdian Hospitality.

| Placeholder | Where | Replace with |
| --- | --- | --- |
| `[PHONE]` | Call, Text, and footer links (`tel:[PHONE]` and `sms:[PHONE]`) | A phone number, including in the link, for example `tel:+14805551212` |
| `[EMAIL]` | Email links (`mailto:[EMAIL]`) and the contact line | The public email |
| `images/logo.png` | Header, footer, and browser tab | The phoenix mark. Replace the file if the logo changes. |
| `images/scottsdale-mansion.jpg` | Hero and the closing section | A photo of a Scottsdale home. Update the `alt` text if the picture changes. |

Search the folder for `[PHONE]` and `[EMAIL]` before you publish.

## Deploy

**GitHub Pages (snowbirdian.com):** merging to `main` uploads this folder. The contact form uses the `netlify` attribute. GitHub Pages will not deliver those submissions.

**Netlify:** drag this folder onto [Netlify Drop](https://app.netlify.com/drop) if the form should send. It sends only after the site is hosted on Netlify.

## What the script does

`script.js` solidifies the nav on scroll, opens the phone menu, swaps Full-Service and Co-Hosting, and opens FAQ answers. Motion turns off when the visitor has asked the system to reduce it.
