import { describe, expect, it } from 'vitest';

import { revealRadius } from './view-transition';

describe('revealRadius', () => {
  it('reaches the farthest corner from the origin', () => {
    expect(revealRadius({ x: 0, y: 0 }, 300, 400)).toBe(500);
    expect(revealRadius({ x: 300, y: 400 }, 300, 400)).toBe(500);
  });

  it('covers the viewport from its center', () => {
    expect(revealRadius({ x: 150, y: 200 }, 300, 400)).toBe(250);
  });
});
