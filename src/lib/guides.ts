import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import type { Locale } from "../i18n/ui";

export interface Guide {
  slug: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  order: number;
}

export const guides: Guide[] = [
  {
    slug: "how-to-theme-herdr-app",
    title: {
      en: "How to theme the Herdr app",
      zh: "如何给 Herdr App 换主题",
    },
    description: {
      en: "Install a JSON theme file, pick it in Settings, and make it the light or dark default.",
      zh: "安装 JSON 主题文件，在设置里选择，并把它设为浅色或深色默认主题。",
    },
    order: 1,
  },
  {
    slug: "herdr-app-theme-tokens",
    title: {
      en: "Herdr app theme tokens explained",
      zh: "Herdr App 主题 token 说明",
    },
    description: {
      en: "What the 22 UI colors control, how the app derives them, and when to override them.",
      zh: "22 个界面颜色分别控制什么、应用如何推导它们，以及什么时候需要覆盖。",
    },
    order: 2,
  },
  {
    slug: "create-and-submit-a-theme",
    title: {
      en: "Create and submit a terminal theme",
      zh: "制作并提交终端主题",
    },
    description: {
      en: "Use the editor, validate the palette, and open a pull request that passes CI.",
      zh: "用编辑器制作调色板、校验颜色，并提交能通过 CI 的拉取请求。",
    },
    order: 3,
  },
  {
    slug: "ansi-16-colors",
    title: {
      en: "ANSI 16 colors explained",
      zh: "ANSI 16 色说明",
    },
    description: {
      en: "Why terminal themes have sixteen colors, what each slot is used for, and how bright variants work.",
      zh: "终端主题为什么有 16 个颜色、每个位置做什么，以及亮色变体如何工作。",
    },
    order: 4,
  },
  {
    slug: "terminal-theme-contrast",
    title: {
      en: "Contrast and readability for terminal themes",
      zh: "终端主题的对比度与可读性",
    },
    description: {
      en: "How WCAG contrast ratios map to terminal text, and which ratios to check before publishing.",
      zh: "WCAG 对比度如何对应终端文本，以及发布前应该检查哪些比值。",
    },
    order: 5,
  },
  {
    slug: "install-terminal-themes",
    title: {
      en: "Install a theme in any terminal",
      zh: "在任意终端安装主题",
    },
    description: {
      en: "The file format and install path for Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.",
      zh: "Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 的文件格式与安装路径。",
    },
    order: 6,
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
  const markdown = readFileSync(path, "utf8");
  return { html: marked.parse(markdown, { async: false }), usedLocale: path === primary ? locale : "en" };
}
