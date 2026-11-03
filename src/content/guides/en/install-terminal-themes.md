# Install a theme in any terminal

Every port on this site is generated from the same palette. The difference is the file format and where the application reads it.

| Target | Where it goes | Format |
| --- | --- | --- |
| Herdr app | `~/.config/herdr-app/themes/<name>.json` | JSON theme file |
| Ghostty | `~/.config/ghostty/themes/<name>` | key/value config |
| Alacritty | `~/.config/alacritty/alacritty.toml` | TOML colors block |
| Kitty | `~/.config/kitty/<name>.conf` | key/value config |
| iTerm2 | Settings → Profiles → Colors → Import | `.itermcolors` plist |
| Windows Terminal | Settings → Open JSON file → `schemes` | JSON scheme object |

## Herdr app

Save the JSON file, then choose it in Settings → Theme. To make it the default, set `theme` in `~/.config/herdr-app/settings.json`. Herdr TUI is a different application; it uses `~/.config/herdr/config.toml` and does not read these JSON files.

## Ghostty

Put the file in the themes directory and add `theme = <name>` to `~/.config/ghostty/config`.

## Alacritty

Replace the `[colors]` tables or include the exported file from your main config.

## Kitty

Add `include <name>.conf` to `kitty.conf`.

## iTerm2

Import the `.itermcolors` file from the color presets menu.

## Windows Terminal

Add the exported object to the `schemes` array and set `colorScheme` in a profile.
