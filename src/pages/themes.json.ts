import type { APIRoute } from "astro";
import { allThemes } from "../lib/data";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(allThemes()), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
