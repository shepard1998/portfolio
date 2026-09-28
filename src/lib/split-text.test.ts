import { describe, expect, it } from 'vitest';

import { splitText } from './split-text';

describe('splitText', () => {
  it('splits words into indexed characters', () => {
    const words = splitText('Kevin De Jesús');
    expect(words.map((word) => word.chars.map((c) => c.char).join(''))).toEqual([
      'Kevin',
      'De',
      'Jesús',
    ]);
    expect(words.at(-1)?.chars.at(-1)).toEqual({ char: 's', index: 11 });
  });

  it('keeps accented characters intact and collapses whitespace', () => {
    const words = splitText('  Fernández \n Ñu ');
    expect(words).toHaveLength(2);
    expect(words[0]?.chars.map((c) => c.char)).toContain('á');
    expect(words[1]?.chars[0]).toEqual({ char: 'Ñ', index: 9 });
  });

  it('returns nothing for empty text', () => {
    expect(splitText('   ')).toEqual([]);
  });
});
