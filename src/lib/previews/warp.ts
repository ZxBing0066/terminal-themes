import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";
import { dot, esc, text, type PreviewOptions } from "./common";

/**
 * Warp is block-first: each command and its output is a rounded block with a
 * gutter, and the input line stays at the bottom. This is deliberately not a
 * generic terminal grid.
 */
export function renderWarpPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const c = deriveHerdrAppColors(theme);
  const p = theme.palette;
  const a = p.ansi;
  const titleH = 40;
  const blockX = 64;
  const blockW = W - 128;

  const block = (y: number, h: number, command: string, output: Array<{ value: string; color: string }>) => [
    `<rect x="${blockX}" y="${y}" width="${blockW}" height="${h}" rx="8" fill="${c.surface}" stroke="${c.border}" />`,
    `<rect x="${blockX}" y="${y}" width="3" height="${h}" rx="1.5" fill="${c.accent}" />`,
    text(blockX + 22, y + 28, "❯", a.green, 13),
    text(blockX + 42, y + 28, command, p.foreground, 13),
    text(blockX + blockW - 20, y + 28, "✓", a.green, 12, 'text-anchor="end"'),
    ...output.map((line, index) => text(blockX + 22, y + 56 + index * 20, line.value, line.color, 12)),
  ].join("\n");

  const first = block(78, 214, "git status", [
    { value: "On branch main", color: c.muted },
    { value: "Changes not staged for commit:", color: p.foreground },
    { value: "  modified:   themes/mocha.json", color: a.yellow },
    { value: "  new file:   previews/warp.svg", color: a.green },
    { value: "no changes added to commit", color: c.muted },
  ]);
  const second = block(310, 142, "pnpm build", [
    { value: "✓ built 340 pages in 4.2s", color: a.green },
    { value: "✓ 112 previews", color: a.blue },
    { value: "✓ 224 OG images", color: a.cyan },
  ]);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in Warp">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${p.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  ${dot(18, 20, "#ff5f57")}
  ${dot(36, 20, "#febc2e")}
  ${dot(54, 20, "#28c840")}
  <rect x="82" y="5" width="150" height="30" rx="6" fill="${p.background}" stroke="${c.border}" />
  ${text(100, 26, "zsh", p.foreground, 11)}
  ${text(210, 26, "×", c.dim, 11)}
  ${text(252, 26, "+", c.muted, 14)}
  ${text(W - 18, 26, "Warp", c.dim, 10, 'text-anchor="end"')}
  ${first}
  ${second}
  <text x="64" y="590" fill="${c.accent}" font-size="11" font-family="JetBrains Mono, monospace">~/dev/terminal-themes</text>
  ${text(64, 622, "❯", a.green, 13)}
  <rect x="86" y="610" width="7" height="14" fill="${p.cursor}" opacity="0.85" />
  ${text(104, 622, "Type a command", c.dim, 12)}
</svg>`;
}
