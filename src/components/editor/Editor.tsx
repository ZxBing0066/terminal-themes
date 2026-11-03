import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { deflateSync, inflateSync, strFromU8, strToU8 } from "fflate";
import { contrast, isDark } from "../../lib/color";
import { ANSI_ORDER } from "../../lib/palette";
import { ports } from "../../lib/ports";
import { renderHerdrAppPreview } from "../../lib/preview";
import type { Theme } from "../../lib/schema";

const DEFAULT = [
  "#1e1e2e",
  "#cdd6f4",
  "#cdd6f4",
  "#585b70",
  "#45475a",
  "#f38ba8",
  "#a6e3a1",
  "#f9e2af",
  "#89b4fa",
  "#f5c2e7",
  "#94e2d5",
  "#a6adc8",
  "#585b70",
  "#f37799",
  "#89d88b",
  "#ebd391",
  "#74a8fc",
  "#f2aede",
  "#6bd7ca",
  "#bac2de",
];

const LABELS: Record<string, string> = {
  black: "black",
  red: "red",
  green: "green",
  yellow: "yellow",
  blue: "blue",
  magenta: "magenta",
  cyan: "cyan",
  white: "white",
  brightBlack: "bright black",
  brightRed: "bright red",
  brightGreen: "bright green",
  brightYellow: "bright yellow",
  brightBlue: "bright blue",
  brightMagenta: "bright magenta",
  brightCyan: "bright cyan",
  brightWhite: "bright white",
};

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function encode(values: string[]): string {
  return toBase64Url(deflateSync(strToU8(JSON.stringify(values))));
}

function decode(value: string): string[] | undefined {
  try {
    const parsed = JSON.parse(strFromU8(inflateSync(fromBase64Url(value))));
    if (Array.isArray(parsed) && parsed.length === 20 && parsed.every((item) => typeof item === "string")) {
      return parsed;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function makeTheme(values: string[], name: string, family: string, slug: string): Theme {
  const [background, foreground, cursor, selection, ...ansi] = values;
  return {
    schemaVersion: 1,
    id: `${family}/${slug}`,
    family,
    slug,
    name,
    appearance: isDark(background) ? "dark" : "light",
    palette: {
      background,
      foreground,
      cursor,
      selectionBackground: selection,
      selectionForeground: foreground,
      cursorText: background,
      ansi: Object.fromEntries(ANSI_ORDER.map((key, index) => [key, ansi[index]])) as Theme["palette"]["ansi"],
    },
    source: {
      reference: "https://terminalthemes.iwwi.app/editor/",
      author: "You",
      license: "CC0-1.0",
    },
    tags: [],
    meta: { addedAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString().slice(0, 10) },
  };
}

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Editor() {
  const [values, setValues] = useState<string[]>(DEFAULT);
  const [name, setName] = useState("My Terminal Theme");
  const [family, setFamily] = useState("custom");
  const [slug, setSlug] = useState("my-theme");
  const [portSlug, setPortSlug] = useState(ports[0].slug);
  const [status, setStatus] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#p=")) {
      const decoded = decode(hash.slice(3));
      if (decoded) setValues(decoded);
    }
    fetch("/themes.json")
      .then((response) => response.json())
      .then((data: Theme[]) => {
        setThemes(data);
        const id = new URLSearchParams(window.location.search).get("theme");
        if (!hash.startsWith("#p=") && id) {
          const found = data.find((theme) => theme.id === id);
          if (found) {
            setValues([
              found.palette.background,
              found.palette.foreground,
              found.palette.cursor,
              found.palette.selectionBackground,
              ...ANSI_ORDER.map((key) => found.palette.ansi[key]),
            ]);
            setName(found.name);
            setFamily(found.family);
            setSlug(`${found.slug}-custom`);
          }
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      window.history.replaceState(null, "", `#p=${encode(values)}`);
    }, 250);
    return () => window.clearTimeout(id);
  }, [values]);

  const theme = useMemo(() => makeTheme(values, name, family, slug), [values, name, family, slug]);
  const svg = useMemo(() => renderHerdrAppPreview(theme), [theme]);
  const port = ports.find((candidate) => candidate.slug === portSlug) ?? ports[0];
  const output = useMemo(() => port.serialize(theme), [port, theme]);
  const fgRatio = contrast(values[1], values[0]);
  const weak = ANSI_ORDER.map((key, index) => ({
    key,
    hex: values[4 + index],
    ratio: contrast(values[4 + index], values[0]),
  })).filter((entry) => entry.ratio < 3);

  const update = useCallback((index: number, value: string) => {
    if (!/^#[0-9a-fA-F]{6}$/.test(value)) return;
    setValues((current) => current.map((item, itemIndex) => (itemIndex === index ? value.toLowerCase() : item)));
  }, []);

  const flash = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 1400);
  };

  const copy = async (content: string, message: string) => {
    try {
      await navigator.clipboard.writeText(content);
      flash(message);
    } catch {
      flash("Clipboard unavailable");
    }
  };

  const share = () => {
    const url = `${window.location.origin}${window.location.pathname}#p=${encode(values)}`;
    copy(url, "Share link copied");
  };

  const submit = async () => {
    const record = { ...theme, id: `${family}/${slug}`, family, slug, name };
    const json = `${JSON.stringify(record, null, 2)}\n`;
    await copy(json, "Theme JSON copied");
    window.open(
      `https://github.com/ZxBing0066/terminal-themes/new/main?filename=themes/${family}/${slug}.json`,
      "_blank",
      "noopener",
    );
  };

  return (
    <div class="editor">
      <div class="editor-toolbar">
        <label class="field">
          <span>Start from</span>
          <select
            onChange={(event) => {
              const found = themes.find((item) => item.id === event.currentTarget.value);
              if (!found) return;
              setValues([
                found.palette.background,
                found.palette.foreground,
                found.palette.cursor,
                found.palette.selectionBackground,
                ...ANSI_ORDER.map((key) => found.palette.ansi[key]),
              ]);
              setName(found.name);
              setFamily(found.family);
              setSlug(`${found.slug}-custom`);
            }}
          >
            <option value="">Choose a catalog theme</option>
            {themes.map((item) => <option value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label class="field">
          <span>Name</span>
          <input value={name} onInput={(event) => setName(event.currentTarget.value)} />
        </label>
        <label class="field">
          <span>Family</span>
          <input value={family} onInput={(event) => setFamily(event.currentTarget.value)} />
        </label>
        <label class="field">
          <span>Slug</span>
          <input value={slug} onInput={(event) => setSlug(event.currentTarget.value)} />
        </label>
        <div class="editor-actions">
          <button class="btn btn-small" onClick={share}>Share</button>
          <button class="btn btn-small" onClick={() => copy(`${JSON.stringify(theme, null, 2)}\n`, "JSON copied")}>Copy JSON</button>
          <button class="btn btn-small btn-primary" onClick={submit}>Submit</button>
        </div>
      </div>

      <div class="editor-grid">
        <div class="editor-controls">
          <div class="panel">
            <div class="panel-title">Base colors</div>
            {["Background", "Foreground", "Cursor", "Selection"].map((label, index) => (
              <div class="color-row" key={label}>
                <span>{label}</span>
                <input type="color" value={values[index]} onInput={(event) => update(index, event.currentTarget.value)} />
                <input class="mono" value={values[index]} onChange={(event) => update(index, event.currentTarget.value)} />
              </div>
            ))}
          </div>

          <div class="panel">
            <div class="panel-title">ANSI palette</div>
            <div class="color-grid">
              {ANSI_ORDER.map((key, index) => (
                <div class="color-row" key={key}>
                  <span>{LABELS[key]}</span>
                  <input type="color" value={values[4 + index]} onInput={(event) => update(4 + index, event.currentTarget.value)} />
                  <input class="mono" value={values[4 + index]} onChange={(event) => update(4 + index, event.currentTarget.value)} />
                </div>
              ))}
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Checks</div>
            <p class={fgRatio >= 4.5 ? "small" : "small ratio-bad"}>Body contrast: {fgRatio.toFixed(2)}:1</p>
            {weak.length > 0 ? (
              <p class="small ratio-warn">
                {weak.length} ANSI colors are below 3:1 against the background: {weak.map((entry) => entry.key).join(", ")}
              </p>
            ) : (
              <p class="small muted">All ANSI colors clear 3:1 against the background.</p>
            )}
          </div>
        </div>

        <div class="editor-right">
          <div class="editor-preview" dangerouslySetInnerHTML={{ __html: svg }} />
          <div class="panel">
            <div class="panel-title">Export</div>
            <div class="port-tabs">
              {ports.map((candidate) => (
                <button
                  class="port-tab"
                  aria-selected={candidate.slug === port.slug ? "true" : "false"}
                  onClick={() => setPortSlug(candidate.slug)}
                >
                  {candidate.name}
                </button>
              ))}
            </div>
            <div class="code-block">
              <pre><code>{output}</code></pre>
              <div class="code-actions">
                <button class="btn btn-small" onClick={() => copy(output, "Copied")}>Copy</button>
                <button class="btn btn-small" onClick={() => download(`${family}-${slug}.${port.extension}`, output, port.mime)}>Download</button>
                <span class="mono small muted" style="margin-left:auto">{port.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {status && <div class="editor-status">{status}</div>}
    </div>
  );
}
