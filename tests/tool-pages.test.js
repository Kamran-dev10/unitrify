import { describe, it, expect } from "vitest";
import { convertCase, textStats } from "../lib/text-case.js";
import { convertBase, parseInBase } from "../lib/number-base.js";
import { toRoman, fromRoman } from "../lib/roman.js";
import { convertCurrency, formatMoney } from "../lib/currency.js";
import { TOOLS, TOOL_PAGES, NUMBER_PAGES, CURRENCY_PAGES } from "../lib/tools.js";
import { PAGES } from "../lib/pages.js";
import { CATEGORIES } from "../lib/categories.js";
import { SITE_PAGES } from "../lib/site-pages.js";
import { buildTitle, MAX_TITLE_LENGTH } from "../lib/seo.js";

describe("case converter", () => {
  const t = "hello world";
  it("Title Case", () => expect(convertCase(t, "title")).toBe("Hello World"));
  it("camelCase", () => expect(convertCase(t, "camel")).toBe("helloWorld"));
  it("snake_case", () => expect(convertCase(t, "snake")).toBe("hello_world"));
  it("kebab-case", () => expect(convertCase(t, "kebab")).toBe("hello-world"));
  it("CONSTANT_CASE", () => expect(convertCase(t, "constant")).toBe("HELLO_WORLD"));
  it("PascalCase, sentence, alternating, inverse", () => {
    expect(convertCase(t, "pascal")).toBe("HelloWorld");
    expect(convertCase("hello. how ARE you?", "sentence")).toBe("Hello. How are you?");
    expect(convertCase(t, "alternating")).toBe("hElLo WoRlD");
    expect(convertCase("Inverse Case", "inverse")).toBe("iNVERSE cASE");
  });
  it("splits camelCase input", () => expect(convertCase("helloWorld", "snake")).toBe("hello_world"));
  it("counts", () => {
    expect(textStats("Hello world\nsecond line")).toEqual({ characters: 23, charactersNoSpaces: 20, words: 4, lines: 2 });
    expect(textStats("")).toEqual({ characters: 0, charactersNoSpaces: 0, words: 0, lines: 0 });
  });
});

describe("number converter", () => {
  it("255 = 11111111 (2) = 377 (8) = ff (16)", () => {
    expect(convertBase("255", 10, 2).value).toBe("11111111");
    expect(convertBase("255", 10, 8).value).toBe("377");
    expect(convertBase("255", 10, 16).value).toBe("ff");
  });
  it("a 30-digit decimal converts to hex and back unchanged", () => {
    const big = "123456789012345678901234567890";
    const hex = convertBase(big, 10, 16).value;
    expect(convertBase(hex, 16, 10).value).toBe(big);
  });
  it('"102" in binary returns an error', () => {
    const r = convertBase("102", 2, 10);
    expect(r.value).toBeUndefined();
    expect(r.error).toMatch(/not a valid digit/);
  });
  it("accepts prefixes and base 36", () => {
    expect(convertBase("0xFF", 16, 10).value).toBe("255");
    expect(convertBase("zz", 36, 10).value).toBe("1295");
    expect(parseInBase("-101", 2).value).toBe(-5n);
  });
});

describe("roman numerals", () => {
  it("1994 = MCMXCIV", () => expect(toRoman(1994).value).toBe("MCMXCIV"));
  it("MMXXVI = 2026", () => expect(fromRoman("MMXXVI").value).toBe(2026));
  it("0 and 4000 are rejected", () => {
    expect(toRoman(0).error).toBeTruthy();
    expect(toRoman(4000).error).toBeTruthy();
  });
  it("non-standard numerals are rejected", () => expect(fromRoman("IIII").error).toBeTruthy());
});

describe("currency maths (mock rates, no network)", () => {
  const rates = { USD: 1, PKR: 280, GBP: 0.8, EUR: 0.9, INR: 84 };
  it("USD to PKR", () => expect(convertCurrency(10, "USD", "PKR", rates)).toBeCloseTo(2800, 9));
  it("through USD: GBP to PKR", () => expect(convertCurrency(1, "GBP", "PKR", rates)).toBeCloseTo(350, 9));
  it("EUR to GBP", () => expect(convertCurrency(90, "EUR", "GBP", rates)).toBeCloseTo(80, 9));
  it("same currency", () => expect(convertCurrency(5, "INR", "INR", rates)).toBeCloseTo(5, 12));
  it("bad input and unknown codes return null", () => {
    expect(convertCurrency("abc", "USD", "PKR", rates)).toBeNull();
    expect(convertCurrency(-1, "USD", "PKR", rates)).toBeNull();
    expect(convertCurrency(1, "USD", "XYZ", rates)).toBeNull();
    expect(convertCurrency(1, "USD", "PKR", null)).toBeNull();
  });
  it("formatting", () => expect(formatMoney(2800)).toBe("2,800.00"));
});

describe("tool pages follow the page rules", () => {
  const all = [...TOOLS, ...TOOL_PAGES];

  it("titles are unique and under 60 characters", () => {
    const titles = all.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const t of titles) expect(buildTitle(t).length, t).toBeLessThan(MAX_TITLE_LENGTH);
  });

  it("descriptions are 110-155 characters and unique across the whole site", () => {
    const site = [
      ...Object.values(SITE_PAGES).map((p) => p.description),
      ...CATEGORIES.map((c) => c.metaDescription),
      ...PAGES.map((p) => p.metaDescription),
    ];
    const seen = new Set(site);
    for (const p of all) {
      const len = [...p.metaDescription].length;
      expect(len, `${p.slug ?? p.id} (${len})`).toBeGreaterThanOrEqual(110);
      expect(len, `${p.slug ?? p.id} (${len})`).toBeLessThanOrEqual(155);
      expect(seen.has(p.metaDescription), `${p.slug ?? p.id}: duplicate description`).toBe(false);
      seen.add(p.metaDescription);
    }
  });

  it("keyword rules", () => {
    const seen = new Set(PAGES.map((p) => p.keywords.primary.toLowerCase()));
    for (const p of all) {
      const primary = p.keywords.primary.toLowerCase();
      expect(seen.has(primary), `${p.slug ?? p.id}: duplicate primary`).toBe(false);
      seen.add(primary);
      expect(p.title.toLowerCase().includes(primary) || p.h1.toLowerCase().includes(primary), p.slug ?? p.id).toBe(true);
      expect(p.metaDescription.toLowerCase().split(primary).length - 1, `${p.slug ?? p.id} description`).toBe(1);
      expect(p.keywords.secondary.length).toBeGreaterThanOrEqual(2);
      expect(p.keywords.secondary.length).toBeLessThanOrEqual(4);
    }
  });

  it("every tool has an intro and 3 FAQs; number pages have 3 FAQs", () => {
    for (const t of TOOLS) {
      expect(t.intro).toBeTruthy();
      expect(t.faqs.length, t.id).toBe(3);
    }
    for (const p of NUMBER_PAGES) expect(p.faqs.length, p.slug).toBe(3);
  });

  it("currency pages: 2 amounts for rate FAQs, 1 fixed FAQ, no rates written by hand", () => {
    for (const p of CURRENCY_PAGES) {
      expect(p.amounts.length, p.slug).toBe(2);
      expect(p.extraFaq?.question, p.slug).toBeTruthy();
      const text = [p.title, p.metaDescription, p.intro, p.extraFaq.answer].join(" ");
      expect(/\d+\.\d+/.test(text), `${p.slug}: looks like a hand-written rate`).toBe(false);
    }
  });

  it("related links stay within the same tool (3 each)", () => {
    for (const p of TOOL_PAGES) {
      const same = TOOL_PAGES.filter((q) => q.tool === p.tool);
      expect(p.related.length, p.slug).toBe(3);
      expect(new Set(p.related).size, p.slug).toBe(3);
      for (const r of p.related) expect(same.some((q) => q.slug === r && q !== p), `${p.slug} -> ${r}`).toBe(true);
    }
  });
});
