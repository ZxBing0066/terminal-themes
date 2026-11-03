# Terminal Themes

A static, open-source catalog of terminal color schemes with exports for the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.

- 112 themes across 36 families
- English at `/`, Chinese at `/zh/`
- Build-time previews, OG images, JSON endpoints, `llms.txt`
- Browser-side palette editor with URL state
- No server, no accounts, no cookies

## Herdr app, not Herdr TUI

The Herdr target is the native desktop app (`herdrdev/herdr-app`). A theme is one JSON file in `~/.config/herdr-app/themes/`, with the terminal palette plus optional UI color overrides. Herdr TUI is a separate product configured through `~/.config/herdr/config.toml` and is out of scope for this release. See [`docs/adr/0005-herdr-app-target.md`](docs/adr/0005-herdr-app-target.md).

## Data model

Each theme is one file at `themes/<family>/<slug>.json`, validated by [`src/lib/schema.ts`](src/lib/schema.ts). It stores 16 ANSI colors plus background, foreground, cursor, and selection, and records its upstream, author, and license. Ports, previews, contrast ratios, and OG images are generated at build time and never stored.

Vocabulary lives in [`CONTEXT.md`](CONTEXT.md); the full design is in [`PLAN.md`](PLAN.md).

## Commands

```sh
pnpm install
pnpm dev            # local dev server
pnpm build          # static build + Pagefind index
pnpm preview        # serve dist/
pnpm test           # Vitest: color math, serializers, catalog checks
pnpm astro check    # TypeScript check
pnpm import:themes  # refresh palette data from the reference catalog
```

## Structure

```
themes/<family>/family.json
themes/<family>/<slug>.json
src/lib/          schema, color math, data loader, ports, previews, routes, SEO
src/components/   Astro pages and the Preact editor
src/content/      guides in en/ and zh/
src/pages/        catch-all route + static endpoints
scripts/          importer
docs/adr/         decisions
```

## Contributing

Open the editor at `/editor/`, tune a palette, press **Submit**, then paste the JSON into the new file on GitHub. CI validates the schema, duplicate palettes, contrast, and the full build. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licensing

- Code: MIT ([`LICENSE`](LICENSE))
- Guides and site prose: CC BY 4.0 ([`LICENSE-CONTENT`](LICENSE-CONTENT))
- Theme records keep their upstream license and attribution; the site does not host upstream theme files, screenshots, or copied prose.

The bundled JetBrains Mono font is licensed under the SIL Open Font License; see [`public/fonts/OFL.txt`](public/fonts/OFL.txt).
