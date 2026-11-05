import type { APIRoute } from "astro";
import { targets } from "../data/targets";
import { contrast } from "../lib/color";
import { allThemes } from "../lib/data";
import { ansiPairs } from "../lib/palette";
import { absoluteUrl, terminalThemePath } from "../lib/routes";

export const GET: APIRoute = () => {
  const lines = [
    "# Terminal Themes — full catalog",
    "",
    "Every cataloged theme with its 22 colors, body contrast, and provenance.",
    "",
  ];
  for (const theme of allThemes()) {
    lines.push(`## ${theme.name}`, "");
    lines.push(`- URL: ${absoluteUrl(`themes/${theme.family}/${theme.slug}`)}`);
    for (const target of targets) {
      lines.push(`- ${target.name}: ${absoluteUrl(terminalThemePath(theme, target))}`);
    }
    lines.push(`- Appearance: ${theme.appearance}`);
    lines.push(`- Background: ${theme.palette.background}`);
    lines.push(`- Foreground: ${theme.palette.foreground}`);
    lines.push(`- Cursor: ${theme.palette.cursor}`);
    lines.push(`- Selection: ${theme.palette.selectionBackground}`);
    lines.push(`- Body contrast: ${contrast(theme.palette.foreground, theme.palette.background).toFixed(2)}:1`);
    lines.push(`- Author: ${theme.source.author}`);
    lines.push(`- License: ${theme.source.license}`);
    if (theme.source.upstream) lines.push(`- Upstream: ${theme.source.upstream}`);
    lines.push("", "| Slot | Hex |", "| --- | --- |");
    for (const { name, hex } of ansiPairs(theme.palette.ansi)) lines.push(`| ${name} | ${hex} |`);
    lines.push("");
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
