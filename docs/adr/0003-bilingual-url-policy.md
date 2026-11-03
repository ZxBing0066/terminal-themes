# Bilingual site with English slugs

English is the default locale at `/`; Chinese is a full mirror at `/zh/`. Slugs stay in English in both locales so URLs remain stable and hreflang pairs are mechanical. Every page carries a self-canonical and reciprocal `hreflang` for `en`, `zh`, and `x-default`.

## Consequences

- Chinese pages are only published when template copy and theme descriptions are reviewed; until then the page falls back to English and emits no Chinese URL.
- Titles, descriptions, headings, and prose are localized; palette values, port files, and code blocks are shared and never translated.
- The Chinese information architecture mirrors the English one one-to-one, so internal links and sitemaps are generated from the same route table.
