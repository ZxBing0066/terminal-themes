// Import palette values from the reference catalog (HTML + SVG, data only).
// Upstream files, images, and prose are never copied.

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { clampChroma, converter, formatHex, wcagContrast, wcagLuminance } from "culori";

const BASE = "https://terminalcolors.com";
const OUT = "themes";
const today = new Date().toISOString().slice(0, 10);
const force = process.argv.includes("--force");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

const toOklch = converter("oklch");

function mix(a, b, t) {
  const A = toOklch(a);
  const B = toOklch(b);
  const ac = A.c ?? 0;
  const bc = B.c ?? 0;
  let h;
  if (ac < 1e-6) h = B.h ?? 0;
  else if (bc < 1e-6) h = A.h ?? 0;
  else {
    const ah = A.h ?? 0;
    const bh = B.h ?? 0;
    const dh = ((bh - ah + 540) % 360) - 180;
    h = ah + dh * t;
  }
  const color = clampChroma(
    { mode: "oklch", l: (A.l ?? 0) + ((B.l ?? 0) - (A.l ?? 0)) * t, c: ac + (bc - ac) * t, h },
    "oklch",
  );
  return formatHex(color).toLowerCase();
}

function bestOn(bg) {
  return wcagContrast("#000000", bg) >= wcagContrast("#ffffff", bg) ? "#000000" : "#ffffff";
}

const FAMILY_NAMES = {
  apprentice: "Apprentice",
  ayu: "Ayu",
  catppuccin: "Catppuccin",
  cobalt2: "Cobalt2",
  deus: "Deus",
  dracula: "Dracula",
  everforest: "Everforest",
  github: "GitHub",
  gotham: "Gotham",
  gruvbox: "Gruvbox",
  iceberg: "Iceberg",
  jellybeans: "Jellybeans",
  kanagawa: "Kanagawa",
  lucario: "Lucario",
  miasma: "Miasma",
  moonfly: "Moonfly",
  "night-owl": "Night Owl",
  nightfly: "Nightfly",
  nightfox: "Nightfox",
  noctis: "Noctis",
  nord: "Nord",
  nordic: "Nordic",
  one: "One",
  "one-half": "One Half",
  panda: "Panda",
  posterpole: "Posterpole",
  "rose-pine": "Rosé Pine",
  seoul256: "Seoul256",
  "shades-of-purple": "Shades of Purple",
  solarized: "Solarized",
  sonokai: "Sonokai",
  srcery: "Srcery",
  tender: "Tender",
  "tokyo-night": "Tokyo Night",
  tomorrow: "Tomorrow",
  zenbones: "Zenbones",
};

const VARIANT_NAMES = {
  frappe: "Frappé",
  mocha: "Mocha",
  macchiato: "Macchiato",
  latte: "Latte",
  "dark-hard-contrast": "Dark Hard Contrast",
  "dark-soft-contrast": "Dark Soft Contrast",
  "dark-dimmed": "Dark Dimmed",
  "dark-high-contrast": "Dark High Contrast",
  "dark-colorblind": "Dark Colorblind",
  "night-eighties": "Night Eighties",
  "night-blue": "Night Blue",
  "night-bright": "Night Bright",
  "zenwritten-dark": "Zenwritten Dark",
  "zenwritten-light": "Zenwritten Light",
  "neobones-dark": "Neobones Dark",
  "neobones-light": "Neobones Light",
  default: "Default",
};

const SOURCES = {
  catppuccin: {
    upstream: "https://github.com/catppuccin/catppuccin",
    author: "Catppuccin",
    license: "MIT",
    licenseUrl: "https://github.com/catppuccin/catppuccin/blob/main/LICENSE",
  },
  "tokyo-night": {
    upstream: "https://github.com/folke/tokyonight.nvim",
    author: "Folke Lemaitre",
    license: "MIT",
    licenseUrl: "https://github.com/folke/tokyonight.nvim/blob/main/LICENSE",
  },
  dracula: {
    upstream: "https://github.com/dracula/dracula-theme",
    author: "Dracula Theme",
    license: "MIT",
    licenseUrl: "https://github.com/dracula/dracula-theme/blob/main/LICENSE",
  },
  nord: {
    upstream: "https://github.com/nordtheme/nord",
    author: "Nord Theme",
    license: "MIT",
    licenseUrl: "https://github.com/nordtheme/nord/blob/develop/license.md",
  },
  gruvbox: {
    upstream: "https://github.com/morhetz/gruvbox",
    author: "Pavel Pertsev",
    license: "MIT",
    licenseUrl: "https://github.com/morhetz/gruvbox/blob/master/LICENSE.txt",
  },
  solarized: {
    upstream: "https://github.com/altercation/solarized",
    author: "Ethan Schoonover",
    license: "MIT",
    licenseUrl: "https://github.com/altercation/solarized/blob/master/LICENSE",
  },
  kanagawa: {
    upstream: "https://github.com/rebelot/kanagawa.nvim",
    author: "Tommaso Laurenzi",
    license: "MIT",
    licenseUrl: "https://github.com/rebelot/kanagawa.nvim/blob/master/LICENSE",
  },
  "rose-pine": {
    upstream: "https://github.com/rose-pine/rose-pine-theme",
    author: "Rosé Pine",
    license: "MIT",
    licenseUrl: "https://github.com/rose-pine/rose-pine-theme/blob/main/LICENSE",
  },
  everforest: {
    upstream: "https://github.com/sainnhe/everforest",
    author: "sainnhe",
    license: "MIT",
    licenseUrl: "https://github.com/sainnhe/everforest/blob/master/LICENSE",
  },
  nightfox: {
    upstream: "https://github.com/EdenEast/nightfox.nvim",
    author: "Eden East",
    license: "MIT",
    licenseUrl: "https://github.com/EdenEast/nightfox.nvim/blob/main/LICENSE",
  },
  sonokai: {
    upstream: "https://github.com/sainnhe/sonokai",
    author: "sainnhe",
    license: "MIT",
    licenseUrl: "https://github.com/sainnhe/sonokai/blob/master/LICENSE",
  },
  ayu: {
    upstream: "https://github.com/ayu-theme/ayu-colors",
    author: "Ayu Theme",
    license: "MIT",
    licenseUrl: "https://github.com/ayu-theme/ayu-colors/blob/master/LICENSE",
  },
  github: {
    upstream: "https://github.com/primer/github-vscode-theme",
    author: "GitHub",
    license: "MIT",
    licenseUrl: "https://github.com/primer/github-vscode-theme/blob/main/LICENSE",
  },
  "night-owl": {
    upstream: "https://github.com/sdras/night-owl-vscode-theme",
    author: "Sarah Drasner",
    license: "MIT",
    licenseUrl: "https://github.com/sdras/night-owl-vscode-theme/blob/main/LICENSE",
  },
  "shades-of-purple": {
    upstream: "https://github.com/ahmadawais/shades-of-purple-vscode",
    author: "Ahmad Awais",
    license: "MIT",
    licenseUrl: "https://github.com/ahmadawais/shades-of-purple-vscode/blob/master/LICENSE",
  },
  tomorrow: {
    upstream: "https://github.com/chriskempson/tomorrow-theme",
    author: "Chris Kempson",
    license: "MIT",
    licenseUrl: "https://github.com/chriskempson/tomorrow-theme/blob/master/LICENSE.md",
  },
  zenbones: {
    upstream: "https://github.com/zenbones-theme/zenbones.nvim",
    author: "Zenbones",
    license: "MIT",
    licenseUrl: "https://github.com/zenbones-theme/zenbones.nvim/blob/main/LICENSE",
  },
  moonfly: {
    upstream: "https://github.com/bluz71/vim-moonfly-colors",
    author: "bluz71",
    license: "MIT",
    licenseUrl: "https://github.com/bluz71/vim-moonfly-colors/blob/master/LICENSE",
  },
  nightfly: {
    upstream: "https://github.com/bluz71/vim-nightfly-colors",
    author: "bluz71",
    license: "MIT",
    licenseUrl: "https://github.com/bluz71/vim-nightfly-colors/blob/master/LICENSE",
  },
  srcery: {
    upstream: "https://github.com/srcery-colors/srcery-vim",
    author: "Srcery",
    license: "MIT",
    licenseUrl: "https://github.com/srcery-colors/srcery-vim/blob/master/LICENSE",
  },
  seoul256: {
    upstream: "https://github.com/junegunn/seoul256.vim",
    author: "Junegunn Choi",
    license: "MIT",
    licenseUrl: "https://github.com/junegunn/seoul256.vim/blob/master/LICENSE",
  },
  iceberg: {
    upstream: "https://github.com/cocopon/iceberg.vim",
    author: "cocopon",
    license: "MIT",
    licenseUrl: "https://github.com/cocopon/iceberg.vim/blob/master/LICENSE",
  },
  jellybeans: {
    upstream: "https://github.com/nanotech/jellybeans.vim",
    author: "nanotech",
    license: "MIT",
    licenseUrl: "https://github.com/nanotech/jellybeans.vim/blob/master/LICENSE",
  },
  apprentice: {
    upstream: "https://github.com/romainl/Apprentice",
    author: "Romain Lafourcade",
    license: "MIT",
    licenseUrl: "https://github.com/romainl/Apprentice/blob/master/LICENSE",
  },
};

function titleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function familyName(id) {
  return FAMILY_NAMES[id] ?? titleCase(id);
}

function variantName(id) {
  return VARIANT_NAMES[id] ?? titleCase(id);
}

async function fetchText(url, attempt = 0) {
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "terminalthemes-import/1.0 (+https://terminalthemes.iwwi.app)" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return await response.text();
  } catch (error) {
    if (attempt >= 3) throw error;
    await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    return fetchText(url, attempt + 1);
  }
}

function parseSvg(svg, url) {
  const bg = svg.match(/<rect x="0" y="0" width="500" height="300" fill="(#[0-9a-fA-F]{6})"/)?.[1];
  let fg = svg.match(/<text[^>]*fill="(#[0-9a-fA-F]{6})"[^>]*>~<\/text>/)?.[1];
  fg ??= svg.match(/<text[^>]*fill="(#[0-9a-fA-F]{6})"[^>]*>\+<\/text>/)?.[1];

  const normal = new Array(8).fill(null);
  const bright = new Array(8).fill(null);
  for (const line of svg.split("\n")) {
    const fill = line.match(/<text[^>]*fill="(#[0-9a-fA-F]{6})"/)?.[1];
    if (!fill) continue;
    const normalMatch = line.match(/>3([0-7])m<\/tspan>/);
    const brightMatch = line.match(/>1;3([0-7])m<\/tspan>/);
    if (brightMatch) bright[Number(brightMatch[1])] = fill;
    else if (normalMatch) normal[Number(normalMatch[1])] = fill;
  }

  if (!bg || !fg || normal.some((value) => !value) || bright.some((value) => !value)) {
    throw new Error(`could not parse palette from ${url}`);
  }
  return { background: bg.toLowerCase(), foreground: fg.toLowerCase(), ansi: [...normal, ...bright] };
}

function tagsFor(palette) {
  const tags = [];
  const dark = wcagLuminance(palette.background) < 0.45;
  tags.push(dark ? "dark" : "light");
  const ratio = wcagContrast(palette.foreground, palette.background);
  tags.push(ratio >= 7 ? "high-contrast" : ratio < 4.5 ? "low-contrast" : "balanced");
  const warm = palette.ansi.slice(1, 7).some((hex) => {
    const h = toOklch(hex)?.h ?? 0;
    return (h >= 15 && h <= 75) || h >= 330;
  });
  tags.push(warm ? "warm" : "cool");
  return tags;
}

async function loadIndex() {
  const html = await fetchText(`${BASE}/themes`);
  const links = new Set(
    [...html.matchAll(/href="(\/themes\/[a-z0-9-]+\/[a-z0-9-]+\/)"/g)].map((match) => match[1]),
  );
  const families = [
    ...new Set([...html.matchAll(/href="(\/themes\/[a-z0-9-]+\/)"/g)].map((match) => match[1])),
  ];
  const pages = await Promise.all(
    families.map(async (familyLink) => {
      const family = familyLink.split("/")[2];
      const page = await fetchText(`${BASE}${familyLink}`);
      const pattern = new RegExp(`href="(/themes/${family}/[a-z0-9-]+/)"`, "g");
      return [...page.matchAll(pattern)].map((match) => match[1]);
    }),
  );
  for (const pageLinks of pages) for (const link of pageLinks) links.add(link);
  return [...links];
}

async function importTheme(link) {
  const [, , family, slug] = link.split("/");
  const id = `${family}/${slug}`;
  const target = join(OUT, family, `${slug}.json`);
  if (!force && existsSync(target)) return { id, skipped: true };

  const page = await fetchText(`${BASE}${link}`);
  const svgPath = page.match(/<img src="(\/images\/colors\/[^"]+\.svg)"/)?.[1];
  if (!svgPath) throw new Error(`no palette svg on ${link}`);
  const svg = await fetchText(`${BASE}${svgPath}`);
  const palette = parseSvg(svg, svgPath);

  const selection =
    wcagContrast(palette.ansi[8], palette.background) >= 1.4
      ? palette.ansi[8]
      : mix(palette.background, palette.foreground, 0.18);
  const selectionForeground =
    wcagContrast(palette.foreground, selection) >= 3 ? palette.foreground : bestOn(selection);

  const name = `${familyName(family)} ${variantName(slug)}`;
  const source = SOURCES[family] ?? {
    author: familyName(family),
    license: "unknown",
  };
  const ansiNames = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "brightBlack",
    "brightRed",
    "brightGreen",
    "brightYellow",
    "brightBlue",
    "brightMagenta",
    "brightCyan",
    "brightWhite",
  ];
  const ansi = Object.fromEntries(ansiNames.map((key, index) => [key, palette.ansi[index]]));

  const theme = {
    schemaVersion: 1,
    id,
    family,
    slug,
    name,
    appearance: wcagLuminance(palette.background) < 0.45 ? "dark" : "light",
    palette: {
      background: palette.background,
      foreground: palette.foreground,
      cursor: palette.foreground,
      cursorText: palette.background,
      selectionBackground: selection,
      selectionForeground,
      ansi,
    },
    source: {
      ...source,
      reference: `${BASE}${link}`,
    },
    tags: tagsFor(palette),
    meta: { addedAt: today, updatedAt: today },
  };

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(theme, null, 2)}\n`);

  const familyTarget = join(OUT, family, "family.json");
  if (!existsSync(familyTarget)) {
    const familyFile = {
      schemaVersion: 1,
      id: family,
      name: familyName(family),
      description: {
        en: `${familyName(family)} is a terminal color scheme family with cataloged variants for Herdr, Ghostty, Alacritty, Kitty, iTerm2, and Windows Terminal.`,
        zh: `${familyName(family)} 是一套终端配色方案家族，提供适配 Herdr、Ghostty、Alacritty、Kitty、iTerm2 和 Windows Terminal 的变体。`,
      },
      source: { ...source, reference: `${BASE}/themes/${family}/` },
      tags: [],
    };
    await writeFile(familyTarget, `${JSON.stringify(familyFile, null, 2)}\n`);
  }

  return { id, skipped: false };
}

const links = (await loadIndex()).slice(0, limit);
console.log(`found ${links.length} themes`);
let done = 0;
let failed = 0;
const queue = [...links];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const link = queue.shift();
    try {
      const result = await importTheme(link);
      done += 1;
      if (!result.skipped) console.log(`ok ${result.id}`);
    } catch (error) {
      failed += 1;
      console.error(`FAIL ${link}: ${error.message}`);
    }
  }
});
await Promise.all(workers);
console.log(`imported ${done}, failed ${failed}`);
if (failed) process.exitCode = 1;
