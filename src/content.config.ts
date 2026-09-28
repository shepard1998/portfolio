import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/**
 * Projects: one Markdown file per project and language, at
 * `src/content/projects/<locale>/<slug>.md`. Both languages share the same slug and images.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or two sentences shown on the folder. */
      summary: z.string(),
      year: z.number().int(),
      role: z.string(),
      stack: z.array(z.string()).min(1),
      /** Position in the list, lowest first. */
      order: z.number().int(),
      /** Marks placeholder content until real projects replace it. */
      sample: z.boolean().default(false),
      links: z
        .object({
          live: z.url().optional(),
          repo: z.url().optional(),
        })
        .default({}),
      /** Looping preview video in `public/` (e.g. `/videos/slug.mp4`). A placeholder is shown when missing. */
      video: z
        .object({
          mp4: z.string(),
          webm: z.string().optional(),
          poster: image().optional(),
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects };
