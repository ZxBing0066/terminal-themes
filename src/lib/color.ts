import {
  clampChroma,
  converter,
  differenceCiede2000,
  formatHex,
  wcagContrast,
  wcagLuminance,
} from "culori";

export type Hex = string;

const toOklch = converter("oklch");
const deltaE = differenceCiede2000();

function oklch(hex: Hex) {
  const color = toOklch(hex);
  if (!color) throw new Error(`invalid color: ${hex}`);
  return color;
}

function fromOklch(l: number, c: number, h: number): Hex {
  const clamped = clampChroma(
    { mode: "oklch", l: Math.min(1, Math.max(0, l)), c: Math.max(0, c), h: ((h % 360) + 360) % 360 },
    "oklch",
  );
  const hex = formatHex(clamped);
  if (!hex) throw new Error("could not serialize oklch color");
  return hex.toLowerCase();
}

export function isHex(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function contrast(a: Hex, b: Hex): number {
  return wcagContrast(a, b);
}

export function luminance(hex: Hex): number {
  return wcagLuminance(hex);
}

export function isDark(hex: Hex): boolean {
  return luminance(hex) < 0.45;
}

/** Interpolate in OKLCH, taking the shortest hue path. */
export function mix(a: Hex, b: Hex, t: number): Hex {
  const A = oklch(a);
  const B = oklch(b);
  const ac = A.c ?? 0;
  const bc = B.c ?? 0;
  let h: number;
  if (ac < 1e-6) h = B.h ?? 0;
  else if (bc < 1e-6) h = A.h ?? 0;
  else {
    const ah = A.h ?? 0;
    const bh = B.h ?? 0;
    const dh = ((bh - ah + 540) % 360) - 180;
    h = ah + dh * t;
  }
  return fromOklch((A.l ?? 0) + ((B.l ?? 0) - (A.l ?? 0)) * t, ac + (bc - ac) * t, h);
}

/** Shift OKLCH lightness by a signed amount. */
export function shade(hex: Hex, delta: number): Hex {
  const c = oklch(hex);
  return fromOklch((c.l ?? 0) + delta, c.c ?? 0, c.h ?? 0);
}

export function chroma(hex: Hex): number {
  return oklch(hex).c ?? 0;
}

export function hue(hex: Hex): number {
  return oklch(hex).h ?? 0;
}

export function deltaE00(a: Hex, b: Hex): number {
  return deltaE(a, b);
}

export function bestForeground(background: Hex): Hex {
  return contrast("#000000", background) >= contrast("#ffffff", background) ? "#000000" : "#ffffff";
}

/** First candidate that clears the ratio, else the candidate with the highest ratio. */
export function pickContrast(candidates: Hex[], min: number, against: Hex): Hex {
  for (const candidate of candidates) {
    if (contrast(candidate, against) >= min) return candidate;
  }
  return candidates.reduce((best, candidate) =>
    contrast(candidate, against) > contrast(best, against) ? candidate : best,
  );
}

/** Keep a color, or fall back to the next candidate, based on contrast against a surface. */
export function ensureContrast(color: Hex, min: number, against: Hex, fallback: Hex): Hex {
  return contrast(color, against) >= min ? color : fallback;
}

export function sortByLightness(colors: Hex[]): Hex[] {
  return [...colors].sort((a, b) => (oklch(a).l ?? 0) - (oklch(b).l ?? 0));
}
