# Research Portfolio — Computational Toxicology & Scientific Agents

[中文](./README.md) | English

A static research portfolio website. Built around four research projects and verifiable outputs — journal papers, a book chapter, a textbook section, and registered software — it presents the complete research workflow from data curation, molecular representation, and predictive modeling to model interpretation, multi-source evidence integration, and scientific agent development.

Live site: <https://mornest.cn>

## Pages

| Page | Content |
|---|---|
| `index.html` | Home: research map, four project summaries, output list, about |
| `grafpka.html` | Research 01: Explainable deep learning pK<sub>a</sub> prediction (GraFpK<sub>a</sub>) |
| `mixture-toxicity.html` | Research 02: Binary mixture toxicity prediction |
| `autotoxreporter.html` | Research 03: Multi-agent system for toxicology report writing |
| `nitrosamine-ames.html` | Research 04: Condition-level nitrosamine mutagenicity prediction |
| `paper-*.html` / `chapter-admet.html` | Paper and book chapter details |
| `textbook-aipharmacy.html` | Textbook section: *AI Pharmacy* |
| `software-grafpka.html` | GraFpK<sub>a</sub> software copyright |
| `awards.html` | Awards |

## Technical Highlights

- **Zero-dependency static site**: plain HTML / CSS / JavaScript — no framework, no build step
- **Dual themes**: dark / light toggle persisted in `localStorage`, with an inline first-paint script to prevent theme flash; figure colors adapt to the active theme
- **Shared components**: nav and footer are injected by `common.js`, keeping all 12 pages on one structure
- **Hand-drawn SVG figures**: every project and output page includes an architecture figure redrawn from the corresponding paper (theme-aware variables, horizontal scroll on narrow screens, `role="img"` accessibility descriptions)
- **Typographic conventions**: chemical notation such as pK<sub>a</sub>, R<sup>2</sup>, and Q<sup>2</sup><sub>LOO</sub> is consistently set with sub- and superscripts
- **Accessibility**: global `:focus-visible` rings, WCAG AA contrast, `prefers-reduced-motion` support
- **Print-friendly**: print styles hide chrome, force light tokens, and keep figures from breaking across pages
- **Responsive**: desktop / tablet / mobile breakpoints with a mobile hamburger menu

## Local Preview

No dependencies required — either works:

```bash
# Option 1: open directly in a browser
open index.html

# Option 2: serve locally (recommended; path behavior matches production)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Deployable on any static host (Cloudflare Pages / GitHub Pages / Vercel). For Cloudflare Pages:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`

## Repository Layout

```text
├── index.html              # Home page
├── *.html                  # Project / output / award detail pages
├── style.css               # Global styles and design tokens (incl. print styles)
├── common.js               # Nav/footer injection, theme toggle, scroll reveal, cursor trail
├── research-map.css        # Home research map figure
├── *-architecture.css      # Per-figure styles (scoped theme variables)
├── output-figure.css       # Shared styles for output-page figures
├── images/                 # GraFpKa software screenshots
├── README.md               # 中文说明
└── README.en.md            # English readme (this file)
```

## Copyright

The page content (project descriptions, figures, copy) is a presentation of personal research results; all rights reserved. Source code for GraFpK<sub>a</sub> and AutoToxReporter lives in their own GitHub repositories.
