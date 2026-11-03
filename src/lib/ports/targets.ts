import { ansiList, cursorText, selectionForeground } from "../palette";
import type { Theme } from "../schema";

export function serializeGhostty(theme: Theme): string {
  const p = theme.palette;
  const lines = [
    `background = ${p.background}`,
    `foreground = ${p.foreground}`,
    `cursor-color = ${p.cursor}`,
    `cursor-text = ${cursorText(theme)}`,
    `selection-background = ${p.selectionBackground}`,
    `selection-foreground = ${selectionForeground(theme)}`,
    "",
  ];
  ansiList(p.ansi).forEach((hex, index) => {
    lines.push(`palette = ${index}=${hex}`);
  });
  return `${lines.join("\n")}\n`;
}

export function serializeAlacritty(theme: Theme): string {
  const p = theme.palette;
  const a = p.ansi;
  return `[colors.primary]
background = "${p.background}"
foreground = "${p.foreground}"

[colors.cursor]
text = "${cursorText(theme)}"
cursor = "${p.cursor}"

[colors.selection]
text = "${selectionForeground(theme)}"
background = "${p.selectionBackground}"

[colors.normal]
black = "${a.black}"
red = "${a.red}"
green = "${a.green}"
yellow = "${a.yellow}"
blue = "${a.blue}"
magenta = "${a.magenta}"
cyan = "${a.cyan}"
white = "${a.white}"

[colors.bright]
black = "${a.brightBlack}"
red = "${a.brightRed}"
green = "${a.brightGreen}"
yellow = "${a.brightYellow}"
blue = "${a.brightBlue}"
magenta = "${a.brightMagenta}"
cyan = "${a.brightCyan}"
white = "${a.brightWhite}"
`;
}

export function serializeKitty(theme: Theme): string {
  const p = theme.palette;
  const lines = [
    `background ${p.background}`,
    `foreground ${p.foreground}`,
    `cursor ${p.cursor}`,
    `cursor_text_color ${cursorText(theme)}`,
    `selection_background ${p.selectionBackground}`,
    `selection_foreground ${selectionForeground(theme)}`,
  ];
  ansiList(p.ansi).forEach((hex, index) => {
    lines.push(`color${index} ${hex}`);
  });
  return `${lines.join("\n")}\n`;
}

function plistColor(hex: string, indent: string): string {
  const value = Number.parseInt(hex.slice(1), 16);
  const r = ((value >> 16) & 0xff) / 255;
  const g = ((value >> 8) & 0xff) / 255;
  const b = (value & 0xff) / 255;
  return [
    `${indent}<dict>`,
    `${indent}  <key>Color Space String</key>`,
    `${indent}  <string>sRGB</string>`,
    `${indent}  <key>Red Component</key>`,
    `${indent}  <real>${r.toFixed(6)}</real>`,
    `${indent}  <key>Green Component</key>`,
    `${indent}  <real>${g.toFixed(6)}</real>`,
    `${indent}  <key>Blue Component</key>`,
    `${indent}  <real>${b.toFixed(6)}</real>`,
    `${indent}</dict>`,
  ].join("\n");
}

export function serializeIterm2(theme: Theme): string {
  const p = theme.palette;
  const entries: Array<[string, string]> = [
    ...ansiList(p.ansi).map((hex, index): [string, string] => [`Ansi ${index} Color`, hex]),
    ["Background Color", p.background],
    ["Foreground Color", p.foreground],
    ["Cursor Color", p.cursor],
    ["Cursor Text Color", cursorText(theme)],
    ["Selection Color", p.selectionBackground],
    ["Selected Text Color", selectionForeground(theme)],
  ];
  const body = entries
    .map(([key, hex]) => `\t<key>${key}</key>\n${plistColor(hex, "\t")}`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${body}
</dict>
</plist>
`;
}

export function serializeWindowsTerminal(theme: Theme): string {
  const p = theme.palette;
  const a = p.ansi;
  return `${JSON.stringify(
    {
      name: theme.name,
      background: p.background,
      foreground: p.foreground,
      cursorColor: p.cursor,
      selectionBackground: p.selectionBackground,
      black: a.black,
      red: a.red,
      green: a.green,
      yellow: a.yellow,
      blue: a.blue,
      purple: a.magenta,
      cyan: a.cyan,
      white: a.white,
      brightBlack: a.brightBlack,
      brightRed: a.brightRed,
      brightGreen: a.brightGreen,
      brightYellow: a.brightYellow,
      brightBlue: a.brightBlue,
      brightPurple: a.brightMagenta,
      brightCyan: a.brightCyan,
      brightWhite: a.brightWhite,
    },
    null,
    2,
  )}\n`;
}
