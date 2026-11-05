# Terminal-first theme pages

The catalog needs indexable pages for long-tail queries such as “Catppuccin Mocha for Ghostty”, while the existing `/themes/{family}/{slug}/` page remains the terminal-neutral overview. We chose target-first paths at `/{terminal}/themes/{family}/{slug}/`, one page per theme and terminal, with terminal-specific install steps, FAQ, `HowTo`, and canonical metadata. The terminal-neutral page stays a hub with six terminal links instead of repeating every terminal's install instructions.

A single sticky Terminal bar now carries the selected terminal across the site. On target and variant pages it is part of the URL; on browsing pages it updates card previews and links from `localStorage`. This avoids six query-parameter variants of the same document and gives crawlers and generative search engines a distinct answer to cite for each terminal.

Consequences:

- The build grows from about 340 to about 1,684 pages. At the current catalog size it still fits the Workers free asset limits.
- Each variant must keep terminal-specific copy and FAQ. Adding a terminal without unique content would create thin, near-duplicate pages.
- Card images navigate to theme pages; the zoom icon is the only lightbox trigger.
- The terminal-neutral hub remains canonical for its own URL, and variant canonicals point to themselves rather than to the hub.
