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
  it("there are 61 common pages, all in PAGES", () => {
    expect(COMMON_PAGES.length).toBe(61);
    for (const p of COMMON_PAGES) expect(PAGES).toContain(p);
  });

  it("every new page has a quick answer, intro, formula and 3-5 FAQs", () => {
    for (const p of COMMON_PAGES) {
      expect(p.quickAnswer, p.slug).toBeTruthy();
      expect(p.intro, p.slug).toBeTruthy();
      expect(p.formula, p.slug).toBeTruthy();
      expect(p.faqs.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(p.faqs.length, p.slug).toBeLessThanOrEqual(5);
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

describe("length keyword pages", () => {
  const get = (slug) => PAGES.find((p) => p.slug === slug);
  // Page text the visitor sees (not the meta description).
  const body = (p) => [p.h1, p.quickAnswer, p.intro, p.formula, ...(p.examples ?? []), ...p.faqs.flatMap((f) => [f.question, f.answer]), p.extra?.text ?? ""].join(" ").toLowerCase();
  const count = (text, phrase) => text.split(phrase.toLowerCase()).length - 1;

  it("each page exists once, keeps its URL, and has 3 worked examples and 4-5 FAQs", () => {
    for (const [slug, primary] of [["cm-to-inch", "cm to inches"], ["cm-to-m", "cm to m"], ["inches-to-feet", "inches to feet"], ["inches-to-meters", "inches to meters"], ["m-to-cm", "m to cm"], ["meters-to-inches", "meters to inches"]]) {
      const p = get(slug);
      expect(p, slug).toBeTruthy();
      expect(PAGES.filter((q) => q.unitCategory === "length" && q.from === p.from && q.to === p.to && !q.tool), slug).toHaveLength(1);
      expect(p.category).toBe("length");
      expect(p.keywords.primary).toBe(primary);
      expect(p.h1.toLowerCase()).toContain(primary);
      expect(p.examples, slug).toHaveLength(3);
      expect(p.faqs.length, slug).toBeGreaterThanOrEqual(4);
      expect(p.faqs.length, slug).toBeLessThanOrEqual(5);
    }
  });

  it("variants are used, each at most once in the page text", () => {
    const variants = {
      "cm-to-inch": ["cm to in ", "convert cm to inches", "how many inches in a centimeter", "1 cm to inches", "10 cm to inches", "70 cm in inches", "centimetres to inches"],
      "cm-to-m": ["centimetre to metre", "cm to meter", "how to convert cm to m", "1 cm to m"],
      "inches-to-feet": ["in to ft", "inch to feet converter", "1 inch to feet", "59 inches to feet", "70 inches to feet and inches", "66 inches = 5 ft 6 in"],
      "inches-to-meters": ["inches to m ", "inch to m ", "how many inches in a meter", "1 inch in m", "inches in one meter"],
    };
    for (const [slug, list] of Object.entries(variants)) {
      const text = body(get(slug));
      for (const v of list) expect(count(text, v), `${slug}: "${v.trim()}"`).toBe(1);
    }
  });

  it("70 inches shows as 5 ft 10 in, and the table has the common values", () => {
    const p = get("inches-to-feet");
    expect(p.compound).toBe("feet-inches");
    expect(p.examples.join(" ")).toContain("5 ft 10 in");
    expect(p.tableRows).toEqual(expect.arrayContaining([59, 66, 70]));
    expect(get("cm-to-inch").tableRows).toContain(70);
  });

  it("links: the length hub, and the reverse pair where it exists", () => {
    expect(get("cm-to-inch").related).toContain("inch-to-cm");
    expect(get("inches-to-feet").related).toContain("feet-to-inches");
    // Each new pair links to its reverse, both ways.
    for (const [a, b] of [["cm-to-m", "m-to-cm"], ["inches-to-meters", "meters-to-inches"]]) {
      expect(get(a).related, a).toContain(b);
      expect(get(b).related, b).toContain(a);
    }
  });
});

describe("sitemap and hub", () => {
  it("the new length pages are in the sitemap", async () => {
    const { siteEntries } = await import("../lib/site-urls.js");
    const paths = siteEntries().map((e) => e.path);
    for (const p of ["/length/cm-to-m", "/length/m-to-cm", "/length/inches-to-meters", "/length/meters-to-inches"]) expect(paths, p).toContain(p);
  });
});

describe("keyword round 2: land and weight pages", () => {
  const get = (slug) => PAGES.find((p) => p.slug === slug);
  const body = (p) =>
    [p.h1, p.quickAnswer, p.intro, p.formula, ...(p.examples ?? []), ...p.faqs.flatMap((f) => [f.question, f.answer]), p.extra?.text ?? ""]
      .join(" ")
      .toLowerCase();
  const count = (text, phrase) => text.split(phrase.toLowerCase()).length - 1;
  const PAGES_2 = {
    "marla-to-sq-ft": ["marla to sq ft", ["marla in sq ft", "1 marla sq ft", "how many square feet in one marla", "marla calculator", "3 marla in square feet", "5 marla in square feet", "7 marla in square feet", "8 marla in square feet", "10 marla in square feet"]],
    "sq-ft-to-marla": ["sq ft to marla", ["square foot in marla"]],
    "kanal-to-marla": ["kanal to marla", ["1 kanal to marla", "1 kanal in marla"]],
    "marla-to-sq-yard": ["marla to square yards", ["5 marla in square yards"]],
    "kg-to-lbs": ["kg to lbs", ["convert kg to pounds", "how many pounds in 1 kg", "1 kilo to pounds", "1 kg in pounds", "3 kg in pounds", "3.5 kg to pounds", "kg to lbs and oz"]],
    "lbs-to-kg": ["lbs to kg", ["3 pounds to kg"]],
  };

  it("same URLs, primary in the h1, 3 examples and 4-5 FAQs", () => {
    for (const [slug, [primary]] of Object.entries(PAGES_2)) {
      const p = get(slug);
      expect(p, slug).toBeTruthy();
      expect(p.keywords.primary, slug).toBe(primary);
      expect(p.h1.toLowerCase(), slug).toContain(primary);
      expect(p.formula, slug).toBeTruthy();
      expect(p.examples, slug).toHaveLength(3);
      expect(p.faqs.length, slug).toBeGreaterThanOrEqual(4);
      expect(p.faqs.length, slug).toBeLessThanOrEqual(5);
      expect([...p.metaDescription].length, slug).toBeGreaterThanOrEqual(120);
    }
  });

  it("each variant appears exactly once in the page text", () => {
    for (const [slug, [, variants]] of Object.entries(PAGES_2)) {
      const text = body(get(slug));
      for (const v of variants) expect(count(text, v), `${slug}: "${v}"`).toBe(1);
    }
  });

  it("marla pages: every square-feet or square-yard number for a marla names its standard", () => {
    for (const slug of ["marla-to-sq-ft", "marla-to-sq-yard", "sq-ft-to-marla"]) {
      const p = get(slug);
      expect(p.tableAllChoices, slug).toBe(true);
      for (const line of p.examples) expect(line, `${slug}: ${line}`).toMatch(/\(272\.25 sq ft marla\).*\(250\).*\(225\)/);
    }
    expect(get("marla-to-sq-ft").tableRowSet).toEqual([1, 2, 3, 5, 6, 7, 8, 10, 15, 20]);
    const lw = get("marla-to-sq-ft").faqs.find((f) => /length and width/.test(f.question));
    expect(lw.answer).toContain("25 ft × 9 ft = 225 sq ft");
    expect(lw.answer).not.toMatch(/society|societies|DHA|Bahria/i);
  });

  it("kg to lbs: pounds and ounces, the main table and the baby weight table", () => {
    const p = get("kg-to-lbs");
    expect(p.compound).toBe("pounds-ounces");
    expect(p.faqs.find((f) => f.question.includes("3.2 kg")).answer).toContain("7 lb 0.9 oz");
    expect(p.tableRowSet).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 100]);
    const baby = p.extraTables[0].rows;
    expect(baby[0]).toBe(2.5);
    expect(baby.at(-1)).toBe(4.5);
    expect(baby).toHaveLength(21);
    expect(p.extraTables[0].compound).toBe("pounds-ounces");
  });

  it("reverse pairs are linked where they exist", () => {
    expect(get("marla-to-sq-ft").related[0]).toBe("sq-ft-to-marla");
    expect(get("sq-ft-to-marla").related[0]).toBe("marla-to-sq-ft");
    expect(get("kg-to-lbs").related[0]).toBe("lbs-to-kg");
    expect(get("lbs-to-kg").related[0]).toBe("kg-to-lbs");
  });
});
