import { deriveHerdrAppColors } from "../ports/herdr-app";
import type { Theme } from "../schema";

export interface PreviewOptions {
  height?: number;
  og?: boolean;
}

export function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function text(
  x: number,
  y: number,
  value: string,
  fill: string,
  size = 13,
  extra = "",
): string {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="JetBrains Mono, monospace" ${extra}>${esc(value)}</text>`;
}

export function dot(x: number, y: number, color: string): string {
  return `<circle cx="${x}" cy="${y}" r="3" fill="${color}" />`;
}

interface SessionOptions {
  x: number;
  y: number;
  windows?: boolean;
}

/**
 * Shared shell output for terminal previews. The window chrome around it is
 * target-specific; the session text is deliberately the same task so the
 * colors, not the copy, carry the comparison.
 */
export function renderSession(theme: Theme, options: SessionOptions): string {
  const { x, y, windows = false } = options;
  const c = deriveHerdrAppColors(theme);
  const a = theme.palette.ansi;
  const p = theme.palette;
  const dir = windows ? "C:\\dev\\terminal-themes" : "~/dev/terminal-themes";
  const prompt = windows ? `PS ${dir}>` : "❯";
  const promptColor = windows ? a.cyan : a.green;
  const commandX = windows ? x + textWidth(prompt, 13) + 6 : x + 20;
  const line = (offset: number, value: string, fill: string, size = 12, at = x) =>
    text(at, y + offset, value, fill, size);
  const secondPromptY = 172;

  const rows = [
    line(56, "On branch main", c.muted),
    line(76, "Changes not staged for commit:", p.foreground),
    line(96, "  modified:   themes/mocha.json", a.yellow),
    line(116, `  new file:   previews/${theme.family}-${theme.slug}.svg`, a.green),
    line(136, "no changes added to commit", c.muted),
    text(x, y + secondPromptY, prompt, promptColor, 13),
    text(commandX, y + secondPromptY, "pnpm build", p.foreground, 13),
    line(196, "✓ built 340 pages in 4.2s", a.green),
    line(216, "✓ 112 previews", a.blue),
    line(236, "✓ 224 OG images", a.cyan),
    `<rect x="${commandX + textWidth("pnpm build", 13) + 4}" y="${y + secondPromptY - 12}" width="7" height="13" fill="${p.cursor}" opacity="0.85" />`,
  ];

  return [
    line(0, dir, c.accent, 11),
    text(x, y + 28, prompt, promptColor, 13),
    text(commandX, y + 28, "git status", p.foreground, 13),
    ...rows,
  ].join("\n");
}

function textWidth(value: string, size: number): number {
  return value.length * size * 0.6;
}
