# ASK GEORGE LTD. — Premium Corporate Website

Strategic infrastructure & government advisory website for Ask George Ltd.
Built in plain **HTML5 + CSS3 + Vanilla JavaScript** for direct deployment on cPanel /
shared Apache hosting, with the file & code architecture deliberately staged for a
clean future port to a **custom WordPress theme**.

---

## 1 — Quick Start (cPanel deployment)

1. Upload **the entire contents** of `public_html/` to your cPanel `public_html/`
   directory (not the wrapping folder itself).
2. Verify file structure (see below).
3. Visit your domain — the site is live. No build step, no dependencies.

Recommended uploads:
- Use cPanel File Manager's **ZIP & Extract** or FTP/SFTP with directory permissions
  `755` and file permissions `644`.
- Keep `.htaccess` in place — it handles the custom 404, compression, caching and
  security headers.

---

## 2 — Folder Structure

```
public_html/
├── index.html               Home — cinematic hero, core services, sectors, Africa
├── about.html               About the firm — principles, conviction
├── services.html            8 detailed advisory services
├── sectors.html             Sector grid + deep-dives
├── projects.html            Case study cards with sector filter
├── insights.html            Editorial — featured + grid + themes
├── governance.html          Governance pillars, standards, compliance
├── contact.html             Contact form + info card + map composition
├── 404.html                 Custom error page
├── .htaccess                Apache config (compression, caching, headers, 404)
│
├── assets/
│   ├── css/
│   │   ├── main.css         Design tokens + components (single source of truth)
│   │   ├── responsive.css   Breakpoints (1180 / 980 / 640)
│   │   ├── animations.css   Reveal / stagger / hero choreography
│   │   └── utilities.css    Atomic helpers, a11y, focus
│   │
│   ├── js/
│   │   ├── main.js          Footer year, form niceties, newsletter
│   │   ├── navigation.js    Sticky header, mobile drawer, active link
│   │   ├── scroll-effects.js IntersectionObserver reveals + counters
│   │   └── animations.js    Map hover, smooth anchor scroll
│   │
│   ├── images/
│   │   ├── africa.svg       Vector map (from simplemaps) used in Africa section
│   │   ├── uganda.png       Uganda location reference
│   │   ├── hero/            (place hero photography here when ready)
│   │   ├── sectors/         (sector photography)
│   │   ├── projects/        (project imagery)
│   │   ├── backgrounds/     (large textural backgrounds)
│   │   └── logos/           (the Ask George logos, OG images)
│   │
│   ├── icons/               (additional UI icons if added later)
│   └── fonts/               (self-host Inter & Manrope here for production)
│
└── partials/                Reusable HTML fragments — see § 5
    ├── header.html
    ├── footer.html
    ├── navigation.html
    └── hero.html
```

---

## 3 — Design System

**Palette** (CSS variables in `assets/css/main.css`):

| Token            | Hex       | Role |
|------------------|-----------|------|
| `--ag-navy-deep` | `#061226` | Backgrounds, hero, dark sections |
| `--ag-navy`      | `#0b1b34` | Brand primary |
| `--ag-steel-blue`| `#4a6791` | Secondary, illustrations |
| `--ag-gold`      | `#b89968` | Accent — restrained, expensive |
| `--ag-gold-soft` | `#d8c39a` | Highlights on dark |
| `--ag-fog`       | `#f6f8fb` | Section "mist" background |
| `--ag-line`      | `#e3e8ef` | Dividers, borders |

**Type system:** Inter (body) + Manrope (display) — currently loaded via Google
Fonts. For production, self-host into `assets/fonts/` and switch the `<link>` to
a local `@font-face`.

**Spacing scale:** 4 px base — tokens `--sp-1` (4) → `--sp-11` (160).

**Motion:** All reveals use IntersectionObserver. CSS variable `--ease`
(`cubic-bezier(0.22, 0.61, 0.36, 1)`) is the house easing curve.

---

## 4 — JavaScript Modules

Each module is a self-contained IIFE with no globals. They can be loaded in any
order. For WordPress, each becomes its own `wp_enqueue_script()` call.

| File                 | Responsibility |
|----------------------|----------------|
| `main.js`            | Footer year, contact-form submit handler, newsletter |
| `navigation.js`      | Header shadow on scroll, mobile drawer, active link |
| `scroll-effects.js`  | Reveal observers + animated counters |
| `animations.js`      | Smooth anchor scroll, map hover polish |

---

## 5 — Partials (`/partials`)

The `partials/` folder contains **canonical reusable fragments** used during the
static build phase. They are NOT included into the live HTML pages (HTML doesn't
support server-side includes by default); instead, the pages inline equivalent
markup. The partials serve two purposes:

1. **Single source of truth** during static development — when you change a
   nav link in `partials/header.html`, update the same markup in each page.
2. **Direct templates for WordPress conversion** — each file maps 1:1 to a PHP
   template part (see § 6).

---

## 6 — Roadmap: WordPress Conversion

The static structure was designed so that conversion to a custom WordPress theme
is mechanical, not creative.

### 6.1 — File mapping

| Static file              | WordPress template          |
|--------------------------|-----------------------------|
| `index.html`             | `front-page.php`            |
| `about.html`             | `page-about.php` (or page) |
| `services.html`          | `archive-service.php` (CPT) |
| service section blocks   | `single-service.php` + ACF  |
| `sectors.html`           | `archive-sector.php` (CPT)  |
| `projects.html`          | `archive-project.php` (CPT) |
| `insights.html`          | `archive-insight.php` / `home.php` |
| individual insight cards | `single-insight.php`        |
| `governance.html`        | `page-governance.php`       |
| `contact.html`           | `page-contact.php`          |
| `404.html`               | `404.php`                   |
| `partials/header.html`   | `header.php`                |
| `partials/footer.html`   | `footer.php`                |
| `partials/navigation.html` | `wp_nav_menu( 'primary' )` |
| `partials/hero.html`     | `template-parts/page-hero.php` |

### 6.2 — Suggested Custom Post Types

Register in `functions.php`:

- `service`       — fields: icon, short blurb, bullet points, hero visual class
- `sector`        — fields: tag, short blurb, hero visual class
- `project`       — fields: sector tax, region, period, impact, summary, visual class
- `insight`       — uses native `post` plus a `topic` taxonomy

### 6.3 — Suggested ACF (Advanced Custom Fields) groups

- **Front Page**: hero eyebrow, headline, lead, trust indicators (repeater)
- **Africa Section**: copy, metrics (repeater)
- **CTA Block**: eyebrow, headline, body, primary & secondary CTAs
- **Page Hero** (page template): eyebrow, headline, lead, breadcrumb override

### 6.4 — Enqueueing CSS & JS

In `functions.php`:

```php
function ag_enqueue_assets() {
    $v = wp_get_theme()->get( 'Version' );

    // Fonts — replace with local @font-face once self-hosted in /assets/fonts/
    wp_enqueue_style( 'ag-fonts',
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap',
      array(), null );

    wp_enqueue_style( 'ag-main',       get_template_directory_uri() . '/assets/css/main.css',       array(), $v );
    wp_enqueue_style( 'ag-responsive', get_template_directory_uri() . '/assets/css/responsive.css', array( 'ag-main' ), $v );
    wp_enqueue_style( 'ag-animations', get_template_directory_uri() . '/assets/css/animations.css', array( 'ag-main' ), $v );
    wp_enqueue_style( 'ag-utilities',  get_template_directory_uri() . '/assets/css/utilities.css',  array( 'ag-main' ), $v );

    wp_enqueue_script( 'ag-navigation',     get_template_directory_uri() . '/assets/js/navigation.js',     array(), $v, true );
    wp_enqueue_script( 'ag-scroll-effects', get_template_directory_uri() . '/assets/js/scroll-effects.js', array(), $v, true );
    wp_enqueue_script( 'ag-animations',     get_template_directory_uri() . '/assets/js/animations.js',     array(), $v, true );
    wp_enqueue_script( 'ag-main',           get_template_directory_uri() . '/assets/js/main.js',           array(), $v, true );
}
add_action( 'wp_enqueue_scripts', 'ag_enqueue_assets' );
```

### 6.5 — Dynamic sections to convert later

Anywhere an HTML comment says `WP: ...` the markup is intentionally a static
placeholder for a future dynamic loop. Examples:

- `services-grid` (home + services pages) → `WP_Query` over the `service` CPT
- `sectors-grid` → `WP_Query` over `sector` CPT
- `projects-grid` + the page filter pills → `WP_Query` + a `sector` taxonomy
  query var; the filter bar becomes a JS-driven taxonomy facet or a server-side
  archive filter
- `insights-grid` → standard `WP_Query` ordered by date
- `footer-newsletter` → Mailchimp embed / WPCF7 form
- `data-contact-form` → Contact Form 7 / Gravity Forms / Fluent Forms

---

## 7 — Performance & SEO

- **Semantic HTML5** throughout (`<header>`, `<nav>`, `<main>`-style sections,
  `<footer>`, `<article>`, `<aside>`).
- **Meta** — every page sets `<title>`, `<meta description>`, Open Graph and
  Twitter cards.
- **Lazy media** — currently the site uses CSS art compositions for sector/insight
  visuals so there is no large bitmap payload. When replacing with photography,
  use `<img loading="lazy" decoding="async">` and serve WebP.
- **A11y** — focus ring, `aria-label`s on icon-only controls, semantic landmarks,
  `prefers-reduced-motion` shortcut in `responsive.css`.
- **Compression & caching** are configured in `.htaccess`.

---

## 8 — Replacing placeholders before launch

Search-and-replace these placeholders site-wide before going live:

| Find                                  | Replace with |
|---------------------------------------|--------------|
| `+256 XXX XXX XXX`                    | Real phone number |
| `info@askgeorge.com`                  | Confirm email |
| Insight article titles / dates        | Real published research |
| Project case study copy & timelines   | Confirmed engagement detail (within confidentiality) |
| `og:image` `assets/images/logos/og-default.jpg` | Real 1200×630 OG image |

The CSS sector backgrounds (`.sc-bg-*`) are intentionally photographic-feel
gradients/patterns so the site is "image-light" by default — drop in real
photography by overriding their `background-image` in `main.css` or replacing
the `<div class="sc-bg sc-bg-*">` with `<img>` once curated photos are ready.

---

## 9 — Browser support

Modern evergreen browsers (Chrome, Safari, Edge, Firefox — last 2 versions).
The site degrades gracefully without JS (content fully visible; reveal
animations simply skip).

---

## 10 — Notes for future maintainers

- `main.css` is the single source of truth — keep design changes there.
- Don't introduce a build system unless you need one; this codebase is
  deliberately framework-free.
- Before adding any JS library, ask whether vanilla can solve it (it almost
  always can on a site this size).

— Built for Ask George Ltd. · Kampala, Uganda.
