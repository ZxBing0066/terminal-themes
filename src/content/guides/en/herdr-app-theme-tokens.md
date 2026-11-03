# Herdr app theme tokens explained

A Herdr app theme has two layers.

## Layer 1: the terminal palette

`background`, `foreground`, `selection`, optional `cursor`, and `ansi` describe the terminal. The `ansi` array must contain sixteen colors in this order:

| Index | Slot | Index | Slot |
| --- | --- | --- | --- |
| 0 | black | 8 | bright black |
| 1 | red | 9 | bright red |
| 2 | green | 10 | bright green |
| 3 | yellow | 11 | bright yellow |
| 4 | blue | 12 | bright blue |
| 5 | magenta | 13 | bright magenta |
| 6 | cyan | 14 | bright cyan |
| 7 | white | 15 | bright white |

## Layer 2: the UI colors

The optional `colors` block overrides the panel colors that Herdr derives from the terminal palette. These are the tokens that matter most:

- `canvas`, `chrome`, `surface`: the window background, title/tab/status bars, and the sidebar.
- `popover`, `raised`, `hover`, `selected`: menus, elevated cards, pointer hover, and selected rows.
- `border`, `input`: separators and text fields.
- `foreground`, `muted`, `dim`: primary, secondary, and disabled text.
- `accent`, `accent_foreground`: focus, links, and the active tab.
- `solid`, `solid_foreground`: solid accent buttons.
- `working`, `blocked`, `done`, `idle`, `unknown`: agent status.

## Precedence

The app starts with the terminal palette, derives panel colors, then applies `colors`. A theme that omits `colors` is valid; the app fills the gaps. A theme that includes `colors` is deterministic and matches the generated preview on this site.

## Practical advice

- Keep `foreground` and `background` at 4.5:1 or better.
- Keep status colors distinguishable from each other and from the background.
- Do not set `accent_foreground` to the same color as `accent`.
- If you change `background`, re-check `muted` and `dim`; they are the first tokens to become unreadable.
