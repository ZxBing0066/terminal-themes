import type { Locale } from "../i18n/ui";

export interface FaqItem {
  question: { en: string; zh: string };
  answer: { en: string; zh: string };
}

export const faqs: FaqItem[] = [
  {
    question: {
      en: "What is a terminal color scheme?",
      zh: "什么是终端配色方案？",
    },
    answer: {
      en: "A terminal color scheme is a named set of colors for the background, foreground, cursor, selection, and the sixteen ANSI slots that command-line programs use for red, green, blue, and other roles.",
      zh: "终端配色方案是一组命名的颜色，包含背景、前景、光标、选区和 16 个 ANSI 颜色位；命令行程序通过颜色位使用红、绿、蓝等角色。",
    },
  },
  {
    question: {
      en: "Does one theme work in the Herdr app and other terminals?",
      zh: "同一个主题能用于 Herdr App 和其他终端吗？",
    },
    answer: {
      en: "The catalog stores each palette once, then exports native formats for the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal. Colors stay the same; only the file format changes.",
      zh: "目录只保存一份调色板，再导出 Herdr App、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 的原生格式。颜色保持一致，只改变文件格式。",
    },
  },
  {
    question: {
      en: "Are these terminal themes free to use?",
      zh: "这些终端主题可以免费使用吗？",
    },
    answer: {
      en: "Site code is MIT-licensed. Each palette keeps its upstream license, and every theme page lists the author, source, and license before you download it.",
      zh: "站点代码使用 MIT 许可。每个调色板保留其上游许可，主题页会在下载前列出作者、来源和许可。",
    },
  },
];

export function faqFor(locale: Locale): { question: string; answer: string }[] {
  return faqs.map((item) => ({ question: item.question[locale], answer: item.answer[locale] }));
}
