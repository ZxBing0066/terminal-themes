# 在任意终端安装主题

本站的每种导出都来自同一份调色板，区别只在文件格式和应用读取的位置。

| 目标 | 放置位置 | 格式 |
| --- | --- | --- |
| Herdr App | `~/.config/herdr-app/themes/<name>.json` | JSON 主题文件 |
| Ghostty | `~/.config/ghostty/themes/<name>` | 键值配置 |
| Alacritty | `~/.config/alacritty/alacritty.toml` | TOML colors 块 |
| Kitty | `~/.config/kitty/<name>.conf` | 键值配置 |
| iTerm2 | 设置 → Profiles → Colors → Import | `.itermcolors` plist |
| Windows Terminal | 设置 → 打开 JSON 文件 → `schemes` | JSON 方案对象 |

## Herdr App

保存 JSON 文件，然后在 设置 → 主题 中选择。要设为默认，在 `~/.config/herdr-app/settings.json` 里设置 `theme`。Herdr TUI 是另一个应用，使用 `~/.config/herdr/config.toml`，不会读取这些 JSON 文件。

## Ghostty

把文件放进主题目录，并在 `~/.config/ghostty/config` 中加入 `theme = <name>`。

## Alacritty

替换 `[colors]` 配置块，或在主配置里 include 导出的文件。

## Kitty

在 `kitty.conf` 中加入 `include <name>.conf`。

## iTerm2

从颜色预设菜单导入 `.itermcolors` 文件。

## Windows Terminal

把导出的对象加入 `schemes` 数组，并在 profile 中设置 `colorScheme`。
