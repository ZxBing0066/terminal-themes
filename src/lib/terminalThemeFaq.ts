import type { Target } from "../data/targets";
import type { Locale } from "../i18n/ui";
import { contrastRatio } from "./data";
import type { Theme } from "./schema";
import type { QA } from "./targetFaq";

export function terminalThemeFaqs(theme: Theme, target: Target, locale: Locale): QA[] {
  const steps = target.install[locale];
  const first = steps[0] ?? "";
  const second = steps[1] ?? "";
  const last = steps[steps.length - 1] ?? "";
  const ratio = contrastRatio(theme).toFixed(1);
  const formats: Record<string, string> = {
    "herdr-app": "JSON",
    "windows-terminal": "JSON color scheme",
    iterm2: ".itermcolors",
    wezterm: "Lua color table",
    warp: "Warp YAML theme",
    rio: "Rio TOML theme",
    foot: "foot INI theme",
    hyper: "Hyper plugin",
  };
  const format = formats[target.slug] ?? "configuration file";

  if (locale === "zh") {
    return [
      {
        question: `${theme.name} 的 ${target.name} 主题文件放在哪里？`,
        answer: `${first} ${second}`,
      },
      {
        question: `如何在 ${target.name} 中安装 ${theme.name}？`,
        answer: `下载本站生成的 ${theme.name} ${format}，按页面中的一行安装命令放入 ${target.name} 的配置位置；完成后${last}`,
      },
      {
        question: `${theme.name} 在 ${target.name} 中会改变颜色吗？`,
        answer: `不会。它使用背景 ${theme.palette.background}、前景 ${theme.palette.foreground} 和完整的 16 色 ANSI 调色板，正文对比度为 ${ratio}:1；只改变 ${target.name} 需要的文件格式。`,
      },
      {
        question: `${theme.name} 还能用于其他终端吗？`,
        answer: "可以。同一份调色板可以导出到本站支持的每个终端；每个版本只改变安装路径和文件格式。",
      },
    ];
  }

  return [
    {
      question: `Where does the ${theme.name} theme go in ${target.name}?`,
      answer: `${first} ${second}`,
    },
    {
      question: `How do I install ${theme.name} in ${target.name}?`,
      answer: `Download the ${theme.name} ${format} from this page, run the one-line install command, or place the file in the ${target.name} location above.${last ? ` ${last}` : ""}`,
    },
    {
      question: `Does ${theme.name} keep its colors in ${target.name}?`,
      answer: `Yes. It uses ${theme.palette.background} for the background, ${theme.palette.foreground} for the foreground, and the full 16-color ANSI palette, with ${ratio}:1 body contrast. Only the ${target.name} file format changes.`,
    },
    {
      question: `Can I use ${theme.name} in another terminal?`,
      answer: "Yes. The same palette exports to every terminal listed on this site; only the install path and file format change.",
    },
  ];
}
