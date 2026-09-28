export type TypewriterPhase = 'typing' | 'holding' | 'deleting' | 'waiting';

export interface TypewriterState {
  phase: TypewriterPhase;
  /** Number of characters currently shown. */
  length: number;
}

export interface TypewriterTimings {
  /** Delay between typed characters. */
  typeMs: number;
  /** Extra delay after punctuation, so the text reads naturally. */
  punctuationMs: number;
  /** Delay between deleted characters. */
  deleteMs: number;
  /** Time the complete text stays on screen. */
  holdMs: number;
  /** Time the empty line waits before typing again. */
  waitMs: number;
}

export const defaultTypewriterTimings: TypewriterTimings = {
  typeMs: 30,
  punctuationMs: 180,
  deleteMs: 12,
  holdMs: 2800,
  waitMs: 400,
};

const PUNCTUATION = /[,.;:!?]/;

/**
 * Advances the typing loop one step: type the text, hold it, delete it, wait, and start again.
 * Returns the next state and how long to wait before the following step.
 */
export function nextTypewriterStep(
  state: TypewriterState,
  text: string,
  timings: TypewriterTimings = defaultTypewriterTimings,
): { state: TypewriterState; delay: number } {
  const total = Array.from(text).length;

  switch (state.phase) {
    case 'typing': {
      const length = Math.min(state.length + 1, total);
      if (length >= total) return { state: { phase: 'holding', length }, delay: timings.holdMs };
      const typed = Array.from(text)[length - 1] ?? '';
      const pause = PUNCTUATION.test(typed) ? timings.punctuationMs : 0;
      return { state: { phase: 'typing', length }, delay: timings.typeMs + pause };
    }
    case 'holding':
      return { state: { phase: 'deleting', length: state.length }, delay: timings.deleteMs };
    case 'deleting': {
      const length = Math.max(state.length - 1, 0);
      if (length === 0) return { state: { phase: 'waiting', length }, delay: timings.waitMs };
      return { state: { phase: 'deleting', length }, delay: timings.deleteMs };
    }
    case 'waiting':
      return { state: { phase: 'typing', length: 0 }, delay: timings.typeMs };
  }
}

/** First `length` characters of `text`, counting accented letters and emoji as one. */
export function visibleText(text: string, length: number): string {
  return Array.from(text).slice(0, length).join('');
}
