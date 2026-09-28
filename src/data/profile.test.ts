import { describe, expect, it } from 'vitest';

import { displayUrl, profile } from './profile';

describe('profile', () => {
  it('uses the full name and its hero form', () => {
    expect(profile.fullName).toBe('Kevin De Jesús Fernández');
    expect(profile.fullName.startsWith(profile.heroName)).toBe(true);
  });

  it('has a valid email address', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('links only to https URLs on the expected hosts', () => {
    expect(new URL(profile.links.linkedin).hostname).toBe('www.linkedin.com');
    expect(new URL(profile.links.github).hostname).toBe('github.com');
    for (const url of Object.values(profile.links)) expect(url.startsWith('https://')).toBe(true);
  });
});

describe('displayUrl', () => {
  it('drops the protocol, www and trailing slash', () => {
    expect(displayUrl(profile.links.linkedin)).toBe('linkedin.com/in/kevin-fernandez-90805624b');
    expect(displayUrl(profile.links.github)).toBe('github.com/shepard1998');
  });
});
