import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * Hyper is an Electron shell: native macOS traffic lights, a tab strip, and
 * no terminal-specific status bar.
 */
export function renderHyperPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 42;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in Hyper">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${dot(18, 21, "#ff5f57")}
  ${dot(36, 21, "#febc2e")}
  ${dot(54, 21, "#28c840")}
  <rect x="82" y="6" width="184" height="34" rx="7" fill="${theme.palette.background}" stroke="${c.border}" />
  ${text(100, 28, "zsh", c.foreground, 11)}
  ${text(250, 28, "×", c.dim, 11)}
  ${text(300, 28, "pnpm dev", c.muted, 11)}
  ${text(414, 28, "+", c.muted, 14)}
  ${text(W - 20, 28, "☰", c.muted, 14, 'text-anchor="end"')}
  ${renderSession(theme, { x: 48, y: titleH + 60 })}
</svg>`;
}
