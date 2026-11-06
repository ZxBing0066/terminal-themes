export interface TargetCopy {
  en: string;
  zh: string;
}

export interface Target {
  slug: string;
  name: string;
  title: TargetCopy;
  description: TargetCopy;
  install: { en: string[]; zh: string[] };
  docs?: string;
}

export const targets: Target[] = [
  {
    slug: "herdr-app",
    name: "Herdr App",
    title: {
      en: "Herdr App themes",
      zh: "Herdr App 主题",
    },
    description: {
      en: "Herdr is a native desktop app for coding agents. Put a JSON theme in ~/.config/herdr-app/themes and pick it in Settings; each file has 16 ANSI + 22 UI colors.",
      zh: "Herdr 是运行编码代理的原生桌面应用。把 JSON 主题放进 ~/.config/herdr-app/themes，在设置里选择即可。每个文件同时包含终端调色板和应用界面的 22 个颜色 token。",
    },
    install: {
      en: [
        "Download the JSON file.",
        "Move it to ~/.config/herdr-app/themes/<name>.json.",
        "Open Herdr, then choose Settings → Theme and select the file name.",
        "Optional: set the theme in ~/.config/herdr-app/settings.json to make it the light or dark default.",
      ],
      zh: [
        "下载 JSON 文件。",
        "放到 ~/.config/herdr-app/themes/<name>.json。",
        "打开 Herdr，进入设置 → 主题，选择文件名。",
        "可选：在 ~/.config/herdr-app/settings.json 里把它设为浅色或深色默认主题。",
      ],
    },
    docs: "https://herdr.dev/",
  },
  {
    slug: "ghostty",
    name: "Ghostty",
    title: { en: "Ghostty themes", zh: "Ghostty 主题" },
    description: {
      en: "Ghostty reads themes from its config directory and applies one with a single line. Each exported file has the full 16-color palette plus cursor and selection.",
      zh: "Ghostty 从配置目录读取主题文件，一行配置即可启用。导出的文件包含完整的 16 色 ANSI 调色板以及光标和选区颜色。",
    },
    install: {
      en: [
        "Save the file to ~/.config/ghostty/themes/<name>.",
        "Add theme = <name> to ~/.config/ghostty/config.",
        "Reload Ghostty or open a new window.",
      ],
      zh: [
        "把文件保存到 ~/.config/ghostty/themes/<name>。",
        "在 ~/.config/ghostty/config 中加入 theme = <name>。",
        "重新加载 Ghostty 或打开新窗口。",
      ],
    },
    docs: "https://ghostty.org/docs/config",
  },
  {
    slug: "alacritty",
    name: "Alacritty",
    title: { en: "Alacritty color schemes", zh: "Alacritty 配色方案" },
    description: {
      en: "Alacritty colors live in alacritty.toml. The exported TOML block defines primary, cursor, selection, normal, and bright colors.",
      zh: "Alacritty 的颜色配置写在 alacritty.toml 中。导出的 TOML 块包含 primary、cursor、selection、normal 和 bright 各组颜色。",
    },
    install: {
      en: [
        "Open ~/.config/alacritty/alacritty.toml.",
        "Replace the [colors] tables with the exported block, or include the file from your main config.",
        "Save; Alacritty reloads the configuration automatically.",
      ],
      zh: [
        "打开 ~/.config/alacritty/alacritty.toml。",
        "用导出的 [colors] 配置块替换现有配置，或在主配置中 include 该文件。",
        "保存后 Alacritty 会自动重新加载配置。",
      ],
    },
    docs: "https://alacritty.org/config-alacritty.html",
  },
  {
    slug: "rio",
    name: "Rio",
    title: { en: "Rio themes", zh: "Rio 主题" },
    description: {
      en: "Rio loads a named TOML theme from its themes directory. The export provides the background, foreground, cursor, selection, tabs, eight ANSI colors, and eight bright colors.",
      zh: "Rio 从主题目录加载命名的 TOML 主题。导出文件提供背景、前景、光标、选区、标签页、8 个 ANSI 颜色和 8 个亮色。",
    },
    install: {
      en: [
        "Download the Rio TOML theme.",
        "Save it to ~/.config/rio/themes/<name>.toml.",
        "Add theme = \"<name>\" to ~/.config/rio/config.toml.",
        "Restart Rio or reload its configuration.",
      ],
      zh: [
        "下载 Rio TOML 主题。",
        "保存到 ~/.config/rio/themes/<name>.toml。",
        "在 ~/.config/rio/config.toml 中加入 theme = \"<name>\"。",
        "重启 Rio 或重新加载配置。",
      ],
    },
    docs: "https://rio.dev/docs/config",
  },
  {
    slug: "warp",
    name: "Warp",
    title: { en: "Warp themes", zh: "Warp 主题" },
    description: {
      en: "Warp reads custom themes from a YAML file in its themes directory. The export defines the terminal colors plus Warp's accent, cursor, background, foreground, and light/dark detail mode.",
      zh: "Warp 从主题目录中的 YAML 文件读取自定义主题。导出文件定义终端颜色，以及 Warp 的强调色、光标、背景、前景和明暗细节模式。",
    },
    install: {
      en: [
        "Download the Warp theme YAML.",
        "Save it to ~/.warp/themes/<name>.yaml on macOS, %APPDATA%\\warp\\Warp\\data\\themes on Windows, or ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/themes on Linux.",
        "Open Warp -> Settings -> Appearance -> Themes and choose <name>.",
        "If the theme is not listed yet, restart Warp so it discovers the directory.",
      ],
      zh: [
        "下载 Warp 主题 YAML。",
        "macOS 保存到 ~/.warp/themes/<name>.yaml；Windows 保存到 %APPDATA%\\warp\\Warp\\data\\themes；Linux 保存到 ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/themes。",
        "打开 Warp -> 设置 -> 外观 -> 主题，选择 <name>。",
        "如果主题尚未出现，重启 Warp 让它发现主题目录。",
      ],
    },
    docs: "https://docs.warp.dev/terminal/appearance/custom-themes",
  },
  {
    slug: "wezterm",
    name: "WezTerm",
    title: { en: "WezTerm themes", zh: "WezTerm 主题" },
    description: {
      en: "WezTerm reads colors from a Lua table. The export defines foreground, background, cursor, selection, the eight ANSI colors, and the eight brights.",
      zh: "WezTerm 从 Lua 表读取颜色。导出的表定义前景、背景、光标、选区、8 个 ANSI 颜色和 8 个亮色。",
    },
    install: {
      en: [
        "Download the Lua color table.",
        "Save it to ~/.config/wezterm/colors/<name>.lua.",
        "Add config.colors = dofile(wezterm.config_dir .. '/colors/<name>.lua') to ~/.config/wezterm/wezterm.lua.",
        "Reload WezTerm.",
      ],
      zh: [
        "下载 Lua 颜色表。",
        "保存到 ~/.config/wezterm/colors/<name>.lua。",
        "在 ~/.config/wezterm/wezterm.lua 中加入 config.colors = dofile(wezterm.config_dir .. '/colors/<name>.lua')。",
        "重新加载 WezTerm。",
      ],
    },
    docs: "https://wezterm.org/config/lua/config/colors.html",
  },
  {
    slug: "kitty",
    name: "Kitty",
    title: { en: "Kitty themes", zh: "Kitty 主题" },
    description: {
      en: "Kitty uses plain key/value color directives. The exported conf file sets the background, foreground, cursor, selection, and all sixteen ANSI colors.",
      zh: "Kitty 使用简单的键值对颜色指令。导出的 conf 文件设置背景、前景、光标、选区以及全部 16 个 ANSI 颜色。",
    },
    install: {
      en: [
        "Save the file to ~/.config/kitty/<name>.conf.",
        "Add include <name>.conf to ~/.config/kitty/kitty.conf.",
        "Reload the Kitty configuration.",
      ],
      zh: [
        "把文件保存到 ~/.config/kitty/<name>.conf。",
        "在 ~/.config/kitty/kitty.conf 中加入 include <name>.conf。",
        "重新加载 Kitty 配置。",
      ],
    },
    docs: "https://sw.kovidgoyal.net/kitty/conf/",
  },
  {
    slug: "iterm2",
    name: "iTerm2",
    title: { en: "iTerm2 color schemes", zh: "iTerm2 配色方案" },
    description: {
      en: "iTerm2 imports color presets as .itermcolors plists. The exported file includes all ANSI colors, cursor, and selection colors.",
      zh: "iTerm2 通过 .itermcolors plist 导入颜色预设。导出的文件包含全部 ANSI 颜色、光标和选区颜色。",
    },
    install: {
      en: [
        "Download the .itermcolors file.",
        "Open iTerm2 → Settings → Profiles → Colors.",
        "Open Color Presets → Import, choose the file, then select the preset.",
      ],
      zh: [
        "下载 .itermcolors 文件。",
        "打开 iTerm2 → 设置 → Profiles → Colors。",
        "打开 Color Presets → Import，选择文件，然后选中该预设。",
      ],
    },
    docs: "https://iterm2.com/documentation-preferences-profiles-colors.html",
  },
  {
    slug: "windows-terminal",
    name: "Windows Terminal",
    title: { en: "Windows Terminal themes", zh: "Windows Terminal 主题" },
    description: {
      en: "Windows Terminal stores color schemes as JSON objects. The exported scheme defines the base UI colors and all sixteen ANSI colors.",
      zh: "Windows Terminal 用 JSON 对象保存配色方案。导出的方案包含基础界面颜色和全部 16 个 ANSI 颜色。",
    },
    install: {
      en: [
        "Open Windows Terminal → Settings → Open JSON file.",
        "Add the exported object to the schemes array.",
        "Set colorScheme to the scheme name in a profile.",
      ],
      zh: [
        "打开 Windows Terminal → 设置 → 打开 JSON 文件。",
        "把导出的对象加入 schemes 数组。",
        "在某个 profile 中把 colorScheme 设为该方案名。",
      ],
    },
    docs: "https://learn.microsoft.com/en-us/windows/terminal/customize-settings/color-schemes",
  },
];

export function getTarget(slug: string): Target | undefined {
  return targets.find((target) => target.slug === slug);
}
