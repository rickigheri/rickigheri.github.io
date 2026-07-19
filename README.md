# KIGHERI RD — Portfolio 2026

Professional portfolio website for **Daniel KIGHERI Richard** — Digital Systems & Data
Management Analyst · IT Lead · Web & Software Developer.

## ⭐ The important file: `index.html`

`index.html` is **fully self-contained** — all the CSS, JavaScript and images are embedded
inside it. There is **nothing external to load**, so it cannot break when uploaded.

### Deploy to GitHub Pages (rickigheri.github.io)

1. Upload **`index.html`** to the root of the `rickigheri.github.io` repository.
   (Uploading `.nojekyll` too is recommended but not required.)
2. That's it — visit `https://rickigheri.github.io` and everything works.

> You do **not** need to upload the `assets/` folder for the site to work — the images, styles
> and scripts are already baked into `index.html`. The `assets/` folder is kept only as the
> editable source (see below).

`.nojekyll` tells GitHub Pages to serve files as-is (skips Jekyll processing) — good insurance.

## Editing later

`index.html` is the single source of truth. To change text (emails, add certificates, etc.),
edit `index.html` directly:
- **Certifications** — search for `CERTIFICATIONS` in the file; a commented `edu-card` template
  is ready to fill in.
- **Emails** — search for `rickigheri@` to update the two addresses.

The `assets/` folder holds the un-inlined originals (`css/style.css`, `js/main.js`, `img/…`) if
you ever want to work on the modular version and re-embed.

## Sections

Hero · About (expandable) · Services (click to expand each) · Expertise (tabs) · Experience &
Education · Contact. Brand-aligned: DK logo lockup, cream + deep-green + gold, Avenir Next
typography. No testimonials.
