# Contrast and readability for terminal themes

Contrast is the ratio between the relative luminance of two colors. WCAG uses it to describe how readable text is against its background.

## The thresholds

| Ratio | Meaning |
| --- | --- |
| 4.5:1 | Normal body text (AA) |
| 3:1 | Large text and UI boundaries (AA) |
| 7:1 | Enhanced body text (AAA) |

For a terminal theme, the most important pair is `foreground` against `background`. The next most important is each ANSI color against the background, because status lines, diffs, and prompts use them as text.

## What to check

1. Foreground / background.
2. Every ANSI color / background.
3. Selection text / selection background.
4. Cursor / background, if the cursor is a block.
5. Derived UI tokens: `muted`, `dim`, `accent`.

## Low contrast can be intentional

Some themes are deliberately soft. The site reports the numbers instead of rejecting the theme. If a theme is below 4.5:1, say so in the description rather than hiding it.

## Fix the derivation, not the palette

If `muted` or `dim` fails, adjust the derivation; do not change the terminal palette to satisfy a UI token. The palette is the theme; the UI tokens are our interpretation.
