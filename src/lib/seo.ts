import { t } from "../i18n/ui";
import {
  allThemes,
  familyDescription,
  generatedDescription,
  themesOf,
} from "./data";
import { absoluteUrl, alternatesFor, type Page } from "./routes";

const SITE = "Terminal Themes";

function brand(locale: "en" | "zh"): string {
  return locale === "zh" ? "终端主题" : SITE;
}

export function titleFor(page: Page): string {
  const locale = page.locale;
  switch (page.kind) {
    case "home":
      return page.locale === "zh"
        ? "终端主题 — 为 Herdr App、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 提供配色"
        : `${SITE} — Color schemes for the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal`;
    case "catalog":
      return `${t(locale, "catalog.title")} — ${brand(locale)}`;
    case "family":
      return `${page.family.name} ${t(locale, "family.title")} — ${brand(locale)}`;
    case "theme":
      return locale === "zh"
        ? `${page.theme.name} — Herdr App、Ghostty、Alacritty 终端配色方案 — 终端主题`
        : `${page.theme.name} — Terminal Color Scheme for Herdr App, Ghostty, Alacritty — ${SITE}`;
    case "target":
      return `${page.target.title[locale]} — ${brand(locale)}`;
    case "guide":
      return `${page.guide.title[locale]} — ${brand(locale)}`;
    case "guideIndex":
      return `${t(locale, "guide.indexTitle")} — ${brand(locale)}`;
    case "static": {
      const names: Record<string, string> = {
        editor: t(locale, "editor.title"),
        contribute: t(locale, "nav.contribute"),
        about: locale === "zh" ? "关于" : "About",
        license: t(locale, "footer.license"),
        privacy: t(locale, "footer.privacy"),
        changelog: t(locale, "footer.changelog"),
        search: t(locale, "nav.search"),
      };
      return `${names[page.slug]} — ${brand(locale)}`;
    }
  }
}

export function descriptionFor(page: Page): string {
  const locale = page.locale;
  switch (page.kind) {
    case "home":
      return t(locale, "home.description");
    case "catalog":
      return t(locale, "catalog.description");
    case "family":
      return familyDescription(page.family, locale);
    case "theme":
      return generatedDescription(page.theme, locale);
    case "target":
      return page.target.description[locale];
    case "guide":
      return page.guide.description[locale];
    case "guideIndex":
      return t(locale, "guide.indexDescription");
    case "static":
      return page.slug === "editor" ? t(locale, "editor.description") : t(locale, "site.tagline");
  }
}

export function ogImageFor(page: Page): string {
  if (page.kind === "theme") {
    return absoluteUrl(`og/${page.locale}/${page.theme.family}-${page.theme.slug}.png`);
  }
  return absoluteUrl(`og/${page.locale}/default.png`);
}

export function breadcrumbFor(page: Page) {
  const items = [{ name: t(page.locale, "common.home"), url: absoluteUrl("") }];
  const bare = page.path.replace(/^zh\/?/, "");

  if (page.kind === "theme") {
    items.push({ name: t(page.locale, "nav.themes"), url: absoluteUrl(page.locale === "zh" ? "zh/themes" : "themes") });
    items.push({
      name: page.theme.name,
      url: absoluteUrl(page.path),
    });
  } else if (page.kind === "family") {
    items.push({ name: t(page.locale, "nav.themes"), url: absoluteUrl(page.locale === "zh" ? "zh/themes" : "themes") });
    items.push({ name: page.family.name, url: absoluteUrl(page.path) });
  } else if (page.kind === "guide") {
    items.push({ name: t(page.locale, "nav.guides"), url: absoluteUrl(page.locale === "zh" ? "zh/guides" : "guides") });
    items.push({ name: page.guide.title[page.locale], url: absoluteUrl(page.path) });
  } else if (page.kind === "target") {
    items.push({ name: page.target.title[page.locale], url: absoluteUrl(page.path) });
  } else if (bare) {
    items.push({ name: titleFor(page).split(" — ")[0], url: absoluteUrl(page.path) });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jsonLdFor(page: Page): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [];
  const canonical = absoluteUrl(page.path);

  if (page.kind === "home") {
    graph.push({
      "@type": "WebSite",
      "@id": `${canonical}#website`,
      url: canonical,
      name: t(page.locale, "site.name"),
      description: descriptionFor(page),
      inLanguage: page.locale,
    });
    graph.push({
      "@type": "Organization",
      "@id": "https://iwwi.app/#organization",
      name: "iwwi",
      url: "https://iwwi.app/",
    });
  }

  if (page.kind === "theme") {
    graph.push({
      "@type": "CreativeWork",
      name: page.theme.name,
      url: canonical,
      description: descriptionFor(page),
      inLanguage: page.locale,
      keywords: page.theme.tags.join(", "),
      license: page.theme.source.licenseUrl ?? page.theme.source.license,
      creator: { "@type": "Organization", name: page.theme.source.author },
      isBasedOn: page.theme.source.upstream,
      dateModified: page.theme.meta.updatedAt,
      about: "terminal color scheme",
    });
  }

  if (page.kind === "catalog" || page.kind === "family" || page.kind === "target") {
    const themes = page.kind === "family" ? themesOf(page.family.id) : allThemes();
    graph.push({
      "@type": "ItemList",
      name: titleFor(page),
      numberOfItems: themes.length,
      itemListElement: themes.map((theme, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: theme.name,
        url: absoluteUrl(`themes/${theme.family}/${theme.slug}`),
      })),
    });
  }

  if (page.kind === "guide") {
    graph.push({
      "@type": "HowTo",
      name: page.guide.title[page.locale],
      description: page.guide.description[page.locale],
      inLanguage: page.locale,
    });
  }

  graph.push(breadcrumbFor(page));

  return { "@context": "https://schema.org", "@graph": graph };
}

export function headFor(page: Page) {
  const alternates = alternatesFor(page);
  return {
    title: titleFor(page),
    description: descriptionFor(page),
    canonical: absoluteUrl(page.path),
    en: absoluteUrl(alternates.en),
    zh: absoluteUrl(alternates.zh),
    image: ogImageFor(page),
  };
}
