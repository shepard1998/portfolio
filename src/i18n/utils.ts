import { defaultLocale, locales, type Locale } from './config';
import { ui, type UiKey } from './ui';

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Resolves the locale from the first path segment, falling back to the default locale. */
export function getLocaleFromPath(pathname: string): Locale {
  const [, firstSegment] = pathname.split('/');
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

/** Removes the locale prefix from a path: `/es/projects` → `/projects`. */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale === defaultLocale && !pathname.startsWith(`/${defaultLocale}/`)) {
    return pathname || '/';
  }
  const stripped = pathname.slice(locale.length + 1);
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

/** Builds the path of `pathname` in `locale`. The default locale has no prefix. */
export function localizePath(pathname: string, locale: Locale): string {
  const path = stripLocale(pathname);
  if (locale === defaultLocale) return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

/** Returns a translator for `locale`. `{name}` placeholders are replaced with `params`. */
export function useTranslations(locale: Locale) {
  return function t(key: UiKey, params: Record<string, string> = {}): string {
    const template = ui[locale][key] ?? ui[defaultLocale][key];
    return template.replace(/\{(\w+)\}/g, (match, name: string) => params[name] ?? match);
  };
}
