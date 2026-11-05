import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Target } from "../data/targets";
import { contrast } from "./color";
import { familySchema, themeSchema, type Family, type Theme } from "./schema";

export type Locale = "en" | "zh";

const ROOT = join(process.cwd(), "themes");

function readJson(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`cannot read ${path}: ${(error as Error).message}`);
  }
}

let cache: { themes: Theme[]; families: Family[] } | undefined;

function load() {
  if (cache) return cache;
  const themes: Theme[] = [];
  const families: Family[] = [];

  for (const entry of readdirSync(ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const familyDir = join(ROOT, entry.name);
    const familyPath = join(familyDir, "family.json");
    const family = familySchema.parse(readJson(familyPath));
    if (family.id !== entry.name) {
      throw new Error(`${familyPath}: family id must match directory`);
    }
    families.push(family);

    for (const file of readdirSync(familyDir)) {
      if (!file.endsWith(".json") || file === "family.json") continue;
      const path = join(familyDir, file);
      const theme = themeSchema.parse(readJson(path));
      const expected = `${entry.name}/${file.replace(/\.json$/, "")}`;
      if (theme.id !== expected) {
        throw new Error(`${path}: id ${theme.id} must equal ${expected}`);
      }
      themes.push(theme);
    }
  }

  themes.sort((a, b) => a.name.localeCompare(b.name));
  families.sort((a, b) => a.name.localeCompare(b.name));
  cache = { themes, families };
  return cache;
}

export function allThemes(): Theme[] {
  return load().themes;
}

export function allFamilies(): Family[] {
  return load().families;
}

export function getTheme(family: string, slug: string): Theme | undefined {
  return allThemes().find((theme) => theme.family === family && theme.slug === slug);
}

export function getFamily(id: string): Family | undefined {
  return allFamilies().find((family) => family.id === id);
}

export function themesOf(family: string): Theme[] {
  return allThemes().filter((theme) => theme.family === family);
}

export function contrastRatio(theme: Theme): number {
  return contrast(theme.palette.foreground, theme.palette.background);
}

export function generatedDescription(theme: Theme, locale: Locale): string {
  const override = theme.description?.[locale];
  if (override) return override;
  const ratio = contrastRatio(theme).toFixed(1);
  if (locale === "zh") {
    const appearance = theme.appearance === "dark" ? "深色" : "浅色";
    return `${theme.name} 是一套${appearance}终端主题，背景色 ${theme.palette.background}，正文对比度 ${ratio}:1。它包含完整的 16 色 ANSI 调色板，可导出到 Herdr App、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal。`;
  }
  return `${theme.name} is a ${theme.appearance} terminal theme with a ${theme.palette.background} background and ${ratio}:1 body contrast. It ships a full 16-color ANSI palette and exports to the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.`;
}

export function terminalThemeDescription(theme: Theme, target: Target, locale: Locale): string {
  const ratio = contrastRatio(theme).toFixed(1);
  const first = target.install[locale][0] ?? "";
  const second = target.install[locale][1] ?? "";
  if (locale === "zh") {
    return `${theme.name} 的 ${target.name} 版本：背景 ${theme.palette.background}，正文对比度 ${ratio}:1，包含完整 16 色 ANSI。${first} ${second} 同一份调色板也可导出到其他终端。`;
  }
  return `${theme.name} for ${target.name}: ${theme.palette.background} background, ${ratio}:1 body contrast, and the full 16-color ANSI palette. ${first} ${second} The same palette also exports to the other supported terminals.`;
}

export function terminalThemeMetaDescription(theme: Theme, target: Target, locale: Locale): string {
  const ratio = contrastRatio(theme).toFixed(1);
  if (locale === "zh") {
    return `${theme.name} 的 ${target.name} 主题：背景 ${theme.palette.background}，正文对比度 ${ratio}:1，含 16 色 ANSI 和安装命令。`;
  }
  return `${theme.name} for ${target.name}: ${theme.palette.background} background, ${ratio}:1 contrast, 16 ANSI colors, install file, and one-line command.`;
}

export function themeMetaDescription(theme: Theme, locale: Locale): string {
  const ratio = contrastRatio(theme).toFixed(1);
  const appearance = theme.appearance === "dark" ? (locale === "zh" ? "深色" : "dark") : (locale === "zh" ? "浅色" : "light");
  if (locale === "zh") {
    return `${theme.name}：${appearance}终端主题，背景 ${theme.palette.background}，对比度 ${ratio}:1，含 16 色 ANSI，支持六种终端导出。`;
  }
  return `${theme.name}: ${appearance} terminal theme, ${theme.palette.background} background, ${ratio}:1 contrast, 16 ANSI colors, six terminal exports.`;
}

export function familyDescription(family: Family, locale: Locale): string {
  const override = family.description?.[locale];
  if (override) return override;
  const count = themesOf(family.id).length;
  if (locale === "zh") {
    return `${family.name} 家族收录 ${count} 个终端配色变体，提供 Herdr App、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 配置。`;
  }
  return `${family.name} has ${count} cataloged terminal color ${count === 1 ? "variant" : "variants"}, with ports for the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.`;
}

export function familyStats(family: Family) {
  const themes = themesOf(family.id);
  return {
    count: themes.length,
    dark: themes.filter((theme) => theme.appearance === "dark").length,
    light: themes.filter((theme) => theme.appearance === "light").length,
  };
}
