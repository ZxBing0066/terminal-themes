# Create and submit a terminal theme

The catalog accepts one JSON file per theme. You do not need to edit the site or run a build.

## 1. Start in the editor

Open the [editor](/editor/), choose a catalog theme as a starting point, and adjust the 16 ANSI colors plus background, foreground, cursor, and selection. The preview updates live, and the contrast panel flags weak pairs.

## 2. Name the file

Use a kebab-case `family` and `slug`. The file path is `themes/<family>/<slug>.json`, and the theme id is `<family>/<slug>`.

## 3. Submit the pull request

Press **Submit** in the editor. It copies the theme JSON and opens the repository's new-file page with the target path prefilled. Paste the JSON, commit, and open the pull request.

GitHub cannot reliably prefill the file contents from a URL, so the copy-and-paste step is intentional.

## 4. What CI checks

- The JSON matches the schema.
- All 22 colors are `#rrggbb`.
- The palette is not a duplicate of an existing theme.
- Source, author, and license are present.
- The site builds, including previews and ports.

## 5. Review

A maintainer checks provenance, naming, and the Chinese description. Do not submit upstream files, screenshots, or copied prose; the palette values are enough.

## Requirements

- One theme per pull request.
- No external images.
- Unknown licenses must be marked `unknown` and linked to the upstream project.
