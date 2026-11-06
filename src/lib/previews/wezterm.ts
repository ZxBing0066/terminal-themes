import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * WezTerm keeps tabs above the terminal grid. The tab bar is drawn by the
 * terminal itself, so it uses the same palette as the window chrome.
 */
export function renderWeztermPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 40;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in WezTerm">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${dot(18, 20, "#ff5f57")}
  ${dot(36, 20, "#febc2e")}
  ${dot(54, 20, "#28c840")}
  <rect x="82" y="5" width="190" height="30" rx="6" fill="${theme.palette.background}" stroke="${c.border}" />
  ${text(100, 26, "zsh", c.foreground, 11)}
  ${text(254, 26, "×", c.dim, 11)}
  ${text(304, 26, "pnpm dev", c.muted, 11)}
  ${text(414, 26, "+", c.muted, 14)}
  ${text(W - 18, 26, "WezTerm", c.dim, 10, 'text-anchor="end"')}
  ${renderSession(theme, { x: 48, y: titleH + 60 })}
</svg>`;
}
