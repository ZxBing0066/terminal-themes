import { describe, expect, it } from "vitest";
import { targets } from "../src/data/targets";
import { allThemes } from "../src/lib/data";
import { buildRoutes, terminalThemePath } from "../src/lib/routes";
import { agentPrompt } from "../src/lib/ports/install";
import { terminalThemeFaqs } from "../src/lib/terminalThemeFaq";
import { catppuccinMocha } from "./fixtures";

describe("terminal theme routes", () => {
  const routes = buildRoutes();
  const variants = routes.filter((page) => page.kind === "themeVariant");

  it("creates one variant for every theme and terminal in both locales", () => {
    expect(variants).toHaveLength(allThemes().length * targets.length * 2);
    expect(new Set(variants.map((page) => page.path)).size).toBe(variants.length);
  });

  it("adds one terminals index per locale", () => {
    const terminalIndexes = routes.filter((page) => page.kind === "terminals");
    expect(terminalIndexes.map((page) => page.path)).toEqual(["terminals", "zh/terminals"]);
  });

  it("uses terminal-first paths", () => {
    const path = terminalThemePath(catppuccinMocha, "ghostty");
    expect(path).toBe("ghostty/themes/catppuccin/mocha");
    expect(routes).toContainEqual(
      expect.objectContaining({
        kind: "themeVariant",
        path: "ghostty/themes/catppuccin/mocha",
        locale: "en",
      }),
    );
    expect(routes).toContainEqual(
      expect.objectContaining({
        kind: "themeVariant",
        path: "zh/ghostty/themes/catppuccin/mocha",
        locale: "zh",
      }),
    );
  });

  it("generates an agent install prompt with the page and native file", () => {
    const ghostty = targets.find((target) => target.slug === "ghostty")!;
    const prompt = agentPrompt(
      catppuccinMocha,
      ghostty,
      "https://terminalthemes.iwwi.app/ghostty/themes/catppuccin/mocha/",
      "https://terminalthemes.iwwi.app/ports/ghostty/catppuccin-mocha.conf",
      "en",
    );
    expect(prompt).toContain("Catppuccin Mocha");
    expect(prompt).toContain("ghostty/themes/catppuccin/mocha");
    expect(prompt).toContain("ports/ghostty/catppuccin-mocha.conf");
    expect(prompt).toContain("back up");
  });

  it("provides terminal-specific FAQ content", () => {
    const ghostty = targets.find((target) => target.slug === "ghostty")!;
    const faqs = terminalThemeFaqs(catppuccinMocha, ghostty, "en");
    expect(faqs).toHaveLength(4);
    expect(faqs[0].question).toContain("Ghostty");
    expect(faqs[2].answer).toContain(catppuccinMocha.palette.background);
  });
});
