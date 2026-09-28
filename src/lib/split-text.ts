export interface SplitChar {
  char: string;
  /** Position among all characters, used to stagger the animation. */
  index: number;
}

export interface SplitWord {
  chars: SplitChar[];
}

/**
 * Splits text into words and characters so each character can be animated on its own while
 * words never break across lines. Whitespace is collapsed; spaces do not consume an index.
 */
export function splitText(text: string): SplitWord[] {
  let index = 0;
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({
      chars: Array.from(word).map((char) => ({ char, index: index++ })),
    }));
}
