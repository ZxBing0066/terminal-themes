# Contributing a theme

One theme is one JSON file at `themes/<family>/<slug>.json`. You do not need to modify the site or run a build.

## Fast path

1. Open the editor at `https://terminalthemes.iwwi.app/editor/` (or `/zh/editor/`).
2. Start from a catalog theme or adjust the default palette.
3. Set `family`, `slug`, and `name`.
4. Press **Submit**: it copies the JSON and opens the GitHub new-file page with the path prefilled.
5. Paste the JSON, commit, and open a pull request.

GitHub cannot reliably prefill file contents from a URL, so the copy step is intentional.

## Manual path

Create `themes/<family>/<slug>.json` with the shape below. `id` must equal `<family>/<slug>`.

```json
{
  "schemaVersion": 1,
  "id": "custom/my-theme",
  "family": "custom",
  "slug": "my-theme",
  "name": "My Theme",
  "appearance": "dark",
  "palette": {
    "background": "#1e1e2e",
    "foreground": "#cdd6f4",
    "cursor": "#cdd6f4",
    "cursorText": "#1e1e2e",
    "selectionBackground": "#585b70",
    "selectionForeground": "#cdd6f4",
    "ansi": {
      "black": "#45475a",
      "red": "#f38ba8",
      "green": "#a6e3a1",
      "yellow": "#f9e2af",
      "blue": "#89b4fa",
      "magenta": "#f5c2e7",
      "cyan": "#94e2d5",
      "white": "#a6adc8",
      "brightBlack": "#585b70",
      "brightRed": "#f37799",
      "brightGreen": "#89d88b",
      "brightYellow": "#ebd391",
      "brightBlue": "#74a8fc",
      "brightMagenta": "#f2aede",
      "brightCyan": "#6bd7ca",
      "brightWhite": "#bac2de"
    }
  },
  "source": {
    "upstream": "https://example.com/theme",
    "author": "Your Name",
    "license": "MIT",
    "licenseUrl": "https://example.com/license"
  },
  "tags": ["dark", "high-contrast"],
  "meta": { "addedAt": "2026-11-03", "updatedAt": "2026-11-03" }
}
```

If the license is unknown, use `"license": "unknown"` and link the upstream project. Do not submit upstream files, screenshots, or copied prose.

## Checks

CI runs on every pull request:

- Zod schema and path/id consistency
- 22 valid `#rrggbb` colors
- duplicate detection in OKLab (ΔE00 < 1 fails)
- source/author/license presence
- all serializers and the full static build
- preview and OG rendering

## Translation

English and Chinese pages are generated from the same data. Theme descriptions fall back to a factual generated sentence. If you can, add `description.zh` in the theme file and keep terminology consistent with `CONTEXT.md`.
