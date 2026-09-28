/** `en/web-platform` → `web-platform`. */
export function projectSlug(id: string): string {
  return id.slice(id.indexOf('/') + 1);
}

/** `en/web-platform` → `en`. */
export function projectLocale(id: string): string {
  return id.slice(0, id.indexOf('/'));
}

export function sortByOrder<T extends { data: { order: number } }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.data.order - b.data.order);
}

/** Next item after `slug`, wrapping around to the first one. */
export function nextItem<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  if (items.length < 2) return undefined;
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1) return undefined;
  return items[(index + 1) % items.length];
}

/** Two-digit case number shown on folders: 0 → `01`. */
export function caseNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/** Unique view-transition name shared by the folder preview and the detail page preview. */
export function previewTransitionName(slug: string): string {
  return `project-preview-${slug.replace(/[^a-z0-9-]/gi, '-')}`;
}
