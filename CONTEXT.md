# Terminal Themes

A static, open-source catalog of terminal color schemes. Every theme is stored as palette data and rendered into previews and per-application exports.

## Language

**Theme**:
One catalog entry: a named palette plus provenance and metadata, e.g. Catppuccin Mocha.
_Avoid_: scheme, color scheme, variant

**Family**:
A group of themes published by one upstream project, e.g. Catppuccin.
_Avoid_: collection, series

**Palette**:
The 16 ANSI colors plus background, foreground, cursor, and selection colors that define a theme's appearance.
_Avoid_: colors, swatch

**Terminal**:
The public term for an application that consumes a palette through its own configuration format, e.g. Herdr app, Ghostty, Alacritty.
_Avoid_: app, integration, platform, target

**Terminal variant**:
One theme rendered for one terminal, with its own URL, install steps, and FAQ, e.g. Catppuccin Mocha for Ghostty.
_Avoid_: target page, port page

**Target**:
The internal code term for a Terminal; not used in public copy.
_Avoid_: target in public copy

**Herdr app**:
The native desktop app (`herdrdev/herdr-app`) that reads one JSON theme file per theme from `~/.config/herdr-app/themes/`.
_Avoid_: Herdr, Herdr TUI

**Herdr TUI**:
The terminal multiplexer (`herdrdev/herdr`) configured through `config.toml`; not a Phase 1 target.
_Avoid_: Herdr app

**Export**:
The generated configuration artifact that applies a theme's palette to one terminal. This is the public UI term.
_Avoid_: port (in public copy), conversion, adapter

**Port**:
The internal code term for an Export; the serializer and file payload.
_Avoid_: port in public copy

**Source record**:
The provenance attached to a theme: upstream repository, reference page, author, and license.
_Avoid_: metadata

**Preview**:
A generated visual of a theme applied to a terminal's chrome, produced from palette data. Real Herdr app captures are used only to calibrate the generator.
_Avoid_: screenshot, mockup

**Editor**:
The browser-side tool that edits a palette and previews exports without a server.
_Avoid_: builder, generator
