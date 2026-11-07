import { describe, it, expect } from "vitest";
import { buildTitle, MAX_TITLE_LENGTH } from "../lib/seo.js";
import { SITE_NAME } from "../lib/config.js";
import { PAGES } from "../lib/pages.js";
import { CATEGORIES } from "../lib/categories.js";
import { buildSearchIndex, searchPages } from "../lib/search.js";

describe("title template", () => {
  it('adds " | SITE_NAME" when it fits', () => {
    expect(buildTitle("Kanal to Marla")).toBe(`Kanal to Marla | ${SITE_NAME}`);
  });

  it("uses the page title alone when the suffix would not fit", () => {
    const long = "Marla to Sq Ft Converter – 225, 250 & 272 Standards";
    expect(`${long} | ${SITE_NAME}`.length).toBeGreaterThanOrEqual(MAX_TITLE_LENGTH);
    expect(buildTitle(long)).toBe(long);
  });

  it("every full page and category title is under 60 characters", () => {
    for (const t of [...PAGES, ...CATEGORIES].map((x) => x.title)) {
      expect(buildTitle(t).length, t).toBeLessThan(MAX_TITLE_LENGTH);
    }
  });
});

describe("search", () => {
  const index = buildSearchIndex();

  it('"marla" shows zameen pages', () => {
    const results = searchPages(index, "marla");
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) expect(r.url.startsWith("/zameen/"), r.url).toBe(true);
  });

  it('"kg to lbs" finds the kg to lbs page first', () => {
    expect(searchPages(index, "kg to lbs")[0].url).toBe("/weight/kg-to-lbs");
  });

  it('"lbs to kg" finds the lbs to kg page first', () => {
    expect(searchPages(index, "lbs to kg")[0].url).toBe("/weight/lbs-to-kg");
  });

  it("finds pages by unit name", () => {
    expect(searchPages(index, "pound").map((r) => r.url)).toContain("/weight/kg-to-lbs");
  });

  it("empty search returns nothing", () => {
    expect(searchPages(index, "   ")).toEqual([]);
  });
});
