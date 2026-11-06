import { ansiList, selectionForeground } from "../palette";
import type { Theme } from "../schema";

/**
 * Rio loads a named theme from ~/.config/rio/themes/<name>.toml. The file is
 * a [colors] table; config.toml points at it with theme = "<name>".
 */
export function serializeRio(theme: Theme): string {
  const p = theme.palette;
  const ansi = ansiList(p.ansi);
  const names = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const lines = [
    "[colors]",
    `background = "${p.background}"`,
    `foreground = "${p.foreground}"`,
    `cursor = "${p.cursor}"`,
    `selection-background = "${p.selectionBackground}"`,
    `selection-foreground = "${selectionForeground(theme)}"`,
    `tabs = "${p.ansi.brightBlack}"`,
    `tabs-active = "${p.foreground}"`,
  ];
  names.forEach((name, index) => lines.push(`${name} = "${ansi[index]}"`));
  names.forEach((name, index) => lines.push(`light-${name} = "${ansi[index + 8]}"`));
  return `${lines.join("\n")}\n`;
}
