import { t } from "../i18n/ui";
import {
  allThemes,
  familyDescription,
  themeMetaDescription,
  themesOf,
} from "./data";
import { faqFor } from "./faq";
import { absoluteFileUrl, absoluteUrl, alternatesFor, type Page } from "./routes";

const SITE = "Terminal Themes";
const GITHUB = "https://github.com/ZxBing0066/terminal-themes";

function brand(locale: "en" | "zh"): string {
  return locale === "zh" ? "终端主题" : SITE;
}

function languageFor(locale: "en" | "zh"): string {
  return locale === "zh" ? "zh-CN" : "en";
}

export function titleFor(page: Page): string {
  const locale = page.locale;
  switch (page.kind) {
    case "home":
      return page.locale === "zh"
        ? "终端主题 — Herdr App、Ghostty、Alacritty 配色方案"
        : `${SITE} — Herdr App, Ghostty, Alacritty schemes`;
    case "catalog":
      return `${t(locale, "catalog.title")} — ${brand(locale)}`;
    case "family":
      return `${page.family.name} ${t(locale, "family.title")} — ${brand(locale)}`;
    case "theme": {
      const suffix =
        page.theme.name.length > 18
          ? locale === "zh"
            ? "终端主题"
            : "Terminal theme"
          : locale === "zh"
            ? "Herdr App、Ghostty、Alacritty 终端主题"
            : "Herdr App, Ghostty, Alacritty themes";
      return `${page.theme.name} — ${suffix}`;
    }
    case "target":
      return `${page.target.title[locale]} — ${brand(locale)}`;
    case "guide": {
      const base = page.guide.title[locale];
      const suffix = locale === "zh" ? "终端主题" : "Terminal Themes";
      const full = `${base} — ${suffix}`;
      return full.length > 60 ? `${base} — ${locale === "zh" ? "教程" : "Themes"}` : full;
    }
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
      return themeMetaDescription(page.theme, locale);
    case "target":
      return page.target.description[locale];
    case "guide":
      return page.guide.description[locale];
    case "guideIndex":
      return t(locale, "guide.indexDescription");
    case "static": {
      switch (page.slug) {
        case "editor":
          return t(locale, "editor.description");
        case "contribute":
          return t(locale, "contribute.description");
        case "about":
          return t(locale, "about.description");
        case "license":
          return t(locale, "license.description");
        case "privacy":
          return t(locale, "privacy.description");
        case "changelog":
          return t(locale, "changelog.description");
        case "search":
          return t(locale, "search.description");
      }
    }
  }
}

export function ogImageFor(page: Page): string {
  if (page.kind === "theme") {
    return absoluteUrl(`og/${page.locale}/${page.theme.family}-${page.theme.slug}.png`);
  }
  return absoluteUrl(`og/${page.locale}/default.png`);
}

export function breadcrumbFor(page: Page) {
  const items = [
    {
      name: t(page.locale, "common.home"),
      url: absoluteUrl(page.locale === "zh" ? "zh" : ""),
    },
  ];
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
    const orgId = `${absoluteUrl("")}#organization`;
    graph.push({
      "@type": "Organization",
      "@id": orgId,
      name: SITE,
      url: absoluteUrl(""),
      logo: { "@type": "ImageObject", url: absoluteFileUrl("favicon.svg") },
      sameAs: [GITHUB],
      parentOrganization: { "@type": "Organization", name: "iwwi", url: "https://iwwi.app/" },
    });
    graph.push({
      "@type": "WebSite",
      "@id": `${canonical}#website`,
      url: canonical,
      name: t(page.locale, "site.name"),
      description: descriptionFor(page),
      inLanguage: languageFor(page.locale),
      publisher: { "@id": orgId },
    });
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqFor(page.locale).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (page.kind === "theme") {
    graph.push({
      "@type": "CreativeWork",
      name: page.theme.name,
      url: canonical,
      description: descriptionFor(page),
      inLanguage: languageFor(page.locale),
      keywords: page.theme.tags.join(", "),
      image: ogImageFor(page),
      license: page.theme.source.licenseUrl ?? page.theme.source.license,
      creator: { "@type": "Organization", name: page.theme.source.author },
      isBasedOn: page.theme.source.upstream,
      datePublished: page.theme.meta.addedAt,
      dateModified: page.theme.meta.updatedAt,
      mainEntityOfPage: canonical,
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

  if (page.kind === "target") {
    graph.push({
      "@type": "HowTo",
      name: page.target.title[page.locale],
      description: page.target.description[page.locale],
      inLanguage: languageFor(page.locale),
      step: page.target.install[page.locale].map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: text,
        text,
      })),
    });
  }

  if (page.kind === "guide") {
    const publisher = {
      "@type": "Organization",
      name: SITE,
      url: absoluteUrl(""),
      logo: { "@type": "ImageObject", url: absoluteFileUrl("favicon.svg") },
    };
    graph.push({
      "@type": "Article",
      headline: page.guide.title[page.locale],
      description: page.guide.description[page.locale],
      image: ogImageFor(page),
      author: publisher,
      publisher,
      datePublished: page.guide.updatedAt,
      dateModified: page.guide.updatedAt,
      mainEntityOfPage: canonical,
      inLanguage: languageFor(page.locale),
      articleSection: "Guides",
      isAccessibleForFree: true,
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
