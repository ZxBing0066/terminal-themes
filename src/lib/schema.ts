import { z } from "zod";

export const HEX = /^#[0-9a-fA-F]{6}$/;
export const SLUG = /^[a-z0-9][a-z0-9-]*$/;

export const hexSchema = z.string().regex(HEX, "expected #rrggbb");
export const slugSchema = z.string().regex(SLUG, "expected kebab-case slug");

export const ansiSchema = z.object({
  black: hexSchema,
  red: hexSchema,
  green: hexSchema,
  yellow: hexSchema,
  blue: hexSchema,
  magenta: hexSchema,
  cyan: hexSchema,
  white: hexSchema,
  brightBlack: hexSchema,
  brightRed: hexSchema,
  brightGreen: hexSchema,
  brightYellow: hexSchema,
  brightBlue: hexSchema,
  brightMagenta: hexSchema,
  brightCyan: hexSchema,
  brightWhite: hexSchema,
});

export const sourceSchema = z.object({
  upstream: z.string().optional(),
  reference: z.string().optional(),
  author: z.string().min(1),
  license: z.string().min(1),
  licenseUrl: z.string().optional(),
});

export const themeSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string(),
    family: slugSchema,
    slug: slugSchema,
    name: z.string().min(1),
    appearance: z.enum(["dark", "light"]),
    palette: z.object({
      background: hexSchema,
      foreground: hexSchema,
      cursor: hexSchema,
      cursorText: hexSchema.optional(),
      selectionBackground: hexSchema,
      selectionForeground: hexSchema.optional(),
      ansi: ansiSchema,
    }),
    source: sourceSchema,
    description: z
      .object({
        en: z.string().optional(),
        zh: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    meta: z.object({
      addedAt: z.string(),
      updatedAt: z.string(),
    }),
  })
  .superRefine((theme, ctx) => {
    if (theme.id !== `${theme.family}/${theme.slug}`) {
      ctx.addIssue({
        code: "custom",
        message: "id must equal family/slug",
        path: ["id"],
      });
    }
    if (!theme.source.upstream && !theme.source.reference) {
      ctx.addIssue({
        code: "custom",
        message: "source.upstream or source.reference is required",
        path: ["source"],
      });
    }
  });

export const familySchema = z.object({
  schemaVersion: z.literal(1),
  id: slugSchema,
  name: z.string().min(1),
  description: z
    .object({
      en: z.string().optional(),
      zh: z.string().optional(),
    })
    .optional(),
  source: sourceSchema,
  tags: z.array(z.string()).default([]),
});

export type Theme = z.infer<typeof themeSchema>;
export type Family = z.infer<typeof familySchema>;
export type Ansi = z.infer<typeof ansiSchema>;
export type Source = z.infer<typeof sourceSchema>;
