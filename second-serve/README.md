# Snowbirdian Hospitality

A single-page site for Snowbirdian Hospitality. It is plain HTML, CSS, and a small script. Open `index.html` in a browser. There is no install and no build.

This folder is separate from the SnowBirdian automation site at the root of the repository. Publish **this folder**, not the whole repo, or the other site will be replaced.

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

**Netlify:** drag this folder onto [Netlify Drop](https://app.netlify.com/drop), or set the publish directory to `second-serve` if the repo is connected. The contact form uses the `netlify` attribute. It sends only after the site is hosted on Netlify. Opening the file on your computer will not deliver the form.

**GitHub Pages:** this repository already publishes a different site from the root. To publish Snowbirdian Hospitality on its own, use a separate repository with these files at the root, and set Pages to deploy from the branch. The form needs Netlify (or another form host). GitHub Pages will not send it.

## What the script does

`script.js` solidifies the nav on scroll, opens the phone menu, swaps Full-Service and Co-Hosting, expands the “who we help” cards, and opens FAQ answers. Motion turns off when the visitor has asked the system to reduce it.
