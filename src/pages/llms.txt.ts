import type { APIRoute } from "astro";
import { absoluteFileUrl, absoluteUrl } from "../lib/routes";
import { allFamilies, allThemes } from "../lib/data";
import { guides } from "../lib/guides";
import { targets } from "../data/targets";

export const GET: APIRoute = () => {
  const lines = [
    "# Terminal Themes",
    "",
    "> A static, open-source catalog of terminal color schemes with exports for the Herdr app, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.",
    "",
    "## Catalog",
    "",
    `- [Theme index](${absoluteUrl("themes")})`,
    `- [JSON catalog](${absoluteFileUrl("themes.json")})`,
    `- [Editor](${absoluteUrl("editor")})`,
    "",
    "## Targets",
    "",
    ...targets.map((target) => `- [${target.name}](${absoluteUrl(target.slug)})`),
    "",
    "## Families",
    "",
    ...allFamilies().map((family) => `- [${family.name}](${absoluteUrl(`themes/${family.id}`)})`),
    "",
    "## Guides",
    "",
    ...guides.map((guide) => `- [${guide.title.en}](${absoluteUrl(`guides/${guide.slug}`)})`),
    "",
    "## Themes",
    "",
    ...allThemes().map(
      (theme) =>
        `- [${theme.name}](${absoluteFileUrl(`themes/${theme.family}/${theme.slug}/theme.json`)})`,
    ),
    "",
    `- [Full dataset](${absoluteFileUrl("llms-full.txt")})`,
    "",
    "## Per-theme JSON",
    "",
    "Every theme page links to a stable JSON document at /themes/{family}/{slug}/theme.json.",
    "",
    "## Citation",
    "",
    "Cite the theme page URL and its upstream source. Palette values are facts; each theme records its author and license.",
    "",
  ];
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
