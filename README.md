# KIGHERI RD — Portfolio 2026

New professional portfolio website for **Daniel KIGHERI Richard** — Digital Systems & Data
Management Analyst · IT Lead · Web & Software Developer.

Built from scratch (no template) — vanilla HTML, CSS and JavaScript, so it runs anywhere with
no build step. Fully aligned with the DKR brand: deep forest green, emerald and gold, the DKR
monogram, and the "Digital Solutions" identity.

## Structure

```
KIGHERI-Portfolio-2026/
  index.html            # the whole site (single page)
  assets/
    css/style.css       # design system + all styling
    js/main.js          # nav, scroll-reveal, active links
    img/
      favicon.svg       # DKR monogram mark
      logo-full.svg     # full logo lockup
      profile-hero.jpg  # hero headshot
      profile-about.jpg # about portrait
      profile-full.jpg  # spare high-res portrait
```

## Sections

Hero · About · Services · Expertise (skills) · Experience & Education · Contact.
Testimonials were intentionally removed.

## To do later

- **Certifications** — the Experience section has a ready "Certifications" block with a commented
  template (`edu-card`) in `index.html`. Drop each certificate in when provided.
- **Emails** — currently rickigheri@gmail.com and rickigheri@metamorphosissarl.com (as requested);
  update in the Contact and hero/footer sections if these change.
- **Contact form** — posts to the existing Formspree endpoint; swap the `action` URL if needed.

## Deploy to GitHub Pages

This is designed to be hosted on GitHub first (before buying a domain):

1. Create/So into the `rickigheri.github.io` repository.
2. Copy the **contents** of this folder (so `index.html` sits at the repo root).
3. Commit and push to the `main` branch.
4. GitHub Pages serves it at `https://rickigheri.github.io`.
5. When the domain is purchased, point it at the same repo (Pages → custom domain).

Test locally by opening `index.html` in any browser, or run `python3 -m http.server` in this
folder and visit `http://localhost:8000`.
