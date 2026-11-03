# Static-only site with a client-side editor

The site ships as static HTML, JSON, and PNG on Cloudflare Pages; there is no application server. The editor runs entirely in the browser, keeps its state in the URL fragment, and shares the same TypeScript port generator as the build. Accounts, votes, comments, and server-side submissions are out of scope; contributions go through GitHub pull requests.

## Consequences

- The port generator must be isomorphic: the same code runs in Node at build time and in the browser in the editor, so build output and editor output cannot drift.
- Share links carry the palette in the fragment and can be long; compressed encoding is required.
- Moderation, spam control, and analytics are external or absent; analytics must be cookieless.
- No server means no per-user state; saved palettes live in `localStorage` or in exported files.
