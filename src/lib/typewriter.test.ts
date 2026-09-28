import { describe, expect, it } from 'vitest';

import {
  defaultTypewriterTimings as timings,
  nextTypewriterStep,
  visibleText,
  type TypewriterState,
} from './typewriter';

/** Runs the loop from `state` and records every visited state. */
function run(text: string, state: TypewriterState, steps: number) {
  const visited: TypewriterState[] = [];
  let current = state;
  for (let i = 0; i < steps; i++) {
    current = nextTypewriterStep(current, text).state;
    visited.push(current);
  }
  return visited;
}

describe('nextTypewriterStep', () => {
  it('types one character per step and holds the full text', () => {
    const states = run('abc', { phase: 'typing', length: 0 }, 3);
    expect(states.map((s) => s.length)).toEqual([1, 2, 3]);
    expect(states.at(-1)?.phase).toBe('holding');
    expect(nextTypewriterStep({ phase: 'typing', length: 2 }, 'abc').delay).toBe(timings.holdMs);
  });

  it('deletes after holding, waits when empty and starts again', () => {
    const states = run('ab', { phase: 'holding', length: 2 }, 5);
    expect(states.map((s) => `${s.phase}:${s.length}`)).toEqual([
      'deleting:2',
      'deleting:1',
      'waiting:0',
      'typing:0',
      'typing:1',
    ]);
  });

  it('pauses briefly after punctuation', () => {
    expect(nextTypewriterStep({ phase: 'typing', length: 2 }, 'ab, cd').delay).toBe(
      timings.typeMs + timings.punctuationMs,
    );
    expect(nextTypewriterStep({ phase: 'typing', length: 0 }, 'ab, cd').delay).toBe(timings.typeMs);
  });

  it('deletes faster than it types', () => {
    expect(timings.deleteMs).toBeLessThan(timings.typeMs);
  });

  it('counts accented characters as one', () => {
    const states = run('Aé', { phase: 'typing', length: 0 }, 2);
    expect(states.at(-1)).toEqual({ phase: 'holding', length: 2 });
  });
});

describe('visibleText', () => {
  it('returns the typed prefix', () => {
    expect(visibleText('Construyo software', 9)).toBe('Construyo');
    expect(visibleText('abc', 0)).toBe('');
    expect(visibleText('abc', 10)).toBe('abc');
  });
});
