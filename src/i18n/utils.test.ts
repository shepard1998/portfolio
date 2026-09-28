import { describe, expect, it } from 'vitest';

import { locales } from './config';
import { ui } from './ui';
import { getLocaleFromPath, isLocale, localizePath, stripLocale, useTranslations } from './utils';

describe('isLocale', () => {
  it('accepts supported locales only', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('es')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('getLocaleFromPath', () => {
  it('detects the locale prefix', () => {
    expect(getLocaleFromPath('/es/')).toBe('es');
    expect(getLocaleFromPath('/es/projects')).toBe('es');
  });

  it('falls back to English for unprefixed paths', () => {
    expect(getLocaleFromPath('/')).toBe('en');
    expect(getLocaleFromPath('/projects')).toBe('en');
    expect(getLocaleFromPath('/estate')).toBe('en');
  });
});

describe('stripLocale', () => {
  it('removes the locale prefix', () => {
    expect(stripLocale('/es/')).toBe('/');
    expect(stripLocale('/es')).toBe('/');
    expect(stripLocale('/es/projects')).toBe('/projects');
  });

  it('keeps unprefixed paths as they are', () => {
    expect(stripLocale('/')).toBe('/');
    expect(stripLocale('/projects')).toBe('/projects');
  });
});

describe('localizePath', () => {
  it('prefixes non-default locales', () => {
    expect(localizePath('/', 'es')).toBe('/es/');
    expect(localizePath('/projects', 'es')).toBe('/es/projects');
  });

  it('leaves the default locale unprefixed', () => {
    expect(localizePath('/es/', 'en')).toBe('/');
    expect(localizePath('/es/projects', 'en')).toBe('/projects');
  });
});

describe('useTranslations', () => {
  it('returns the text of the requested locale', () => {
    expect(useTranslations('en')('nav.language')).toBe('Language');
    expect(useTranslations('es')('nav.language')).toBe('Idioma');
  });

  it('replaces placeholders', () => {
    expect(useTranslations('es')('nav.switchTo', { language: 'English' })).toBe(
      'Cambiar a English',
    );
  });

  it('leaves unknown placeholders untouched', () => {
    expect(useTranslations('en')('nav.switchTo')).toBe('Switch to {language}');
  });
});

describe('dictionaries', () => {
  it('define the same non-empty keys in every locale', () => {
    const keys = Object.keys(ui.en).sort();
    for (const locale of locales) {
      expect(Object.keys(ui[locale]).sort()).toEqual(keys);
      for (const value of Object.values(ui[locale])) expect(value.trim()).not.toBe('');
    }
  });
});
