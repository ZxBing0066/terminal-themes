export interface HerdrToken {
  token: string;
  en: string;
  zh: string;
}

export const herdrTokens: HerdrToken[] = [
  { token: "canvas", en: "Window canvas behind the sidebar and panes.", zh: "侧栏和终端面板之后的窗口底色。" },
  { token: "chrome", en: "Title bar, tab bar, and status bar.", zh: "标题栏、标签栏和状态栏。" },
  { token: "surface", en: "Sidebar and default panel surface.", zh: "侧栏和默认面板表面。" },
  { token: "popover", en: "Menus, pickers, and floating panels.", zh: "菜单、选择器和浮动面板。" },
  { token: "raised", en: "Raised cards and grouped controls.", zh: "抬升卡片和分组控件。" },
  { token: "hover", en: "Pointer hover background.", zh: "鼠标悬停背景。" },
  { token: "selected", en: "Selected rows and active list items.", zh: "选中行和活动列表项。" },
  { token: "border", en: "Pane borders, separators, and dividers.", zh: "面板边框、分隔线和分割器。" },
  { token: "input", en: "Text inputs and editable fields.", zh: "文本输入框和可编辑字段。" },
  { token: "foreground", en: "Primary text and icons.", zh: "主文本和图标。" },
  { token: "muted", en: "Secondary labels and metadata.", zh: "次级标签和元数据。" },
  { token: "dim", en: "Disabled text and quiet hints.", zh: "禁用文本和弱提示。" },
  { token: "accent", en: "Focus, links, active tab, and highlights.", zh: "焦点、链接、活动标签和高亮。" },
  { token: "accent_foreground", en: "Text on the accent color.", zh: "强调色上的文本。" },
  { token: "solid", en: "Solid accent buttons.", zh: "实心强调按钮。" },
  { token: "solid_foreground", en: "Text on solid accent buttons.", zh: "实心强调按钮上的文本。" },
  { token: "selection", en: "Text selection background.", zh: "文本选区背景。" },
  { token: "working", en: "Agent working status.", zh: "代理工作中状态。" },
  { token: "blocked", en: "Agent blocked or waiting for input.", zh: "代理受阻或等待输入。" },
  { token: "done", en: "Agent finished successfully.", zh: "代理成功完成。" },
  { token: "idle", en: "Agent idle.", zh: "代理空闲。" },
  { token: "unknown", en: "Agent state could not be classified.", zh: "代理状态无法识别。" },
];
