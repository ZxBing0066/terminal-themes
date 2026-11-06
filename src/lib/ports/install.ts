import type { Target } from "../../data/targets";
import type { Locale } from "../../i18n/ui";
import type { Theme } from "../schema";

/**
 * One-line install commands. Commands are copy-pasteable and idempotent where
 * the target has a drop-in config file. Targets that require a UI import still
 * get a download command plus the exact next step as a shell comment.
 */
export function installCommand(slug: string, theme: Theme, url: string): string {
  const name = `${theme.family}-${theme.slug}`;
  switch (slug) {
    case "herdr-app":
      return [
        `mkdir -p "$HOME/.config/herdr-app/themes" && curl -fsSL "${url}" -o "$HOME/.config/herdr-app/themes/${name}.json" && { command -v herdr-app >/dev/null && herdr-app do app.theme --name '${name}' || true; }`,
        `# If activation did not run, choose ${name} in Herdr -> Settings -> Theme.`,
      ].join("\n");
    case "ghostty":
      return [
        `mkdir -p "$HOME/.config/ghostty/themes" && curl -fsSL "${url}" -o "$HOME/.config/ghostty/themes/${name}" && { grep -qxF 'theme = ${name}' "$HOME/.config/ghostty/config" 2>/dev/null || printf '\\ntheme = %s\\n' '${name}' >> "$HOME/.config/ghostty/config"; }`,
        `# Open a new Ghostty window.`,
      ].join("\n");
    case "alacritty":
      return [
        `mkdir -p "$HOME/.config/alacritty/themes" && curl -fsSL "${url}" -o "$HOME/.config/alacritty/themes/${name}.toml"`,
        `# Then add an import entry to alacritty.toml pointing at ~/.config/alacritty/themes/${name}.toml`,
      ].join("\n");
    case "wezterm":
      return [
        `mkdir -p "$HOME/.config/wezterm/colors" && curl -fsSL "${url}" -o "$HOME/.config/wezterm/colors/${name}.lua"`,
        `# Add config.colors = dofile(wezterm.config_dir .. "/colors/${name}.lua") to ~/.config/wezterm/wezterm.lua`,
      ].join("\n");
    case "kitty":
      return [
        `mkdir -p "$HOME/.config/kitty" && curl -fsSL "${url}" -o "$HOME/.config/kitty/${name}.conf" && { grep -qxF 'include ${name}.conf' "$HOME/.config/kitty/kitty.conf" 2>/dev/null || printf '\\ninclude %s\\n' '${name}.conf' >> "$HOME/.config/kitty/kitty.conf"; }`,
        `# Reload Kitty.`,
      ].join("\n");
    case "iterm2":
      return [
        `curl -fsSL "${url}" -o "$HOME/Downloads/${name}.itermcolors"`,
        `# Import it in iTerm2 -> Settings -> Profiles -> Colors -> Presets.`,
      ].join("\n");
    case "windows-terminal":
      return [
        `# Windows PowerShell`,
        `Invoke-WebRequest -Uri "${url}" -OutFile "$env:TEMP\\${name}.json"`,
        `# Add the object to the schemes array in Windows Terminal settings.`,
      ].join("\n");
    default:
      return `curl -fsSL "${url}" -o "${name}"`;
  }
}

export function agentPrompt(
  theme: Theme,
  target: Target,
  pageUrl: string,
  fileUrl: string,
  locale: Locale,
): string {
  const steps = target.install[locale];
  const command = installCommand(target.slug, theme, fileUrl);
  if (locale === "zh") {
    return [
      `帮我在这台机器上安装 ${theme.name} 的 ${target.name} 主题。`,
      "",
      `先阅读安装页面：${pageUrl}`,
      `原生配置文件：${fileUrl}`,
      "",
      "请按以下步骤操作：",
      ...steps.map((step, index) => `${index + 1}. ${step}`),
      "",
      "一行安装命令：",
      command,
      "",
      "请先检查并备份现有配置，只修改这个主题需要的设置，不要覆盖无关配置；如果要修改默认主题，先询问我。安装后验证文件存在并告诉我改了哪些文件。",
    ].join("\n");
  }
  return [
    `Help me install the ${theme.name} theme for ${target.name} on this machine.`,
    "",
    `Read the install page: ${pageUrl}`,
    `Native theme file: ${fileUrl}`,
    "",
    "Follow these steps:",
    ...steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "One-line install:",
    command,
    "",
    "Inspect and back up my existing configuration first. Change only what this theme needs; do not overwrite unrelated settings. Ask before changing my default theme. After installing, verify the file exists and tell me which files changed.",
  ].join("\n");
}
