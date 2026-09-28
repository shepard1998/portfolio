import { describe, expect, it } from 'vitest';

import {
  caseNumber,
  nextItem,
  previewTransitionName,
  projectLocale,
  projectSlug,
  sortByOrder,
} from './projects';

describe('project ids', () => {
  it('splits locale and slug', () => {
    expect(projectSlug('en/web-platform')).toBe('web-platform');
    expect(projectLocale('es/web-platform')).toBe('es');
  });
});

describe('sortByOrder', () => {
  it('sorts by ascending order without mutating the input', () => {
    const input = [{ data: { order: 3 } }, { data: { order: 1 } }, { data: { order: 2 } }];
    expect(sortByOrder(input).map((item) => item.data.order)).toEqual([1, 2, 3]);
    expect(input[0]?.data.order).toBe(3);
  });
});

describe('nextItem', () => {
  const items = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }];

  it('returns the following item and wraps around', () => {
    expect(nextItem(items, 'a')?.slug).toBe('b');
    expect(nextItem(items, 'c')?.slug).toBe('a');
  });

  it('returns nothing for a single item or an unknown slug', () => {
    expect(nextItem([{ slug: 'a' }], 'a')).toBeUndefined();
    expect(nextItem(items, 'z')).toBeUndefined();
  });
});

describe('caseNumber', () => {
  it('pads to two digits', () => {
    expect(caseNumber(0)).toBe('01');
    expect(caseNumber(11)).toBe('12');
  });
});

describe('previewTransitionName', () => {
  it('builds a valid CSS identifier', () => {
    expect(previewTransitionName('web-platform')).toBe('project-preview-web-platform');
    expect(previewTransitionName('a b.c')).toBe('project-preview-a-b-c');
  });
});
