import { getCollection, type CollectionEntry } from 'astro:content';

import type { Locale } from '../i18n/config';
import { projectLocale, projectSlug, sortByOrder } from '../lib/projects';

export interface Project {
  slug: string;
  entry: CollectionEntry<'projects'>;
  data: CollectionEntry<'projects'>['data'];
}

/** Projects of one language, sorted by their `order`. */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const entries = await getCollection('projects', (entry) => projectLocale(entry.id) === locale);
  return sortByOrder(entries).map((entry) => ({
    slug: projectSlug(entry.id),
    entry,
    data: entry.data,
  }));
}
