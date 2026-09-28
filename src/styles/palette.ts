import type { Theme } from '../lib/theme';

/**
 * Solid color tokens of the "Electric" direction. They mirror the CSS custom properties in
 * `global.css` (a unit test keeps both in sync) and feed the contrast checks and the styleguide.
 */
export const palette = {
  light: {
    bg: '#f4f4fb',
    fg: '#0a0c1c',
    muted: '#545977',
    line: '#d8daef',
    surface: '#ffffff',
    accent: '#2f4bff',
    'accent-ink': '#ffffff',
    'accent-text': '#2f4bff',
  },
  dark: {
    bg: '#07080f',
    fg: '#eef0ff',
    muted: '#8d92b2',
    line: '#1f2344',
    surface: '#0f1122',
    accent: '#5b78ff',
    'accent-ink': '#07080f',
    'accent-text': '#7d93ff',
  },
} as const satisfies Record<Theme, Record<string, string>>;

export type ColorToken = keyof (typeof palette)['light'];

/** Text/background pairs that must meet WCAG AA (4.5:1) in both themes. */
export const contrastPairs: [text: ColorToken, background: ColorToken][] = [
  ['fg', 'bg'],
  ['fg', 'surface'],
  ['muted', 'bg'],
  ['muted', 'surface'],
  ['accent-text', 'bg'],
  ['accent-ink', 'accent'],
];
