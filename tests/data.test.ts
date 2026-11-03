import { describe, expect, it } from "vitest";
import { deltaE00 } from "../src/lib/color";
import { allFamilies, allThemes, contrastRatio } from "../src/lib/data";
import { ansiList } from "../src/lib/palette";

describe("catalog", () => {
  const themes = allThemes();
  const families = allFamilies();

  it("has the reference catalog", () => {
    expect(families.length).toBeGreaterThanOrEqual(36);
    expect(themes.length).toBeGreaterThanOrEqual(100);
  });

  it("has unique ids and paths", () => {
    expect(new Set(themes.map((theme) => theme.id)).size).toBe(themes.length);
  });

  it("does not contain duplicate palettes", () => {
    for (let i = 0; i < themes.length; i += 1) {
      for (let j = i + 1; j < themes.length; j += 1) {
        const a = themes[i];
        const b = themes[j];
        const da = deltaE00(a.palette.background, b.palette.background);
        const df = deltaE00(a.palette.foreground, b.palette.foreground);
        const colorsA = ansiList(a.palette.ansi);
        const colorsB = ansiList(b.palette.ansi);
        const sameAnsi = colorsA.every((hex, index) => deltaE00(hex, colorsB[index]) < 1);
        expect(da < 1 && df < 1 && sameAnsi, `${a.id} duplicates ${b.id}`).toBe(false);
      }
    }
  });

  it("reports body contrast", () => {
    const ratios = themes.map((theme) => ({ id: theme.id, ratio: contrastRatio(theme) }));
    const low = ratios.filter((entry) => entry.ratio < 3);
    expect(low, JSON.stringify(low)).toEqual([]);
  });
});
