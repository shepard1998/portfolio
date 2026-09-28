import { inView, stagger } from 'motion';
import { animate } from 'motion/mini';

type RevealVariant = 'up' | 'fade' | 'scale';

const keyframes: Record<RevealVariant, Record<string, string[] | number[]>> = {
  up: { opacity: [0, 1], transform: ['translateY(24px)', 'none'] },
  fade: { opacity: [0, 1] },
  scale: { opacity: [0, 1], transform: ['scale(0.94)', 'none'] },
};

function variantOf(element: Element): RevealVariant {
  const value = element.getAttribute('data-reveal');
  return value === 'fade' || value === 'scale' ? value : 'up';
}

/**
 * Animates `[data-reveal]` elements the first time they enter the viewport.
 * Children of `[data-reveal-stagger]` are revealed one after another.
 * With reduced motion everything is shown immediately.
 */
export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach((element) => {
    if (reduceMotion) {
      element.dataset.revealed = '';
      return;
    }
    inView(
      element,
      () => {
        const staggered = element.hasAttribute('data-reveal-stagger');
        const targets = staggered ? Array.from(element.children) : [element];
        if (staggered) targets.forEach((target) => ((target as HTMLElement).style.opacity = '0'));
        element.dataset.revealed = '';
        animate(targets, keyframes[variantOf(element)], {
          duration: 0.56,
          ease: [0.16, 1, 0.3, 1],
          delay: staggered ? stagger(0.06) : 0,
        });
      },
      { margin: '0px 0px -10% 0px' },
    );
  });

  document.documentElement.dataset.revealReady = '';
}
