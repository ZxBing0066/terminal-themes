# ANSI 16 colors explained

A terminal theme defines sixteen ANSI slots. Programs ask for a slot by number, not by hex, so the theme decides what "red" means.

## The two rows

| Slot | Name | Typical use |
| --- | --- | --- |
| 0 | black | backgrounds, dim text |
| 1 | red | errors, deletions |
| 2 | green | success, additions |
| 3 | yellow | warnings, modified files |
| 4 | blue | directories, links |
| 5 | magenta | keywords, special values |
| 6 | cyan | information, prompts |
| 7 | white | body text |
| 8–15 | bright variants | bold text, emphasis, alternate UI |

The first eight are the normal row; the second eight are the bright row. Many tools use bright colors for bold text, so a theme should keep both rows readable.

## Bright does not always mean lighter

On some palettes, bright red is a different hue rather than a lighter red. Do not assume a mathematical relationship; define all sixteen slots explicitly.

## Why the order matters

Every supported terminal and the Herdr app map the same sixteen slots. If the order is wrong, `git diff` turns the deletions green. Always keep `black, red, green, yellow, blue, magenta, cyan, white` followed by their bright variants.

## What is not in the sixteen

Background, foreground, cursor, and selection are separate fields. That is why a complete theme has 22 values: 16 ANSI + background + foreground + cursor + selection, with optional cursor text and selection text.
