import type { Locale } from './config';

const en = {
  'site.title': 'Kevin Fernández — Software Engineer',
  'site.description':
    'Portfolio of Kevin Fernández, software engineer specialized in web and mobile development.',
  'home.eyebrow': 'Portfolio in progress',
  'home.title': 'Kevin Fernández',
  'home.subtitle': 'Software Engineer',
  'nav.language': 'Language',
  'nav.switchTo': 'Switch to {language}',
} as const;

export type UiKey = keyof typeof en;

/** Every locale must define every key of the default (English) dictionary. */
export const ui: Record<Locale, Record<UiKey, string>> = {
  en,
  es: {
    'site.title': 'Kevin Fernández — Ingeniero de Software',
    'site.description':
      'Portafolio de Kevin Fernández, ingeniero de software especializado en desarrollo web y móvil.',
    'home.eyebrow': 'Portafolio en construcción',
    'home.title': 'Kevin Fernández',
    'home.subtitle': 'Ingeniero de Software',
    'nav.language': 'Idioma',
    'nav.switchTo': 'Cambiar a {language}',
  },
};
