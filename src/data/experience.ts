import type { Locale } from '../i18n/config';
import { monthIndex, type YearMonth } from '../lib/dates';

type Localized = Record<Locale, string>;

export interface ExperienceProject {
  id: string;
  name: Localized;
  start: YearMonth;
  end: YearMonth;
  stack: string[];
  /** What Kevin did. Until roles and achievements are defined, a generic participation line. */
  participation: Localized;
}

const participation: Localized = {
  en: 'Took part in the development of this project as a Software Engineer at NTSprint.',
  es: 'Participé en el desarrollo de este proyecto como ingeniero de software en NTSprint.',
};

/** Employment at NTSprint LLC. `end: null` means it is the current job. */
export const company = {
  name: 'NTSprint LLC',
  start: '2023-02' as YearMonth,
  end: null as YearMonth | null,
};

/**
 * Client and internal projects from the NTSprint CV. They are confidential: only names, dates,
 * stack and participation are published.
 */
const projects: ExperienceProject[] = [
  {
    id: 'gap-skipa-vn',
    name: { en: 'GAP Skipa VN', es: 'GAP Skipa VN' },
    start: '2025-03',
    end: '2025-06',
    stack: ['ASP.NET Core', 'Entity Framework', 'SQL Server', 'Tailwind CSS'],
    participation,
  },
  {
    id: 'gap-skipa',
    name: { en: 'GAP Skipa', es: 'GAP Skipa' },
    start: '2025-03',
    end: '2025-03',
    stack: [
      '.NET',
      'ASP.NET Core',
      'ASP.NET MVC',
      'Razor',
      'React',
      'jQuery',
      'Bootstrap',
      'Tailwind CSS',
      'SQL Server',
    ],
    participation,
  },
  {
    id: 'qspace-new-features',
    name: { en: 'QSpace New Features', es: 'QSpace: nuevas funcionalidades' },
    start: '2025-01',
    end: '2025-02',
    stack: ['JavaScript', 'Node.js', 'Angular', 'MongoDB'],
    participation,
  },
  {
    id: 'quantum-capital',
    name: { en: 'QuantumCapital', es: 'QuantumCapital' },
    start: '2024-12',
    end: '2024-12',
    stack: ['.NET'],
    participation,
  },
  {
    id: 'gap-supplier-portal',
    name: { en: 'GAP Supplier Portal', es: 'Portal de Proveedores GAP' },
    start: '2024-10',
    end: '2024-11',
    stack: ['ASP.NET Core', 'Angular'],
    participation,
  },
  {
    id: 'ntsprint-customer-portal',
    name: { en: 'NTSprint Customer Portal', es: 'Portal de Clientes de NTSprint' },
    start: '2024-09',
    end: '2024-10',
    stack: ['.NET', 'Angular', 'Microsoft Azure', 'Azure DevOps', 'Scrum'],
    participation,
  },
  {
    id: 'idmcn',
    name: { en: 'IDMCN', es: 'IDMCN' },
    start: '2023-02',
    end: '2024-01',
    stack: ['PHP', 'Lumen', 'Angular', 'PostgreSQL', 'Keycloak'],
    participation,
  },
];

/** Most recent first: by start month, then by end month. */
export function sortByRecency<T extends { start: YearMonth; end: YearMonth }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => monthIndex(b.start) - monthIndex(a.start) || monthIndex(b.end) - monthIndex(a.end),
  );
}

export const experience = sortByRecency(projects);
