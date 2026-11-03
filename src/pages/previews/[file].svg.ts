import type { APIRoute } from "astro";
import { allThemes } from "../../lib/data";
import { renderHerdrAppPreview } from "../../lib/preview";

export function getStaticPaths() {
  return allThemes().map((theme) => ({
    params: { file: `${theme.family}-${theme.slug}` },
    props: { theme },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(renderHerdrAppPreview(props.theme), {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=604800",
    },
  });
