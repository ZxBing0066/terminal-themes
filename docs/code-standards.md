# Code standards

These rules describe how a change is reviewed here. Read the relevant [subsystem reference](subsystems/README.md) first, then verify the linked source.

## What a change contains

| Rule | What a reviewer checks |
| --- | --- |
| One goal per change. | Every behavior change has a reason. Unrelated refactors, copy edits, and new targets go in their own commit. |
| The whole path holds. | Follow a palette from `themes/*.json` through the loader, serializer, route, preview, and rendered page. A correct serializer alone does not make the install page correct. |
| Every sibling is updated. | When a target is added or a count changes, update `src/data/targets.ts`, `src/lib/ports/index.ts`, install copy, FAQ, preview dispatch, tests, README, and any hardcoded public counts. |
| Another app's values come from that app. | Format, file extension, install path, MIME type, and UI chrome come from the terminal's documentation or a real capture. Do not infer them from another target. |
| Generated data is not duplicated. | The theme JSON is canonical. Ports, previews, contrast ratios, OG images, and sitemap entries are generated. |
| SEO is part of the page contract. | Canonical URL, hreflang, title, description, breadcrumb, structured data, and `llms.txt` stay correct for every generated route. |
| A preview is a visual claim. | A preview that claims to represent a terminal must use that terminal's real chrome or say it is generic. Check text overflow at both desktop and mobile widths. |
| No hidden runtime. | The build must remain static. No API route may need a server, database, or secret. |

## Tests and evidence

| Rule | What a reviewer checks |
| --- | --- |
| Ports have behavioral tests. | Each serializer is tested with real theme fixtures, including boundaries such as colors that must be quoted, alpha handling, and required keys. |
| Catalog invariants are tested. | Schema, path/id consistency, duplicate detection, and target coverage fail the suite when broken. |
| A bug fix reproduces first. | The old behavior fails before the change and the new test fails without the fix. If a visual bug cannot be tested, the browser evidence is stated. |
| Tests stay off the network. | No test fetches a vendor page, theme repository, or remote font. Fixtures are local. |
| Build checks are exhaustive. | Run `pnpm astro check`, `pnpm test`, and `pnpm build`. Check page count, sitemap count, and duplicate titles/descriptions after route or target changes. |
| UI changes are seen. | Open the actual built page in a browser. Exercise the control; do not rely on reading the diff. Check a desktop width and 390px. |
| Unverified is stated. | If an app is not installed, a platform is unavailable, or an official screenshot cannot be found, say which part was not verified. |

## SEO and GEO checks

For a route-generating change, verify:

- one canonical URL per page, self-referencing for terminal variants
- English and Chinese alternates resolve
- titles are unique and human-readable; descriptions are unique and under 160 characters
- `HowTo`, `FAQPage`, `ItemList`, and `BreadcrumbList` match the visible copy
- `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt` include new pages
- JSON endpoints keep stable paths and correct content types

## Commits

- Subject names the area and the user-visible result.
- Body records the commands run, browser checks, and anything not verified.
- One target or one visual surface per commit when adding or redesigning terminal content.
- Never commit generated `dist/` files.
