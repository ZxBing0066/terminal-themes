import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import type { Locale } from "../i18n/ui";

export interface Guide {
  slug: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  order: number;
  updatedAt: string;
}

export const guides: Guide[] = [
  {
    slug: "how-to-theme-herdr-app",
    title: {
      en: "How to theme the Herdr app",
      zh: "如何给 Herdr App 换主题",
    },
    description: {
      en: "Install a Herdr app JSON theme, verify the 22 UI tokens, and set light and dark defaults without editing the TUI config.",
      zh: "安装 Herdr App 的 JSON 主题，检查 22 个界面 token，并在不改 TUI 配置的情况下设置浅色和深色默认主题。",
    },
    order: 1,
    updatedAt: "2026-11-03",
  },
  {
    slug: "herdr-app-theme-tokens",
    title: {
      en: "Herdr app theme tokens explained",
      zh: "Herdr App 主题 token 说明",
    },
    description: {
      en: "What the 22 Herdr app theme tokens control, how the app derives panel colors, and when to override them in JSON.",
      zh: "Herdr App 主题的 22 个 token 分别控制什么、应用如何推导面板颜色，以及何时在 JSON 中覆盖。",
    },
    order: 2,
    updatedAt: "2026-11-03",
  },
  {
    slug: "create-and-submit-a-theme",
    title: {
      en: "Create and submit a terminal theme",
      zh: "制作并提交终端主题",
    },
    description: {
      en: "Use the editor, validate the ANSI palette and contrast, then open a pull request that passes schema and build CI.",
      zh: "用编辑器调整 ANSI 调色板与对比度，校验后提交能通过 schema 和构建 CI 的拉取请求。",
    },
    order: 3,
    updatedAt: "2026-11-03",
  },
  {
    slug: "ansi-16-colors",
    title: {
      en: "ANSI 16 colors explained",
      zh: "ANSI 16 色说明",
    },
    description: {
      en: "Why terminals use sixteen ANSI slots, what each color controls, and how bright variants differ from the base row.",
      zh: "终端为什么使用 16 个 ANSI 颜色位、每个颜色控制什么，以及亮色变体与基础行有何区别。",
    },
    order: 4,
    updatedAt: "2026-11-03",
  },
  {
    slug: "terminal-theme-contrast",
    title: {
      en: "Contrast and readability for terminal themes",
      zh: "终端主题的对比度与可读性",
    },
    description: {
      en: "How WCAG contrast ratios apply to terminal text, which pairs to check, and the ratios to target before publishing.",
      zh: "WCAG 对比度如何应用到终端文本、需要检查哪些颜色组合，以及发布前应达到的比值。",
    },
    order: 5,
    updatedAt: "2026-11-03",
  },
  {
    slug: "install-terminal-themes",
    title: {
      en: "Install a theme in any terminal",
      zh: "在任意终端安装主题",
    },
    description: {
      en: "File formats, config paths, and reload steps for Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.",
      zh: "Herdr App、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 的文件格式、配置路径与重载步骤。",
    },
    order: 6,
    updatedAt: "2026-11-03",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function readGuide(locale: Locale, slug: string): { html: string; usedLocale: Locale } {
  const primary = join(process.cwd(), "src/content/guides", locale, `${slug}.md`);
  const fallback = join(process.cwd(), "src/content/guides/en", `${slug}.md`);
  const path = existsSync(primary) ? primary : fallback;
  if (!existsSync(path)) throw new Error(`missing guide content: ${path}`);
  const markdown = readFileSync(path, "utf8").replace(/^#\s+.*(?:\r?\n)+/, "");
  return { html: marked.parse(markdown, { async: false }), usedLocale: path === primary ? locale : "en" };
}
