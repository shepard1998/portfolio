export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

export function parseTheme(value: unknown): Theme | null {
  return value === 'light' || value === 'dark' ? value : null;
}

/** An explicit user choice wins; otherwise the operating system preference is used. */
export function resolveTheme(stored: Theme | null, prefersDark: boolean): Theme {
  return stored ?? (prefersDark ? 'dark' : 'light');
}

export function toggleTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

export function readStoredTheme(storage: Pick<Storage, 'getItem'> | undefined): Theme | null {
  try {
    return parseTheme(storage?.getItem(THEME_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function storeTheme(storage: Pick<Storage, 'setItem'> | undefined, theme: Theme): void {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the theme still applies.
  }
}
