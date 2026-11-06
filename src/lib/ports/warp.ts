import { deriveHerdrAppColors } from "../ports/herdr-app";
import { ansiList } from "../palette";
import type { Theme } from "../schema";

function quoted(value: string): string {
  return JSON.stringify(value);
}

/**
 * Warp custom themes are YAML files discovered from the platform's themes
 * directory. `details` tells Warp whether the theme is lighter or darker.
 */
export function serializeWarp(theme: Theme): string {
  const p = theme.palette;
  const ansi = ansiList(p.ansi);
  const color = (hex: string) => `'${hex}'`;
  const block = (values: string[], indent: string) =>
    values
      .map((hex, index) => `${indent}${["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"][index]}: ${color(hex)}`)
      .join("\n");
  return `name: ${quoted(theme.name)}
accent: ${color(deriveHerdrAppColors(theme).accent)}
cursor: ${color(p.cursor)}
background: ${color(p.background)}
foreground: ${color(p.foreground)}
details: ${theme.appearance === "dark" ? "darker" : "lighter"}
terminal_colors:
  normal:
${block(ansi.slice(0, 8), "    ")}
  bright:
${block(ansi.slice(8), "    ")}
`;
}
