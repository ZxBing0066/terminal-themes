import { ansiList, cursorText } from "../palette";
import type { Theme } from "../schema";

/**
 * Hyper themes are local plugins. The decorateConfig hook merges this
 * theme's colors into the user's existing config instead of replacing it.
 */
export function serializeHyper(theme: Theme): string {
  const p = theme.palette;
  const c = theme.palette.ansi;
  const ansi = ansiList(c);
  const quote = (value: string) => JSON.stringify(value);
  const names = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const colors = [
    ...names.map((name, index) => `${name}: ${quote(ansi[index])}`),
    ...names.map((name, index) => `light${name[0].toUpperCase()}${name.slice(1)}: ${quote(ansi[index + 8])}`),
  ];
  return `exports.decorateConfig = (config) => ({
  ...config,
  foregroundColor: ${quote(p.foreground)},
  backgroundColor: ${quote(p.background)},
  borderColor: ${quote(p.ansi.brightBlack)},
  cursorColor: ${quote(p.cursor)},
  cursorAccentColor: ${quote(cursorText(theme))},
  selectionColor: ${quote(p.selectionBackground)},
  colors: {
    ...config.colors,
    ${colors.join(",\n    ")}
  }
});
`;
}
