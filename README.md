# Kevin Fernández — Portfolio

Personal portfolio of **Kevin Fernández**, software engineer. It showcases projects, professional experience and skills, in **English** and **Spanish**.

> **Status:** in development. The project foundation is ready (Astro, Tailwind CSS, i18n, quality tooling); the design system and sections are next. See the [roadmap](#roadmap).

---

## Tech stack

| Layer      | Technology                                                                   |
| ---------- | ---------------------------------------------------------------------------- |
| Framework  | [Astro 7](https://astro.build) — static output, zero JavaScript by default   |
| Language   | TypeScript (strict)                                                          |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`            |
| i18n       | Astro i18n routing — English at `/`, Spanish at `/es/`                       |
| Tests      | [Vitest](https://vitest.dev)                                                 |
| Quality    | `astro check`, ESLint (`typescript-eslint`, `eslint-plugin-astro`), Prettier |
| Deployment | [Vercel](https://vercel.com) (planned)                                       |

---

## Getting started

### Requirements

- [Node.js](https://nodejs.org) **22.12** or newer (npm included).
- Git.

### Setup

```bash
git clone https://github.com/shepard1998/portfolio.git
cd portfolio
npm install
npm run dev
```

The site runs at <http://localhost:4321> (English) and <http://localhost:4321/es/> (Spanish).

### Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server             |
| `npm run build`        | Build the production site into `dist/`   |
| `npm run preview`      | Preview the production build locally     |
| `npm run typecheck`    | Type-check TypeScript and `.astro` files |
| `npm run lint`         | Lint the project with ESLint             |
| `npm run test`         | Run the unit tests once                  |
| `npm run test:watch`   | Run the unit tests in watch mode         |
| `npm run format`       | Format every file with Prettier          |
| `npm run format:check` | Check formatting without writing changes |

---

## Project structure

```text
src/
├── components/     # Astro components (pages share one component per locale)
├── i18n/           # Locale config, UI dictionaries and helpers (+ tests)
├── layouts/        # Base HTML layout
├── pages/          # Routes: `/` (English) and `/es/` (Spanish)
└── styles/         # Global CSS (Tailwind entry point)
public/             # Static assets served as-is
```

### Internationalization

- Supported locales and the default one are defined in `src/i18n/config.ts`.
- UI strings live in `src/i18n/ui.ts`. Every locale must define every key of the English dictionary (enforced by TypeScript and by a unit test).
- Components read text with `useTranslations(locale)`; no UI text is hard-coded in components.
- Each page exists once per locale (`src/pages/index.astro`, `src/pages/es/index.astro`) and renders a shared component.

---

## Git workflow

- `main` — production. Only receives merges from `develop` when a release is published.
- `develop` — integration and testing. Every change lands here first.
- `feature/*`, `fix/*`, `chore/*` — work branches, always created from an up-to-date `develop`.

Commits follow [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `chore:`, `docs:`, `test:`). Typecheck, lint and tests must pass before merging.

---

## Roadmap

- [x] Project setup: Astro, Tailwind CSS, i18n, quality tooling
- [ ] Visual direction and design system (light/dark themes, typography, motion)
- [ ] Hero and flippable contact card
- [ ] Projects shown as open folders with looping video previews
- [ ] Professional experience timeline with expandable nodes
- [ ] Skills and education
- [ ] SEO, accessibility and performance
- [ ] Deployment to Vercel
