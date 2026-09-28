/**
 * Personal data shown across the site. Translatable text (role, location, about) lives in the
 * i18n dictionaries; this file holds the values that are the same in every language.
 */
export const profile = {
  fullName: 'Kevin De Jesús Fernández',
  /** Shorter form used only by the big hero heading. */
  heroName: 'Kevin De Jesús',
  initials: 'KF',
  email: 'kevinfdez41@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/kevin-fernandez-90805624b/',
    github: 'https://github.com/shepard1998',
  },
  /** EF SET English certificate. The link is hidden until the URL is set. */
  efSet: null as null | { url: string; result: string },
};

/** Shows a URL without protocol, `www.` or trailing slash: `github.com/shepard1998`. */
export function displayUrl(url: string): string {
  const { hostname, pathname } = new URL(url);
  return `${hostname.replace(/^www\./, '')}${pathname}`.replace(/\/+$/, '');
}
