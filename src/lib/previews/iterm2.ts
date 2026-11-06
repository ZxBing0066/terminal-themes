import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * iTerm2 on macOS: unified titlebar tabs and an optional session status bar.
 * The status bar is part of the app's default profile chrome, not terminal text.
 */
export function renderIterm2Preview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const titleH = 42;
  const statusH = 24;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in iTerm2">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${dot(18, 21, "#ff5f57")}
  ${dot(36, 21, "#febc2e")}
  ${dot(54, 21, "#28c840")}
  <rect x="82" y="6" width="190" height="34" rx="7" fill="${theme.palette.background}" stroke="${c.border}" />
  ${text(100, 28, "1. zsh", c.foreground, 11)}
  ${text(254, 28, "×", c.dim, 11)}
  ${text(304, 28, "2. pnpm dev", c.muted, 11)}
  ${text(420, 28, "+", c.muted, 14)}
  ${renderSession(theme, { x: 48, y: titleH + 60 })}

  <rect x="0" y="${H - statusH}" width="${W}" height="${statusH}" fill="${c.surface}" />
  <line x1="0" y1="${H - statusH}" x2="${W}" y2="${H - statusH}" stroke="${c.border}" />
  ${text(14, H - 8, "you@mac", c.muted, 9)}
  ${text(94, H - 8, "main", c.dim, 9)}
  ${text(W - 14, H - 8, "zsh · 100%", c.dim, 9, 'text-anchor="end"')}
</svg>`;
}
