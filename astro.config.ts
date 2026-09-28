import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

import { defaultLocale, locales } from './src/i18n/config';
import { devStyleguide } from './src/dev/styleguide/integration';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: {
      // English lives at `/`, Spanish at `/es/`.
      prefixDefaultLocale: false,
    },
  },
  // Self-hosted fonts with metric-adjusted fallbacks to avoid layout shift.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Unbounded',
      cssVariable: '--font-unbounded',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [devStyleguide()],
  vite: {
    plugins: [tailwindcss()],
  },
});
