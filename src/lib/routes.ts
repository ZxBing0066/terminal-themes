import { targets, type Target } from "../data/targets";
import type { Locale } from "../i18n/ui";
import { allFamilies, allThemes } from "./data";
import type { Family, Theme } from "./schema";
import { guides, type Guide } from "./guides";

export type StaticSlug =
  | "editor"
  | "contribute"
  | "about"
  | "license"
  | "privacy"
  | "changelog"
  | "search";

interface BasePage {
  locale: Locale;
  path: string;
}

export type Page =
  | (BasePage & { kind: "home" })
  | (BasePage & { kind: "catalog" })
  | (BasePage & { kind: "terminals" })
  | (BasePage & { kind: "family"; family: Family })
  | (BasePage & { kind: "theme"; theme: Theme })
  | (BasePage & { kind: "themeVariant"; theme: Theme; target: Target })
  | (BasePage & { kind: "target"; target: Target })
  | (BasePage & { kind: "guide"; guide: Guide })
  | (BasePage & { kind: "guideIndex" })
  | (BasePage & { kind: "static"; slug: StaticSlug });

const STATIC_SLUGS: StaticSlug[] = [
  "editor",
  "contribute",
  "about",
  "license",
  "privacy",
  "changelog",
  "search",
];

export function localized(locale: Locale, bare: string): string {
  if (locale === "en") return bare;
  return bare ? `zh/${bare}` : "zh";
}

export function localizedHref(locale: Locale, bare: string): string {
  const path = localized(locale, bare);
  return `/${path}${path ? "/" : ""}`;
}

export function themePath(theme: Theme): string {
  return `themes/${theme.family}/${theme.slug}`;
}

export function terminalThemePath(theme: Theme, target: Target | string): string {
  const slug = typeof target === "string" ? target : target.slug;
  return `${slug}/themes/${theme.family}/${theme.slug}`;
}

export function stripLocale(path: string): string {
  return path === "zh" ? "" : path.replace(/^zh\//, "");
}

export function alternatesFor(page: Page): { en: string; zh: string } {
  const bare = stripLocale(page.path);
  return { en: bare, zh: bare ? `zh/${bare}` : "zh" };
}

export function canonicalPath(page: Page): string {
  return page.path ? `${page.path}/` : "";
}

export function absoluteUrl(path: string): string {
  const base = "https://terminalthemes.iwwi.app";
  return `${base}/${path ? `${path}/` : ""}`;
}

export function absoluteFileUrl(path: string): string {
  return `https://terminalthemes.iwwi.app/${path.replace(/^\/+/, "")}`;
}

export function buildRoutes(): Page[] {
  const pages: Page[] = [];
  const themes = allThemes();
  const families = allFamilies();

  for (const locale of ["en", "zh"] as const) {
    pages.push({ kind: "home", locale, path: localized(locale, "") });
    pages.push({ kind: "catalog", locale, path: localized(locale, "themes") });
    pages.push({ kind: "terminals", locale, path: localized(locale, "terminals") });
    pages.push({ kind: "guideIndex", locale, path: localized(locale, "guides") });

    for (const family of families) {
      pages.push({ kind: "family", locale, path: localized(locale, `themes/${family.id}`), family });
    }
    for (const theme of themes) {
      pages.push({
        kind: "theme",
        locale,
        path: localized(locale, themePath(theme)),
        theme,
      });
      for (const target of targets) {
        pages.push({
          kind: "themeVariant",
          locale,
          path: localized(locale, terminalThemePath(theme, target)),
          theme,
          target,
        });
      }
    }
    for (const target of targets) {
      pages.push({ kind: "target", locale, path: localized(locale, target.slug), target });
    }
    for (const guide of guides) {
      pages.push({ kind: "guide", locale, path: localized(locale, `guides/${guide.slug}`), guide });
    }
    for (const slug of STATIC_SLUGS) {
      pages.push({ kind: "static", locale, path: localized(locale, slug), slug });
    }
  }

  return pages;
}
