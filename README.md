# Terminal Themes

A static, open-source catalog of terminal color schemes with exports for the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.

- 112 themes across 36 families
- English at `/`, Chinese at `/zh/`
- Build-time previews, OG images, JSON endpoints, `llms.txt`
- Browser-side palette editor with URL state
- No server, no accounts, no cookies

## Herdr app, not Herdr TUI

The Herdr app is the native desktop app (`herdrdev/herdr-app`). A theme is one JSON file in `~/.config/herdr-app/themes/`, with the terminal palette plus optional UI color overrides. Herdr TUI is a separate product configured through `~/.config/herdr/config.toml` and is out of scope for this release. See [`docs/adr/0005-herdr-app-target.md`](docs/adr/0005-herdr-app-target.md).

## Terminal pages

The terminal index lives at `/terminals/`. The terminal-neutral theme hub lives at `/themes/{family}/{slug}/`. Each terminal has its own install page at `/{terminal}/themes/{family}/{slug}/`, with terminal-specific install steps, FAQ, and structured data. A sticky Terminal bar keeps the selected terminal across cards, theme pages, and the editor.

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

## Deployment

The site is deployed from the Cloudflare console as an asset-only Worker. [wrangler.jsonc](wrangler.jsonc) points at `dist/` and handles Astro's trailing-slash routes and `404.html`. Do not deploy locally; Cloudflare builds and deploys the site.

Cloudflare build settings:

- Build command: `pnpm build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Environment: `NODE_VERSION=22`

The existing `dist/_redirects` and `dist/_headers` files are parsed by Workers Static Assets. Add `terminalthemes.iwwi.app` as a custom domain after testing the `workers.dev` URL; a hostname cannot be attached to both Pages and Workers at once.

## Structure

```
themes/<family>/family.json
themes/<family>/<slug>.json
src/lib/          schema, color math, data loader, ports, previews, routes, SEO
src/components/   Astro pages, Terminal bar, and the Preact editor
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
