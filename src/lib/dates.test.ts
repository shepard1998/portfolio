import { describe, expect, it } from 'vitest';

import { formatDuration, formatMonth, formatRange, monthIndex, monthsInclusive } from './dates';

describe('monthsInclusive', () => {
  it('counts both ends of the range', () => {
    expect(monthsInclusive('2025-03', '2025-06')).toBe(4);
    expect(monthsInclusive('2025-03', '2025-03')).toBe(1);
    expect(monthsInclusive('2023-02', '2024-01')).toBe(12);
  });

  it('rejects invalid months', () => {
    expect(() => monthsInclusive('2025-13', '2025-14')).toThrow();
  });
});

describe('monthIndex', () => {
  it('orders months chronologically', () => {
    expect(monthIndex('2025-01')).toBeGreaterThan(monthIndex('2024-12'));
  });
});

describe('formatMonth', () => {
  it('uses short month names per language', () => {
    expect(formatMonth('2025-03', 'en')).toBe('Mar 2025');
    expect(formatMonth('2025-03', 'es')).toBe('mar 2025');
    expect(formatMonth('2024-09', 'es')).toBe('sept 2024');
  });
});

describe('formatRange', () => {
  it('shows one month when start and end match', () => {
    expect(formatRange('2025-03', '2025-03', 'en', 'Present')).toBe('Mar 2025');
  });

  it('shows both ends or the present label', () => {
    expect(formatRange('2025-03', '2025-06', 'en', 'Present')).toBe('Mar 2025 – Jun 2025');
    expect(formatRange('2023-02', null, 'es', 'Actualidad')).toBe('feb 2023 – Actualidad');
  });
});

describe('formatDuration', () => {
  it('formats months and years in each language', () => {
    expect(formatDuration(1, 'en')).toBe('1 month');
    expect(formatDuration(4, 'es')).toBe('4 meses');
    expect(formatDuration(12, 'en')).toBe('1 year');
    expect(formatDuration(14, 'en')).toBe('1 year, 2 months');
    expect(formatDuration(14, 'es')).toBe('1 año y 2 meses');
  });
});
