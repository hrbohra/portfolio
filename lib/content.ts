import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const MediaSchema = z.object({
  id: z.string(),
  kind: z.enum(['image', 'video', 'diagram']),
  status: z.enum(['ready', 'pending']),
  capture_note: z.string().optional(),
});

const MetricSchema = z.object({
  ref: z.string().optional(),
  label: z.string().optional(),
  value: z.string().optional(),
});

const LinkSchema = z.object({ label: z.string(), url: z.string() });

export const CaseFrontmatter = z
  .object({
    kind: z.literal('case'),
    slug: z.string(),
    title: z.string(),
    hook: z.string(),
    date: z.union([z.string(), z.date()]),
    project: z.string(),
    tags: z.array(z.string()).default([]),
    stamps: z.array(z.string()).default([]),
    metrics: z.array(MetricSchema).default([]),
    media: z.array(MediaSchema).default([]),
    confidentiality: z.string(),
  })
  .passthrough();

export const ProjectFrontmatter = z
  .object({
    kind: z.literal('project'),
    slug: z.string(),
    title: z.string(),
    strap: z.string(),
    tier: z.number(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    links: z.array(LinkSchema).default([]),
    metrics: z.array(MetricSchema).default([]),
    media: z.array(MediaSchema).default([]),
    cases: z.array(z.string()).default([]),
    confidentiality: z.string(),
  })
  .passthrough();

export const PageFrontmatter = z
  .object({
    kind: z.literal('page'),
    slug: z.string(),
    title: z.string(),
    strap: z.string().optional(),
  })
  .passthrough();

export type CaseMeta = z.infer<typeof CaseFrontmatter>;
export type ProjectMeta = z.infer<typeof ProjectFrontmatter>;
export type PageMeta = z.infer<typeof PageFrontmatter>;

export interface Entry<T> {
  meta: T;
  body: string;
}

function loadDir<S extends z.ZodTypeAny>(dir: string, schema: S): Entry<z.output<S>>[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Frontmatter invalid in ${dir}/${f}: ${parsed.error.message}`);
      }
      return { meta: parsed.data, body: content };
    });
}

export function getCases(): Entry<CaseMeta>[] {
  return loadDir('cases', CaseFrontmatter);
}

export function getCase(slug: string): Entry<CaseMeta> | undefined {
  return getCases().find((c) => c.meta.slug === slug);
}

export function getProjects(): Entry<ProjectMeta>[] {
  return loadDir('projects', ProjectFrontmatter).sort(
    (a, b) => a.meta.tier - b.meta.tier || Number(b.meta.featured) - Number(a.meta.featured),
  );
}

export function getProject(slug: string): Entry<ProjectMeta> | undefined {
  return getProjects().find((p) => p.meta.slug === slug);
}

export function getPage(slug: string): Entry<PageMeta> | undefined {
  return loadDir('pages', PageFrontmatter).find((p) => p.meta.slug === slug);
}
