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
        `mkdir -p "$HOME/.config/herdr-app/themes" && curl -fsSL "${url}" -o "$HOME/.config/herdr-app/themes/${name}.json" && { command -v herdr-app >/dev/null && herdr-app do --name app.theme --argv '["${name}"]' || true; }`,
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
