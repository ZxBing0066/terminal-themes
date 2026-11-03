# Theme data sourcing: upstream-first, reference data as fallback

The reference site (terminalcolors.com) ships no per-theme license metadata, blocks `/downloads/` in `robots.txt`, and its page copy and preview images are copyrighted. We treat it as a curation list and a fallback source of *color values only*. Every catalog record is imported from the theme's upstream repository when one exists; otherwise its palette values are transcribed from the reference page's HTML payload and palette SVG, with `source.reference` recorded. SVG files are parsed in memory for hex values and never stored, committed, or served. Images, descriptions, and site copy are never copied.

## Considered Options

- **Scrape and mirror the reference site** — fastest path to parity, but combines robots-restricted downloads with missing per-theme licensing and copied assets.
- **Curate a small hand-made set** — clean, but does not meet the "convert the reference catalog" goal.
- **Link-only directory** — no palette data, so no comparison, preview, or export; product value collapses.

## Consequences

- Each record carries `source.upstream`, `source.reference`, `author`, and `license`. The importer refuses records without a resolvable source.
- Themes with unknown licenses stay visible as color facts with a reference link; generated ports are published for every theme, and upstream files are never mirrored.
- Preview and OG images are generated from palette values at build time; no third-party images enter the repo.
- ghostty.style (MIT) is prior art for schema and UX, not a data source: its themes are user uploads with unclear per-theme licensing.
