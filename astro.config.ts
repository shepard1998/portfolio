import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { defaultLocale, locales } from './src/i18n/config';

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
  vite: {
    plugins: [tailwindcss()],
  },
});
