import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * foot is a Linux terminal with no tab bar. Its client-side decoration is a
 * thin titlebar with the window controls on the right.
 */
export function renderFootPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 36;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in foot">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="8" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 8}" width="${W}" height="8" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${text(W / 2, 23, "foot", c.muted, 11, 'text-anchor="middle"')}
  ${text(W - 88, 23, "−", c.muted, 13, 'text-anchor="middle"')}
  ${text(W - 56, 23, "□", c.muted, 11, 'text-anchor="middle"')}
  ${text(W - 26, 23, "×", c.muted, 13, 'text-anchor="middle"')}
  ${renderSession(theme, { x: 48, y: titleH + 60 })}
</svg>`;
}
