# Kevin De Jesús Fernández — Portfolio

Personal portfolio of **Kevin De Jesús Fernández**, software engineer. It showcases projects, professional experience and skills, in **English** and **Spanish**.

> **Status:** in development. The design system, the hero with the flippable contact card and the projects section (with sample content) are ready; the experience and skills sections are next. See the [roadmap](#roadmap).

---

## Tech stack

| Layer      | Technology                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------- |
| Framework  | [Astro 7](https://astro.build) — static output, zero JavaScript by default                   |
| Language   | TypeScript (strict)                                                                          |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`                            |
| Motion     | CSS animations, View Transitions and [Motion](https://motion.dev) (`inView`, mini `animate`) |
| Fonts      | Unbounded + JetBrains Mono, self-hosted with the Astro Fonts API (Fontsource)                |
| i18n       | Astro i18n routing — English at `/`, Spanish at `/es/`                                       |
| Tests      | [Vitest](https://vitest.dev)                                                                 |
| Quality    | `astro check`, ESLint (`typescript-eslint`, `eslint-plugin-astro`), Prettier                 |
| Deployment | [Vercel](https://vercel.com) (planned)                                                       |

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

The first `dev` or `build` downloads the fonts from Fontsource, so it needs an internet connection.

The **styleguide** with every design token and animation is available at <http://localhost:4321/styleguide> (and `/es/styleguide`) while `npm run dev` is running. It is never included in the production build.

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
├── assets/         # Images processed by Astro (project screenshots)
├── components/     # Astro components: hero, contact card, project folders, header, footer…
├── content/        # Project case studies in Markdown, one file per language (+ tests)
├── data/           # Profile data and project loaders shared by every page (+ tests)
├── dev/styleguide/ # Development-only styleguide page and the integration that serves it
├── i18n/           # Locale config, UI dictionaries and helpers (+ tests)
├── layouts/        # Base HTML layout (fonts, theme script, header, footer)
├── lib/            # Framework-free logic: theme, contrast, motion helpers (+ tests)
├── pages/          # Routes: `/`, `/projects/<slug>` and their `/es/` versions
└── styles/         # Global CSS with design tokens, and the palette used by tests
public/             # Static assets served as-is
```

### Internationalization

- Supported locales and the default one are defined in `src/i18n/config.ts`.
- UI strings live in `src/i18n/ui.ts`. Every locale must define every key of the English dictionary (enforced by TypeScript and by a unit test).
- Components read text with `useTranslations(locale)`; no UI text is hard-coded in components.
- Each page exists once per locale (`src/pages/index.astro`, `src/pages/es/index.astro`) and renders a shared component.

### Content

- Values that are the same in every language (name, email, LinkedIn and GitHub URLs) live in `src/data/profile.ts`.
- Translatable copy (role, location, tagline, "About me") lives in the i18n dictionaries.

### Contact card

- It flips in 3D when the card is clicked or with the corner button. Links and the **Copy** button keep their own behavior.
- The hidden face is `inert`, so keyboard and screen-reader users only reach the visible one.
- On desktop it tilts slightly toward the mouse and a soft glare follows the cursor.

### Projects

Each project is a Markdown file per language with the same slug in both:

```text
src/content/projects/en/<slug>.md
src/content/projects/es/<slug>.md
src/assets/projects/<slug>/   # screenshots for the gallery
public/videos/<slug>.mp4      # looping preview (optional)
```

The frontmatter is validated at build time (`src/content.config.ts`):

| Field     | Required | Notes                                                                        |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `title`   | yes      |                                                                              |
| `summary` | yes      | One or two sentences, shown on the folder                                    |
| `year`    | yes      |                                                                              |
| `role`    | yes      |                                                                              |
| `stack`   | yes      | List of technologies; the folder shows the first four                        |
| `order`   | yes      | Position in the list, lowest first; unique                                   |
| `sample`  | no       | `true` marks placeholder content with a "Sample" badge                       |
| `links`   | no       | `live` and `repo` URLs                                                       |
| `video`   | no       | `mp4`, optional `webm` and `poster` image; a placeholder is shown without it |
| `gallery` | no       | Images with `src`, `alt` and optional `caption`                              |

The Markdown body is the case study shown on the project page. A unit test checks that every project exists in both languages with the same `order`, `year`, `sample` and `stack`.

**Preview videos:** MP4 (H.264), optionally also WebM, no audio, 16:10 at 1280×800, 6–10 seconds with a seamless loop, at most 2 MB. Videos only download when the preview gets close to the viewport; on the home page they play while a folder is open, on the project page while visible.

**Folders** open on hover or keyboard focus (on touch screens, when scrolled to the middle of the screen): the glass flap tilts forward and the preview sheet rises. Where the browser supports cross-document View Transitions, the preview morphs from the folder into the project page.

### Header

The header stays fixed at the top while scrolling; a bottom border appears once the page scrolls.

### Design system

- **Direction "Electric":** Unbounded for display text, JetBrains Mono for body and labels, a blue-black / lavender-white palette with an electric blue accent.
- **Tokens** live in `src/styles/global.css` as CSS custom properties and are exposed to Tailwind (`bg-bg`, `text-fg`, `text-muted`, `bg-accent`, `text-hero`, `ease-spring`…). `src/styles/palette.ts` mirrors the colors; a unit test keeps both in sync and checks that every text/background pair meets WCAG AA in both themes.
- **Themes:** light and dark. The system preference is used until the visitor picks one; the choice is stored in `localStorage`. An inline script in `<head>` applies it before the first paint (no flash), and the toggle animates the change with a circular View Transition.
- **Motion:** only `transform` and `opacity` are animated, in 180–560 ms.
  - `<SplitText>` makes characters rise on load (CSS only).
  - `data-reveal="up | fade | scale"` reveals an element when it scrolls into view.
  - `data-reveal-stagger` reveals its children one after another.
  - `<Typewriter>` types a text, holds it, deletes it and starts again, with a blinking cursor. It reserves the space of the full text so nothing moves, and pauses while off screen or in a hidden tab.
  - Everything is disabled when the visitor prefers reduced motion.

---

## Git workflow

- `main` — production. Only receives merges from `develop` when a release is published.
- `develop` — integration and testing. Every change lands here first.
- `feature/*`, `fix/*`, `chore/*` — work branches, always created from an up-to-date `develop`.

Commits follow [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `chore:`, `docs:`, `test:`). Typecheck, lint and tests must pass before merging.

---

## Roadmap

- [x] Project setup: Astro, Tailwind CSS, i18n, quality tooling
- [x] Visual direction and design system (light/dark themes, typography, motion)
- [x] Hero and flippable contact card
- [x] Projects shown as open folders with looping video previews and project pages
- [ ] Professional experience timeline with expandable nodes
- [ ] Skills and education
- [ ] SEO, accessibility and performance
- [ ] Deployment to Vercel
