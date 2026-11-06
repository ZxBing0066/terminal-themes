import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * Windows Terminal: tabs live in the titlebar, the tab row uses the acrylic
 * treatment, and the window controls are the Windows glyph set on the right.
 */
export function renderWindowsTerminalPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 40;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in Windows Terminal">
  <defs>
    <linearGradient id="wt-chrome" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${c.chrome}" />
      <stop offset="1" stop-color="${c.surface}" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="8" fill="url(#wt-chrome)" />
  <rect x="0" y="${titleH - 8}" width="${W}" height="8" fill="url(#wt-chrome)" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />

  <rect x="10" y="5" width="246" height="31" rx="5" fill="${theme.palette.background}" />
  <rect x="22" y="13" width="15" height="15" rx="3" fill="${c.accent}" />
  ${text(26, 24, ">_", c.accent_foreground, 8)}
  ${text(44, 26, "PowerShell", c.foreground, 11)}
  ${text(236, 26, "×", c.dim, 11)}
  ${text(278, 26, "Command Prompt", c.muted, 11)}
  ${text(422, 26, "+", c.muted, 15)}
  ${text(452, 26, "▾", c.muted, 12)}

  <g stroke="${c.muted}" stroke-width="1.5" fill="none">
    <line x1="${W - 102}" y1="21" x2="${W - 88}" y2="21" />
    <rect x="${W - 63}" y="14" width="12" height="12" />
    <path d="M${W - 30} 15 l10 10 M${W - 20} 15 l-10 10" />
  </g>
  ${renderSession(theme, { x: 48, y: titleH + 60, windows: true })}
</svg>`;
}
