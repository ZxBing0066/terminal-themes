import type { APIRoute } from "astro";
import { allThemes } from "../../lib/data";
import { ports } from "../../lib/ports";
import { renderPortPreview } from "../../lib/preview";

export function getStaticPaths() {
  const themes = allThemes();
  return themes.flatMap((theme) => [
    {
      params: { file: `${theme.family}-${theme.slug}` },
      props: { theme, port: ports[0] },
    },
    ...ports.map((port) => ({
      params: { file: `${theme.family}-${theme.slug}-${port.slug}` },
      props: { theme, port },
    })),
  ]);
}

export const GET: APIRoute = ({ props }) =>
  new Response(renderPortPreview(props.theme, props.port), {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=604800",
    },
  });
