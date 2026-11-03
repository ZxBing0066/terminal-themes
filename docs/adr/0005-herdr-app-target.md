# Herdr app themes, not Herdr TUI themes

The catalog targets the native Herdr app: one JSON file per theme in `~/.config/herdr-app/themes/`, with `background`, `foreground`, `selection`, optional `cursor`, a 16-color `ansi` array, and optional `colors` overrides. Herdr TUI is a separate product configured through `config.toml`; its `[theme.custom]` model does not load in the app, and app theme files do not load in the TUI.

## Considered Options

- **TUI first** — the older product with a larger installed base, but the wrong artifact for the app users this site is for.
- **Both at launch** — two Herdr targets with different formats, previews, and guides, which invites exactly the confusion this decision removes.

## Consequences

- The Herdr hub is `/herdr-app/`; `herdr themes` copy names the app explicitly.
- Guides distinguish the app from the TUI and link to Herdr's own TUI docs for TUI users.
- Herdr TUI is a candidate later target; adding it means a new serializer and hub, not a reinterpretation of the app target.
