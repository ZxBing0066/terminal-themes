# Subsystem design references

These pages describe current responsibilities, source of truth, and contracts. Follow the source links to verify the implementation you change.

For this repository, the map below is the subsystem reference. Keep each fact in one place; link to it from `AGENTS.md` instead of copying it.

## Catalog and schema

- **Source of truth:** `themes/<family>/family.json`, `themes/<family>/<slug>.json`
- **Validation and loading:** `src/lib/schema.ts`, `src/lib/data.ts`
- **Public vocabulary:** `CONTEXT.md`
- **Contract:** one theme is one JSON file. `id` must equal `<family>/<slug>`. A theme contains 16 ANSI colors plus background, foreground, cursor, selection, and provenance. Ports, previews, contrast, and OG images are derived.
- **Invariant:** duplicate palettes fail in OKLab; unknown licenses link upstream and never copy upstream files or prose.

## Ports and exports

- **Source of truth:** `src/lib/ports/index.ts`, `src/lib/ports/targets.ts`, `src/lib/ports/herdr-app.ts`
- **Contract:** every `PortTarget` declares a slug, display name, extension, MIME type, and serializer. A serializer consumes the canonical `Theme` and returns the native payload.
- **Target metadata:** `src/data/targets.ts` supplies public title, description, install steps, and docs. `src/lib/ports/install.ts` builds install/download commands.
- **Adding a target:** update both files, add the serializer, add FAQ copy, add preview dispatch, update hardcoded counts, and test the serializer and generated page.

## Previews and OG images

- **Source of truth:** `src/lib/preview.ts`, `src/pages/previews/[file].svg.ts`
- **Contract:** previews are generated SVG from palette data. Herdr App uses its own app shell; other terminals use terminal-specific chrome. `renderPortPreview` is shared by the build and the editor.
- **Visual rule:** a preview must match the application it names. If the real UI is not available, use an official screenshot and state the limitation.
- **Overflow rule:** SVG text does not wrap. Measure labels at desktop and 390px; shorten or split rather than letting text escape its panel.

## Routes, SEO, and i18n

- **Source of truth:** `src/lib/routes.ts`, `src/lib/seo.ts`, `src/pages/[...path].astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`
- **Contract:** the terminal-neutral hub is canonical for `/themes/{family}/{slug}/`; terminal variants are canonical for `/{terminal}/themes/{family}/{slug}/`. English is `/`, Chinese is `/zh/`.
- **Invariant:** every generated page has a self-referencing canonical, alternates, breadcrumb, visible install copy, and matching structured data. New routes must appear in the sitemap and `llms.txt`.
- **Build budget:** the terminal-first design creates about 1.7k pages; a new target multiplies across the catalog. Check the page count and Cloudflare asset limits before adding one.

## Editor

- **Source of truth:** `src/components/editor/Editor.tsx`
- **Contract:** the editor edits the canonical theme shape in the browser, reuses `renderPortPreview`, and exports every port. Share state is compressed into the URL; no palette is uploaded.
- **Invariant:** adding a target must make it selectable in the editor and exportable without a second renderer.

## Build and deployment

- **Source of truth:** `astro.config.mjs`, `wrangler.jsonc`, `.github/workflows/ci.yml`, `package.json`
- **Contract:** `pnpm build` writes static `dist/` plus Pagefind. Cloudflare Workers Static Assets serves it; there is no application server.
- **CI:** `pnpm astro check`, `pnpm test`, `pnpm build`. A target addition must pass all three, not only the serializer tests.

## Verification

```sh
pnpm astro check
pnpm test
pnpm build
```

For UI work, serve `dist/` and inspect the built pages at 1440px and 390px. For route work, inspect canonical/hreflang/schema in the generated HTML and compare sitemap count with generated page count.

## Maintain this reference

Update the owning section in the same commit when a change alters a responsibility, interface, route, target list, state transition, or failure behavior. An internal refactor that preserves contracts does not require a prose change.
