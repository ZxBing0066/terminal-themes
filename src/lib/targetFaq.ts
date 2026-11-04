import type { Target } from "../data/targets";
import type { Locale } from "../i18n/ui";

export interface QA {
  question: string;
  answer: string;
}

export function targetFaqs(target: Target, locale: Locale): QA[] {
  const steps = target.install[locale];
  const first = steps[0] ?? "";
  const second = steps[1] ?? "";
  const last = steps[steps.length - 1] ?? "";
  if (locale === "zh") {
    return [
      {
        question: `${target.name} 的主题文件放在哪里？`,
        answer: `${first} ${second}`,
      },
      {
        question: `换主题后需要重启 ${target.name} 吗？`,
        answer: `${last} 如果颜色没有变化，重新打开应用或新建一个终端窗口。`,
      },
      {
        question: `同一个 ${target.name} 主题能用于其他终端吗？`,
        answer:
          "可以。每个调色板只保存一次，再导出为 Herdr App、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 的原生格式；16 色 ANSI 不变，只改变文件格式。",
      },
      {
        question: `这些 ${target.name} 主题可以免费使用吗？`,
        answer:
          "可以。站点代码使用 MIT 许可；每个调色板保留其上游许可，主题页会在下载前列出作者、来源和许可。",
      },
    ];
  }
  return [
    {
      question: `Where do ${target.name} themes go?`,
      answer: `${first} ${second}`,
    },
    {
      question: `Do I need to restart ${target.name} after changing a theme?`,
      answer: `${last} If the colors do not change, reopen the app or start a new terminal window.`,
    },
    {
      question: `Can I use the same ${target.name} theme in another terminal?`,
      answer:
        "Yes. Each palette is stored once and exported natively for Herdr App, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal. The 16 ANSI colors stay the same; only the file format changes.",
    },
    {
      question: `Are these ${target.name} themes free to use?`,
      answer:
        "Yes. Site code is MIT-licensed. Each palette keeps its upstream license; the theme page lists the author, source, and license before you download it.",
    },
  ];
}
