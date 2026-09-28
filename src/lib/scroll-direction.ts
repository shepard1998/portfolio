/**
 * Decides whether a sticky header should hide: it hides while scrolling down past `offset`
 * and shows again on any upward scroll larger than `tolerance` pixels.
 */
export function nextHeaderHidden(
  hidden: boolean,
  previousY: number,
  currentY: number,
  { offset = 96, tolerance = 6 }: { offset?: number; tolerance?: number } = {},
): boolean {
  if (currentY <= offset) return false;
  const delta = currentY - previousY;
  if (Math.abs(delta) < tolerance) return hidden;
  return delta > 0;
}
