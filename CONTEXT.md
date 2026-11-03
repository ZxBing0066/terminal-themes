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

**Target**:
An application that consumes a palette through its own configuration format, e.g. Herdr app, Ghostty, Alacritty.
_Avoid_: app, integration, platform

**Herdr app**:
The native desktop app (`herdrdev/herdr-app`) that reads one JSON theme file per theme from `~/.config/herdr-app/themes/`.
_Avoid_: Herdr, Herdr TUI

**Herdr TUI**:
The terminal multiplexer (`herdrdev/herdr`) configured through `config.toml`; not a Phase 1 target.
_Avoid_: Herdr app

**Port**:
The generated configuration artifact that applies a theme's palette to one target.
_Avoid_: export, conversion, adapter

**Source record**:
The provenance attached to a theme: upstream repository, reference page, author, and license.
_Avoid_: metadata

**Preview**:
A generated visual of a theme applied to a target's chrome, produced from palette data. Real Herdr app captures are used only to calibrate the generator.
_Avoid_: screenshot, mockup

**Editor**:
The browser-side tool that edits a palette and previews ports without a server.
_Avoid_: builder, generator
