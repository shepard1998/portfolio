import type { AstroIntegration } from 'astro';

/** Serves the design-system styleguide at `/styleguide` and `/es/styleguide` in development only. */
export function devStyleguide(): AstroIntegration {
  return {
    name: 'dev-styleguide',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        injectRoute({
          pattern: '/styleguide',
          entrypoint: './src/dev/styleguide/StyleguidePage.astro',
        });
        injectRoute({
          pattern: '/es/styleguide',
          entrypoint: './src/dev/styleguide/StyleguidePage.astro',
        });
      },
    },
  };
}
