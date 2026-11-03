# Herdr App 主题 token 说明

Herdr App 主题分为两层。

## 第一层：终端调色板

`background`、`foreground`、`selection`、可选的 `cursor`，以及 `ansi` 描述终端本身。`ansi` 必须按以下顺序包含 16 个颜色：

| 索引 | 位置 | 索引 | 位置 |
| --- | --- | --- | --- |
| 0 | black | 8 | bright black |
| 1 | red | 9 | bright red |
| 2 | green | 10 | bright green |
| 3 | yellow | 11 | bright yellow |
| 4 | blue | 12 | bright blue |
| 5 | magenta | 13 | bright magenta |
| 6 | cyan | 14 | bright cyan |
| 7 | white | 15 | bright white |

## 第二层：界面颜色

可选的 `colors` 块覆盖 Herdr 从终端调色板推导出的面板颜色。最重要的 token：

- `canvas`、`chrome`、`surface`：窗口底色、标题栏/标签栏/状态栏、侧栏。
- `popover`、`raised`、`hover`、`selected`：菜单、抬升卡片、鼠标悬停、选中行。
- `border`、`input`：分隔线和输入框。
- `foreground`、`muted`、`dim`：主文本、次级文本、禁用文本。
- `accent`、`accent_foreground`：焦点、链接、活动标签。
- `solid`、`solid_foreground`：实心强调按钮。
- `working`、`blocked`、`done`、`idle`、`unknown`：代理状态。

## 优先级

应用先读取终端调色板，推导面板颜色，再应用 `colors`。省略 `colors` 的主题仍然有效，应用会补齐缺失值；包含 `colors` 的主题结果确定，并与本站生成的预览一致。

## 实用建议

- `foreground` 与 `background` 的对比度保持在 4.5:1 以上。
- 状态色彼此之间、以及和背景之间都要可区分。
- 不要把 `accent_foreground` 设成和 `accent` 一样的颜色。
- 改完 `background` 后重新检查 `muted` 和 `dim`，它们通常最先变得不可读。
