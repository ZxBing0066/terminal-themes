# Deploy

## Cloudflare Pages

1. Create a Pages project from the GitHub repository `ZxBing0066/terminal-themes`.
2. Framework preset: Astro (or none).
3. Build command: `pnpm build`
4. Build output directory: `dist`
5. Environment variable: `NODE_VERSION=22`
6. Deploy. The first deployment is available at `https://<project>.pages.dev`.

`public/_headers` and `public/_redirects` are copied into `dist` and applied by Pages.

## DNS

Canonical host: `terminalthemes.iwwi.app`.

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `terminalthemes` | `<project>.pages.dev` | Proxied |
| CNAME | `themes` | `<project>.pages.dev` | Proxied |

Add `terminalthemes.iwwi.app` as a custom domain on the Pages project. Cloudflare creates or validates the CNAME automatically when the zone is on Cloudflare.

## Redirects

Create a Cloudflare Redirect Rule for the short host:

- When hostname equals `themes.iwwi.app`
- Then redirect to `https://terminalthemes.iwwi.app/` with status 301, preserving the path and query string.

The repository `_redirects` file also maps `/herdr` to `/herdr-app/` and normalizes trailing slashes.

## Verify

```sh
curl -sI https://terminalthemes.iwwi.app/ | head
curl -s https://terminalthemes.iwwi.app/sitemap.xml | head
curl -s https://terminalthemes.iwwi.app/llms.txt | head
```
