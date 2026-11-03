import type { APIRoute } from "astro";
import { allThemes } from "../../../lib/data";
import { ports } from "../../../lib/ports";

export function getStaticPaths() {
  return ports.flatMap((port) =>
    allThemes().map((theme) => ({
      params: {
        target: port.slug,
        file: `${theme.family}-${theme.slug}.${port.extension}`,
      },
      props: { port, theme },
    })),
  );
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.port.serialize(props.theme), {
    headers: {
      "content-type": `${props.port.mime}; charset=utf-8`,
      "content-disposition": `attachment; filename="${props.theme.family}-${props.theme.slug}.${props.port.extension}"`,
      "x-robots-tag": "noindex",
      "cache-control": "public, max-age=604800",
    },
  });
