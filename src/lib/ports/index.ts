import type { Theme } from "../schema";
import { serializeHerdrApp } from "./herdr-app";
import { serializeWarp } from "./warp";
import { serializeWezterm } from "./wezterm";
import {
  serializeAlacritty,
  serializeGhostty,
  serializeIterm2,
  serializeKitty,
  serializeWindowsTerminal,
} from "./targets";

export interface PortTarget {
  slug: string;
  name: string;
  extension: string;
  mime: string;
  serialize: (theme: Theme) => string;
}

export const ports: PortTarget[] = [
  {
    slug: "herdr-app",
    name: "Herdr App",
    extension: "json",
    mime: "application/json",
    serialize: serializeHerdrApp,
  },
  {
    slug: "ghostty",
    name: "Ghostty",
    extension: "conf",
    mime: "text/plain",
    serialize: serializeGhostty,
  },
  {
    slug: "alacritty",
    name: "Alacritty",
    extension: "toml",
    mime: "text/plain",
    serialize: serializeAlacritty,
  },
  {
    slug: "warp",
    name: "Warp",
    extension: "yaml",
    mime: "text/yaml",
    serialize: serializeWarp,
  },
  {
    slug: "wezterm",
    name: "WezTerm",
    extension: "lua",
    mime: "text/plain",
    serialize: serializeWezterm,
  },
  {
    slug: "kitty",
    name: "Kitty",
    extension: "conf",
    mime: "text/plain",
    serialize: serializeKitty,
  },
  {
    slug: "iterm2",
    name: "iTerm2",
    extension: "itermcolors",
    mime: "application/xml",
    serialize: serializeIterm2,
  },
  {
    slug: "windows-terminal",
    name: "Windows Terminal",
    extension: "json",
    mime: "application/json",
    serialize: serializeWindowsTerminal,
  },
];

export function getPort(slug: string): PortTarget | undefined {
  return ports.find((port) => port.slug === slug);
}

export function portFileName(theme: Theme, port: PortTarget): string {
  return `${theme.family}-${theme.slug}.${port.extension}`;
}
