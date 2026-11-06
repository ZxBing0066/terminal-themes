# Notes for coding agents

This repository is built and maintained with coding agents. Read the documents below before changing a subsystem; they are the contract for what to verify and what to write down.

## Start here

- [`CONTEXT.md`](CONTEXT.md) — the ubiquitous language. Use **theme**, **palette**, **terminal**, **terminal variant**, **export**, and **preview** as defined there.
- [`docs/subsystems/README.md`](docs/subsystems/README.md) — current responsibilities, source of truth, and contracts for the catalog, ports, previews, routes, editor, and build.
- [`docs/code-standards.md`](docs/code-standards.md) — review rules and the checks a change must pass.
- [`LESSONS.md`](LESSONS.md) — mistakes already paid for in this repository.

## Project shape

- Astro static site, with one Preact island for the editor.
- Theme records live in `themes/<family>/<slug>.json`; they are the only palette data.
- `src/lib/ports/` serializes a theme into each terminal's native format.
- `src/lib/preview.ts` renders terminal chrome as SVG at build time; the editor reuses it.
- `src/pages/` exposes the catalog, terminal-specific theme pages, JSON endpoints, `llms.txt`, and preview images.
- Deployment is asset-only on Cloudflare Workers; there is no server or database.

## Hard rules

- **Do not invent another application's format or UI.** Read the terminal's official documentation and, for visual work, compare against an official screenshot or the running app. If neither is available, say so instead of presenting a guess as verified.
- **One palette, many exports.** Never store a second copy of the palette in a terminal-specific file. Add a serializer and generate the export.
- **A terminal is a product surface.** Adding one requires all of: target copy, install steps, docs link, serializer, MIME/extension, preview, FAQ, tests, and every hardcoded count or terminal list.
- **Terminal-specific pages must not be thin duplicates.** Each variant needs its own install path, file name, commands, and FAQ. See [ADR 0006](docs/adr/0006-terminal-first-theme-pages.md).
- **SEO/GEO invariants are code.** Keep canonical URLs, hreflang, breadcrumbs, `HowTo`/`ItemList` schema, `llms.txt`, and the sitemap correct for every generated page.
- **No runtime server.** The site must build to static files. Do not add an API route that requires a server, a database, or authentication.
- **Preview SVGs are generated.** Do not add screenshots of real terminals as catalog data. Use screenshots only to calibrate the generator or to document the product.
- **Ask before irreversible or foreign changes.** Do not commit, push, change GitHub settings, or edit another application's config without the user's explicit request.

## Verification

A non-trivial change is not done until the changed surface has been run:

```sh
pnpm astro check
pnpm test
pnpm build
```

Then open the actual built page in a browser, exercise the changed path, and check desktop and 390px widths for overflow. For a target preview, inspect the generated SVG and the terminal-specific page. For a catalog change, check the generated page count, canonical URL, sitemap entry, and `llms.txt`.

Report exactly what was run, at which commit. A check that was not run is listed as not run, not omitted.

## Commits

- One user-visible change per commit; do not mix a target addition with an unrelated refactor.
- Subject: area, then the behavior a user now sees.
- Body: what was verified, which commands ran, and any unverified assumption.
- Do not push or open a pull request unless asked.
