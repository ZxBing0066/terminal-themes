# 如何给 Herdr App 换主题

Herdr App 会从 `~/.config/herdr-app/themes/` 读取每个主题的 JSON 文件。一个主题最少只需要五个字段：背景、前景、选区、光标，以及 16 个 ANSI 颜色。应用会从这些值推导面板颜色。

## 1. 保存主题文件

新建 `~/.config/herdr-app/themes/my-theme.json`：

```json
{
  "background": "#1e1e2e",
  "foreground": "#cdd6f4",
  "selection": "#585b70",
  "cursor": "#cdd6f4",
  "ansi": [
    "#45475a", "#f38ba8", "#a6e3a1", "#f9e2af",
    "#89b4fa", "#f5c2e7", "#94e2d5", "#a6adc8",
    "#585b70", "#f37799", "#89d88b", "#ebd391",
    "#74a8fc", "#f2aede", "#6bd7ca", "#bac2de"
  ]
}
```

文件名就是主题名。`my-theme.json` 会在主题选择器里显示为 `my-theme`。

## 2. 在应用里选择

打开 Herdr → 设置 → 主题，选择该文件。主题会应用到窗口界面和新开的终端面板。

## 3. 设为默认主题

在 `~/.config/herdr-app/settings.json` 中设置：

```json
{
  "theme": { "light": "paper", "dark": "my-theme" }
}
```

如果不需要跟随浅色/深色切换，也可以直接写一个字符串。

## 覆盖界面颜色

五个字段已经够用，但应用还接受 `colors` 块来覆盖推导出的面板颜色：`canvas`、`chrome`、`surface`、`popover`、`raised`、`hover`、`selected`、`border`、`input`、`foreground`、`muted`、`dim`、`accent`、`accent_foreground`、`solid`、`solid_foreground`、`selection`、`working`、`blocked`、`done`、`idle` 和 `unknown`。

本站的每个主题都包含完整 `colors` 块，因此预览与应用效果一致。

## Herdr App 与 Herdr TUI 的区别

Herdr TUI 是另一个终端应用，通过 `~/.config/herdr/config.toml` 配置。它的 `[theme.custom]` 键不会加载到桌面应用，这个 JSON 文件也不会加载到 TUI。
