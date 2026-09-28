import { describe, expect, it } from 'vitest';

import { locales } from '../i18n/config';
import { allSkills, skillGroups, skillIcons, skillInitials } from './skills';

describe('skills', () => {
  it('lists every skill only once', () => {
    expect(new Set(allSkills).size).toBe(allSkills.length);
  });

  it('never mentions mobile development', () => {
    const lower = allSkills.map((skill) => skill.toLowerCase());
    for (const banned of [
      'flutter',
      'mobile',
      'ios',
      'android',
      'react native',
      'kotlin',
      'swift',
    ]) {
      expect(lower).not.toContain(banned);
    }
  });

  it('includes the skills Kevin asked to add', () => {
    for (const skill of ['Rust', 'Tauri', 'Next.js', 'Supabase'])
      expect(allSkills).toContain(skill);
  });

  it('translates every group', () => {
    for (const group of skillGroups) {
      for (const locale of locales) {
        expect(group.title[locale].trim()).not.toBe('');
        expect(group.description[locale].trim()).not.toBe('');
      }
    }
  });

  it('only maps logos for listed skills', () => {
    for (const name of Object.keys(skillIcons)) expect(allSkills).toContain(name);
  });
});

describe('skillInitials', () => {
  it('builds a short badge for skills without a logo', () => {
    expect(skillInitials('SQL Server')).toBe('SS');
    expect(skillInitials('C#')).toBe('C#');
    expect(skillInitials('Microsoft Azure')).toBe('MA');
    expect(skillInitials('ASP.NET Core')).toBe('AN');
  });
});
