import { ansiList, cursorText, selectionForeground } from "../palette";
import type { Theme } from "../schema";

/**
 * foot accepts RRGGBB values without a leading #. A named theme can be kept
 * separate from foot.ini and pulled in with the include directive.
 */
export function serializeFoot(theme: Theme): string {
  const p = theme.palette;
  const hex = (value: string) => value.replace(/^#/, "");
  const ansi = ansiList(p.ansi);
  const section = theme.appearance === "dark" ? "[colors-dark]" : "[colors-light]";
  const lines = [
    section,
    `background=${hex(p.background)}`,
    `foreground=${hex(p.foreground)}`,
    `cursor=${hex(cursorText(theme))} ${hex(p.cursor)}`,
    `selection-foreground=${hex(selectionForeground(theme))}`,
    `selection-background=${hex(p.selectionBackground)}`,
  ];
  ansi.slice(0, 8).forEach((color, index) => lines.push(`regular${index}=${hex(color)}`));
  ansi.slice(8).forEach((color, index) => lines.push(`bright${index}=${hex(color)}`));
  return `${lines.join("\n")}\n`;
}
