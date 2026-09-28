import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { contrastPairs, palette } from '../styles/palette';
import { contrastRatio, hexToRgb, wcagGrade } from './contrast';

describe('contrast helpers', () => {
  it('parses short and long hex colors', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
    expect(hexToRgb('2f4bff')).toEqual([47, 75, 255]);
    expect(() => hexToRgb('blue')).toThrow();
  });

  it('computes WCAG contrast ratios', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#777777', '#777777')).toBe(1);
  });

  it('grades ratios', () => {
    expect(wcagGrade(7.1)).toBe('AAA');
    expect(wcagGrade(4.5)).toBe('AA');
    expect(wcagGrade(3.2)).toBe('AA large');
    expect(wcagGrade(2)).toBe('fail');
  });
});

describe('palette', () => {
  for (const theme of ['light', 'dark'] as const) {
    it.each(contrastPairs)(`${theme}: %s on %s meets WCAG AA`, (text, background) => {
      expect(
        contrastRatio(palette[theme][text], palette[theme][background]),
      ).toBeGreaterThanOrEqual(4.5);
    });
  }

  it('matches the CSS custom properties in global.css', () => {
    const css = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');
    const block = (selector: RegExp) => css.match(selector)?.[1] ?? '';
    const blocks = {
      light: block(/:root\s*\{([^}]*)\}/),
      dark: block(/:root\[data-theme='dark'\]\s*\{([^}]*)\}/),
    };
    for (const theme of ['light', 'dark'] as const) {
      for (const [token, value] of Object.entries(palette[theme])) {
        expect(blocks[theme]).toContain(`--${token}: ${value};`);
      }
    }
  });
});
