import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { generatedDescription, allThemes } from "../lib/data";

export const GET: APIRoute = () =>
  rss({
    title: "Terminal Themes",
    description: "New terminal color schemes with native exports for every supported terminal.",
    site: "https://terminalthemes.iwwi.app",
    items: allThemes()
      .slice(0, 50)
      .map((theme) => ({
        title: theme.name,
        link: `/themes/${theme.family}/${theme.slug}/`,
        description: generatedDescription(theme, "en"),
        pubDate: new Date(theme.meta.updatedAt),
      })),
    customData: "<language>en</language>",
  });
