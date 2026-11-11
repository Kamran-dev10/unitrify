import { describe, it, expect } from "vitest";
import { PAGES, pageUrl } from "../lib/pages.js";
import { CATEGORIES } from "../lib/categories.js";
import { SITE_PAGES } from "../lib/site-pages.js";
import { CONVERTER_GROUPS, ALL_CONVERTERS_PAGE } from "../lib/groups.js";

// Every page on the site: [where, description]
const ALL = [
  ...Object.values(SITE_PAGES).map((p) => [p.path, p.description]),
  ...CATEGORIES.map((c) => [`/${c.id}`, c.metaDescription]),
  ...PAGES.map((p) => [pageUrl(p), p.metaDescription]),
  [ALL_CONVERTERS_PAGE.path, ALL_CONVERTERS_PAGE.description],
  ...CONVERTER_GROUPS.map((g) => [g.path, g.description]),
];

describe("meta descriptions", () => {
  it("covers every page", () => {
    expect(ALL.length).toBe(Object.keys(SITE_PAGES).length + CATEGORIES.length + PAGES.length + 1 + CONVERTER_GROUPS.length);
  });

  it("every description is 110-155 characters", () => {
    for (const [path, d] of ALL) {
      const len = [...d].length; // count "°" and "–" as one character
      expect(len, `${path} (${len}): ${d}`).toBeGreaterThanOrEqual(110);
      expect(len, `${path} (${len}): ${d}`).toBeLessThanOrEqual(155);
    }
  });

  it("homepage description is 150 characters or less", () => {
    expect([...SITE_PAGES.home.description].length).toBeLessThanOrEqual(150);
  });

  it("every description is unique", () => {
    const seen = new Map();
    for (const [path, d] of ALL) {
      expect(seen.get(d), `${path} repeats ${seen.get(d)}`).toBeUndefined();
      seen.set(d, path);
    }
  });
});
