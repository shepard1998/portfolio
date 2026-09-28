import { describe, expect, it } from 'vitest';

import { parseTheme, readStoredTheme, resolveTheme, storeTheme, toggleTheme } from './theme';

describe('parseTheme', () => {
  it('accepts only known themes', () => {
    expect(parseTheme('light')).toBe('light');
    expect(parseTheme('dark')).toBe('dark');
    expect(parseTheme('system')).toBeNull();
    expect(parseTheme(null)).toBeNull();
  });
});

describe('resolveTheme', () => {
  it('prefers the stored choice', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('falls back to the system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
});

describe('toggleTheme', () => {
  it('switches between light and dark', () => {
    expect(toggleTheme('light')).toBe('dark');
    expect(toggleTheme('dark')).toBe('light');
  });
});

describe('theme storage', () => {
  it('reads and writes the stored theme', () => {
    const data = new Map<string, string>();
    const storage = {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => {
        data.set(key, value);
      },
    };
    expect(readStoredTheme(storage)).toBeNull();
    storeTheme(storage, 'dark');
    expect(readStoredTheme(storage)).toBe('dark');
  });

  it('survives unavailable storage', () => {
    const blocked = () => {
      throw new Error('blocked');
    };
    const storage = { getItem: blocked, setItem: blocked };
    expect(readStoredTheme(storage)).toBeNull();
    expect(() => storeTheme(storage, 'light')).not.toThrow();
    expect(readStoredTheme(undefined)).toBeNull();
  });
});
