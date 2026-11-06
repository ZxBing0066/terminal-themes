import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * Rio is a minimal GPU terminal: tabs above the grid, no sidebar or status bar.
 */
export function renderRioPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 40;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in Rio">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${dot(18, 20, "#ff5f57")}
  ${dot(36, 20, "#febc2e")}
  ${dot(54, 20, "#28c840")}
  <rect x="82" y="5" width="170" height="30" rx="15" fill="${theme.palette.background}" stroke="${c.border}" />
  ${text(100, 26, "zsh", c.foreground, 11)}
  ${text(234, 26, "×", c.dim, 11)}
  ${text(280, 26, "nvim", c.muted, 11)}
  ${text(384, 26, "+", c.muted, 14)}
  ${text(W - 18, 26, "Rio", c.dim, 10, 'text-anchor="end"')}
  ${renderSession(theme, { x: 48, y: titleH + 60 })}
</svg>`;
}
