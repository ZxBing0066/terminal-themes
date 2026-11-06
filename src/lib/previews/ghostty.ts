import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, renderSession, text, type PreviewOptions } from "./common";

/**
 * Ghostty on macOS: a native titlebar with tabs, no sidebar and no status bar.
 * The tab strip is the only chrome above the terminal surface.
 */
export function renderGhosttyPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const tabH = 42;
  const contentY = tabH;

  const tabs = [
    `<rect x="82" y="6" width="228" height="34" rx="7" fill="${theme.palette.background}" stroke="${c.border}" />`,
    text(100, 28, "~/dev/terminal-themes", c.foreground, 11),
    text(290, 28, "×", c.dim, 11),
    text(336, 28, "pnpm build", c.muted, 11),
    text(436, 28, "+", c.muted, 14),
  ].join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in Ghostty">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${theme.palette.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${tabH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${tabH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${tabH}" x2="${W}" y2="${tabH}" stroke="${c.border}" />
  ${dot(18, 21, "#ff5f57")}
  ${dot(36, 21, "#febc2e")}
  ${dot(54, 21, "#28c840")}
  ${tabs}
  ${renderSession(theme, { x: 48, y: contentY + 60 })}
</svg>`;
}
