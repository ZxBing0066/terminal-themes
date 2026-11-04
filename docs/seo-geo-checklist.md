# SEO & GEO checklist

Scope: every indexable page plus machine-readable endpoints. The site is static,
so all essential content must exist in the HTML before JavaScript runs.

## 1. Crawlability and indexing

- [x] `robots.txt` allows the site and points at the absolute sitemap URL.
- [x] Sitemap contains every canonical page, both locales, and no `noindex` URLs.
- [x] Sitemap `lastmod` is ISO-8601 and meaningful (theme update date, not only build date).
- [x] Every indexable page has a self-referencing canonical URL.
- [x] `hreflang` en/zh/x-default are reciprocal and absolute.
- [x] No unintended `noindex`; the internal search page is excluded deliberately.
- [x] Trailing-slash policy is consistent: canonical, sitemap, internal links, and `og:url` agree.
- [x] Custom 404 returns the 404 page and useful navigation.
- [x] No orphan pages: every page is reachable from the catalog, a hub, or the footer.

## 2. Titles, descriptions, and headings

- [x] One unique `<title>` per page; target ≤60 characters and include the primary entity.
- [x] One unique meta description per page; target 120–155 characters with a concrete benefit.
- [x] Exactly one `<h1>`; heading hierarchy descends without skipped levels.
- [x] Descriptions are written for humans, not keyword lists; no duplicated boilerplate.
- [x] Pagination/filter states do not create duplicate indexable URLs.

## 3. Structured data (JSON-LD)

- [x] JSON-LD parses on every page and uses absolute URLs.
- [x] Home: `WebSite` + `Organization` with `url`, `name`, `logo`, and `sameAs`.
- [x] Every page: valid `BreadcrumbList` whose last item is the current page.
- [x] Catalog/family/target: `ItemList` with stable positions and canonical item URLs.
- [x] Theme: `CreativeWork` with `name`, `url`, `description`, `image`, `datePublished`/`dateModified`, `license`, `creator`, and `isBasedOn` where known.
- [x] Guides: `Article`/`TechArticle` with `headline`, `description`, `image`, `author`, `publisher`, `datePublished`/`dateModified`, and `mainEntityOfPage`; do not emit `HowTo` without real steps.
- [x] Target install hubs: `HowTo` only when the visible steps and schema steps match.
- [x] FAQ schema only for visible Q&A, and answers are complete without JavaScript.
- [x] No structured-data claims that are absent from the visible page.
- [x] Every page has a `WebPage` node with author, publisher, `dateModified`, and canonical URL.
- [x] Target pages add `FAQPage` and keep `HowTo` steps in sync with visible install steps.
- [x] The editor adds `WebApplication` and `FAQPage` data.

## 4. Social and sharing

- [x] `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:image` on every page.
- [x] `og:image` is 1200×630, absolute, and has `og:image:alt`.
- [x] `twitter:card=summary_large_image` plus title, description, and image.
- [x] `og:locale` and `og:locale:alternate` match the page language.
- [x] Theme pages expose article freshness (`article:modified_time` where applicable).

## 5. International SEO

- [x] `<html lang>` is `en` or `zh-CN`.
- [x] Titles, descriptions, headings, and body copy are localized, not machine-fallback English unless explicitly disclosed.
- [x] Internal links stay inside the current locale.
- [x] Locale switch points at the equivalent page, not the home page.
- [x] Chinese pages are not accidentally canonicalized to English.

## 6. GEO / AI answer readiness

- [x] The first screen answers: what this is, who it is for, and what the user can do.
- [x] Key entities are named explicitly: terminal color scheme, ANSI 16 colors, Herdr app, each terminal target.
- [x] Each theme page states its source, author, license, and update date.
- [x] Facts are extractable: palette table, contrast ratios, token table, install commands.
- [x] Definitions and comparisons are in HTML tables/lists, not images.
- [x] Stable machine endpoints: per-theme JSON, catalog JSON, `llms.txt`, `llms-full.txt`.
- [x] `llms.txt` links canonical pages and explains citation/source rules.
- [x] Dates are visible and machine-readable for freshness.
- [x] No critical content requires client-side JavaScript.

## 7. Content quality and links

- [x] Each page has a distinct search intent; no near-duplicate thin pages.
- [x] Theme pages link to family, related themes, target hubs, editor, and source.
- [x] Guides link to the relevant theme/target/editor pages.
- [x] Images have descriptive `alt` text; decorative images are ignored by assistive tech.
- [x] Outbound source links are valid and use `rel` where appropriate.
- [x] The changelog records meaningful updates.
- [x] Long prose pages place a heading at least every 120–180 words; code blocks and editor control labels are excluded from prose sizing.

## 8. Performance, accessibility, and mobile

- [x] Visible maintainer, last-reviewed date, source/license, and methodology links appear on target, editor, theme, guide, and About pages.
- [x] About documents verification and corrections with an issue-reporting path.
- [x] Static HTML is the primary render path.
- [x] Lighthouse Accessibility, Best Practices, and SEO are 100 on representative pages.
- [x] No horizontal overflow at 390 px.
- [x] Interactive controls have accessible names and ≥24 px touch targets.
- [x] Images reserve width/height and lazy-load below the fold.
- [x] `prefers-reduced-motion` disables non-essential animation.

## Page audit matrix

| Page type | Canonical | Hreflang | JSON-LD | Unique title/desc | H1 | OG image | Internal links |
|---|---|---|---|---|---|---|---|
| Home | pass | pass | WebSite + Organization + FAQPage | pass | pass | pass | pass |
| Themes index | pass | pass | ItemList | pass | pass | pass | pass |
| Family (36×2) | pass | pass | ItemList | pass | pass | pass | pass |
| Theme (112×2) | pass | pass | CreativeWork | pass | pass | pass | pass |
| Target (6×2) | pass | pass | ItemList + HowTo | pass | pass | pass | pass |
| Guide index | pass | pass | BreadcrumbList | pass | pass | pass | pass |
| Guide (6×2) | pass | pass | Article | pass | pass | pass | pass |
| Editor | pass | pass | BreadcrumbList | pass | pass | pass | pass |
| Contribute / About / License / Privacy / Changelog | pass | pass | BreadcrumbList | pass | pass | pass | pass |
| Search (en/zh) | n/a | n/a | BreadcrumbList | pass | pass | pass | n/a |
| 404 | n/a | n/a | none | n/a | pass | n/a | pass |

Search and 404 are deliberately `noindex`; they are excluded from canonical/hreflang/OG checks and from the sitemap.

## Audit run: 2026-11-04

Built output audited: **341 HTML pages**, **338 indexable**, **3 noindex** (404 + en/zh search).
Sitemap: **338 URLs**, all resolve, none noindex. Internal links: **0 broken**, **0 missing anchors**.

Fixed in this pass:

- Guides emitted a second H1 from the Markdown title; the leading H1 is now stripped before rendering.
- Guides used `HowTo` without steps; replaced with `Article` including image, author, publisher, dates, and `mainEntityOfPage`.
- Target hubs now emit valid `HowTo` steps that mirror the visible install steps.
- Theme `CreativeWork` now includes `image`, `datePublished`, `dateModified`, and `mainEntityOfPage`.
- Home `Organization` gained a logo and `sameAs`; `WebSite` gained a publisher reference.
- Home now has three visible FAQs and matching `FAQPage` structured data.
- Chinese home breadcrumb pointed at the English URL; it now points at `/zh/`.
- Static pages shared one boilerplate description; each now has a unique description.
- Excessive titles (up to 106 chars) and meta descriptions (up to 230 chars) were shortened; the long-tail theme suffix is shortened when the name is long.
- Target pages linked to a nonexistent `/en/themes/`; they now use the locale-aware catalog URL.
- Added `og:image:alt`, `twitter:image:alt`, article timestamps, and explicit `max-image-preview:large` robots directives.
- Catalog filter counts lost contrast at 10px; they now meet 4.5:1.

Final metadata checks:

- Titles >60 chars: **0**; duplicate titles: **0**.
- Descriptions >160 chars: **0**; duplicate descriptions: **0**.
- English descriptions <80 chars: **0**. Chinese descriptions are shorter by design because CJK characters carry more information per character.
- Pages with H1 count ≠ 1: **0**.
- Indexable pages missing canonical: **0**; missing hreflang: **0**; missing OG alt: **0**.
- JSON-LD parse errors: **0**; canonical mismatches: **0**; missing canonical/hreflang on indexable pages: **0**.
- Structured types: WebPage 340, BreadcrumbList 340, CreativeWork 224, ItemList 86, FAQPage 16, HowTo 12, Article 12, Organization 2, WebSite 2, WebApplication 2.
- FAQ: home **3** visible/schema; each target hub **4/4**; editor **4/4**.
- Every `WebPage.mainEntity` resolves to a node in the same graph; static informational pages intentionally omit `mainEntity`.
- Target pages now have intro answers, install steps, FAQ, dark/light catalog groups, and a visible maintainer/reviewed/docs byline.
- Editor now has a static explainer, export/install table, privacy note, submission workflow, FAQ, and `WebApplication` schema.
- Theme pages now have H2/H3 headings for preview, palette, contrast, details, provenance, install, ports, and similar themes.
- About now documents verification and corrections; guides and theme pages show reviewed/updated dates.
- Section sizing: target/editor/theme prose is split by H2/H3; long code blocks and editor UI controls are not counted as prose.
- Lighthouse (home, target hub, editor, theme, catalog, guide): Accessibility, Best Practices, SEO **100**.

Exceptions: the 404 page is `noindex` and intentionally has no canonical/hreflang/OG image; the internal search pages are `noindex` and excluded from the sitemap. Rich-result eligibility was checked structurally, not with Google's live Rich Results Test. Earlier title/description audit is the source of the 112-theme long-tail fix; the current build is clean.

References: Google Search Essentials, Google structured-data policies, schema.org,
and the llms.txt proposal.
