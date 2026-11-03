import type { Ansi, Theme } from "./schema";

export const ANSI_ORDER = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite",
] as const;

export type AnsiName = (typeof ANSI_ORDER)[number];

export function ansiList(ansi: Ansi): string[] {
  return ANSI_ORDER.map((name) => ansi[name]);
}

export function cursorText(theme: Theme): string {
  return theme.palette.cursorText ?? theme.palette.background;
}

export function selectionForeground(theme: Theme): string {
  return theme.palette.selectionForeground ?? theme.palette.foreground;
}

export function ansiPairs(ansi: Ansi): Array<{ name: AnsiName; hex: string }> {
  return ANSI_ORDER.map((name) => ({ name, hex: ansi[name] }));
}
