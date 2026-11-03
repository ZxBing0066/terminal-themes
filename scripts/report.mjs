import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = "themes";
const families = readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory());
const themes = [];
for (const family of families) {
  for (const file of readdirSync(join(root, family.name))) {
    if (!file.endsWith(".json") || file === "family.json") continue;
    themes.push(JSON.parse(readFileSync(join(root, family.name, file), "utf8")));
  }
}
const licenses = {};
const unknown = [];
for (const theme of themes) {
  licenses[theme.source.license] = (licenses[theme.source.license] ?? 0) + 1;
  if (theme.source.license === "unknown") unknown.push(theme.id);
}
const lines = [
  "# Import report",
  "",
  `- Themes: ${themes.length}`,
  `- Families: ${families.length}`,
  `- Licenses: ${Object.entries(licenses).map(([key, value]) => `${key} (${value})`).join(", ")}`,
  "",
  "## Unknown licenses",
  "",
  ...unknown.map((id) => `- ${id}`),
  "",
  "## Source policy",
  "",
  "Palette values come from upstream projects first. When upstream data is missing, values are read from the reference catalog's HTML and palette SVG; images are never stored or redistributed. Every record keeps its upstream, reference, author, and license.",
  "",
];
writeFileSync("docs/import-report.md", `${lines.join("\n")}\n`);
console.log(`themes=${themes.length} families=${families.length} unknown=${unknown.length}`);
