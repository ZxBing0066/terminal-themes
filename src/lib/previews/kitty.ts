import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * Kitty draws its tab bar inside the window, below the native titlebar. Tabs
 * keep a numbered label and a close affordance; there is no sidebar.
 */
export function renderKittyPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 38;
  const tabH = 36;
  const contentY = titleH + tabH;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in Kitty">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${dot(18, 19, "#ff5f57")}
  ${dot(36, 19, "#febc2e")}
  ${dot(54, 19, "#28c840")}
  ${text(W / 2, 24, "Kitty", c.muted, 11, 'text-anchor="middle"')}

  <rect x="0" y="${titleH}" width="${W}" height="${tabH}" fill="${c.surface}" />
  <line x1="0" y1="${titleH + tabH}" x2="${W}" y2="${titleH + tabH}" stroke="${c.border}" />
  <rect x="12" y="${titleH + 5}" width="166" height="${tabH - 6}" rx="5" fill="${theme.palette.background}" stroke="${c.border}" />
  ${text(28, titleH + 23, "1: zsh", c.foreground, 11)}
  ${text(158, titleH + 23, "×", c.dim, 11)}
  ${text(206, titleH + 23, "2: nvim", c.muted, 11)}
  ${text(W - 34, titleH + 23, "+", c.muted, 15)}
  ${renderSession(theme, { x: 48, y: contentY + 60 })}
</svg>`;
}
