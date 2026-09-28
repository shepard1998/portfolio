import { describe, expect, it } from 'vitest';

import { locales } from '../i18n/config';
import { monthIndex, type YearMonth } from '../lib/dates';
import { company, experience, sortByRecency } from './experience';

describe('experience', () => {
  it('lists the seven published NTSprint projects, most recent first', () => {
    expect(experience.map((p) => p.id)).toEqual([
      'gap-skipa-vn',
      'gap-skipa',
      'qspace-new-features',
      'quantum-capital',
      'gap-supplier-portal',
      'ntsprint-customer-portal',
      'idmcn',
    ]);
  });

  it('has valid ranges inside the NTSprint employment', () => {
    for (const project of experience) {
      expect(monthIndex(project.end)).toBeGreaterThanOrEqual(monthIndex(project.start));
      expect(monthIndex(project.start)).toBeGreaterThanOrEqual(monthIndex(company.start));
    }
  });

  it('translates every name and participation text', () => {
    for (const project of experience) {
      for (const locale of locales) {
        expect(project.name[locale].trim()).not.toBe('');
        expect(project.participation[locale].trim()).not.toBe('');
      }
    }
  });

  it('never mentions mobile technologies', () => {
    const stack = experience.flatMap((project) => project.stack.map((tech) => tech.toLowerCase()));
    for (const banned of ['flutter', 'mobile', 'ios', 'android'])
      expect(stack).not.toContain(banned);
  });
});

describe('sortByRecency', () => {
  it('breaks start ties by the later end', () => {
    const items: { start: YearMonth; end: YearMonth }[] = [
      { start: '2025-03', end: '2025-03' },
      { start: '2025-03', end: '2025-06' },
      { start: '2024-01', end: '2024-02' },
    ];
    const sorted = sortByRecency(items);
    expect(sorted.map((item) => item.end)).toEqual(['2025-06', '2025-03', '2024-02']);
  });
});
