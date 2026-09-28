import { describe, expect, it } from 'vitest';

import { nextHeaderHidden } from './scroll-direction';

describe('nextHeaderHidden', () => {
  it('always shows the header near the top', () => {
    expect(nextHeaderHidden(true, 200, 40)).toBe(false);
  });

  it('hides when scrolling down and shows when scrolling up', () => {
    expect(nextHeaderHidden(false, 300, 400)).toBe(true);
    expect(nextHeaderHidden(true, 400, 300)).toBe(false);
  });

  it('ignores tiny scroll movements', () => {
    expect(nextHeaderHidden(true, 400, 398)).toBe(true);
    expect(nextHeaderHidden(false, 400, 403)).toBe(false);
  });
});
