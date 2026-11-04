import type { Locale } from "../i18n/ui";

export interface QA {
  question: string;
  answer: string;
}

export function editorFaqs(locale: Locale): QA[] {
  if (locale === "zh") {
    return [
      {
        question: "终端主题编辑器是免费的吗？",
        answer:
          "是。编辑器在浏览器本地运行，不需要账号，也不会把调色板上传到服务器。",
      },
      {
        question: "可以导出哪些格式？",
        answer:
          "Herdr App JSON、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 六种格式。每种格式都使用同一份 16 色 ANSI 调色板。",
      },
      {
        question: "我的调色板会被上传吗？",
        answer:
          "不会。颜色计算、预览和导出都在浏览器里完成；分享链接只把调色板状态放在 URL hash 中。",
      },
      {
        question: "如何把作品提交到目录？",
        answer:
          "填好 family、slug 和名称后点击 Submit。编辑器会把完整的主题 JSON 放进 GitHub 新建文件页的 value 参数；检查后提交 PR，CI 会校验 schema、重复颜色和构建。",
      },
    ];
  }
  return [
    {
      question: "Is the terminal theme editor free?",
      answer:
        "Yes. The editor runs locally in your browser, requires no account, and does not upload your palette to a server.",
    },
    {
      question: "Which formats can I export?",
      answer:
        "Herdr App JSON, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal. Every format uses the same 16-color ANSI palette.",
    },
    {
      question: "Is my palette uploaded anywhere?",
      answer:
        "No. Color math, previews, and exports happen in the browser. A share link only puts the palette state in the URL hash.",
    },
    {
      question: "How do I submit a theme to the catalog?",
      answer:
        "Fill in family, slug, and name, then press Submit. The editor puts the full theme JSON into the new-file value parameter on GitHub; review it, open a pull request, and CI validates the schema, duplicate colors, and build.",
    },
  ];
}
