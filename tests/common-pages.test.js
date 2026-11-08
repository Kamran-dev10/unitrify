import { describe, it, expect } from "vitest";
import { convert } from "../lib/convert.js";
import { COMMON_PAGES } from "../lib/pages-common.js";
import { PAGES } from "../lib/pages.js";

const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;

describe("quick answers", () => {
  it("1 inch = 25.4 mm", () => expect(convert(1, "inch", "mm", "length")).toBeCloseTo(25.4, 12));
  it("1 oz = 28.3495 g", () => expect(round(convert(1, "ounce", "g", "weight"), 4)).toBe(28.3495));
  it("1 lb = 16 oz", () => expect(convert(1, "pound", "ounce", "weight")).toBeCloseTo(16, 12));
  it("1 mph = 1.60934 km/h", () => expect(round(convert(1, "mph", "km-h", "speed"), 5)).toBe(1.60934));
  it("1 acre = 43560 sq ft", () => expect(convert(1, "acre", "sq-ft", "area")).toBe(43560));
  it("1 rad = 57.2958 degree", () => expect(round(convert(1, "rad", "deg", "angle"), 4)).toBe(57.2958));
  it("1 hp = 0.7457 kW", () => expect(round(convert(1, "hp", "kw", "power"), 4)).toBe(0.7457));
  it("1 yd = 0.9144 m", () => expect(convert(1, "yard", "m", "length")).toBeCloseTo(0.9144, 12));
  it("1 US cup = 236.5882 ml", () => expect(round(convert(1, "us-cup", "ml", "volume"), 4)).toBe(236.5882));
  it("1 bar = 14.5038 psi", () => expect(round(convert(1, "bar", "psi", "pressure"), 4)).toBe(14.5038));
  it("1 kcal = 4.184 kJ", () => expect(convert(1, "kcal", "kj", "energy")).toBeCloseTo(4.184, 12));
  it("1 cal = 4.184 J", () => expect(convert(1, "cal", "j", "energy")).toBeCloseTo(4.184, 12));
  it("1 lbf = 4.44822 N", () => expect(round(convert(1, "lbf", "n", "force"), 5)).toBe(4.44822));
  it("1 knot = 1.15078 mph", () => expect(round(convert(1, "knot", "mph", "speed"), 5)).toBe(1.15078));
  it("1 m/s = 3.6 km/h", () => expect(convert(1, "m-s", "km-h", "speed")).toBeCloseTo(3.6, 12));
  it("1 GB = 1000 MB", () => expect(convert(1, "gb", "mb", "data-storage")).toBeCloseTo(1000, 9));
  it("1 kWh = 3412.14 BTU", () => expect(round(convert(1, "kwh", "btu", "energy"), 2)).toBe(3412.14));
});

describe("common pair pages", () => {
  it("there are 57 common pages, all in PAGES", () => {
    expect(COMMON_PAGES.length).toBe(57);
    for (const p of COMMON_PAGES) expect(PAGES).toContain(p);
  });

  it("every new page has a quick answer, intro, formula and 3 FAQs", () => {
    for (const p of COMMON_PAGES) {
      expect(p.quickAnswer, p.slug).toBeTruthy();
      expect(p.intro, p.slug).toBeTruthy();
      expect(p.formula, p.slug).toBeTruthy();
      expect(p.faqs.length, p.slug).toBe(3);
    }
  });

  // Keyword rules: the primary keyword is in the title or h1 and appears
  // exactly once in the meta description; 2-4 secondary keywords; every
  // primary keyword is unique.
  it("keyword rules (every pair page)", () => {
    const seen = new Set();
    for (const p of PAGES) {
      expect(p.keywords, `${p.slug}: no keywords`).toBeTruthy();
      const primary = p.keywords.primary.toLowerCase();
      expect(seen.has(primary), `${p.slug}: duplicate primary`).toBe(false);
      seen.add(primary);
      const inTitle = p.title.toLowerCase().includes(primary) || p.h1.toLowerCase().includes(primary);
      expect(inTitle, `${p.slug}: "${primary}" not in title or h1`).toBe(true);
      const count = p.metaDescription.toLowerCase().split(primary).length - 1;
      expect(count, `${p.slug}: "${primary}" appears ${count}x in description`).toBe(1);
      expect(p.keywords.secondary.length, p.slug).toBeGreaterThanOrEqual(2);
      expect(p.keywords.secondary.length, p.slug).toBeLessThanOrEqual(4);
    }
  });

  it("FAQ questions are not repeated across the new pages", () => {
    const seen = new Map();
    for (const p of COMMON_PAGES) {
      for (const f of p.faqs) {
        const key = f.question.toLowerCase();
        expect(seen.get(key), `"${f.question}" on ${p.slug} and ${seen.get(key)}`).toBeUndefined();
        seen.set(key, p.slug);
      }
    }
  });
});
