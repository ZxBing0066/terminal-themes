import { ansiList, cursorText, selectionForeground } from "../palette";
import type { Theme } from "../schema";

/**
 * WezTerm reads a Lua color table. Exporting a table that can be loaded with
 * dofile keeps the theme separate from the user's wezterm.lua.
 */
export function serializeWezterm(theme: Theme): string {
  const p = theme.palette;
  const ansi = ansiList(p.ansi);
  const quote = (hex: string) => `"${hex}"`;
  const list = (values: string[]) => values.map((hex) => `    ${quote(hex)},`).join("\n");
  return `return {
  foreground = ${quote(p.foreground)},
  background = ${quote(p.background)},
  cursor_bg = ${quote(p.cursor)},
  cursor_fg = ${quote(cursorText(theme))},
  cursor_border = ${quote(p.cursor)},
  selection_bg = ${quote(p.selectionBackground)},
  selection_fg = ${quote(selectionForeground(theme))},
  scrollbar_thumb = ${quote(p.ansi.brightBlack)},
  split = ${quote(p.ansi.brightBlack)},
  ansi = {
${list(ansi.slice(0, 8))}
  },
  brights = {
${list(ansi.slice(8))}
  },
}
`;
}
