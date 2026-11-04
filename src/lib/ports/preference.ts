export const PORT_STORAGE_KEY = "terminalthemes.port";

export function savedPortSlug(): string | undefined {
  try {
    return localStorage.getItem(PORT_STORAGE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export function rememberPort(slug: string): void {
  try {
    localStorage.setItem(PORT_STORAGE_KEY, slug);
  } catch {
    /* storage unavailable */
  }
}
