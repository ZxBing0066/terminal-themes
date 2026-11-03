# How to theme the Herdr app

The Herdr app reads one JSON file per theme from `~/.config/herdr-app/themes/`. A theme can be as small as five fields: background, foreground, selection, cursor, and a sixteen-color ANSI array. The app derives its panel colors from those values.

## 1. Save the theme file

Create a file such as `~/.config/herdr-app/themes/my-theme.json`:

```json
{
  "background": "#1e1e2e",
  "foreground": "#cdd6f4",
  "selection": "#585b70",
  "cursor": "#cdd6f4",
  "ansi": [
    "#45475a", "#f38ba8", "#a6e3a1", "#f9e2af",
    "#89b4fa", "#f5c2e7", "#94e2d5", "#a6adc8",
    "#585b70", "#f37799", "#89d88b", "#ebd391",
    "#74a8fc", "#f2aede", "#6bd7ca", "#bac2de"
  ]
}
```

The file name is the theme name. `my-theme.json` appears as `my-theme` in the theme picker.

## 2. Pick it in the app

Open Herdr → Settings → Theme, then choose the file. The theme applies to the window chrome and to new terminal panes.

## 3. Make it the default

Set the theme in `~/.config/herdr-app/settings.json`:

```json
{
  "theme": { "light": "paper", "dark": "my-theme" }
}
```

A single string works too when you do not need appearance switching.

## Add the UI colors

The five fields are enough, but the app also accepts a `colors` block that overrides its derived panel colors: `canvas`, `chrome`, `surface`, `popover`, `raised`, `hover`, `selected`, `border`, `input`, `foreground`, `muted`, `dim`, `accent`, `accent_foreground`, `solid`, `solid_foreground`, `selection`, `working`, `blocked`, `done`, `idle`, and `unknown`.

Every theme on this site includes the full block, so the preview and the app agree.

## Herdr app versus Herdr TUI

Herdr TUI is a separate terminal application configured through `~/.config/herdr/config.toml`. Its `[theme.custom]` keys do not load in the desktop app, and this JSON file does not load in the TUI.
