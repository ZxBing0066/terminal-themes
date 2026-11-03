import type { APIRoute } from "astro";
import { allThemes } from "../../../../lib/data";

export function getStaticPaths() {
  return allThemes().map((theme) => ({
    params: { family: theme.family, slug: theme.slug },
    props: { theme },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(`${JSON.stringify(props.theme, null, 2)}\n`, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
