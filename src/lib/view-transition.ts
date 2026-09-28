export interface Point {
  x: number;
  y: number;
}

/** Radius that makes a circle centered at `origin` cover the whole viewport. */
export function revealRadius(origin: Point, width: number, height: number): number {
  return Math.hypot(Math.max(origin.x, width - origin.x), Math.max(origin.y, height - origin.y));
}

/** Center of an element, used as the reveal origin for keyboard activation. */
export function elementCenter(element: Element): Point {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * Runs `change` inside a view transition that reveals the new state with a circle growing
 * from `origin`. Falls back to an instant change without View Transitions or with reduced motion.
 */
export function circularReveal(origin: Point, change: () => void): void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof document.startViewTransition !== 'function' || reduceMotion) {
    change();
    return;
  }

  const radius = revealRadius(origin, window.innerWidth, window.innerHeight);
  const transition = document.startViewTransition(change);
  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: 560,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    })
    .catch(() => {
      // The transition was skipped; the change has already been applied.
    });
}
