import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { allThemes } from "../../../lib/data";
import { renderDefaultOg, renderHerdrAppPreview } from "../../../lib/preview";

const fontPath = join(process.cwd(), "public/fonts/JetBrainsMono-Regular.ttf");

export function getStaticPaths() {
  return (["en", "zh"] as const).flatMap((locale) => [
    { params: { locale, file: "default" }, props: { locale } },
    ...allThemes().map((theme) => ({
      params: { locale, file: `${theme.family}-${theme.slug}` },
      props: { locale, theme },
    })),
  ]);
}

export const GET: APIRoute = ({ props }) => {
  const svg = props.theme
    ? renderHerdrAppPreview(props.theme, { height: 630, og: true })
    : renderDefaultOg(props.locale);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: {
      fontFiles: [fontPath],
      loadSystemFonts: false,
      defaultFontFamily: "JetBrains Mono",
    },
  });
  const png = resvg.render().asPng();
  return new Response(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=604800",
    },
  });
};
