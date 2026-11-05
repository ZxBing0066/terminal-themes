import { contrast } from "./color";
import { deriveHerdrAppColors } from "./ports/herdr-app";
import { ansiList } from "./palette";
import type { Theme } from "./schema";

interface PreviewOptions {
  height?: number;
  og?: boolean;
}

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function text(
  x: number,
  y: number,
  value: string,
  fill: string,
  size = 13,
  extra = "",
): string {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="JetBrains Mono, monospace" ${extra}>${esc(value)}</text>`;
}

function dot(x: number, y: number, color: string): string {
  return `<circle cx="${x}" cy="${y}" r="3" fill="${color}" />`;
}

function pane(
  x: number,
  y: number,
  w: number,
  h: number,
  theme: Theme,
  title: string,
  status: string,
  body: string[],
): string {
  const c = deriveHerdrAppColors(theme);
  const header = 26;
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${theme.palette.background}" stroke="${c.border}" />
    <path d="M${x} ${y + 6} a6 6 0 0 1 6 -6 h${w - 12} a6 6 0 0 1 6 6 v${header - 6} h-${w} z" fill="${c.chrome}" />
    ${dot(x + 14, y + 13, status)}
    ${text(x + 24, y + 17, title, c.muted, 11)}
    <line x1="${x}" y1="${y + header}" x2="${x + w}" y2="${y + header}" stroke="${c.border}" />
    ${body.join("\n")}
  </g>`;
}

export function renderHerdrAppPreview(theme: Theme, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const og = options.og ?? false;
  const brandBar = og ? 46 : 0;
  const appH = H - brandBar;
  const title = 42;
  const status = 26;
  const sidebar = 168;
  const c = deriveHerdrAppColors(theme);
  const ansi = ansiList(theme.palette.ansi);
  const a = theme.palette.ansi;
  const mainX = sidebar;
  const mainW = W - sidebar;
  const contentY = title;
  const contentH = appH - contentY - status;
  const pad = 10;
  const paneY = contentY + pad;
  const paneH = contentH - pad * 2;
  const leftW = Math.round((mainW - pad * 3) * 0.6);
  const rightW = mainW - pad * 3 - leftW;
  const leftX = mainX + pad;
  const rightX = leftX + leftW + pad;

  const prompt = (x: number, y: number) =>
    `${text(x, y, "~ /dev/terminal-themes", c.accent, 12)}${text(x, y + 20, "❯", a.green, 13)}${text(x + 18, y + 20, "git status", c.foreground, 13)}`;

  const leftBody = [
    prompt(leftX + 16, paneY + 54),
    text(leftX + 16, paneY + 96, "On branch main", c.muted, 12),
    text(leftX + 16, paneY + 118, "Changes not staged for commit:", c.foreground, 12),
    text(leftX + 16, paneY + 140, "  modified:   themes/mocha.json", a.yellow, 12),
    text(leftX + 16, paneY + 162, "  new file:   previews/herdr-app.svg", a.green, 12),
    text(leftX + 16, paneY + 184, "no changes added to commit", c.muted, 12),
    `<line x1="${leftX + 16}" y1="${paneY + 202}" x2="${leftX + leftW - 16}" y2="${paneY + 202}" stroke="${c.border}" />`,
    text(leftX + 16, paneY + 228, "❯", a.green, 13),
    text(leftX + 34, paneY + 228, "pnpm build", c.foreground, 12),
    text(leftX + 16, paneY + 252, "✓ built 340 pages in 4.2s", a.green, 12),
    text(leftX + 16, paneY + 274, "✓ 112 previews", a.blue, 12),
    text(leftX + 16, paneY + 296, "✓ 224 OG images", a.cyan, 12),
    `<rect x="${leftX + 34}" y="${paneY + 314}" width="7" height="13" fill="${c.foreground}" opacity="0.8" />`,
  ].join("\n");

  const rightBody = [
    text(rightX + 16, paneY + 54, "theme.json", c.muted, 11),
    text(rightX + 16, paneY + 82, `+ "background": "${theme.palette.background}",`, a.green, 10),
    text(rightX + 16, paneY + 102, `+ "foreground": "${theme.palette.foreground}",`, a.green, 10),
    text(rightX + 16, paneY + 122, `- "surface": "${c.surface}",`, a.red, 10),
    text(rightX + 16, paneY + 142, `+ "accent": "${c.accent}"`, a.green, 10),
    text(rightX + 16, paneY + 174, "contrast", c.muted, 10),
    text(rightX + 16, paneY + 194, `${contrast(theme.palette.foreground, theme.palette.background).toFixed(2)}:1`, a.cyan, 12),
    ...ansi.slice(0, 8).map((hex, index) => {
      const size = (rightW - 32 - 7 * 4) / 8;
      return `<rect x="${rightX + 16 + index * (size + 4)}" y="${paneY + 214}" width="${size}" height="16" rx="2" fill="${hex}" />`;
    }),
    ...ansi.slice(8).map((hex, index) => {
      const size = (rightW - 32 - 7 * 4) / 8;
      return `<rect x="${rightX + 16 + index * (size + 4)}" y="${paneY + 236}" width="${size}" height="16" rx="2" fill="${hex}" />`;
    }),
    text(rightX + 16, paneY + 286, "herdr-app", c.muted, 10),
    text(rightX + 16, paneY + 306, "22 ui colors", c.dim, 10),
  ].join("\n");

  const sidebarRows = [
    text(12, title + 22, "SPACES", c.dim, 9, 'letter-spacing="1.2"'),
    `<rect x="8" y="${title + 30}" width="${sidebar - 16}" height="24" rx="5" fill="${c.selected}" />`,
    text(16, title + 46, "terminal-themes", c.foreground, 11),
    text(12, title + 74, "AGENTS", c.dim, 9, 'letter-spacing="1.2"'),
    `${dot(18, title + 94, c.working)}${text(28, title + 98, "claude code", c.foreground, 10)}${text(sidebar - 12, title + 98, "working", c.dim, 8, 'text-anchor="end"')}`,
    `${dot(18, title + 120, c.done)}${text(28, title + 124, "codex", c.muted, 10)}${text(sidebar - 12, title + 124, "done", c.dim, 8, 'text-anchor="end"')}`,
    `${dot(18, title + 146, c.idle)}${text(28, title + 150, "tests", c.muted, 10)}${text(sidebar - 12, title + 150, "idle", c.dim, 8, 'text-anchor="end"')}`,
    `<line x1="10" y1="${title + 172}" x2="${sidebar - 10}" y2="${title + 172}" stroke="${c.border}" />`,
    text(12, title + 194, "api", c.foreground, 11),
    `${dot(18, title + 214, c.blocked)}${text(28, title + 218, "codex", c.muted, 10)}${text(sidebar - 12, title + 218, "blocked", c.dim, 8, 'text-anchor="end"')}`,
    `${dot(18, title + 240, c.working)}${text(28, title + 244, "reviewer", c.muted, 10)}${text(sidebar - 12, title + 244, "working", c.dim, 8, 'text-anchor="end"')}`,
    `<line x1="10" y1="${title + 268}" x2="${sidebar - 10}" y2="${title + 268}" stroke="${c.border}" />`,
    text(12, title + 290, "MACHINES", c.dim, 9, 'letter-spacing="1.2"'),
    text(12, title + 312, "local", c.muted, 10),
    text(sidebar - 12, title + 312, "2", c.dim, 9, 'text-anchor="end"'),
    text(12, title + 334, "vps", c.muted, 10),
    text(sidebar - 12, title + 334, "1", c.dim, 9, 'text-anchor="end"'),
    `<line x1="10" y1="${appH - 54}" x2="${sidebar - 10}" y2="${appH - 54}" stroke="${c.border}" />`,
    text(12, appH - 30, "5 agents · 2 working", c.dim, 9),
  ].join("\n");

  const topbar = [
    `<rect x="0" y="0" width="${W}" height="${title}" fill="${c.chrome}" />`,
    `<line x1="0" y1="${title}" x2="${W}" y2="${title}" stroke="${c.border}" />`,
    `<rect x="12" y="10" width="22" height="22" rx="6" fill="${c.surface}" stroke="${c.border}" />`,
    `<circle cx="23" cy="21" r="5" fill="${c.accent}" />`,
    text(42, 27, "Herdr", c.foreground, 11),
    `<line x1="92" y1="10" x2="92" y2="${title - 10}" stroke="${c.border}" />`,
    `<rect x="100" y="6" width="96" height="${title - 12}" rx="5" fill="${c.surface}" />`,
    text(114, 26, "main", c.foreground, 11),
    text(212, 26, "tokens", c.muted, 11),
    text(288, 26, "preview", c.muted, 11),
    text(W - 18, 27, "⌘K", c.dim, 10, 'text-anchor="end"'),
  ].join("\n");

  const statusBar = [
    `<rect x="0" y="${appH - status}" width="${W}" height="${status}" fill="${c.chrome}" />`,
    `<line x1="0" y1="${appH - status}" x2="${W}" y2="${appH - status}" stroke="${c.border}" />`,
    text(14, appH - 9, "herdr", c.accent, 9),
    text(58, appH - 9, "3 spaces · 5 agents", c.dim, 9),
    text(W - 14, appH - 9, "MCP connected", c.dim, 9, 'text-anchor="end"'),
  ].join("\n");

  const brand = og
    ? `<rect x="0" y="${appH}" width="${W}" height="${brandBar}" fill="${c.canvas}" />
       <line x1="0" y1="${appH}" x2="${W}" y2="${appH}" stroke="${c.border}" />
       ${text(24, appH + 28, theme.name, c.foreground, 14)}
       ${text(W - 24, appH + 28, "terminalthemes.iwwi.app", c.muted, 11, 'text-anchor="end"')}`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} theme preview">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${appH}" rx="10" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${title}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${title - 10}" width="${W}" height="10" fill="${c.chrome}" />
  ${topbar}
  <rect x="0" y="${title}" width="${sidebar}" height="${appH - title}" fill="${c.surface}" />
  <line x1="${sidebar}" y1="${title}" x2="${sidebar}" y2="${appH}" stroke="${c.border}" />
  ${sidebarRows}
  ${pane(leftX, paneY, leftW, paneH, theme, "claude code", c.working, [])}
  ${leftBody}
  ${pane(rightX, paneY, rightW, paneH, theme, "codex", c.done, [])}
  ${rightBody}
  ${statusBar}
  ${brand}
</svg>`;
}

interface PortLike {
  slug: string;
  name: string;
}

const PORT_CONFIG: Record<string, (theme: Theme) => string[]> = {
  ghostty: (theme) => [`theme = ${theme.family}-${theme.slug}`],
  alacritty: (theme) => ["[colors.primary]", `background = '${theme.palette.background}'`],
  kitty: (theme) => [`include ${theme.family}-${theme.slug}.conf`],
  iterm2: (theme) => [`Preset: ${theme.name}`],
  "windows-terminal": (theme) => [`"scheme": "${theme.name}"`],
};

export function renderTerminalPreview(theme: Theme, port: PortLike, options: PreviewOptions = {}): string {
  const W = 1200;
  const H = options.height ?? 720;
  const p = theme.palette;
  const c = deriveHerdrAppColors(theme);
  const ansi = ansiList(p.ansi);
  const titleH = 42;
  const config = PORT_CONFIG[port.slug]?.(theme) ?? [];
  const prompt = (x: number, y: number, command: string) =>
    `${text(x, y, "~ /dev/terminal-themes", c.accent, 12)}${text(x, y + 24, "❯", ansi[2], 14)}${text(x + 20, y + 24, command, p.foreground, 13)}`;
  const rows = [
    text(48, 172, "On branch main", c.muted, 12),
    text(48, 196, "Changes not staged for commit:", p.foreground, 12),
    text(64, 220, "modified:   themes/mocha.json", ansi[3], 12),
    text(64, 244, "new file:   previews/herdr-app.svg", ansi[2], 12),
    text(48, 268, "no changes added to commit", c.muted, 12),
    text(48, 316, "❯", ansi[2], 14),
    text(68, 316, "pnpm build", p.foreground, 13),
    text(48, 344, "✓ built all theme pages", ansi[2], 12),
  ].join("\n");
  const swatchW = (W - 96 - 15 * 5) / 16;
  const palette = ansi
    .map(
      (hex, index) =>
        `<rect x="${48 + index * (swatchW + 5)}" y="452" width="${swatchW}" height="26" rx="3" fill="${hex}" />`,
    )
    .join("\n");
  const configText = config
    .map((line, index) => text(824, 128 + index * 24, line, index === 0 ? ansi[2] : p.foreground, 12))
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(theme.name)} preview in ${esc(port.name)}">
  <rect width="${W}" height="${H}" fill="${c.canvas}" />
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="${p.background}" stroke="${c.border}" />
  <rect x="0" y="0" width="${W}" height="${titleH}" rx="10" fill="${c.chrome}" />
  <rect x="0" y="${titleH - 10}" width="${W}" height="10" fill="${c.chrome}" />
  <line x1="0" y1="${titleH}" x2="${W}" y2="${titleH}" stroke="${c.border}" />
  <circle cx="20" cy="21" r="5" fill="#ff5f57" />
  <circle cx="38" cy="21" r="5" fill="#febc2e" />
  <circle cx="56" cy="21" r="5" fill="#28c840" />
  ${text(W / 2, 26, port.name, c.muted, 12, 'text-anchor="middle"')}
  ${prompt(48, 92, "git status")}
  ${rows}
  <rect x="790" y="82" width="362" height="248" rx="8" fill="${c.surface}" stroke="${c.border}" />
  ${text(812, 108, "TARGET CONFIG", c.dim, 10, 'letter-spacing="1.2"')}
  ${configText}
  ${text(812, 292, `${theme.name} · 16 ANSI`, c.dim, 10)}
  <line x1="48" y1="404" x2="${W - 48}" y2="404" stroke="${c.border}" />
  ${text(48, 430, "ANSI 0–15", c.dim, 10, 'letter-spacing="1.2"')}
  ${palette}
  ${text(48, 520, `background ${p.background}  ·  foreground ${p.foreground}  ·  cursor ${p.cursor}`, c.muted, 11)}
</svg>`;
}

export function renderPortPreview(theme: Theme, port: PortLike, options: PreviewOptions = {}): string {
  if (port.slug === "herdr-app") return renderHerdrAppPreview(theme, options);
  return renderTerminalPreview(theme, port, options);
}

export function renderDefaultOg(locale: "en" | "zh"): string {
  const width = 1200;
  const height = 630;
  const fg = "#e6e8eb";
  const muted = "#9aa4af";
  const dim = "#6f7a86";
  const bg = "#08090a";
  const panel = "#0e1012";
  const border = "#23282e";
  const bar = [
    "#45475a", "#f38ba8", "#a6e3a1", "#f9e2af",
    "#89b4fa", "#f5c2e7", "#94e2d5", "#a6adc8",
    "#585b70", "#f37799", "#89d88b", "#ebd391",
    "#74a8fc", "#f2aede", "#6bd7ca", "#bac2de",
  ];
  const title = "terminalthemes";
  const subtitle =
    locale === "zh"
      ? "终端配色，直接用到你的应用"
      : "Terminal color schemes, ready for your app";
  const stats =
    locale === "zh"
      ? "112 个主题 · 36 个家族 · 6 种应用"
      : "112 themes · 36 families · 6 targets";
  const cells = bar
    .map(
      (color, index) =>
        `<rect x="${80 + index * 65}" y="120" width="60" height="60" rx="6" fill="${color}" />`,
    )
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${bg}" />
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" rx="12" fill="${panel}" stroke="${border}" />
  <line x1="40" y1="250" x2="${width - 40}" y2="250" stroke="${border}" />
  ${cells}
  ${text(80, 330, title, fg, 56, 'font-weight="500"')}
  ${text(80, 400, subtitle, muted, 26)}
  ${text(80, 468, stats, dim, 18)}
  ${text(80, 540, "terminalthemes.iwwi.app", dim, 16)}
</svg>`;
}
