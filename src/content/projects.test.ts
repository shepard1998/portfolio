import { describe, expect, it } from 'vitest';

import { locales } from '../i18n/config';

// Raw Markdown of every project file, keyed by path (`./projects/<locale>/<slug>.md`).
const files = import.meta.glob<string>('./projects/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function slugsFor(locale: string): string[] {
  return Object.keys(files)
    .filter((path) => path.startsWith(`./projects/${locale}/`))
    .map((path) => path.split('/').pop()?.replace(/\.md$/, '') ?? '')
    .sort();
}

function frontmatterValue(source: string, key: string): string | undefined {
  return source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim();
}

describe('project content', () => {
  it('exists in every language with the same slugs', () => {
    const english = slugsFor('en');
    expect(english.length).toBeGreaterThan(0);
    for (const locale of locales) expect(slugsFor(locale)).toEqual(english);
  });

  it('keeps order, year and sample flag in sync across languages', () => {
    for (const slug of slugsFor('en')) {
      const english = files[`./projects/en/${slug}.md`] ?? '';
      for (const locale of locales) {
        const translated = files[`./projects/${locale}/${slug}.md`] ?? '';
        for (const key of ['order', 'year', 'sample', 'stack']) {
          expect(frontmatterValue(translated, key), `${locale}/${slug} ${key}`).toBe(
            frontmatterValue(english, key),
          );
        }
      }
    }
  });

  it('uses a unique order per project', () => {
    const orders = slugsFor('en').map((slug) =>
      frontmatterValue(files[`./projects/en/${slug}.md`] ?? '', 'order'),
    );
    expect(new Set(orders).size).toBe(orders.length);
  });
});
