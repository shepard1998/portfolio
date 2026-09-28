import type { Locale } from '../i18n/config';

/** A calendar month written as `YYYY-MM`. */
export type YearMonth = `${number}-${number}`;

function parse(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split('-').map(Number);
  if (!year || !month || month < 1 || month > 12) throw new Error(`Invalid year-month: ${value}`);
  return { year, month };
}

/** Months covered by a range, counting both ends: Mar–Jun is 4. */
export function monthsInclusive(start: YearMonth, end: YearMonth): number {
  const a = parse(start);
  const b = parse(end);
  return b.year * 12 + b.month - (a.year * 12 + a.month) + 1;
}

/** Numeric value for sorting (later months are larger). */
export function monthIndex(value: YearMonth): number {
  const { year, month } = parse(value);
  return year * 12 + month;
}

/** `2025-03` → `Mar 2025` (en) / `mar 2025` (es). */
export function formatMonth(value: YearMonth, locale: Locale): string {
  const { year, month } = parse(value);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(date)
    .replace('.', '');
}

/** A single month when start and end match, otherwise `Mar 2025 – Jun 2025`. */
export function formatRange(
  start: YearMonth,
  end: YearMonth | null,
  locale: Locale,
  present: string,
): string {
  if (end === start) return formatMonth(start, locale);
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : present}`;
}

/** `4 months`, `1 year`, `1 year, 2 months` in the given language. */
export function formatDuration(months: number, locale: Locale): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const unit = (value: number, name: 'year' | 'month') =>
    new Intl.NumberFormat(locale, { style: 'unit', unit: name, unitDisplay: 'long' }).format(value);
  const parts = [years > 0 && unit(years, 'year'), rest > 0 && unit(rest, 'month')].filter(
    (part): part is string => Boolean(part),
  );
  return new Intl.ListFormat(locale, { style: 'long', type: 'unit' }).format(parts);
}
