import { describe, expect, it } from "vitest";
import { contrast, mix, shade } from "../src/lib/color";
import { ports } from "../src/lib/ports";
import { deriveHerdrAppColors } from "../src/lib/ports/herdr-app";
import { catppuccinMocha } from "./fixtures";

describe("color math", () => {
  it("mixes toward the second color", () => {
    const mid = mix("#000000", "#ffffff", 0.5);
    expect(contrast(mid, "#000000")).toBeGreaterThan(1);
    expect(contrast(mid, "#ffffff")).toBeGreaterThan(1);
  });

  it("shades in oklch", () => {
    const lighter = shade("#1e1e2e", 0.04);
    expect(contrast(lighter, "#1e1e2e")).toBeGreaterThan(1);
  });
});

describe("herdr app colors", () => {
  const colors = deriveHerdrAppColors(catppuccinMocha);

  it("derives every token", () => {
    expect(Object.keys(colors)).toHaveLength(22);
    for (const value of Object.values(colors)) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("keeps accent and foreground legible", () => {
    expect(contrast(colors.accent, colors.surface), JSON.stringify(colors)).toBeGreaterThanOrEqual(3);
    expect(contrast(colors.accent_foreground, colors.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(colors.foreground, catppuccinMocha.palette.background)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("port serializers", () => {
  for (const port of ports) {
    it(`serializes ${port.slug}`, () => {
      const output = port.serialize(catppuccinMocha);
      expect(output.length).toBeGreaterThan(20);
      if (port.slug !== "iterm2") expect(output).toContain("#");
    });
  }

  it("herdr app output is a valid theme file", () => {
    const port = ports.find((candidate) => candidate.slug === "herdr-app")!;
    const file = JSON.parse(port.serialize(catppuccinMocha));
    expect(file.background).toBe("#1e1e2e");
    expect(file.ansi).toHaveLength(16);
    expect(file.colors.accent).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("ghostty output uses palette lines", () => {
    const port = ports.find((candidate) => candidate.slug === "ghostty")!;
    expect(port.serialize(catppuccinMocha)).toContain("palette = 0=#45475a");
  });

  it("windows terminal output parses", () => {
    const port = ports.find((candidate) => candidate.slug === "windows-terminal")!;
    const scheme = JSON.parse(port.serialize(catppuccinMocha));
    expect(scheme.brightPurple).toBe("#f2aede");
    expect(scheme.name).toBe("Catppuccin Mocha");
  });
});
