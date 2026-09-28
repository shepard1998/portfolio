import type { Locale } from './config';

const en = {
  'site.title': 'Kevin De Jesús Fernández — Software Engineer',
  'site.description':
    'Portfolio of Kevin De Jesús Fernández, software engineer building web and desktop applications.',
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
  'hero.eyebrow': 'Software Engineer · Havana, Cuba',
  'hero.tagline':
    'I build web and desktop software, from .NET and Angular platforms to Rust desktop apps.',
  'hero.ctaProjects': 'View projects',
  'hero.scroll': 'Scroll',
  'card.label': 'Contact card',
  'card.role': 'Software Engineer',
  'card.email': 'Email',
  'card.linkedin': 'LinkedIn',
  'card.github': 'GitHub',
  'card.location': 'Location',
  'card.locationValue': 'Havana, Cuba',
  'card.copy': 'Copy',
  'card.copyEmail': 'Copy email address',
  'card.copied': 'Copied',
  'card.showBack': 'Show about me',
  'card.showFront': 'Show contact details',
  'card.hint': 'Click the card to flip it',
  'card.aboutTitle': 'About me',
  'card.about':
    "Software engineer from Havana, Cuba. Since 2023 I've built web platforms at NTSprint, mostly with .NET, Angular and SQL databases. I enjoy hard problems and turning them into fast, reliable solutions. Outside work I build desktop tools in Rust and modern web apps with React and Astro.",
  'card.languages': 'Languages',
  'card.languagesValue': 'Spanish (native) · English (fluent)',
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
    'hero.eyebrow': 'Ingeniero de Software · La Habana, Cuba',
    'hero.tagline':
      'Construyo software web y de escritorio, desde plataformas .NET y Angular hasta apps de escritorio en Rust.',
    'hero.ctaProjects': 'Ver proyectos',
    'hero.scroll': 'Desliza',
    'card.label': 'Tarjeta de contacto',
    'card.role': 'Ingeniero de Software',
    'card.email': 'Email',
    'card.linkedin': 'LinkedIn',
    'card.github': 'GitHub',
    'card.location': 'Ubicación',
    'card.locationValue': 'La Habana, Cuba',
    'card.copy': 'Copiar',
    'card.copyEmail': 'Copiar dirección de email',
    'card.copied': 'Copiado',
    'card.showBack': 'Ver sobre mí',
    'card.showFront': 'Ver datos de contacto',
    'card.hint': 'Haz clic en la tarjeta para voltearla',
    'card.aboutTitle': 'Sobre mí',
    'card.about':
      'Ingeniero de software de La Habana, Cuba. Desde 2023 desarrollo plataformas web en NTSprint, sobre todo con .NET, Angular y bases de datos SQL. Disfruto los problemas difíciles y convertirlos en soluciones rápidas y fiables. Fuera del trabajo creo herramientas de escritorio en Rust y aplicaciones web modernas con React y Astro.',
    'card.languages': 'Idiomas',
    'card.languagesValue': 'Español (nativo) · Inglés (fluido)',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.built': 'Hecho con Astro y Tailwind CSS.',
  },
};
