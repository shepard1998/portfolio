import {
  siAngular,
  siAstro,
  siBootstrap,
  siCss,
  siDotnet,
  siEslint,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJquery,
  siKeycloak,
  siLaravel,
  siLumen,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPrettier,
  siReact,
  siReactivex,
  siRust,
  siScrumalliance,
  siSpringboot,
  siSqlite,
  siSupabase,
  siSwagger,
  siTailwindcss,
  siTauri,
  siTypescript,
  siVercel,
  siVitest,
  type SimpleIcon,
} from 'simple-icons';

import type { Locale } from '../i18n/config';

type Localized = Record<Locale, string>;

export interface SkillGroup {
  id: string;
  title: Localized;
  description: Localized;
  /** SVG path (24×24, stroked) of the group's line icon. */
  icon: string;
  skills: string[];
}

/**
 * Brand logos from Simple Icons. Microsoft products (C#, SQL Server, Azure…) are not available
 * there, so they fall back to an initials badge.
 */
export const skillIcons: Record<string, SimpleIcon> = {
  Angular: siAngular,
  RxJS: siReactivex,
  React: siReact,
  'Next.js': siNextdotjs,
  Astro: siAstro,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss,
  'Tailwind CSS': siTailwindcss,
  Bootstrap: siBootstrap,
  jQuery: siJquery,
  '.NET': siDotnet,
  'Node.js': siNodedotjs,
  PHP: siPhp,
  Laravel: siLaravel,
  Lumen: siLumen,
  Java: siOpenjdk,
  'Spring Boot': siSpringboot,
  Rust: siRust,
  Tauri: siTauri,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  SQLite: siSqlite,
  Supabase: siSupabase,
  Vercel: siVercel,
  Git: siGit,
  GitHub: siGithub,
  Keycloak: siKeycloak,
  Swagger: siSwagger,
  OpenAPI: siOpenapiinitiative,
  Vitest: siVitest,
  ESLint: siEslint,
  Prettier: siPrettier,
  Scrum: siScrumalliance,
};

/** Up to two letters for skills without a logo: `SQL Server` → `SS`, `C#` → `C#`. */
export function skillInitials(name: string): string {
  const words = name.split(/[\s.]+/).filter(Boolean);
  if (words.length === 1) return name.slice(0, 2);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', es: 'Frontend' },
    description: {
      en: 'Interfaces that are fast, accessible and pleasant to use.',
      es: 'Interfaces rápidas, accesibles y agradables de usar.',
    },
    icon: 'M3 5h18v14H3zM3 9h18M7 5v4',
    skills: [
      'Angular',
      'RxJS',
      'React',
      'Next.js',
      'Astro',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Bootstrap',
      'jQuery',
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', es: 'Backend' },
    description: {
      en: 'APIs and business logic, mostly on .NET, also PHP, Node.js and Java.',
      es: 'APIs y lógica de negocio, sobre todo en .NET, también PHP, Node.js y Java.',
    },
    icon: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
    skills: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'ASP.NET MVC',
      'Razor',
      'Entity Framework',
      'Node.js',
      'PHP',
      'Laravel',
      'Lumen',
      'Java',
      'Spring Boot',
    ],
  },
  {
    id: 'desktop',
    title: { en: 'Desktop', es: 'Escritorio' },
    description: {
      en: 'Native Windows apps with a Rust core and a web interface.',
      es: 'Apps nativas de Windows con núcleo en Rust e interfaz web.',
    },
    icon: 'M3 4h18v12H3zM8 20h8M12 16v4',
    skills: ['Rust', 'Tauri'],
  },
  {
    id: 'databases',
    title: { en: 'Databases', es: 'Bases de datos' },
    description: {
      en: 'Relational and document databases, from design to queries.',
      es: 'Bases relacionales y documentales, del diseño a las consultas.',
    },
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Supabase'],
  },
  {
    id: 'cloud',
    title: { en: 'Cloud & DevOps', es: 'Cloud y DevOps' },
    description: {
      en: 'Deployments, pipelines and version control.',
      es: 'Despliegues, pipelines y control de versiones.',
    },
    icon: 'M7 18a4 4 0 0 1-.6-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18z',
    skills: ['Microsoft Azure', 'Azure DevOps', 'Vercel', 'Git', 'GitHub'],
  },
  {
    id: 'security',
    title: { en: 'Security & APIs', es: 'Seguridad y APIs' },
    description: {
      en: 'Authentication, authorization and documented APIs.',
      es: 'Autenticación, autorización y APIs documentadas.',
    },
    icon: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z',
    skills: ['Keycloak', 'REST APIs', 'Swagger', 'OpenAPI'],
  },
  {
    id: 'quality',
    title: { en: 'Quality & process', es: 'Calidad y proceso' },
    description: {
      en: 'Tests, linting and agile teamwork.',
      es: 'Tests, linting y trabajo en equipo ágil.',
    },
    icon: 'M5 12l4 4 10-10',
    skills: ['Vitest', 'MSTest', 'ESLint', 'Prettier', 'Scrum'],
  },
];

/** Every skill once, in group order. */
export const allSkills = skillGroups.flatMap((group) => group.skills);
