import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://terminalthemes.iwwi.app",
  output: "static",
  trailingSlash: "always",
  integrations: [preact()],
  build: { format: "directory" },
});
