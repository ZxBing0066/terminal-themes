import type { APIRoute } from "astro";

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /ports/
Disallow: /search/

Sitemap: https://terminalthemes.iwwi.app/sitemap.xml
`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
