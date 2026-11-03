import type { APIRoute } from "astro";
import { absoluteUrl, alternatesFor, buildRoutes } from "../lib/routes";

const escape = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = buildRoutes().filter((page) => !(page.kind === "static" && page.slug === "search")).map((page) => {
    const alternates = alternatesFor(page);
    const lastmod = page.kind === "theme" ? page.theme.meta.updatedAt : today;
    return `<url>
  <loc>${escape(absoluteUrl(page.path))}</loc>
  <lastmod>${lastmod}</lastmod>
  <xhtml:link rel="alternate" hreflang="en" href="${escape(absoluteUrl(alternates.en))}" />
  <xhtml:link rel="alternate" hreflang="zh" href="${escape(absoluteUrl(alternates.zh))}" />
  <xhtml:link rel="alternate" hreflang="x-default" href="${escape(absoluteUrl(alternates.en))}" />
</url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
    { headers: { "content-type": "application/xml; charset=utf-8" } },
  );
};
