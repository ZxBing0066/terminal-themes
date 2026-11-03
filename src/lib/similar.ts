import { deltaE00 } from "./color";
import { allThemes } from "./data";
import { ansiList } from "./palette";
import type { Theme } from "./schema";

export function paletteDistance(a: Theme, b: Theme): number {
  const pairs: Array<[string, string]> = [
    [a.palette.background, b.palette.background],
    [a.palette.foreground, b.palette.foreground],
    ...ansiList(a.palette.ansi).map((hex, index): [string, string] => [hex, ansiList(b.palette.ansi)[index]]),
  ];
  return pairs.reduce((sum, [left, right]) => sum + deltaE00(left, right), 0) / pairs.length;
}

export function similarThemes(theme: Theme, limit = 4): Array<{ theme: Theme; distance: number }> {
  return allThemes()
    .filter((candidate) => candidate.id !== theme.id)
    .map((candidate) => ({ theme: candidate, distance: paletteDistance(theme, candidate) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
