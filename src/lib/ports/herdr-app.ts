import { bestForeground, ensureContrast, mix, pickContrast, shade } from "../color";
import { ansiList } from "../palette";
import type { Theme } from "../schema";

export interface HerdrAppColors {
  canvas: string;
  chrome: string;
  surface: string;
  popover: string;
  raised: string;
  hover: string;
  selected: string;
  border: string;
  input: string;
  foreground: string;
  muted: string;
  dim: string;
  accent: string;
  accent_foreground: string;
  solid: string;
  solid_foreground: string;
  selection: string;
  working: string;
  blocked: string;
  done: string;
  idle: string;
  unknown: string;
}

export function deriveHerdrAppColors(theme: Theme): HerdrAppColors {
  const { background: bg, foreground: fg, ansi } = theme.palette;
  const surface = mix(bg, fg, 0.06);
  const accent = pickContrast(
    [ansi.blue, ansi.brightBlue, ansi.magenta, ansi.brightMagenta],
    3,
    surface,
  );
  const solid = shade(accent, -0.08);
  const muted = ensureContrast(mix(fg, bg, 0.3), 3, surface, mix(fg, bg, 0.2));
  const dim = ensureContrast(mix(fg, bg, 0.45), 2.5, surface, mix(fg, bg, 0.35));

  return {
    canvas: shade(bg, theme.appearance === "dark" ? -0.04 : 0.04),
    chrome: mix(bg, fg, 0.03),
    surface,
    popover: mix(bg, fg, 0.09),
    raised: mix(bg, fg, 0.11),
    hover: mix(bg, fg, 0.14),
    selected: mix(bg, fg, 0.18),
    border: mix(bg, fg, 0.16),
    input: mix(bg, fg, 0.2),
    foreground: fg,
    muted,
    dim,
    accent,
    accent_foreground: bestForeground(accent),
    solid,
    solid_foreground: bestForeground(solid),
    selection: theme.palette.selectionBackground,
    working: pickContrast([ansi.yellow, ansi.brightYellow], 3, surface),
    blocked: pickContrast([ansi.red, ansi.brightRed], 3, surface),
    done: pickContrast([ansi.green, ansi.brightGreen], 3, surface),
    idle: muted,
    unknown: dim,
  };
}

export function toHerdrApp(theme: Theme, options: { colors?: boolean } = {}): Record<string, unknown> {
  const file: Record<string, unknown> = {
    background: theme.palette.background,
    foreground: theme.palette.foreground,
    selection: theme.palette.selectionBackground,
    cursor: theme.palette.cursor,
    ansi: ansiList(theme.palette.ansi),
  };
  if (options.colors !== false) file.colors = deriveHerdrAppColors(theme);
  return file;
}

export function serializeHerdrApp(theme: Theme): string {
  return `${JSON.stringify(toHerdrApp(theme), null, 2)}\n`;
}
