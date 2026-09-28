import type { Locale } from './config';

const en = {
  'site.title': 'Kevin De Jesús Fernández — Software Engineer',
  'site.description':
    'Portfolio of Kevin De Jesús Fernández, software engineer building web and desktop applications.',
  'home.eyebrow': 'Portfolio in progress',
  'home.title': 'Kevin De Jesús',
  'home.subtitle': 'Software Engineer',
  'nav.skip': 'Skip to content',
  'nav.main': 'Main',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'nav.language': 'Language',
  'nav.switchTo': 'Switch to {language}',
  'theme.toggle': 'Dark theme',
  'footer.rights': 'All rights reserved.',
  'footer.built': 'Built with Astro and Tailwind CSS.',
} as const;

export type UiKey = keyof typeof en;

/** Every locale must define every key of the default (English) dictionary. */
export const ui: Record<Locale, Record<UiKey, string>> = {
  en,
  es: {
    'site.title': 'Kevin De Jesús Fernández — Ingeniero de Software',
    'site.description':
      'Portafolio de Kevin De Jesús Fernández, ingeniero de software que crea aplicaciones web y de escritorio.',
    'home.eyebrow': 'Portafolio en construcción',
    'home.title': 'Kevin De Jesús',
    'home.subtitle': 'Ingeniero de Software',
    'nav.skip': 'Saltar al contenido',
    'nav.main': 'Principal',
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'nav.language': 'Idioma',
    'nav.switchTo': 'Cambiar a {language}',
    'theme.toggle': 'Tema oscuro',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.built': 'Hecho con Astro y Tailwind CSS.',
  },
};
